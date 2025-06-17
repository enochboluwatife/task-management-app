from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from ..database import get_db
from ..models.task import Task, TaskStatus, TaskPriority
from ..models.user import User
from ..schemas.task import TaskCreate, TaskUpdate, Task as TaskSchema
from ..utils.dependencies import get_current_user

router = APIRouter(prefix="/api/tasks", tags=["tasks"])

@router.get("", response_model=List[TaskSchema])
def get_tasks_root(
    status: Optional[str] = Query(None, description="Filter by status"),
    priority: Optional[str] = Query(None, description="Filter by priority"),
    skip: int = Query(0, ge=0, description="Number of tasks to skip"),
    limit: int = Query(100, ge=1, le=100, description="Number of tasks to return"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all tasks for the current user with optional filtering"""
    
    query = db.query(Task).filter(Task.user_id == current_user.id)
    
    # Apply filters - convert string to enum if valid
    if status and status.strip():
        try:
            status_enum = TaskStatus(status.strip())
            query = query.filter(Task.status == status_enum)
        except ValueError:
            # Invalid status value, ignore the filter
            pass
    
    if priority and priority.strip():
        try:
            priority_enum = TaskPriority(priority.strip())
            query = query.filter(Task.priority == priority_enum)
        except ValueError:
            # Invalid priority value, ignore the filter
            pass
    
    # Order by created_at descending
    query = query.order_by(Task.created_at.desc())
    
    # Apply pagination
    tasks = query.offset(skip).limit(limit).all()
    
    return tasks

@router.post("", response_model=TaskSchema, status_code=status.HTTP_201_CREATED)
def create_task_root(
    task: TaskCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new task"""
    
    db_task = Task(
        **task.model_dump(),
        user_id=current_user.id
    )
    
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    
    return db_task

@router.get("/{task_id}", response_model=TaskSchema)
def get_task(
    task_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific task by ID"""
    
    task = db.query(Task).filter(
        and_(Task.id == task_id, Task.user_id == current_user.id)
    ).first()
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    return task

@router.put("/{task_id}", response_model=TaskSchema)
def update_task(
    task_id: int,
    task_update: TaskUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a specific task"""
    
    # Get the task
    task = db.query(Task).filter(
        and_(Task.id == task_id, Task.user_id == current_user.id)
    ).first()
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    # Update task fields
    update_data = task_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)
    
    db.commit()
    db.refresh(task)
    
    return task

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a specific task"""
    
    task = db.query(Task).filter(
        and_(Task.id == task_id, Task.user_id == current_user.id)
    ).first()
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )
    
    db.delete(task)
    db.commit()
    
    return None

@router.get("/stats/summary")
def get_task_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get task statistics for the current user"""
    
    # Count tasks by status
    stats = {}
    for status in TaskStatus:
        count = db.query(Task).filter(
            and_(Task.user_id == current_user.id, Task.status == status)
        ).count()
        stats[status.value] = count
    
    # Count tasks by priority
    priority_stats = {}
    for priority in TaskPriority:
        count = db.query(Task).filter(
            and_(Task.user_id == current_user.id, Task.priority == priority)
        ).count()
        priority_stats[priority.value] = count
    
    return {
        "status_stats": stats,
        "priority_stats": priority_stats,
        "total_tasks": sum(stats.values())
    } 
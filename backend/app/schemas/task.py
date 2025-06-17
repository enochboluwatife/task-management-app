from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from ..models.task import TaskStatus, TaskPriority


class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200, description="Task title")
    description: Optional[str] = Field(None, max_length=1000, description="Task description")
    status: TaskStatus = Field(TaskStatus.todo, description="Task status")
    priority: TaskPriority = Field(TaskPriority.medium, description="Task priority")
    due_date: Optional[datetime] = Field(None, description="Task due date")


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200, description="Task title")
    description: Optional[str] = Field(None, max_length=1000, description="Task description")
    status: Optional[TaskStatus] = Field(None, description="Task status")
    priority: Optional[TaskPriority] = Field(None, description="Task priority")
    due_date: Optional[datetime] = Field(None, description="Task due date")


class TaskInDB(TaskBase):
    id: int = Field(..., description="Task ID")
    user_id: int = Field(..., description="User ID who owns the task")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: Optional[datetime] = Field(None, description="Last update timestamp")

    class Config:
        orm_mode = True


class Task(TaskInDB):
    pass


class TaskWithOwner(Task):
    owner_username: str = Field(..., description="Task owner username")
    owner_email: str = Field(..., description="Task owner email")
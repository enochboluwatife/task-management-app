# Task Management Backend

FastAPI backend for the Task Management App with JWT authentication and SQLAlchemy ORM.

## Features

- 🔐 JWT Authentication
- 👥 User Management (Register/Login)
- 📋 Task CRUD Operations
- 🏷️ Task Status & Priority Management
- 🔍 Filtering & Pagination
- 📊 Role-based Access Control
- 🗄️ SQLAlchemy ORM with PostgreSQL/SQLite

## Setup

### Prerequisites
- Python 3.8+
- PostgreSQL (optional, SQLite works for development)

### Installation

1. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Environment setup**
```bash
cp env.example .env
# Edit .env with your configuration
```

4. **Run database migrations**
```bash
python -m app.database
```

5. **Start the server**
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API Documentation

Once running, visit:
- **Interactive API Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks (with filters)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/{task_id}` - Get specific task
- `PUT /api/tasks/{task_id}` - Update task
- `DELETE /api/tasks/{task_id}` - Delete task

## Database Schema

### Users Table
- `id` (Primary Key)
- `email` (Unique)
- `username` (Unique)
- `hashed_password`
- `role` (admin/user)
- `created_at`
- `updated_at`

### Tasks Table
- `id` (Primary Key)
- `title`
- `description`
- `status` (todo/in_progress/done)
- `priority` (low/medium/high/critical)
- `user_id` (Foreign Key)
- `created_at`
- `updated_at`
- `due_date` (Optional)

## Environment Variables

```env
# Database Configuration
DATABASE_URL=sqlite:///./task_management.db
# For PostgreSQL: postgresql://user:password@localhost/task_management

# JWT Configuration
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Environment
ENVIRONMENT=development
```

## Development

### Project Structure
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app
│   ├── config.py            # Settings
│   ├── database.py          # Database setup
│   ├── models/              # SQLAlchemy models
│   ├── schemas/             # Pydantic schemas
│   ├── routers/             # API routes
│   └── utils/               # Utilities
├── requirements.txt
├── env.example
└── README.md
```

### Testing the API

1. **Register a user**
```bash
curl -X POST "http://localhost:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","username":"testuser","password":"password123"}'
```

2. **Login**
```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=user@example.com&password=password123"
```

3. **Create a task**
```bash
curl -X POST "http://localhost:8000/api/tasks/" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","description":"This is a test task","priority":"high"}'
```

## Deployment

### Production Considerations
- Use PostgreSQL for production
- Set a strong SECRET_KEY
- Configure proper CORS origins
- Use environment variables for all sensitive data
- Consider using Alembic for database migrations

### Deployment Options
- **Render**: Easy Python deployment
- **Railway**: Modern deployment platform
- **Heroku**: Traditional PaaS
- **Docker**: Containerized deployment 
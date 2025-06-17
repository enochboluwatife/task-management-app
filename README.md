# Task Management App (Mini Jira Clone)

A full-featured task management application built with FastAPI backend and React frontend, featuring JWT authentication, task CRUD operations, filtering, and role-based access control.

## 🚀 Features

### Core Features
- ✅ **User Authentication**: JWT-based login/register system
- ✅ **Task Management**: Create, read, update, delete tasks
- ✅ **Task Filtering**: Filter by status, priority, and assignee
- ✅ **Task Statistics**: Dashboard with task analytics
- ✅ **Role-based Access**: Admin and user roles

### Bonus Features
- ✅ **Kanban Board**: Drag-and-drop task management
- ✅ **List View**: Traditional list view for tasks
- ✅ **Real-time Updates**: Live task statistics
- ✅ **Responsive Design**: Mobile-friendly interface
- ✅ **Modern UI**: Beautiful design with Tailwind CSS

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: ORM for database operations
- **SQLite**: Database (can be easily switched to PostgreSQL)
- **JWT**: Authentication tokens
- **Pydantic**: Data validation
- **bcrypt**: Password hashing

### Frontend
- **React**: UI library
- **React Router**: Client-side routing
- **React Query**: Data fetching and caching
- **React Beautiful DND**: Drag-and-drop functionality
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Axios**: HTTP client

## 📦 Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Tasks
- `GET /api/tasks` - Get all tasks (with filtering)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/{id}` - Get specific task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task
- `GET /api/tasks/stats/summary` - Get task statistics

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
DATABASE_URL=sqlite:///./task_management.db
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
ENVIRONMENT=development
```

## 🚀 Deployment

### Render Deployment
1. Push your code to GitHub
2. Connect your repository to Render
3. Set up environment variables in Render dashboard
4. Deploy!

## 📱 Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Create Tasks**: Add new tasks with title, description, status, and priority
3. **Manage Tasks**: Edit, delete, or change task status
4. **Filter Tasks**: Use the filter options to find specific tasks
5. **View Statistics**: Check the dashboard for task analytics
6. **Switch Views**: Toggle between list and Kanban board views

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ by [Your Name]

---

**Happy Task Managing!** 🎯 
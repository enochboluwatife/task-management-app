# Task Management Frontend

React frontend for the Task Management App with modern UI, drag-and-drop Kanban board, and real-time task management.

## Features

### Core Features ✅
- 🔐 **JWT Authentication** - Secure login/register with token management
- 📋 **Task CRUD Operations** - Create, read, update, and delete tasks
- 🏷️ **Task Management** - Assign priority and status to tasks
- 🔍 **Filtering & Sorting** - Filter tasks by status and priority
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

### Bonus Features 🎁
- 🎯 **Kanban Board** - Drag-and-drop interface for task management
- 📊 **Task Statistics** - Visual dashboard with charts and progress bars
- 👥 **Role-based Access** - Admin panel for administrative users
- 🎨 **Modern UI** - Clean, intuitive interface with Tailwind CSS
- ⚡ **Real-time Updates** - React Query for efficient data management

## Technology Stack

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **React Query** - Server state management and caching
- **React Beautiful DND** - Drag-and-drop functionality
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls

## Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Backend API running (see backend README)

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Environment setup**
```bash
cp env.example .env
# Edit .env with your API configuration
```

3. **Start development server**
```bash
npm start
```

The app will be available at `http://localhost:3000`

## Environment Variables

```env
# API Configuration
REACT_APP_API_URL=http://localhost:8000
REACT_APP_API_BASE_URL=http://localhost:8000/api

# Environment
REACT_APP_ENVIRONMENT=development
```

## Usage

### Authentication
1. **Register** - Create a new account with email, username, and password
2. **Login** - Sign in with your credentials
3. **Logout** - Click the logout button in the header

### Task Management
1. **Create Task** - Click "New Task" button to open the task modal
2. **Edit Task** - Click the edit icon on any task card
3. **Delete Task** - Click the delete icon on any task card
4. **Filter Tasks** - Use the status and priority dropdowns
5. **View Modes** - Switch between List and Kanban views

### Kanban Board
- **Drag & Drop** - Move tasks between columns to change status
- **Visual Status** - See task progress at a glance
- **Quick Actions** - Edit and delete directly from cards

### Dashboard Features
- **Task Statistics** - View counts by status and priority
- **Progress Bars** - Visual representation of task distribution
- **Admin Panel** - Administrative features for admin users

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── AdminPanel.js
│   │   │   └── TaskStats.js
│   │   ├── Layout/
│   │   │   └── Layout.js
│   │   └── Tasks/
│   │       ├── TaskItem.js
│   │       ├── TaskList.js
│   │       ├── TaskModal.js
│   │       └── KanbanBoard.js
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── Dashboard.js
│   │   ├── Login.js
│   │   └── Register.js
│   ├── services/
│   │   ├── authService.js
│   │   └── taskService.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## API Integration

The frontend integrates with the FastAPI backend through:

- **Authentication Service** - Handles login, register, and token management
- **Task Service** - Manages all task-related API calls
- **React Query** - Provides caching, background updates, and error handling

## Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Custom Components** - Reusable button and input styles
- **Responsive Design** - Mobile-first approach
- **Dark Mode Ready** - Easy to extend with dark theme

## Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Vercel** - Optimal for React apps
- **Netlify** - Great for static sites
- **GitHub Pages** - Free hosting option
- **AWS S3 + CloudFront** - Scalable static hosting

## Development

### Code Style
- ESLint configuration included
- Prettier formatting
- Component-based architecture
- Custom hooks for reusable logic

### State Management
- **React Context** - For authentication state
- **React Query** - For server state and caching
- **Local State** - For component-specific state

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of a technical assessment for task management application development. 
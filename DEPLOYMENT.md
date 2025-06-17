# Task Management App - Deployment Guide

## Backend Deployment (Render)

### Step 1: Deploy on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `task-management-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `uvicorn wsgi:app --host 0.0.0.0 --port $PORT`
   - **Root Directory**: Leave empty

### Step 2: Environment Variables
Add these environment variables in Render:
- `DATABASE_URL`: `sqlite:////opt/render/project/src/backend/task_management.db`
- `SECRET_KEY`: (Render will generate this)
- `ALGORITHM`: `HS256`
- `ACCESS_TOKEN_EXPIRE_MINUTES`: `30`
- `ALLOWED_ORIGINS`: `https://your-frontend-domain.vercel.app,http://localhost:3000`
- `ENVIRONMENT`: `production`

### Step 3: Get Backend URL
After deployment, note your backend URL: `https://your-backend-name.onrender.com`

## Frontend Deployment (Vercel)

### Step 1: Deploy on Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### Step 2: Environment Variables
Add this environment variable in Vercel:
- `REACT_APP_API_BASE_URL`: `https://your-backend-name.onrender.com/api`

### Step 3: Update Backend CORS
After getting your Vercel frontend URL, update the `ALLOWED_ORIGINS` in Render to include your Vercel domain.

## URLs
- **Backend API**: `https://your-backend-name.onrender.com`
- **Frontend**: `https://your-frontend-name.vercel.app`
- **API Documentation**: `https://your-backend-name.onrender.com/docs`

## Testing
1. Visit your Vercel frontend URL
2. Register a new account
3. Create and manage tasks
4. Test all CRUD operations

## Troubleshooting
- If CORS errors occur, check `ALLOWED_ORIGINS` in Render
- If API calls fail, verify `REACT_APP_API_BASE_URL` in Vercel
- Check Render logs for backend issues
- Check Vercel logs for frontend issues 
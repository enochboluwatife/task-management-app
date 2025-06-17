import sys
import os

# Add the backend directory to the Python path
backend_path = os.path.join(os.path.dirname(__file__), 'backend')
sys.path.insert(0, backend_path)

try:
    from backend.app.main import app
except ImportError as e:
    print(f"Error importing app: {e}")
    print(f"Current working directory: {os.getcwd()}")
    print(f"Python path: {sys.path}")
    print(f"Backend path: {backend_path}")
    print(f"Backend exists: {os.path.exists(backend_path)}")
    raise

# Create the application instance
application = app

if __name__ == "__main__":
    app.run() 
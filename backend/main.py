from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for local testing from React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://cicd-test-wheat.vercel.app"
    ],  # Allow specific origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Backend is healthy"}

@app.get("/")
def read_root():
    return {"message": "Welcome to the API! Visit /docs for the API documentation or /health for health check."}

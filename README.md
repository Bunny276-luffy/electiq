# ElectIQ

A full-stack web application that helps users understand the election process, timelines, and steps in an interactive and easy-to-follow way.

## Features
- **Interactive Election Timeline**
- **AI Chatbot** powered by Gemini 2.0 Flash
- **Step-by-step Voting Guide**
- **FAQ Section**
- **Knowledge Quiz**

## Setup Instructions

### Backend (FastAPI)
1. Navigate to the `backend` folder: `cd electiq/backend`
2. Install dependencies: `pip install -r requirements.txt`
3. Copy `.env.example` to `.env` and fill in your variables.
4. Run the server: `uvicorn main:app --port 8080 --reload`
5. Run tests: `pytest`

### Frontend (React + Vite)
1. Navigate to the `frontend` folder: `cd electiq/frontend`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

## Deployment
The backend includes a Dockerfile and a `cloudbuild.yaml` file for deployment to Google Cloud Run.

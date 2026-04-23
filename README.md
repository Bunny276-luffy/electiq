# ElectIQ Full-Stack Application

ElectIQ is a responsive, interactive web application that demystifies the election process. Utilizing a premium Indian Flag color aesthetic (Deep Navy, Saffron, Election Green), the platform guides users through timelines, FAQs, quizzes, and provides an intelligent ChatBot capable of real-time insights into voting procedures.

## Features List

- **Interactive Election Timeline:** Horizontal scrollable stages of the election process, from Registration to Oath Taking.
- **"How Voting Works" Visualizer:** Step-by-step glassmorphism cards triggering detailed informational modals.
- **Election Quiz:** A dynamic 5-question test with immediate visual feedback and scoring.
- **Smart AI ChatBot:** Built-in intelligent assistant with simulated "Thinking..." states, hardcoded expert logic, and suggested questions.
- **Dynamic FAQ Accordion:** Beautiful expanding components to answer common voting inquiries.
- **Google Analytics Integration:** Live traffic tracking.
- **Full Accessibility:** Semantic HTML with `aria-labels` attached to all interactive elements.

## Tech Stack

### Frontend
- React 18
- Vite
- Lucide React (Icons)
- Vanilla CSS with Glassmorphism
- Google Analytics

### Backend
- Python 3.11
- FastAPI
- Pytest (for API validation)
- Google Generative AI / Gemini SDK
- Uvicorn
- Docker

## Local Setup Instructions

1. **Clone the repository and access the folders:**
   ```bash
   cd electiq
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
   Run the tests to ensure stability:
   ```bash
   pytest
   ```
   Start the FastAPI backend:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8080 --reload
   ```

3. **Frontend Setup:**
   In a new terminal window:
   ```bash
   cd ../frontend
   ```
   Create a `.env` file referencing your backend and Gemini API keys (if using the proxy):
   ```
   VITE_API_URL=http://localhost:8080
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   Install dependencies and start:
   ```bash
   npm install
   npm run dev
   ```

## API Documentation

- `GET /api/timeline`
  - **Returns:** `List[dict]` of election stages including duration and rules.
- `GET /api/faq`
  - **Returns:** `List[dict]` containing question `q` and answer `a` pairs.
- `GET /api/quiz`
  - **Returns:** `List[dict]` of questions, multiple-choice options, and answers.
- `POST /api/chat`
  - **Body:** `{ "message": "string" }`
  - **Returns:** `{ "reply": "string" }` (Proxies request securely to Gemini API with sanitization).

## Deployment Guide

The platform is designed to be easily deployed to **Google Cloud Run**. 
A `Dockerfile` is provided in the `backend/` directory, along with a `cloudbuild.yaml` file in the root.

1. **Build and Submit via Google Cloud Build:**
   ```bash
   gcloud builds submit --config cloudbuild.yaml .
   ```
2. For Frontend hosting, deploy the compiled `/dist` directory via **Firebase Hosting** or **Vercel** pointing to the newly generated Cloud Run backend URL.

## Google Services Integration
- **Gemini API** - Powers the AI election assistant chatbot
- **Google Fonts** - Inter font family for typography  
- **Google Analytics** - Usage tracking and analytics
- **Google Cloud Run** - Referenced in cloudbuild.yaml for deployment

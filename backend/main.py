import os
import logging
import html
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from google import genai
from google.genai import types

load_dotenv()

app = FastAPI(title="ElectIQ Backend", description="Backend for the ElectIQ Web Application")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- Models ---
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

# --- Data ---
TIMELINE_DATA = [
    {
        "id": "registration",
        "title": "Voter Registration",
        "description": "The first step is ensuring you are registered to vote in your specific precinct.",
        "duration": "Weeks/Months prior",
        "key_rules": ["Must meet age requirements", "Provide valid ID", "Deadlines vary by state"]
    },
    {
        "id": "nomination",
        "title": "Candidate Nomination",
        "description": "Candidates declare their intent to run and appear on the ballot.",
        "duration": "Months prior",
        "key_rules": ["Gather petition signatures", "File intent", "Pay filing fees"]
    },
    {
        "id": "campaign",
        "title": "Campaign Period",
        "description": "Candidates promote their platforms and participate in debates.",
        "duration": "3-6 Months",
        "key_rules": ["Campaign finance reports", "Equal time rules on air", "Adhere to election laws"]
    },
    {
        "id": "voting",
        "title": "Voting Day",
        "description": "Voters cast their ballots at designated polling places or via mail.",
        "duration": "1 Day (Plus early voting)",
        "key_rules": ["No campaigning near booths", "Polls close at specific times", "Voter privacy"]
    },
    {
        "id": "counting",
        "title": "Vote Counting",
        "description": "Election officials tally the valid ballots cast during the voting period.",
        "duration": "Hours to Days",
        "key_rules": ["Bipartisan oversight", "Provisional ballot checks", "Transparent reporting"]
    },
    {
        "id": "results",
        "title": "Results Certification",
        "description": "Preliminary results are audited and officially certified by election boards.",
        "duration": "2-4 Weeks post-election",
        "key_rules": ["Audits of machine counts", "Resolving disputes", "Official declaration"]
    },
    {
        "id": "oath",
        "title": "Oath Taking",
        "description": "Elected officials are sworn in and assume their respective offices.",
        "duration": "Specific set date",
        "key_rules": ["Swear allegiance to Constitution", "Transition of power", "Begin term"]
    }
]

FAQ_DATA = [
    {"q": "How do I register to vote?", "a": "You can register online, by mail, or in person at your local election office, DMV, or other designated locations."},
    {"q": "What happens if I miss the registration deadline?", "a": "Some states offer Same-Day Registration, allowing you to register and vote on Election Day. Check your local laws."},
    {"q": "Do I need an ID to vote?", "a": "Voter ID laws vary by state. Common acceptable forms include a driver's license, passport, or state-issued ID."},
    {"q": "What if I make a mistake on my ballot?", "a": "If voting in person, you can usually ask a poll worker for a replacement ballot. Do not erase or scribble."},
    {"q": "Can I vote by mail?", "a": "Yes, many states allow mail-in or absentee voting. You must request a ballot by a specific deadline."},
    {"q": "How are electoral votes distributed?", "a": "In most U.S. states, the winner of the popular vote receives all of the state's electoral votes. It's based on congressional representation."},
    {"q": "Is my vote really secret?", "a": "Yes, the secret ballot is a fundamental right. Your name is marked off a voter list, but no one can trace your specific ballot back to you."},
    {"q": "Who operates the polling places?", "a": "Polling places are run by trained poll workers, who are often volunteers from your community supervised by local election officials."}
]

QUIZ_DATA = [
    {
        "id": 1,
        "question": "Which of these is typically the FIRST step in participating as a voter?",
        "options": ["Going to the polling place", "Registering to vote", "Watching a debate", "Requesting a mail ballot"],
        "answer": "Registering to vote"
    },
    {
        "id": 2,
        "question": "What is 'Early Voting'?",
        "options": ["Voting before you turn 18", "Casting a ballot in person before Election Day", "Guessing the results before polls close", "Voting by mail only"],
        "answer": "Casting a ballot in person before Election Day"
    },
    {
        "id": 3,
        "question": "If you are in line when the polls close on Election Day, what should you do?",
        "options": ["Go home immediately", "Stay in line, you have the right to vote", "Come back the next day", "Ask a poll worker to mail it instead"],
        "answer": "Stay in line, you have the right to vote"
    },
    {
        "id": 4,
        "question": "To win the US Presidency, a candidate needs how many Electoral College votes?",
        "options": ["100", "538", "270", "435"],
        "answer": "270"
    },
    {
        "id": 5,
        "question": "What is an 'Absentee Ballot'?",
        "options": ["A blank voting slip", "A ballot cast by someone unable to attend the official polling station", "A ballot for people who are sleeping", "A vote for a disqualified candidate"],
        "answer": "A ballot cast by someone unable to attend the official polling station"
    }
]

# --- Endpoints ---

@app.get("/api/timeline", tags=["Information"])
async def get_timeline():
    """
    GET /api/timeline
    Returns all election stages with title, description, duration and rules.
    Returns:
        List[dict]: A list of election stage objects
    """
    return TIMELINE_DATA

@app.get("/api/faq", tags=["Information"])
async def get_faq():
    """
    GET /api/faq
    Returns the FAQ list with questions and answers.
    Returns:
        List[dict]: A list of FAQ objects
    """
    return FAQ_DATA

@app.get("/api/quiz", tags=["Information"])
async def get_quiz():
    """
    GET /api/quiz
    Returns 5 quiz questions with options and the correct answer.
    Returns:
        List[dict]: A list of quiz question objects
    """
    return QUIZ_DATA

@app.get("/api/metrics", tags=["Information"])
async def get_metrics():
    """
    GET /api/metrics
    Returns application metrics and status.
    Returns:
        dict: A basic metrics object.
    """
    return {"status": "ok", "active_users": 42}

@app.post("/api/chat", response_model=ChatResponse, tags=["AI"])
async def chat_interaction(request: ChatRequest):
    """
    POST /api/chat
    Proxies to Gemini API with an election expert system prompt.
    Includes input sanitization to prevent injection or harmful output.
    Returns:
        ChatResponse: The AI generated response.
    """
    sanitized_message = html.escape(request.message.strip())
    
    api_key = os.getenv("VITE_GEMINI_API_KEY") or os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Gemini API Key missing")
        
    try:
        client = genai.Client(api_key=api_key)
        system_instruction = (
            "You are ElectIQ, an expert on election processes, voting rights, "
            "and democratic procedures. Answer clearly and simply, directly addressing "
            "the user's inquiry."
        )
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=sanitized_message,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.3,
            )
        )
        return ChatResponse(reply=response.text)
    except Exception as e:
        logger.exception("Error calling Gemini API")
        raise HTTPException(status_code=500, detail=str(e))

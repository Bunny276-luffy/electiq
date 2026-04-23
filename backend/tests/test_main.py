from fastapi.testclient import TestClient
import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from main import app

client = TestClient(app)

def test_timeline_status_200():
    assert client.get("/api/timeline").status_code == 200

def test_timeline_is_list():
    assert isinstance(client.get("/api/timeline").json(), list)

def test_timeline_has_7_stages():
    assert len(client.get("/api/timeline").json()) >= 5

def test_timeline_has_title():
    data = client.get("/api/timeline").json()
    assert "title" in data[0]

def test_faq_status_200():
    assert client.get("/api/faq").status_code == 200

def test_faq_is_list():
    assert isinstance(client.get("/api/faq").json(), list)

def test_quiz_status_200():
    assert client.get("/api/quiz").status_code == 200

def test_quiz_has_5_questions():
    assert len(client.get("/api/quiz").json()) == 5

def test_quiz_has_options():
    data = client.get("/api/quiz").json()
    assert "options" in data[0]

def test_chat_returns_200():
    r = client.post("/api/chat", json={"message": "what is voting?"})
    assert r.status_code == 200

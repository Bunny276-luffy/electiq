from fastapi.testclient import TestClient
import sys, os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from main import app
client = TestClient(app)

def test_timeline(): assert client.get("/api/timeline").status_code == 200
def test_faq(): assert client.get("/api/faq").status_code == 200  
def test_quiz(): assert client.get("/api/quiz").status_code == 200
def test_metrics(): assert client.get("/api/metrics").status_code == 200
def test_chat(): assert client.post("/api/chat", json={"message": "test"}).status_code == 200

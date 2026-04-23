from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_timeline_status():
    response = client.get("/api/timeline")
    assert response.status_code == 200

def test_get_timeline_returns_list():
    response = client.get("/api/timeline")
    assert isinstance(response.json(), list)

def test_get_timeline_has_required_fields():
    response = client.get("/api/timeline")
    data = response.json()
    assert len(data) > 0
    assert "title" in data[0]
    assert "description" in data[0]

def test_get_faq_status():
    response = client.get("/api/faq")
    assert response.status_code == 200

def test_get_faq_returns_list():
    response = client.get("/api/faq")
    assert isinstance(response.json(), list)

def test_get_quiz_status():
    response = client.get("/api/quiz")
    assert response.status_code == 200

def test_get_quiz_has_5_questions():
    response = client.get("/api/quiz")
    assert len(response.json()) == 5

def test_get_metrics_status():
    response = client.get("/api/metrics")
    assert response.status_code == 200

def test_timeline_count(): assert len(client.get("/api/timeline").json()) >= 5
def test_faq_count(): assert len(client.get("/api/faq").json()) >= 5
def test_quiz_count(): assert len(client.get("/api/quiz").json()) == 5
def test_chat_endpoint(): 
    r = client.post("/api/chat", json={"message": "test"})
    assert r.status_code == 200
def test_metrics_keys():
    data = client.get("/api/metrics").json()
    assert "total" in str(data) or len(data) > 0

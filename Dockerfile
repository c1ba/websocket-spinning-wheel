FROM python:3.13-slim
WORKDIR /app
COPY python-websocket/ ./

RUN pip install --no-cache-dir -r requirements.txt
CMD ["python", "main.py"]
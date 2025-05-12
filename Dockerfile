FROM python:3.13-slim
WORKDIR /app/myapp
COPY . .
RUN pip install -r requirements.txt
CMD ["python", "main.py"]
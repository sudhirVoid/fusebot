FROM python:3.10-slim
WORKDIR /pkl_generating_service
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
#prevent Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1
# defining entry point
ENV FLASK_APP=app.py
# Run the application
CMD ["flask", "run", "--host=0.0.0.0"]

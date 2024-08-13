FROM python:3.10-slim

WORKDIR /pkl_generating_service

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Install Gunicorn server
RUN pip install --no-cache-dir gunicorn

# copy all other contents 
COPY . .

#door for outer world
EXPOSE 5000

# Prevent Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1

# Flask app entry point
ENV FLASK_APP=app.py

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]

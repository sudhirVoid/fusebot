# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /pkl_generating_service

# Install system dependencies
# RUN apt-get update && apt-get install -y \
#     build-essential \
#     libpq-dev \
#     gcc \
#     && rm -rf /var/lib/apt/lists/*

# Copy the requirements.txt file to the container
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container
COPY . .

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Set environment variables to prevent Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1

# Define environment variable for Flask app entry point
ENV FLASK_APP=app.py

# Run the application
CMD ["flask", "run", "--host=0.0.0.0"]

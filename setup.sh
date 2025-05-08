#!/bin/bash

echo "🚀 Starting environment setup..."

# Update & install dependencies
sudo apt update
sudo apt install -y python3 python3-pip python3-venv redis-server

# Start Redis
sudo systemctl enable redis
sudo systemctl start redis

# Setup Python virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Python packages
pip install flask python-docx redis

echo "✅ Setup complete. To run the app:"
echo "1. source venv/bin/activate"
echo "2. python app.py"

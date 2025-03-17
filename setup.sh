#!/bin/bash

cd backend || (echo "Backend directory not found!"; exit 1;)

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

echo "Backend setup complete"

cd ../frontend

npm install

echo "Frontend setup complete"
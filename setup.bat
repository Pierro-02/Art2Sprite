@echo off

cd backend

python -m venv venv

call venv\Scripts\activate

pip install -r requirements.txt
echo Backend setup complete

cd ..\frontend

npm install
echo Frontend setup complete

### Model PTH Files link
https://drive.google.com/drive/folders/1gBJrt-3jb27BXpC1uSSkCcW85vh5BaLT


### Getting Started

There are 2 setup files in the root directory:

* setup.sh -> For Linux
* setup.bat -> For Windows

------------------------------------------------------------

Run the following command in the root directory to set up the front end and the backend:

### For Linux

```
./setup.sh
```

### For Windows

Any **ONE** of the following will work:

1. Simply double click the setup.bat
2. Open cmd and run

   ```
   script.bat
   ```
3. Open powershell and run

   ```
   .\script.bat
   ```

**Note:** Run the following commands in the root directory

------------------------------------------------------------------

Now that your Frontend and Backend setup is ready, go into your backend directory and run:

```
uvicorn main:app --reload
```

This will start the FastAPI backend on localhost:8000. You can go to localhost:8000/docs to check the apis

-------------------------------------------------------------------

Now go into the frontend directory and run:

```
npm run dev
```

This will start the Nextjs frontend on localhost:3000

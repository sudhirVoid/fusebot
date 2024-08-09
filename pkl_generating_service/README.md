# OPENAI_SHELL_BOT

# shell_bot

## 1. Copy the github repo url and run the following command:
      git clone https://github.com/roy-shivam164/OPENAI_SHELL_BOT.git
## 2. Open Terminal and change the directory to shell_bot like as  below:
      cd OPENAI_SHELL_BOT 
## 3. create virtual environment using following command:
  (If you have multiple python version on your computer, then use below command)
  ```python
   virtualenv --python=python3.10 myenv
  ```
  (If you have a single python version on your computer, then use below command)
  ```python
   python -m venv myenv
  ```

## 4. then activate the virtual environment using following command:
  ```python
   .\myenv\scripts\activate
  ```
## 5. then run the below command one by one:
```python
 pip install langchain langchain_community langchain_openai pypdf pandas matplotlib tiktoken textract transformers openai faiss-cpu flask python-dotenv
```

## 6. after installation of above packages, run below command:
```python
 flask run
```

# Now, Set up a NGROK Server.Follow below instructions:
## 1. Goto below url and download ngrok
  ```
https://ngrok.com/download
  ```
## 2. Extract the file and open the  ngrok.exe
## 3. run the following command:
 ```
 ngrok http 5000
 ```
## 4. open the generated url or copy it and use it as an endpoint on ignite in flow 4 under subflow named /chatApp, in http request section. Paste the url there
## 5. done


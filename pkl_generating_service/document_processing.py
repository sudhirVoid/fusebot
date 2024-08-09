from bs4 import BeautifulSoup
from langchain_text_splitters import TokenTextSplitter
import openai
import re
import requests
import time
import csv
import json

from langchain.schema.document import Document
from langchain_community.document_loaders import AsyncHtmlLoader
from langchain_community.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA, ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory, ConversationBufferWindowMemory
from langchain_core.prompts import PromptTemplate
from langchain_community.retrievers import TFIDFRetriever
import os
import pickle
from flask import Flask, render_template, request
from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter, CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain_community.llms import OpenAI
from langchain.chains import ConversationalRetrievalChain, ConversationChain
from langchain_community.document_loaders import UnstructuredHTMLLoader
import urllib3
from dotenv import load_dotenv


# Load environment variables from .env file
load_dotenv()
def generatePkl(botName, urls):
    text_splitter = CharacterTextSplitter(
        chunk_size=1000, chunk_overlap=30, separator="\n"
    )

    Ttext_splitter = TokenTextSplitter(chunk_size=10, chunk_overlap=0)
    
    documentsList = []
    for item in urls:
        url = item["url"]
        file_type = item["file_type"]
        
        if file_type == "pdf":
            loader = PyPDFLoader(url)
            documentsList.extend(loader.load())
        # elif file_type == "html":
        #     http = urllib3.PoolManager()
        #     response = http.request('GET', url)
        #     soup = BeautifulSoup(response.data, 'html.parser')

        #     for tag in soup.find_all(['p', 'span']):
        #         text = tag.get_text().strip()  # Strip leading and trailing whitespace
        #         docs = [Document(page_content=x) for x in text_splitter.split_text(text)]
        #         documentsList.extend(docs)
        else:
            continue  # Skip if the file type is not recognized

    # Flatten documentsList correctly
    documents = [doc for doc in documentsList]

    docs = text_splitter.split_documents(documents=documents)

    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_documents(docs, embeddings)
    vectorstore.save_local(os.path.join("pkl", botName))

    db1 = FAISS.load_local(os.path.join("pkl", botName), embeddings, allow_dangerous_deserialization=True)

# Example usage
# os.environ["OPENAI_API_KEY"] = ""
openai.api_key = os.getenv("OPENAI_API_KEY")


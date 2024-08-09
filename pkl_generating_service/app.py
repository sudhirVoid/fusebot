from flask import Flask, render_template, request
import json
from document_processing import generatePkl
app = Flask(__name__)
# setup_environment()
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    params = json.loads(request.get_data().decode('utf-8'))
    generatePkl(params.get("botName"),params.get("urls"))
    return "hello"

if __name__ == '__main__':
    app.run()

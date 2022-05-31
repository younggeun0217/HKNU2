#flask,flask_cors, flask-restx,sentence_transformers 설치(오류시 관리자 권한 또는 --user)
import json
from sentence_transformers import SentenceTransformer, util
import numpy as np
from flask import Flask,request
from flask_restx import Api,Resource
embedder = SentenceTransformer("jhgan/ko-sroberta-multitask")

app=Flask(__name__)
api=Api(app)
@api.route('/') 
class wordPost(Resource):
    def post(self):
      print(request.json.get('title'))
      return
# Corpus with example sentences
if __name__ == "__main__":
    app.run(debug=True)
def sentenceToScore(corpus):
  print(corpus)
  return
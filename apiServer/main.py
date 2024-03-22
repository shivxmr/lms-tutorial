from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()

vectorizer = TfidfVectorizer()

dimension = 300  # Dimension of the vectors

@app.get("/")
async def my_first_get_api():
    return {"message":"First FastAPI example"}


class TextPair(BaseModel):
    text1: str
    text2: str

@app.post("/calculate_similarity")
def calculate_similarity(text_pair: TextPair):
    text1 = text_pair.text1
    text2 = text_pair.text2

    # Convert text to numerical vectors
    vectors = vectorizer.fit_transform([text1, text2]).toarray().astype(np.float16)
    print(vectors[0].reshape(1, -1), vectors[1].reshape(1, -1))

    # Calculate similarity index
    similarity = cosine_similarity(vectors[0].reshape(1, -1), vectors[1].reshape(1, -1))
    print(similarity)

    return {"similarity_index": similarity[0][0]}
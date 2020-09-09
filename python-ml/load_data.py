import nltk

nltk.download()
from nltk.corpus import movie_reviews




# movie_reviews.categories()


# docs = [movie_reviews.raw(file_id) for file_id in movie_reviews.fileids()]


labels = [movie_reviews.categories(file_id) for file_id in movie_reviews.fileids()]
print((labels[995:1005]))
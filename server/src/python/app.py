from flask import Flask, request, jsonify
from flask_cors import CORS
from recommender import MovieRecommender

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

recommender = MovieRecommender(movie_data_path='movies.csv',top_rated_path='Top_rated.csv')

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        # Get the input data from the request body
        data = request.json
        
        # Extract data from form (ensure these keys are correct and present)
        mood = data.get('mood')
        genre = data.get('genre')
        occasion = data.get('occasion')
        age = data.get('age')
        category = data.get('category')
        
        # Call the filter_movies method to get recommendations as a DataFrame
        recommended_movies_df = recommender.recommend(mood=mood, genre=genre, occasion=occasion, age=age, category=category)
        
        # Convert the DataFrame to a list of dictionaries (JSON serializable format)
        recommended_movies_list = recommended_movies_df
        
        # Return the recommendations as JSON response
        return jsonify(recommended_movies_list), 200
    except Exception as e:
        # In case of an error, return an error message with status code 500
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True, port=5001)

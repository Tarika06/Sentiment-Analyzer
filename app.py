from flask import Flask, render_template,request,jsonify
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk

nltk.download('vader_lexicon')

app = Flask(__name__)
analyzer = SentimentIntensityAnalyzer()


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/analyse' , methods = ['POST'])
def analyse():
    data = request.get_json()
    text = data.get('text' , '')
    
    if not text.strip():
        return jsonify({'error': 'Empty text received'}),400
    
    scores = analyzer.polarity_scores(text)

    sentiment = 'Neutral'
    if scores['compound'] >= 0.05:
        sentiment = 'Positive'
    elif scores['compound'] <=-0.05: 
        sentiment = 'Negative'

    return jsonify({
        'text' : text,
        'sentiment' :sentiment,
        'scores':scores
    })

if __name__ == '__main__':
    app.run(debug=True)
    
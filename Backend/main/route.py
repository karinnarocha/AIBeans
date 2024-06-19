from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
import openai

main = Blueprint('main', __name__)

@main.route('/generaterecipe', methods=['POST'])
@cross_origin(origin='*', supports_credentials=True)
def gpt3():
    data = request.get_json()
    input_text = data['input_text']

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a recipe assistant. Provide me with an ingredient, and I will give you a recipe."},
            {"role": "user", "content": input_text},
        ]
    )

    output_text = response['choices'][0]['message']['content']
    return jsonify({"output_text": output_text})

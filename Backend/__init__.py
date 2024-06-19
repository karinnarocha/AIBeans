from flask import Flask
from flask_cors import CORS
import openai
from Backend.config import Config



def create_app():
    app =  Flask(__name__)
    app.config.from_object(Config) 
    
    
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    openai.api_key = Config.OPENAI_API_KEY
    app.secret_key = Config.SECRET_KEY 
    
    
    from .main.route import main

    app.register_blueprint(main)

    return app
 
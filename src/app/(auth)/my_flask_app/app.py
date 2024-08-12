from flask import Flask, render_template, request
import nltk
from nltk.chat.util import Chat, reflections

app = Flask(__name__)

pairs = [
        r"hi|hello|hey",
        ["Hello! How can I assist you today?", "Hi there! How can I help?"]
    ], [
        r"what is your name?",
        ["I am the hotel customer service chatbot.", "You can call me your virtual assistant!"]
    ],[
        r"do you have any rooms available?",
        ["Yes, we have several rooms available. What type of room are you looking for?", 
         "We have various rooms available. Please specify your preference."]
    ],[
        r"can you help me with a booking?",
        ["Sure! Please provide your preferred dates and room type.", 
         "I'd be happy to assist. When would you like to book your stay?"]
    ],[
        r"thank you|thanks",
        ["You're welcome! Is there anything else I can help with?", "Happy to help! Anything else?"]
    ],[
        r"bye|goodbye",
        ["Goodbye! Have a great day!", "See you later!"]
    ],[
        r"(.*)",
        ["I'm sorry, I didn't understand that. Could you please rephrase?", 
         "Can you provide more details so I can assist you better?"]
    ]

chatbot = Chat(pairs, reflections)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get")
def get_bot_response():
    userText = request.args.get('msg')
    return str(chatbot.respond(userText))

if __name__ == "__main__":
    app.run(debug=True)

def hotel_chatbot():
    print("Hi! I am the hotel customer service chatbot. How can I help you?")
    chatbot = Chat(pairs, reflections)
    chatbot.converse()

if __name__ == "__main__":
    hotel_chatbot()

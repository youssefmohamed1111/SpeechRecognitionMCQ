# Speech Recognition MCQ Test
## Description
This project implements a Multiple Choice Questions (MCQ) test with speech recognition capabilities. Users can answer questions using their voice, and the system will validate their answers. The project is built using Django for the backend and React for the frontend.

## How to Use
### Setup Backend:

- Ensure you have Python and Django installed.
- Clone the repository.
- Install Django Rest Framework:```pip install djangorestframework```
- Enable CORS by installing CORS Header: ```pip install django-cors-headers ```
- Run the Django server: python manage.py runserver.
### Setup Frontend:

- Ensure you have Node.js and npm installed.
- Navigate to the frontend directory.
- Install the required packages ``` npm install```.
- Start the React development server: npm start.
```
## Using the Application:
1) Open your browser and navigate to http://localhost:3000.
2) The application will display a question with multiple choices.
3) Click on the "Answer with Speech" button to start the speech recognition.
4) Speak your answer clearly into the microphone.
5) The system will display your spoken answer and whether it is correct or incorrect.
6) Click the "Next" button to proceed to the next question.
```
*Note*: There is an admin panel to add/delete/update questions and choices.
## Logic Explanation
### Backend Logic:

- The backend is built using Django. It serves the questions and validates the answers.
- The Question model stores the questions and the correct answers.
- The Choice model stores the choices for each question.
- The /quiz/question/ endpoint retrieves all questions.
- The /quiz/validate/<question_id>/ endpoint validates the answer provided by the user.
### Frontend Logic:

- The frontend is built using React.
- The questions are fetched from the backend when the component mounts.
- The Web Speech API's SpeechRecognition interface is used to capture the user's voice input.
- The captured voice input is sanitized and compared with the choices.
- The result is displayed to the user, indicating whether their answer is correct or incorrect.
## Tools Used
- Django: A high-level Python web framework that encourages rapid development and clean, pragmatic design. Used for the backend.
- React: A JavaScript library for building user interfaces. Used for the frontend.
- Web Speech API: An API provided by modern browsers for speech recognition.
- Axios: A promise-based HTTP client for the browser and Node.js, used to make HTTP requests from the frontend to the backend.
## Limitations
- Speech Recognition Accuracy: The accuracy of speech recognition may vary based on the user's pronunciation and background noise.
- Limited to Arabic Language: The speech recognition is set to Arabic (ar-SA). It might need modifications for other languages.
- Simple Validation Logic: The validation logic is straightforward and might not handle edge cases like similar-sounding words.
## Areas of Improvement
- Enhanced Speech Recognition: Improve speech recognition accuracy by integrating third-party APIs like Google Speech-to-Text.
- Multi-language Support: Extend the application to support multiple languages.
- Better Error Handling: Implement more robust error handling on both the frontend and backend.
- User Interface: Improve the user interface for a better user experience.
- Security: Enhance security measures such as input validation, authentication, and authorization to protect against potential vulnerabilities.

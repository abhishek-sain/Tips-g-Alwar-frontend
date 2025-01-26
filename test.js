document.addEventListener('DOMContentLoaded', function () {
    const quizForm = document.getElementById("quiz-form");
    const submitButton = document.getElementById("submit-button");
    const resultContainer = document.getElementById("result-container");
    const resultMessage = document.getElementById("result-message");

    let questionsData = null; // Define globally accessible variable

    // Fetch questions from the backend
    fetch('http://localhost:8080/api/questions')
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                console.error("No questions found.");
                return;
            }
            questionsData = data[0]; // Store the fetched questions data globally
            renderQuestions(questionsData.questions, questionsData.answers);
        })
        .catch(error => {
            console.error("Error fetching questions:", error);
        });

    // Render the quiz questions dynamically
    function renderQuestions(questions, answers) {
        questions.forEach((questionText, index) => {
            const questionElement = document.createElement("div");
            questionElement.classList.add("question");

            const questionTextElement = document.createElement("p");
            questionTextElement.textContent = `${index + 1}. ${questionText}`;
            questionElement.appendChild(questionTextElement);

            const options = ["Option A", "Option B", "Option C", "Option D"]; // Example options
            options.forEach((option, i) => {
                const optionLabel = document.createElement("label");
                const optionInput = document.createElement("input");
                optionInput.type = "radio";
                optionInput.name = `question-${index}`;
                optionInput.value = i; // Answer index
                optionLabel.appendChild(optionInput);
                optionLabel.appendChild(document.createTextNode(option));
                questionElement.appendChild(optionLabel);
            });

            quizForm.appendChild(questionElement);
        });
    }

    // Handle quiz submission
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();

        if (!questionsData) {
            console.error("Questions data is not loaded yet.");
            return;
        }

        const userAnswers = [];
        const formData = new FormData(quizForm);

        // Collect user answers
        for (let [name, value] of formData.entries()) {
            const questionIndex = parseInt(name.split("-")[1]);
            userAnswers.push({
                questionId: questionIndex,
                answerIndex: parseInt(value)
            });
        }

        // Submit the results to the backend
        fetch('http://localhost:8080/api/result', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: "User1", // Replace with dynamic user data if needed
                result: userAnswers,
                attempts: userAnswers.length,
                points: calculatePoints(userAnswers, questionsData.answers),
                achieved: "Passed" // Replace with scoring logic
            })
        })
            .then(response => response.json())
            .then(data => {
                // Show the result
                resultMessage.textContent = `You scored ${data.points} out of ${data.attempts}.`;
                resultContainer.classList.remove("hidden");
            })
            .catch(error => {
                console.error("Error submitting result:", error);
            });
    });

    // Calculate points based on correct answers
    function calculatePoints(userAnswers, correctAnswers) {
        let points = 0;
        userAnswers.forEach(answer => {
            if (answer.answerIndex === correctAnswers[answer.questionId]) {
                points++;
            }
        });
        return points;
    }
});

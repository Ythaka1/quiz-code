document.addEventListener('DOMContentLoaded', () => {
    const BASE_URL = 'http://localhost:3000/questions';
    let questions = [];
    let currentQuestionIndex = 0;

    function fetchQuestions() {
        fetch(BASE_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                questions = data; // Assign fetched data to questions
            })
            .catch(error => console.error('Error fetching questions:', error));
    }

    fetchQuestions();

    function displayQuestion() {
        const questionContainer = document.querySelector('.question-container');
        const nextBtn = document.querySelector('.next-btn');
        const explanationDiv = document.createElement('div'); // To display explanations

        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            questionContainer.innerHTML = `
                <h3>${question.question}</h3>
                <ul>
                    ${question.options.map(option => `<li>${option}</li>`).join('')}
                </ul>
            `;
            nextBtn.style.display = 'block'; // Show the Next button
            explanationDiv.innerHTML = ''; // Clear previous explanation

            // Add click event listeners to each option
            const options = questionContainer.querySelectorAll('li');
            options.forEach(option => {
                option.addEventListener('click', function () {
                    if (this.innerText === question.answer) {
                        this.style.backgroundColor = 'green'; // Correct answer
                    } else {
                        this.style.backgroundColor = 'red'; // Wrong answer
                        explanationDiv.innerHTML = `<p style="color: white;">Explanation: ${question.explanation}</p>`;
                        questionContainer.appendChild(explanationDiv); // Show explanation
                    }

                    // Disable other options after one is selected
                    options.forEach(opt => opt.style.pointerEvents = 'none');
                });
            });
        } else {
            questionContainer.innerHTML = '<h3>Congratulations! You have completed the questions. If you want more, contact me and please support me.</h3>'; // End message
            nextBtn.style.display = 'none'; // Hide the Next button
        }
    }

    const nextBtn = document.querySelector('.next-btn');
    nextBtn.onclick = () => {
        currentQuestionIndex++; // Move to the next question
        displayQuestion(); // Display the next question
    };

    const startBtn = document.querySelector('.start-btn');
    const popupInfo = document.querySelector('.popup-info');
    const exitBtn = document.querySelector('.exit-btn');
    const continueBtn = document.querySelector('.Continue-btn');
    const quizSection = document.querySelector('.quiz-section');
    const backBtn = document.querySelector('.back-btn');

    startBtn.onclick = () => {
        popupInfo.classList.add('active');
    };

    exitBtn.onclick = () => {
        popupInfo.classList.remove('active');
    };

    continueBtn.onclick = () => {
        quizSection.style.display = 'block'; // Show quiz section
        popupInfo.classList.remove('active'); // Hide popup
        displayQuestion(); // Display the first question
    };

    backBtn.onclick = () => {
        quizSection.style.display = 'none'; // Hide quiz section
        const homeSection = document.querySelector('.home');
        homeSection.style.display = 'block'; // Show home section
    };
});

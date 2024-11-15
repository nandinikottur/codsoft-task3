const questions = [
{
    question: "Which is the largest animal in the world?",
    answer:[
        {Text:"Shark", correct:false},
        {Text:"BlueWhale", correct:true},
        {Text:"Elephant", correct:false},
        {Text:"Giraffe", correct:false},
    ]
},

{
    question: "Which is the smallest continent in the world?",
    answer:[
        {Text:"Asia", correct:false},
        {Text:"Artica", correct:false},
        {Text:"Africa", correct:false},
        {Text:"Australia", correct:true},
    ]  
},

{
    question: "Which is the smallest country in the world?",
    answer:[
        {Text:"Vatican city", correct:true},
        {Text:"Artica", correct:false},
        {Text:"Africa", correct:false},
        {Text:"Australia", correct:false},
    ]  
},

{
    question: "Which is the smallest desert in the world?",
    answer:[
        {Text:"Saha", correct:false},
        {Text:"Kalahari", correct:false},
        {Text:"Sahara", correct:true},
        {Text:"Gobi", correct:false},
    ]  
}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score=0;

function startQuiz(){
    currentQuestionIndex =0;
    score=0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
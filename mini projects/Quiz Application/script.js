let questions;
getData()
function getData() {
    fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
        .then(value => value.json())
        .then(value => { questions = value.results, console.log(questions) })
}

let starts = document.getElementById("starts")
let quesContainer = document.getElementById("quesContainer")
let nexts = document.getElementById("nexts")
let contOptions = document.getElementById("contOptions")
let results = document.getElementById("results")
let restarts = document.getElementById("restarts")
let title = document.getElementById("title")
let timer = document.getElementById("timer")
let marks = document.getElementById('marks')
let ques = document.getElementById("ques")
let currentQues = 0
let seconds = 120
let num = 0
let timeInterval;
let Question_num = 1

function updateTime() {
    if (seconds > 0) {
        timer.innerHTML = `Time left : ${seconds} sec`
        seconds--
    }
    else {
        timer.innerHTML = "time's Up"
        clearInterval(timeInterval)
        quesContainer.className = "hide"
        results.className = 'hide'
        result()
    }
}

function start() {
    timer.className = 'time'
    starts.className = 'hide'
    timeInterval = setInterval(updateTime, 1000)
    
   
    title.innerHTML = questions[currentQues].question
    render()
}
function render() {
     ques.innerHTML = `Question ${Question_num}`
    contOptions.innerHTML = ''
    quesContainer.className = 'question_Container';
    let correct = questions[currentQues].correct_answer
    let option = questions[currentQues].incorrect_answers;
    option.forEach(element => {
        var index = option.indexOf(correct)
        if(index != -1){
            option.splice(index , 1)
        }
    });
    option.push(correct);
     // Clear existing options
    for (let i = 0; i < option.length; i++) {
        let input = document.createElement('input');
        input.type = 'radio';
        input.value = option[i];
        input.name = "qu";
        contOptions.append(input);
        contOptions.append(option[i]);
        input.insertAdjacentHTML('beforebegin', "<br><br>"); // Correct the "<br>" tag
    }
}

function next() {
    Question_num++
    scoring()
    currentQues++
    if (currentQues < questions.length) {
        title.innerHTML = questions[currentQues].question
        render()
    }
    else {
        quesContainer.className = 'hide'
        results.className = 'btn'
        clearInterval(timeInterval)
    }
}

function scoring() {
    let input = document.getElementsByTagName("input")
    for (let i = 0; i < input.length; i++) {
        if (input[i].checked) {
            if (input[i].value === questions[currentQues].correct_answer) {
                num++
            }
        }
    }
}
function result() {
    results.className = 'hide'
    marks.className = 'score'
    let percentage = num / questions.length * 100
    marks.innerHTML = "Score: " + percentage + "%"
    restarts.className = 'btn'
}

function restart() {
    currentQues = 0
    num = 0
    Question_num = 1
    let input = document.getElementsByTagName('input')
    for (let i = 0; i < input.length; i++) {
        input[i].checked = false  
    }
    title.innerHTML = questions[currentQues].question;
    marks.innerHTML = ''
    render()
    results.className = 'hide'
    marks.className = 'hide'
    restarts.className = 'hide'
    clearInterval(timeInterval)
    seconds = 120
    timer.innerHTML = `Time left : ${seconds} sec`
    timeInterval = setInterval(updateTime, 1000)
}
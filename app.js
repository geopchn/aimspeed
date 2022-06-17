const ballElement = document.getElementById('ball');
const gameContainerElement = document.querySelector('main');
const bodyElement = document.body;
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const timeInfoElement = document.querySelector('.time-info');
const displayEndElement = document.getElementById('end');
const displayStartElement = document.getElementById('start');
const startButtonElement = document.querySelector('#start button');
const restartButtonElement = document.querySelector('#end button');
const recordContainerElement = document.getElementById('record-container');
const recordElement = document.getElementById('record');
const titleElement = document.querySelector('h1');

const borderMarge = 200;
let points = 0;
const config = {
    timeGame: 20,
}


const init = () => {
    ballElement.addEventListener('click', () => {
        randomPosition();
        points += 1;
        scoreElement.innerText = points
    });
    startButtonElement.addEventListener('click', () => {
        start();
    })
    restartButtonElement.addEventListener('click', () => {
        start();
    })
    titleElement.addEventListener('click', () => {
        displayMenu();
    })
    checkRecord();
    randomPosition();
}

const start = () => {
    let time = config.timeGame;
    displayStartGame();
    resetPoints();
    const timer = setInterval(() => {
        time -= 1;
        timerElement.innerText = time;
        if (time == 0){
            stopGame(points);
            clearInterval(timer);
        }
    }, 1000);
}

const randomPosition = () => {
    const left = random(gameContainerElement.offsetWidth - ballElement.offsetWidth);
    const top = random(bodyElement.offsetHeight - ballElement.offsetHeight - borderMarge);
    changeBallPosition(left,top);
}

const random = max => Math.floor(Math.random() * max);

const changeBallPosition = (left, top) => {
    ballElement.style.left = left + 'px';
    ballElement.style.top = top + 'px';
};

const resetPoints = () => {
    points = 0;
    scoreElement.innerText = "0";
}

const stopGame = (points) => {
    const record = localStorage.getItem('recordAimspeed');
    if (record === null || points > record){
        localStorage.setItem('recordAimspeed', points);
        localStorage.setItem('recordAimspeedCPS', (points / config.timeGame).toFixed(3));
    }
    checkRecord();
    ballElement.classList.add('hide');
    timeInfoElement.classList.add('hide');
    displayEndElement.classList.remove('hide');
    scoreElement.style.opacity = "1";
}

const displayStartGame = () => {
    timerElement.innerText = config.timeGame;
    scoreElement.classList.remove('hide');
    displayStartElement.classList.add('hide');
    ballElement.classList.remove('hide');
    timeInfoElement.classList.remove('hide');
    displayEndElement.classList.add('hide');
    scoreElement.style.opacity = "0.1";
    recordContainerElement.classList.add('hide');
}

const displayMenu = () => {
    scoreElement.classList.add('hide');
    displayStartElement.classList.remove('hide');
    ballElement.classList.add('hide');
    timeInfoElement.classList.add('hide');
    displayEndElement.classList.add('hide');
    recordContainerElement.classList.remove('hide');
}

const checkRecord = () => {
    const record = localStorage.getItem('recordAimspeed');
    if(record !== null){
        recordElement.innerText = record;
        recordContainerElement.classList.remove('hide');
    };
}

init();

const ballElement = document.getElementById('ball');
const gameContainerElement = document.querySelector('main');
const bodyElement = document.body;
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const timeInfoElement = document.querySelector('.time-info');
const displayEndElement = document.getElementById('end');
const displayStartElement = document.getElementById('start');
const startButtonElement = document.getElementById('button-start-easy');
const restartButtonElement = document.querySelector('#end button');
const recordContainerElement = document.getElementById('record-container');
const recordElement = document.getElementById('record');
const titleElement = document.querySelector('h1');
const startButtonElementHard = document.getElementById('button-start-hard');

const borderMarge = 200;
let points = 0;
let inGame = false;
let config = {
    timeGame: 20,
    difficulty: 'easy',
    velocityHard: 100,
}

const init = () => {
    ballElement.addEventListener('click', () => {
        randomPosition();
        points += 1;
        scoreElement.innerText = points
    });
    startButtonElement.addEventListener('click', () => {
        setupEasy();
        start();
    })
    restartButtonElement.addEventListener('click', () => {
        start();
    })
    titleElement.addEventListener('click', () => {
        inGame = false;
        displayMenu();
    })

    randomPosition();

    startButtonElementHard.addEventListener('click', () => {
        setupHard();
        start();
    })
}

const setupEasy = () => {
    config.difficulty = 'easy';
    ballElement.style.transition = 'top 40ms, left 40ms'
}

const setupHard = () => {
    config.difficulty = 'hard';
    ballElement.style.transition = 'top 10ms, left 10ms'
}

const start = () => {
    let time = config.timeGame;
    inGame = true;
    displayStartGame();
    resetPoints();

    if (config.difficulty == "hard"){
        const move = setInterval(() => {
            moove(ballElement);
            if (time == 0 || !inGame){
                clearInterval(move);
            }
        }, 500);
    }

    const timer = setInterval(() => {
        time -= 1;
        timerElement.innerText = time;
        if (!inGame){
            clearInterval(timer);
        }
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

    inGame = false;

    if (record === null || points > record){
        localStorage.setItem('recordAimspeed', points);
        localStorage.setItem('recordAimspeedCPS', (points / config.timeGame).toFixed(2));
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
    recordContainerElement.classList.add('hide');
}

const checkRecord = () => {
    const record = localStorage.getItem('recordAimspeed');
    const cps = localStorage.getItem('recordAimspeedCPS');

    if(record !== null){
        recordElement.innerText = record+ " ("+cps+ " cliques par seconde)";
        recordContainerElement.classList.remove('hide');
    };
}

const moove = (element) => {
    const direction = random(4);

    switch (direction){
        case 0:
            if (element.offsetTop + config.velocityHard < gameContainerElement.offsetHeight){
                element.style.top = element.offsetTop + config.velocityHard + 'px'
            }
            break
        case 1:
            if (element.offsetLeft + config.velocityHard < gameContainerElement.offsetWidth){
                element.style.left = element.offsetLeft + config.velocityHard + 'px'
            }
            break
        case 2:
            if (element.offsetTop - config.velocityHard > gameContainerElement.offsetTop){
                element.style.top = element.offsetTop - config.velocityHard + 'px'
            }
            break
        case 3:
            if (element.offsetLeft - config.velocityHard > gameContainerElement.offsetLeft){
                element.style.left = element.offsetLeft - config.velocityHard + 'px'
            }
            break
    }
}

init();

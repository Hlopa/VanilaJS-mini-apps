"use scrict";

class Timer {
    constructor(durationInput, startButton, pauseButton, stopBtn, circle) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        this.stopBtn = stopBtn;
        this.circle = circle;
        this.perimeter = circle.getAttribute('r') * 2 * Math.PI;
        this.stroffset = 0;
        this.totalDuration = 0;
        this.timeRemaining = 0;
    }

    init = () => {
        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
        this.stopBtn.addEventListener('click', this.stop);
    };

    start = () => {
        if (durationInput && durationInput.value > 0) {
            this.btnClassToggle();
            this.totalDuration = this.durationInput.value;
            this.timeRemaining = this.durationInput.value;
            this.tick();
            this.interval = setInterval(this.tick, 1000);
        }
    };

    pause = () => {
        this.btnClassToggle();
        this.stroffset = parseInt(circle.getAttribute('stroke-dashoffset'));
        clearInterval(this.interval);
    };

    stop = () => {
        clearInterval(this.interval);
        this.totalDuration = 0;
        this.timeRemaining = 0;
        this.durationInput.value = 0;
        circle.removeAttribute('stroke-dashoffset');
        this.stroffset = 0;
        if (startButton.classList.contains('hide')) {
            btnClassToggle();
        }
    };

    btnClassToggle = () => {
        this.startButton.classList.toggle('hide');
        this.pauseButton.classList.toggle('hide');
    }

    tick = () => {
        if (this.timeRemaining <= 0) {
            this.pause();
            circle.removeAttribute('stroke-dashoffset');

            this.timeRemaining = 0;
        } else {
            this.timeRemaining = this.timeRemaining - 1;
            this.durationInput.value = this.timeRemaining;
            this.strokeDasharray();
        }
    };

    strokeDasharray = () => {
        circle.setAttribute('stroke-dasharray', this.perimeter);
        circle.setAttribute('stroke-dashoffset', (this.stroffset + (this.perimeter * this.timeRemaining / this.totalDuration - this.perimeter)));
    };
};

const durationInput = document.querySelector('.timer-duration'),
    startBtn = document.querySelector('.timer-start'),
    pauseBtn = document.querySelector('.timer-pause'),
    stopBtn = document.querySelector('.timer-stop'),
    circle = document.querySelector('circle');

const timer2 = new Timer(durationInput, startBtn, pauseBtn, stopBtn, circle);

timer2.init();

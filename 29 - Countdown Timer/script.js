let countdown; // timer
const timerDisplay = document.querySelector(".display__time-left")
const endTime = document.querySelector('.display__end-time')
const timerButtons = document.querySelectorAll('.timer__button')


function timer(seconds) {
    clearInterval(countdown) // before starting, clear previous Timers

    const now = Date.now() // in miliseconds
    const then = now  + seconds * 1000 // convert to miliseconds
    displayTimeLeft(seconds)
    displayEndTime(then)


    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000)

        if(secondsLeft < 0) {
            clearInterval(countdown)
            return
        } // stop the timer when it reaches 0
        displayTimeLeft(secondsLeft)
    }, 1000) // runs every second
}

function displayTimeLeft(secondsLeft) {
    console.log('seconds: ', secondsLeft)

    const minutes = Math.floor(secondsLeft / 60)
    secondsLeft = secondsLeft % 60
    console.log({minutes, secondsLeft})

    const display = `${minutes} : ${secondsLeft < 10 ? '0' : ''}${secondsLeft}`
    document.title = display
    timerDisplay.textContent = display
}

function displayEndTime(timestamp) {
    var date = new Date(timestamp)
    const hours = date.getHours()
    const minutes = date.getMinutes()

    endTime.textContent = `Be Back at ${hours > 12 ? hours - 12 : hours} : ${minutes < 10 ? '0' : ''}${minutes}`
}

function setTimer() {
    const seconds = this.dataset.time
    timer(seconds) // start timer countdown
    console.log(seconds)
}

timerButtons.forEach(btn => btn.addEventListener('click', setTimer))

document.customForm.addEventListener('submit', function(e) { // we can select elem using its name
    e.preventDefault()

    const minutes = this.minutes.value // we select minutes elem using its name

    timer(minutes * 60)
    this.reset()
})


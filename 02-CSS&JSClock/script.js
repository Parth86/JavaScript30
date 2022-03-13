const second = document.querySelector('.second')
const minute = document.querySelector('.minute')
const hour = document.querySelector('.hour')

function setDate() {
    const date = new Date()
    const seconds = date.getSeconds()
    const minutes = date.getMinutes()
    const hours = date.getHours()

    second.style.transform = `rotate(${90+seconds*6}deg)`
    minute.style.transform = `rotate(${90+minutes*6}deg)`
    hour.style.transform = `rotate(${90+(hours/12 * 360 )}deg)`


}

setInterval(setDate, 1000)

// seconds: 0sec => 90deg, 60sec => 90deg  1deg = 360/90 = 4 deg
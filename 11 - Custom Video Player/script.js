const video = document.querySelector('video')
const toggleButton = document.getElementById('toggleButton')
const skipBtns = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('input')
const progress = document.querySelector('progress')

function togglePlay() { // if video if playing then pause and vice-versa
    var method = video.paused ? 'play' : 'pause'
    video[method]()
}
function updateToggleButton() { // update the icon of the toggle Button whenenever video plays or pauses
    var icon = this.paused ? '►' : '❚ ❚';
    console.log(icon)
    toggleButton.innerText = icon;
}

video.addEventListener('click', togglePlay) 
toggleButton.addEventListener('click', togglePlay)
video.addEventListener('pause', updateToggleButton)
video.addEventListener('play', updateToggleButton)

skipBtns.forEach(skip => {
    skip.addEventListener('click', () => video.currentTime += parseFloat(skip.dataset.skip))
})
ranges.forEach(range => range.addEventListener('change', () => video[range.name] = range.value))

video.addEventListener('timeupdate', () => {
    progress.value = (video.currentTime / video.duration);
})

progress.addEventListener('click', (e) => {
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration
})




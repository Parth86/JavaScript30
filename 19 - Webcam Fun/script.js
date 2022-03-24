const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false})
        .then(localMediaStream => {
            console.log(localMediaStream)
            video.srcObject = (localMediaStream)
            video.play()
        })
        .catch(e => console.error('OH NO', e))
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);

        // take the pixels data, apply some filters and return it to the canvas
        let pixels = ctx.getImageData(0 , 0, width, height)
        pixels = redEffects(pixels)
        ctx.putImageData(pixels, 0, 0)

    }, 16)
}

function takePhoto() {
    //play the sound
    snap.currentTime = 0;
    snap.play()

    //download the photo
    const data = canvas.toDataURL('image/jpeg')
    const link = document.createElement('a')
    link.href = data
    link.setAttribute('download', 'handsome')
    link.innerHTML = `<img src="${data}" alt="handsome"/>`
    strip.insertBefore(link, strip.firstChild)
}

function redEffects(pixels) {
    for(let i=0; i< pixels.data.length; i+=4){
        // every four values are one rgba set
        pixels.data[i] = pixels.data[i]  * 2;// double the red component of each pixel

    }

    return pixels
}

getVideo()

video.addEventListener('canplay', paintToCanvas) // 'canplay' happens when video starts playing

const { Pool } = require('threads')

var img = new Image()

img.src = '/assets/2.jpg';

img.onload = function() {
  draw(this)
}

type Maybe<T> = T | null

function draw(img: any) {
  var canvas:Maybe<HTMLCanvasElement> = <Maybe<HTMLCanvasElement>> document.getElementById('canvas')

  if(canvas) {
    var ctx = canvas.getContext('2d', { alpha: false })

    if(!ctx)
      return

    ctx.drawImage(img, 0, 0)

    setTimeout(() => animate(canvas), 1500)
  }
}

const animate = function(canvas: HTMLCanvasElement) {
  var ctx = canvas.getContext('2d')
  
  if(!ctx)
    return

  var min = 5
  var max = 150
  
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data
  var pxs:number[][] = []


  const fadeIn = setInterval(() => {
    requestAnimationFrame(() => {
      pxs = []
      for (var i = 0; i < data.length; i += 4) {
        const cr = i     
        const cg = i + 1
        const cb = i + 2
        const r = data[cr]
        const g = data[cg]
        const b = data[cb]
    
        if(r < min && g < min && b < min) {
          pxs.push([cr, cg, cb])
        }
      }
      min = min + 10
      if(min >= max) {
        clearInterval(fadeIn)
      }
    })
  }, 200)

  const draw = () => {
    requestAnimationFrame(async () => {

      for(let [r, g, b] of pxs) {
        if(randomBool()) {
          data[r] = randomBool() ? data[r] + getRandomInt(10, 20) : data[r] - getRandomInt(10, 20)
          data[g] = randomBool() ? data[g] + getRandomInt(12, 22) : data[g] - getRandomInt(12, 22)
          data[b] = randomBool() ? data[b] + getRandomInt(10, 20) : data[b] - getRandomInt(10, 20)
        }
        else {
          data[r] = 10
          data[g] = 10
          data[b] = 10
        }
      }
      console.time('wat')
      ctx.putImageData(imageData, 0, 0)
      console.timeEnd('wat')

      setTimeout(() => draw(), 11)
    })
  }

  draw()
}


const randomBool = () => {
  return getRandomInt(1,4) <=2 ? true : false
}

function getRandomInt(min:number, max:number) {
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
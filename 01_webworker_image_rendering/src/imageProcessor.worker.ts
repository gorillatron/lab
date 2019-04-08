
var min = 5
var max = 150

onmessage = ( evt ) => {
  
  let imageData = new ImageData( 
    new Uint8ClampedArray( evt.data.pixels ),
    evt.data.width,
    evt.data.height 
  )

  var data = imageData.data
  var pxs:number[][] = []

  const fadeIn = setInterval(() => {
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

    min = min + 2

    if(min >= max) {
      clearInterval(fadeIn)
    }
  }, 120)

  const draw = () => {
    for(let [r, g, b] of pxs) {
      if(randomBool()) {
        data[r] = (randomBool() ? data[r] + getRandomInt(10, 20) : data[r] - getRandomInt(10, 20)) - 3
        data[g] = (randomBool() ? data[g] + getRandomInt(12, 22) : data[g] - getRandomInt(12, 22)) - 7
        data[b] = (randomBool() ? data[b] + getRandomInt(10, 20) : data[b] - getRandomInt(10, 20)) - 3
      }
      else {
        data[r] = 10
        data[g] = 10
        data[b] = 10
      }
    }
    
    self.postMessage({
      pixels: imageData.data.buffer
    }, null)

    setTimeout(() => draw(), 33)
  }

  draw()
  
}

const randomBool = () => {
  return getRandomInt(1,4) <=2 ? true : false
}

function getRandomInt(min:number, max:number) {
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
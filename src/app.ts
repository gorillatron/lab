import ImageProcessor from 'worker-loader!./imageProcessor.worker'
import * as _ from 'lodash'

var img = new Image()

img.src = '/assets/2.jpg';

img.onload = function() {

    const img:any = this
    var canvas:Maybe<HTMLCanvasElement> = <Maybe<HTMLCanvasElement>> document.getElementById('canvas')
  
    if(canvas) {
      var ctx = canvas.getContext('2d', { alpha: false })
  
      if(!ctx)
        return
  
      ctx.drawImage(img, 0, 0)
  
      setTimeout(() => animate(canvas, ctx), 500)
    }
  
}

type Maybe<T> = T | null


const animate = async (canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D) => {

  const parts = 7
  const pxsPrPart = canvas.height / parts
  
  for(let partIndex of _.range(0,parts)) {

    const imageProcesser = new ImageProcessor()
    const imageData = ctx.getImageData(0, partIndex * pxsPrPart, canvas.width, pxsPrPart)

    imageProcesser.addEventListener('message', (evt) => {
      let imageData = new ImageData( 
        new Uint8ClampedArray( evt.data.pixels ),
        canvas.clientWidth,
        pxsPrPart
      )
      requestAnimationFrame(() => {
        ctx.putImageData(imageData, 0, partIndex * pxsPrPart)
      })
    })
  
    imageProcesser.postMessage({
      pixels: imageData.data.buffer,
      height: pxsPrPart,
      width: canvas.clientWidth
    }, [imageData.data.buffer])
  }

}
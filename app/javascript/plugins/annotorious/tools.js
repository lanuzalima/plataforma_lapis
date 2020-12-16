import { Annotorious } from '@recogito/annotorious';
import { setAnno } from './find_annotable';

const tools = (anno, userRole) => {
  
  const zoomInBtn = document.getElementById("tools_zoom_in")
  const zoomOutBtn = document.getElementById("tools_zoom_out")
  const zoomReset = document.getElementById("tools_zoom_reset")
  const img = document.getElementById("annotable")

  img.style.zoom = "100%";
  const getZoom = () => {
    return parseInt(img.style.zoom)
  }
  // img.style.width = "100%";

  zoomReset.addEventListener('click', event => {
    event.preventDefault();
    img.style.zoom = "100%";
    // img.style.width = "100%";
    img.attributes.style
  })

  zoomInBtn.addEventListener('click', event => {
    event.preventDefault();
    const zoomIn = parseInt(img.style.zoom) + 10 + '%';
    img.style.zoom = zoomIn;
  })
  
  zoomOutBtn.addEventListener('click', event => {
    event.preventDefault();
    const currentZoom = getZoom();
    if (currentZoom > 10) {
      const zoomOut = currentZoom - 10 + '%';
      img.style.zoom = zoomOut;
    } else {
      console.log("Else")
      img.style.zoom = '10%';
    }
  })
  
  if (userRole == "Teacher" || userRole == "Professor") {
    const rectBtn = document.getElementById("tools_rect")
    const polygonBtn = document.getElementById("tools_polygon")

    rectBtn.addEventListener('click', event => {
      event.preventDefault();
      anno.destroy();
      const rectAnno = new Annotorious({
        image: document.getElementById('annotable'),
      });

      const shape = "rect"
      setAnno(rectAnno, shape)
    })

    polygonBtn.addEventListener('click', event => {
      event.preventDefault();
      anno.destroy();
      const polyAnno = new Annotorious({
        image: document.getElementById('annotable'),
      });

      const shape = 'polygon'
      setAnno(polyAnno, shape)
    })

  }
}

export{tools}
import { Annotorious } from '@recogito/annotorious';
import { setAnno } from './find_annotable';

const tools = (anno, userRole) => {
  if (userRole == "Teacher" || userRole == "Professor") {
    const rectBtn = document.getElementById("tools_rect")
    const polygonBtn = document.getElementById("tools_polygon")
    const zoomInBtn = document.getElementById("tools_zoom_in")
    const zoomOutBtn = document.getElementById("tools_zoom_out")
    const zoomReset = document.getElementById("tools_zoom_reset")
    const page = document.getElementById("annotable")
    
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

    page.style.zoom = "100%";

    zoomReset.addEventListener('click', event => {
      event.preventDefault();
      page.style.zoom = "100%";
    })

    zoomInBtn.addEventListener('click', event => {
      event.preventDefault();
      const zoomIn = parseInt(page.style.zoom) + 10 + '%';
      page.style.zoom = zoomIn;
    })

    zoomOutBtn.addEventListener('click', event => {
      event.preventDefault();
      const zoomOut = parseInt(page.style.zoom) - 10 + '%';
      page.style.zoom = zoomOut;
    })


  }
}

export{tools}
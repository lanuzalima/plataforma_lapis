import { Annotorious } from '@recogito/annotorious';
import { setAnno } from './find_annotable';

const tools = (anno) => {
  const rect_btn = document.getElementById("tools_rect")
  const polygon_btn = document.getElementById("tools_polygon")
  
  rect_btn.addEventListener('click', event => {
    event.preventDefault();
    anno.destroy();
    const rectAnno = new Annotorious({
      image: document.getElementById('annotable'),
    });
    
    const shape = "rect"
    setAnno(rectAnno, shape)
  })
  
  polygon_btn.addEventListener('click', event => {
    event.preventDefault();
    anno.destroy();
    const polyAnno = new Annotorious({
      image: document.getElementById('annotable'),
    });

    const shape = 'polygon'
    setAnno(polyAnno, shape)
  })

}

export{tools}
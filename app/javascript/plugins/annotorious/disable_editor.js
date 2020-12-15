import {commentPop} from './comment_pop'

// Disabilita o editor
// Procura pelo annotation layer e o remove
// Recriar o annotation layer sem as annotations e mantendo apenas as formas salvas

const disableEditor = (anno) => {
  
  const rects = document.querySelectorAll('rect');
  const viewBox = document.querySelector('.a9s-annotationlayer');
  const polys = document.querySelectorAll('polygon');
  let layer = document.querySelector('.a9s-annotationlayer');
  const annotable = document.getElementById('annotable');
  layer.parentNode.removeChild(layer)

  if (viewBox.viewBox == null) {
    annotable.insertAdjacentHTML('beforebegin', `<svg class="a9s-annotationlayer" 
    viewBox="${viewBox.attributes[0].ownerElement.viewBox.baseVal.y} 
    ${viewBox.attributes[0].ownerElement.viewBox.baseVal.x} 
    ${viewBox.attributes[0].ownerElement.viewBox.baseVal.width} 
    ${viewBox.attributes[0].ownerElement.viewBox.baseVal.height} 
    "
    style="cursor: default"><g> </g></svg>`)
  } else {
    annotable.insertAdjacentHTML('beforebegin', `<svg class="a9s-annotationlayer" 
    viewBox="${parseInt(viewBox.viewBox.textContent)}
    "
    style="cursor: default"><g></g></svg>`)
  }


  layer = document.querySelector('.a9s-annotationlayer').firstChild;
  rects.forEach(rect => {
    const dataId = rect.parentElement.dataset.id
    const comment = document.querySelectorAll(`[data-cmref*="${dataId}"]`)[0];
    const commentContent = comment.querySelector(".comment_text").textContent;
    const rectClass = rect.attributes.class.value;
    const rectX = rect.attributes.x.value;
    const rectY = rect.attributes.y.value;
    const rectWidth = rect.attributes.width.value;
    const rectHeight = rect.attributes.height.value;
    layer.insertAdjacentHTML('afterbegin', `  <a class="goto_comment" title="${commentContent}" href="#COMENT${dataId}"><g class="a9s-annotation" data-id="${dataId}"> <rect class="${rectClass}"  x="${rectX}" y="${rectY}" width="${rectWidth}" height="${rectHeight}" > </rect> </g>${comment}</a>`)
  });

  polys.forEach(polygon => {
    const dataId = polygon.parentElement.dataset.id
    const comment = document.querySelectorAll(`[data-cmref*="${dataId}"]`)[0];
    const commentContent = comment.querySelector(".comment_text").textContent;
    const polyClass = polygon.attributes.class.value;
    const polyPoints = polygon.attributes.points.value;
    layer.insertAdjacentHTML('afterbegin', ` <a class="goto_comment" title="${commentContent}" href="#COMENT${dataId}"> <g class="a9s-annotation" data-id="${dataId}"> <polygon class="${polyClass}"  points="${polyPoints}" > </polygon> </g> </a>`)
  });
  
  commentPop();
}

export {disableEditor}

const disableEditor = (anno) => {
  const rects = document.querySelectorAll('rect');
  const viewBox = document.querySelector('svg').attributes.viewBox.value;
  const polys = document.querySelectorAll('polygon');
  let layer = document.querySelector('.a9s-annotationlayer');
  const annotable = document.getElementById('annotable');
  layer.parentNode.removeChild(layer)

  annotable.insertAdjacentHTML('beforebegin', `<svg class="a9s-annotationlayer" viewBox="${viewBox}"><g> </g></svg>`)

  layer = document.querySelector('.a9s-annotationlayer').firstChild;
  rects.forEach(rect => {
    const rect_class = rect.attributes.class.value;
    const rect_x = rect.attributes.x.value;
    const rect_y = rect.attributes.y.value;
    const rect_width = rect.attributes.width.value;
    const rect_height = rect.attributes.height.value;
    layer.insertAdjacentHTML('afterbegin', `<g class="a9s-annotation"> <rect class="${rect_class}" x="${rect_x}" y="${rect_y}" width="${rect_width}" height="${rect_height}" > </rect> </g>`)
  });

}

export {disableEditor}
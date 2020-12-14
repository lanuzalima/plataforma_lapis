const renderEditableAnnots = (anno) => {
  const annotations = document.querySelectorAll(".annot")
  annotations.forEach(annotation => {
    const annotationParsed = [JSON.parse(annotation.dataset.content)];
    anno.setAnnotations(annotationParsed);
  });
}

export{renderEditableAnnots}
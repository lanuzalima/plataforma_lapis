// const clearAnnotations = () => {
//   const annotations = document.querySelectorAll(".annot")
//   annotations.forEach(annotation => {
//     const annotationParsed = [JSON.parse(annotation.dataset.content)];
//     annotation.parentElement.removeChild(annotation)
//   });
// }

const renderEditableAnnots = (anno) => {
  const annotations = document.querySelectorAll(".annot")
  if (annotations.length > 0) {
    annotations.forEach(annotation => {
      const annotationParsed = [JSON.parse(annotation.dataset.content)];
      anno.setAnnotations(annotationParsed);
    });
  }
}

export{renderEditableAnnots}
import { initAnnotorious } from './init_annotorius';
import { disableEditor } from './disable_editor';

// Verificar o papel(role) do usuário 
// Se for professor, disponibilizar as opções de marcação
// Se for aluno, não permitir marcação
// Em ambos os casos, ver se tem anotações salvas e, se tiver, renderizá-las

// OBS >>>>>>> Os roles precisarão ser mudados conforme forem definidos pela equipe

const renderEditableAnnots = (anno) => {
  const annotations = document.querySelectorAll(".annot")
  annotations.forEach(annotation => {
    const annotationParsed = [JSON.parse(annotation.dataset.content)];
    anno.setAnnotations(annotationParsed);
  });
}

const showAnnotations = (anno) => {
  
  const annots = document.querySelector('.my_annots')
  const userRole = document.querySelector('user').dataset.role
  
  if (userRole == "Teacher" || userRole == "Professor") {
    if (annots) {
      initAnnotorious(anno);
      renderEditableAnnots(anno);
    } else {
      initAnnotorious(anno); 
    }
  } else {
    renderEditableAnnots(anno);
    disableEditor(anno);
  }
};

export {showAnnotations}
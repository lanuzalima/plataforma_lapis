import { initAnnotorious } from './init_annotorius'

const annots = document.querySelector('.my_annots')
const userRole = document.querySelector('user').dataset.role

// Verificar o papel(role) do usuário 
// Se for professor, disponibilizar as opções de marcação
// Se for aluno, não permitir marcação
// Em ambos os casos, ver se tem anotações salvas e, se tiver, renderizá-las

const showAnnotations = (anno) => {
  
  if (userRole == "Teacher" || userRole == "Professor") {
    if (annots) {
      initAnnotorious(anno);
      const annotations = document.querySelectorAll(".annot")
      annotations.forEach(annotation => {
        const annotationParsed = [JSON.parse(annotation.dataset.content)];
        anno.setAnnotations(annotationParsed);
      });
    } else {
      initAnnotorious(anno); 
    }
  } else {
    // TO DO !!!!!!!!!!
    console.log("Configurar o que o aluno vê!")
  }
};

export {showAnnotations}
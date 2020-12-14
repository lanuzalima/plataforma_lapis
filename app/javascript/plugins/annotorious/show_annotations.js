import { initAnnotorious } from './init_annotorius';
import { disableEditor } from './disable_editor';
import {renderEditableAnnots} from './render_editable'


// Verificar o papel(role) do usuário 
// Se for professor, disponibilizar as opções de marcação
// Se for aluno, não permitir marcação
// Em ambos os casos, ver se tem anotações salvas e, se tiver, renderizá-las

// OBS >>>>>>> Os roles precisarão ser mudados conforme forem definidos pela equipe

const showAnnotations = (anno, shape) => {
  
  const annots = document.querySelector('.my_annots')
  const userRole = document.querySelector('user').dataset.role
  renderEditableAnnots(anno);
  
  if (userRole == "Teacher" || userRole == "Professor") {
    if (annots) {
      initAnnotorious(anno, shape);
    } else {
      initAnnotorious(anno, shape);
    }
  } else {
    initAnnotorious(anno, shape);
    disableEditor(anno);
  }
};

export {showAnnotations}
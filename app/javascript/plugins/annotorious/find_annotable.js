import { Annotorious } from '@recogito/annotorious';
import { showAnnotations } from './show_annotations';
import { tools } from './tools';


// Define qual o anno (o layer anotável) está sendo utilizado
// Inicializa as ferramentas (tools)
// Inicializa o show
const setAnno = (anno, shape) => {
  const userRole = document.querySelector('user').dataset.role

  tools(anno, userRole);
  showAnnotations(anno, shape, userRole);
}

// Verificar se tem uma imagem anotável na página
// A setAnno (ACIMA) é chamada aqui
const findAnnotable = () => {
  const annotable = document.getElementById('annotable');
  if (annotable) {
    const anno = new Annotorious({
      image: document.getElementById('annotable'),
    });
    setAnno(anno);
  }
}

export {findAnnotable, setAnno} 
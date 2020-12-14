import { Annotorious } from '@recogito/annotorious';
import { showAnnotations } from './show_annotations';

// Verificar se tem uma imagem anotável na página

const findAnnotable = () => {
  const annotable = document.getElementById('annotable');
  if (annotable) {
    const anno = new Annotorious({
      image: document.getElementById('annotable'),
    });
    showAnnotations(anno);
  }
}

export {findAnnotable} 
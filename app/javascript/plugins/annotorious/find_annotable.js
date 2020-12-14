import { Annotorious } from '@recogito/annotorious';
import { showAnnotations } from './show_annotations';
import { tools } from './tools';

// Verificar se tem uma imagem anotável na página

const setAnno = (anno, shape) => {
  tools(anno);
  showAnnotations(anno, shape);
}

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
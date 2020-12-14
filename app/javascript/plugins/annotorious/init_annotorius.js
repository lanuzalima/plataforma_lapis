import { create } from './anno_crud/anno_create';
import { update } from './anno_crud/anno_update';
import { destroy } from './anno_crud/anno_destroy';

const initAnnotorious = (anno) => {  
   
  // Definir usuário do annotorius (nome aparecerá nas marcaçãoes)
  const user = document.querySelector("user");
  anno.setAuthInfo({
      id: `/${user.dataset.userId}`,
      displayName: `${user.dataset.name}`
  });

  // Chamar os demais métodos de CRUD (exceto READ, que é feito antes, em show_annotations)
  create(anno);
  update(anno);
  destroy(anno);

}

export {initAnnotorious};
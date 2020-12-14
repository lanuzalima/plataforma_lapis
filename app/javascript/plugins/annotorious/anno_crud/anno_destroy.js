import $, { get } from 'jquery';


// Quando confirma a opção de deletar, a annotation é pega pelo id
// Após deletar (sucess), o elemento HTML respectivo é deletado também
// Se a pessoa não confirmar o delete, a página é recarregada

const destroy = (anno) => {
  anno.on('deleteAnnotation', function(annotation) {
    if (confirm("Deseja deletar esta anotação?")) {
    const anno_to_del =  document.querySelector(`[data-original-id*="${annotation.id}"]`);
    $.ajax({
    url: `/annotation/del_by_original/${anno_to_del.dataset.originalId}`,
    data: {"annotation[original_id]": anno_to_del.dataset.originalId},
    type: "DELETE",
    success: () => {
      anno_to_del.parentNode.removeChild(anno_to_del)
    //     alert("Comentário deletado.")
    }
    });
    } else {
      location.reload()
    }
  });
} 

export {destroy}
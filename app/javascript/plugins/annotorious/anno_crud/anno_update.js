import $, { get } from 'jquery';

// Define o usuário e o texto
// Quando inicia o update, procura-se o anno element com a respectiva ID
// Retira-se o anno element respectivo e cria-se a versão atualizada no lugar
// A versão atualizada do anno element é a referência para os params que serão passados para a ação de update no controller de annotations

const update = (anno) => {
  
  const userId = document.querySelector("user").dataset.userId
  const textId = document.getElementById("annotable").dataset.textId
  
  anno.on('updateAnnotation', function(annotation) {
    const stringfiedAnno = JSON.stringify(annotation);
    const annots =  document.querySelector(".my_annots");
    const anno_to_update =  document.querySelector(`[data-original-id*="${annotation.id}"]`);

    anno_to_update.parentNode.removeChild(anno_to_update);
    annots.insertAdjacentHTML('afterbegin',
      `<anno class='anno' style='display:none' data-original-id='${annotation.id}' data-user-id='${userId}' data-content='${stringfiedAnno}' </anno>`
    )

    const comment = document.querySelector(`[data-cmref*="${annotation.id}"]`);
    comment.innerHTML = ""
    comment.insertAdjacentHTML('afterbegin',
      `<div class="coment_content"><span class="comment_header">Comentário: </span><span class="comment_text">${annotation.body[0].value}</span></div>
      <div class="coment_author"><span class="author_header">Professor: </span><span class="author_name">${annotation.body[0].creator.name}</span></div>`
    )


    const updated_anno =  document.querySelector(`[data-original-id*="${annotation.id}"]`);
    $.ajax({
      url: `/annotation/update_by_original/${updated_anno.dataset.originalId}`,
      data: {
              "annotation[original_id]": updated_anno.dataset.originalId,
              "annotation[text_id]": textId,
              "annotation[user_id]": updated_anno.dataset.userId,
              "annotation[content]": stringfiedAnno
            },
      type: "PATCH",
      // success: () => {
      //   alert("Comentário atualizado.")
      // }
    });
  });
}

export {update}
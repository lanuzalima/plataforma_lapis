import $, { get } from 'jquery';

// Define o usuário que criou a anotação
// Define o texto ao qual a anotação pertence
// Ao iniciar a anotação, ele transforma o objeto annotation em string
// Salva no banco passando os parâmetros necessários para anotação
// Quando bem sucedido, ele cria o respectivo tag annot (e o annots, se não houver)
// Deleta o no_annots (se ainda houver)

const create = (anno) => {

  const user = document.querySelector("user")
  const userId = user.dataset.userId
  const textId = document.getElementById("annotable").dataset.textId

  anno.on('createAnnotation', function(annotation){
    const stringfiedAnno = JSON.stringify(annotation);
    $.ajax({
      url: "/annotations",
      data: {"annotation[original_id]": annotation.id,
             "annotation[text_id]": textId,
             "annotation[user_id]": userId,
             "annotation[content]": stringfiedAnno},
      type: "POST",
      success: () => {
        if (document.querySelector(".my_annots") == null) {
          user.insertAdjacentHTML('afterend',
          `<annots class="my_annots" data-text-id="${textId}">`)
        }
        const annots =  document.querySelector(".my_annots");
        annots.insertAdjacentHTML('afterbegin', 
          `<annot class='annot' style='display:none' data-original-id='${annotation.id}' data-user-id='${userId}' data-content='${stringfiedAnno}'></annot>`
        )
        const no_annots = document.getElementById("no_annots");
        if (no_annots) {
          no_annots.parentNode.removeChild(no_annots)
        }
      }
    });
  });
}

export {create}
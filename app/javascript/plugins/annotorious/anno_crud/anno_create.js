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

        if (document.querySelector(".coment") == null) {
          const text = document.querySelector(".text-image")
          text.insertAdjacentHTML('afterend',
          `<div class='coments' data-text-id='${textId}'>`)
        }

        const coment = document.querySelector(".coment");
        coment.insertAdjacentHTML('afterbegin',
        `<div class="coment" id="COMENT${annotation.id}" data-cmref="${annotation.id}">
          <div class="coment_content"><span class="comment_header">Comentário:</span><span class="comment_text">${annotation.body[0].value}</span></div>
          <div class="coment_author"><span class="author_header">Professor:</span><span class="author_name">${annotation.body[0].creator.name}</span></div>
        </div>`
        )
        
      }
    });
  });
}

export {create}
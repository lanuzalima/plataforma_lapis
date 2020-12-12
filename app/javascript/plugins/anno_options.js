
import { Annotorious } from '@recogito/annotorious';
import $, { get } from 'jquery';

const user = document.querySelector("user");
const annots = document.querySelector(".my_annots");
const targetImgId = document.getElementById("annotable").dataset.textId;
const anno = new Annotorious({
  image: document.getElementById('annotable')
});

const get_annos = () => {
  if (annots.dataset.imgId == targetImgId) {
    initAnnotorious()
    const annotations = document.getElementById(".annot")
    annotations.forEach(annotation => {
      const annotation_parsed = [JSON.parse(annotation.dataset.content)];
      anno.setAnnotations(annotation_parsed);
    });
  }
};

const initAnnotorious = () => {  
  console.log("fuoi")
  if (user.dataset.name == "Marquinhos") {
    console.log("Relâmpago")
  } else {
    anno.setAuthInfo({
      id: `/${user.dataset.annoId}`,
      displayName: `${user.dataset.name}`
    });

    anno.on('createAnnotation', function(annotation){
      console.log(annotation)
      const stringfied = JSON.stringify(annotation);
      $.ajax({
        url: "/annotations",
        data: {"annotation[original_id]": annotation.id,
               "annotation[text_id]": targetImgId,
               "annotation[content]": stringfied},
        type: "POST",
        success: () => {
          const annots =  document.querySelector(".my_annots");
          annots.insertAdjacentHTML('afterend', 
            `<annot class='annot' style='display:none' data-original-id='${annotation.id}'  data-content='${stringfied}' </annot>`
          )
        }
      });
    });

    anno.on('updateAnnotation', function(annotation) {
      const stringfied = JSON.stringify(annotation);
      let annot =  document.querySelector(`[data-original-id*="${annotation.id}"]`);
      const annots =  document.querySelector(".my_annots");

      annot.parentNode.removeChild(annot);
      annots.insertAdjacentHTML('afterbegin', 
        `<annot class='annot' style='display:none' data-original-id='${annotation.id}' data-content='$  {stringfied}' </annot>`
      )

      annot =  document.querySelector(`[data-original-id*="${annotation.id}"]`);
      $.ajax({
        url: `/annotation/update_by_original/${annot.dataset.originalId}`,
        data: {
                "annotation[original_id]": annot.dataset.originalId,
                "annotation[content]": annot.dataset.content
              },
        type: "PATCH",
        // success: function (data) {
        //   alert("Comentário atualizado.")
        // }
      });
    });

    anno.on('deleteAnnotation', function(annotation) {
      if (confirm("Deseja deletar esta anotação?")) {
      const annot =  document.querySelector(`[data-original-id*="${annotation.id}"]`);
      $.ajax({
        url: `/annotation/del_by_original/${annot.dataset.originalId}`,
        data: {"annotation[original_id]": annot.dataset.originalId},
        type: "DELETE",
        // success: () => {
        //     alert("Comentário deletado.")
        // }
      });
      } else {
        location.reload()
      }
    });
  }
}

export {get_annos} 
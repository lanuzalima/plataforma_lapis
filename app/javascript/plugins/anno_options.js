
import { Annotorious } from '@recogito/annotorious';
import $ from 'jquery';

const initAnnotorious = () => {  
  const anno = new Annotorious({
    image: document.getElementById('annotable')
  });
    
  
  const get_annos = () => {
    const annotations = document.querySelectorAll(".annot")
    annotations.forEach(annotation => {
      const annotation_parsed = [JSON.parse(annotation.dataset.content)];
      anno.setAnnotations(annotation_parsed);
    });
  };
  
  get_annos();
  
  anno.on('createAnnotation', function(annotation){
    const stringfied = JSON.stringify(annotation);
    $.ajax({
      url: "/annotations",
      data: {"annotation[original_id]": annotation.id,
             "annotation[content]": stringfied},
      type: "POST",
      success: () => {
        const annots =  document.querySelector(".my_annots");
        annots.insertAdjacentHTML('afterend', 
          `<annot class='annot' style='display:none' data-original-id='${annotation.id}' data-content='${stringfied}' </annot>`
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
      `<annot class='annot' style='display:none' data-original-id='${annotation.id}' data-content='${stringfied}' </annot>`
    )

    annot =  document.querySelector(`[data-original-id*="${annotation.id}"]`);
    $.ajax({
      url: `/annotation/update_by_original/${annot.dataset.originalId}`,
      data: {
              "annotation[original_id]": annot.dataset.originalId,
              "annotation[content]": annot.dataset.content
            },
      type: "PATCH",
      success: function (data) {
        alert("Comentário atualizado.")
      }
    });
  });

  anno.on('deleteAnnotation', function(annotation) {
    const annot =  document.querySelector(`[data-original-id*="${annotation.id}"]`);
    $.ajax({
      url: `/annotation/del_by_original/${annot.dataset.originalId}`,
      data: {"annotation[original_id]": annot.dataset.originalId},
      type: "DELETE",
      success: () => {
          alert("Comentário deletado.")
      }
    });
  });

}

export {initAnnotorious} 
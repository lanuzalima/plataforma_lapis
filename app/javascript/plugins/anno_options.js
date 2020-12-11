
import { Annotorious } from '@recogito/annotorious';
import $ from 'jquery';

const initAnnotorious = () => {  
  const anno = new Annotorious({
    image: document.getElementById('annotable')
  });
    
  
  const get_annos = () => {
    const annotations = document.querySelectorAll(".my_annos")
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
      success: function (data) {
          console.log(data);
      }
    });
  });

  anno.on('deleteAnnotation', function(annotation) {
    const tags = document.querySelectorAll(".my_annos");
    tags.forEach((tag)=>{
      if(tag.dataset.originalId == annotation.id){
        $.ajax({
          url: `/annotations/${tag.dataset.id}`,
          data: {},
          type: "DELETE",
          success: function (data) {
              console.log(data);
          }
        });
      }
    });
  });


}

export {initAnnotorious} 
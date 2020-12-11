
import { Annotorious } from '@recogito/annotorious';
import $ from 'jquery';

console.log("load")

const initAnnotorious = () => {  
  const anno = new Annotorious({
    image: document.getElementById('annotable')
  });
    
  
  const get_annos = () => {
    console.log("oi")
    const annotations = document.querySelectorAll(".my_annos")
    console.log(annotations)
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

  // ELABORANDO O DELETE

  // anno.on('deleteAnnotation', function(annotation) {
  //   const tags = document.querySelectorAll(".my_annos");
  //   console.log(`/image_tag/${annotation.id}`)
  //   const get_id = () => { 
  //     let tag_id = "";
  //     tags.forEach((tag)=>{
  //       if(tag.dataset.id = annotation.id){
  //         tag_id = annotation.id;
  //         console.log(tag_id)
  //       }
  //     });
  //     return tag_id;
  //   };
  //   const stringfied = JSON.stringify(annotation);
  //   $.ajax({
  //     url: `/image_tag/${annotation.id}`,
  //     data: {},
  //     type: "DELETE",
  //     success: function (data) {
  //         console.log(data);
  //     }
  //   });
  // });


}

export {initAnnotorious} 
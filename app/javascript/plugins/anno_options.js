
import { Annotorious } from '@recogito/annotorious';
import $ from 'jquery';

console.log("load")

const initAnnotorious = () => {  
  console.log("foi");
  const anno = new Annotorious({
    image: document.getElementById('annotable')
  });

  document.addEventListener('keyup', (event) => {
    const tester = document.querySelectorAll(".my_tags")
    tester.forEach(element => {
      const tester_parsed = [JSON.parse(element.dataset.json)];
      anno.loadAnnotations(tester_parsed);
      anno.setAnnotations(tester_parsed);
    });
  });
  
  anno.on('deleteAnnotation', function(annotation) {
    const tags = document.querySelectorAll(".my_tags");
    console.log(`/image_tag/${annotation.id}`)
    const get_id = () => { 
      let tag_id = "";
      tags.forEach((tag)=>{
        if(tag.dataset.id = annotation.id){
          tag_id = annotation.id;
          console.log(tag_id)
        }
      });
      return tag_id;
    };
    const stringfied = JSON.stringify(annotation);
    $.ajax({
      url: `/image_tag/${annotation.id}`,
      data: {},
      type: "DELETE",
      success: function (data) {
          console.log(data);
      }
    });
  });

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

}

export {initAnnotorious} 
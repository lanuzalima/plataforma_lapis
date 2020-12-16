import {commentPop} from './comment_pop'
import $, { off } from 'jquery';

// Disabilita o editor
// Procura pelo annotation layer e o remove
// Recriar o annotation layer sem as annotations e mantendo apenas as formas salvas

const disableEditor = (anno) => {
  const viewBox = document.querySelector('.a9s-annotationlayer');
  const annotable = document.getElementById('annotable');
  const annots = document.querySelectorAll('.a9s-annotation')

  annots.forEach(annot => {
    const dataId = annot.dataset.id
    const comment = document.querySelectorAll(`[data-cmref*="${dataId}"]`)[0];
    const commentContent = comment.querySelector(".comment_text").textContent;

    annot.insertAdjacentHTML('beforebegin', `<a class="goto_comment" title="${commentContent}" href="#COMENT${dataId}" reft="${dataId}"></a>`)

    const link = document.querySelectorAll(`[href*="#COMENT${dataId}"]`)[0];
    link.appendChild(annot)
    const annoClone = annot.cloneNode(true);
    annot.parentNode.replaceChild(annoClone, annot)

  })
    
  viewBox.setAttribute('style', 'cursor: default')

  const links = document.querySelectorAll(".goto_comment");
  
  links.forEach(link =>{
    link.addEventListener('click', event => {
      event.preventDefault();
      const comments = document.querySelectorAll(".coment");
      const comment = document.querySelector(`[data-cmref*="${link.attributes.reft.value}"]`);
      comments.forEach(comment => {
        if (comment.classList.length > 1) {
          comment.classList.remove("active")
        }
      })
      comment.classList.add("active")
      comment.tabIndex = -1
      comment.focus();
    })
  })
  
  const editorDiv = annotable.parentElement.querySelector("div");
  editorDiv.parentElement.removeChild(editorDiv)


  commentPop();
}

export {disableEditor}

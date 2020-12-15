// Faz um mouse over para cada comentário

const commentPop = () => {
  const popComments = document.querySelectorAll(".goto_comment")
  const popBox = document.getElementById("comment_pop_box")
  popComments.forEach(pop => {
    pop.addEventListener('mouseover', event => {
      popBox.insertAdjacentHTML('afterbegin', `<div id="pop_comment"><div class="comment_header">Comentário</div><div>${pop.attributes.title.value}</div></div>`)
    })
    pop.addEventListener('mouseout', event => {
      popBox.removeChild(popBox.firstChild)
    })
  })
}

export {commentPop}
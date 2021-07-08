async function getAllComments(){
    try{
        const reponse = await fetch('https://jsonplaceholder.typicode.com/comments')
        const comments = await reponse.json()
        return comments
    }catch(e){
        console.error(e);
    }
}

function commentsView (comments) {
    let commentsHTML = ''
    comments.map(comment =>{
        commentsHTML +=
        `
        <div class="comment__container">
            <h3 class="comment__name">${comment.name}</h3>
            <h5 class="comment__email">${comment.email}</h5>
            <hr>
            <p class="comment__body">${comment.body}</p>
        </div>
        `
    })
    return commentsHTML
}


export {getAllComments, commentsView}
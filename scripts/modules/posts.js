import {commentsView} from './comments.js'

async function getAllPost() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await response.json()
    return posts    
}

const postsView = (post, user, comments, container)=>{
    container.innerHTML += `
    <div class="post">
        <div class="post__header">
            <div class="post__img">
                <h3 class="post__userimage">${user.id}</h3>
            </div>
            <div class="post__information">
                <h3 class="post__username">${user.username}</h3>
                <h5 class="post__name">${user.name}</h5>
            </div>
        </div>
        <div class="post__content">
            <h3 class="post__title">${post.title}</h3>
            <p class="post__body">${post.body}</p>
        </div>
        <div class="post__controls">
            <div class="post__like-btn button"><i class="fas fa-heart"></i>Like</div>
            <div class="post__comments-btn button"><i class="far fa-comment-dots"></i>Comments</div>
        </div>
        <div class="comments" expanded="false">
            <h3 class="comments__title">Comments:</h3>
            ${commentsView(comments)}
        </div></div>
    `
}

export {getAllPost, postsView}

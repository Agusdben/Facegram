import {handleComments, searchCommentsXidPost} from "./main.js"
import {getAllPost, postsView} from "./modules/posts.js"
import {getAllUsers, userView} from "./modules/users.js"
import {getAllComments} from "./modules/comments.js"

const $main = document.querySelector('.main')
let posts = []
let users = []
let comments = []

document.addEventListener('DOMContentLoaded', async ()=>{
    try{
        posts = await getAllPost()
        users = await getAllUsers()
        comments = await getAllComments()
    }catch (e) {
        console.error(e);
    }
    controller()
})

const controller = () =>{
    load()

    const $commentsBtn = document.querySelectorAll('.post__comments-btn')
    $commentsBtn.forEach(element => {
        element.addEventListener('click', handleComments)
    })
}



const load = () => {
    const params = new URLSearchParams(window.location.search)
    const username = params.get('username')
    let user = users.filter(user => user.username == username)
    user = user[0]
    const userPost = posts.filter(post => post.userId == user.id)
    userView(user, $main)
    const $userContent = document.querySelector('.user__content')
    userPost.map(post =>{
        const comments = searchCommentsXidPost(post.id)
        postsView(post, user, comments, $userContent)
    })
}
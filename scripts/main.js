//https://jsonplaceholder.typicode.com/

import { getAllPost, postsView } from "./modules/posts.js";
import {getAllUsers} from './modules/users.js'
import {getAllComments} from './modules/comments.js'

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
    postsMixer()
    document.querySelector('input[type="search"]').addEventListener('keypress', ()=> alert() )
    const $commentButton = document.querySelectorAll('.post__comments')
    $commentButton.forEach(element => {
        element.addEventListener('click', handleComments)
    });


})

//This function is for dynamic post view, i does this because i don't have a real data base for update with new posts.
const postsMixer = () => {
    let postsIds = []
    posts.map(post =>{
        postsIds.push(post.id)
    })
    do{
        const idRoll = Math.floor(Math.random()*postsIds.length)
        let postId = postsIds[idRoll]
        postsIds.splice(idRoll, 1)
        const post = posts[--postId]
        const user = users[--post.userId]
        const commentsXpost = searchCommentsXidPost(post.id)
        postsView(post, user, commentsXpost, $main)
    }while (postsIds.length > 0)
}

const searchCommentsXidPost = idPost => {
    let commentsXpost = []
    comments.map(comment =>{
        if(comment.postId == idPost) commentsXpost.push(comment)
    })
    return commentsXpost
}

function handleComments(){
    const $comments= this.parentNode.parentNode.lastChild
    const expanded = $comments.getAttribute('expanded')
    if(expanded == 'false') {
        $comments.style.display = 'block'
        $comments.style.maxHeight = 'fit-content'
        $comments.setAttribute('expanded', 'true')
    }
    if(expanded == 'true'){
        $comments.style.display = 'none'
        $comments.style.maxHeight = '0'
        $comments.setAttribute('expanded', 'false')
    }
}
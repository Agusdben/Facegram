//https://jsonplaceholder.typicode.com/

import { getAllPost, postsView } from "./modules/posts.js";
import {getAllUsers} from './modules/users.js'
import {getAllComments} from './modules/comments.js'

const $loader = document.querySelector('.loader') 
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

const controller = () => {
    $loader.style.display = 'none'

    postsMixer()

    document.querySelector('input[type="search"]').addEventListener('keypress', ()=> alert() )

    document.querySelectorAll('.post__comments-btn').forEach(element => {
        element.addEventListener('click', handleComments)
    })

    document.querySelectorAll('.post__username').forEach(element =>{
        element.addEventListener('click', findUserFromUsername)
    })

    document.querySelectorAll('.post__userimage').forEach(element =>{
        element.addEventListener('click', findUserFromUserimage)
    })
}

//This function is for dynamic post view, i does this because i don't have a real data base for update with new posts.
const postsMixer = () => {
    let postsIds = []
    let postsHTML = ''
    posts.map(post =>{
        postsIds.push(post.id)
    })
    do{
        const idRoll = Math.floor(Math.random()*postsIds.length)
        let postId = postsIds[idRoll]
        postsIds.splice(idRoll, 1)
        const post = posts[--postId]
        let user = users[--post.userId]
        const commentsXpost = searchCommentsXidPost(post.id)
        postsHTML += postsView(post, user, commentsXpost)
    }while (postsIds.length > 0)
    document.querySelector('.main-index').innerHTML = postsHTML
}

const searchCommentsXidPost = idPost => {
    let commentsXpost = []
    comments.map(comment =>{
        if(comment.postId == idPost) commentsXpost.push(comment)
    })
    return commentsXpost
}

function handleComments(){
    //this reference button clicked
    const $comments= this.parentNode.parentNode.lastChild
    $comments.classList.toggle('comments--active')
    this.classList.toggle('button--active')
}

function findUserFromUsername(){
    const $userName = this.parentNode.querySelector('.post__username').innerText
    toUserPage($userName)
}

function findUserFromUserimage(){
    const $userName = this.parentNode.parentNode.querySelector('.post__username').innerText
    toUserPage($userName)
}


const toUserPage = ($userName) => {
    window.location = `/pages/user.html?username=${$userName}`
}

export {searchCommentsXidPost, handleComments, findUserFromUsername, findUserFromUserimage}
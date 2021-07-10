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

    const $commentButton = document.querySelectorAll('.post__comments-btn')
    $commentButton.forEach(element => {
        element.addEventListener('click', handleComments)
    })

    const $postUsername = document.querySelectorAll('.post__username')
    $postUsername.forEach(element =>{
        element.addEventListener('click', findUserFromUsername)
    })

    const $postUserimage = document.querySelectorAll('.post__userimage')
    $postUserimage.forEach(element =>{
        element.addEventListener('click', findUserFromUserimage)
    })
}

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
        let user = users[--post.userId]
        const commentsXpost = searchCommentsXidPost(post.id)
        const $main = document.querySelector('.main-index')
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
    //this reference the button of comments clicked
    const $comments= this.parentNode.parentNode.lastChild
    const expanded = $comments.getAttribute('expanded')
    if(expanded == 'false') {
        $comments.style.display = 'block'
        $comments.style.maxHeight = 'fit-content'
        this.style.backgroundColor = 'var(--color3)'
        $comments.setAttribute('expanded', 'true')
    }
    if(expanded == 'true'){
        $comments.style.display = 'none'
        $comments.style.maxHeight = '0'
        this.style.backgroundColor = 'transparent'
        $comments.setAttribute('expanded', 'false')
    }

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
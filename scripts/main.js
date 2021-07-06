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
})



//This function is for dynamic post view, i does this because i don't have a real data base for update with new posts.
const postsMixer = ()=>{
    let postsIds = []
    posts.map(post =>{
        postsIds.push(post.id)
    })
    do{
        const idRoll = Math.floor(Math.random()*postsIds.length)
        let postId = postsIds[idRoll]
        postsIds.splice(idRoll, 1)
        let post = posts[--postId]
        let user = users[--post.userId]
        postsView(post, user, $main)
    }while (postsIds.length > 0)
}
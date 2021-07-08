import {handleComments, searchCommentsXidPost} from "./main.js"
import {getAllPost, postsView} from "./modules/posts.js"
import {getAllUsers, userAddressInfoView, userBasicInfoView, userInformationView, userView, userWorkInfoView} from "./modules/users.js"
import {getAllComments} from "./modules/comments.js"

const $main = document.querySelector('.main')
let posts = []
let users = []
let comments = []
let $userContent
let user
let userAlbumHTML
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

    const $informationButton = document.querySelector('.user__information-btn')
    $informationButton.addEventListener('click', handleInfo)

    const $postsButton = document.querySelector('.user__posts-btn')
    $postsButton.addEventListener('click', ()=>{controller()})
}

const load = () => {
    const params = new URLSearchParams(window.location.search)
    const username = params.get('username')
    user = users.filter(user => user.username == username)
    user = user[0]
    const userPost = posts.filter(post => post.userId == user.id)
    userView(user, $main)
    $userContent = document.querySelector('.user__content')
    userPost.map(post =>{
        const comments = searchCommentsXidPost(post.id)
        postsView(post, user, comments, $userContent)
    })
}

const handleInfo = () => {
    $userContent.innerHTML = userInformationView(user)
    const $infoContainer = $userContent.querySelector('.info__container')
    
    const basicInfoHTML = userBasicInfoView(user)
    $infoContainer.innerHTML = basicInfoHTML
    const basicButton = $userContent.querySelector('.info__basic-btn')
    basicButton.addEventListener('click', ()=>{$infoContainer.innerHTML = basicInfoHTML})

    const addressInfoHTML = userAddressInfoView(user)
    const addressButton = $userContent.querySelector('.info__address-btn')
    addressButton.addEventListener('click', ()=>{$infoContainer.innerHTML = addressInfoHTML})

    const workInfoHTML = userWorkInfoView(user)
    const workButton = $userContent.querySelector('.info__work-btn')
    workButton.addEventListener('click', ()=>{$infoContainer.innerHTML = workInfoHTML})
}
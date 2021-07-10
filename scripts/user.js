import {handleComments, searchCommentsXidPost} from "./main.js"
import {getAllPost, postsView} from "./modules/posts.js"
import {getAllUsers, userAddressInfoView, userBasicInfoView, userInformationView, userView, userWorkInfoView} from "./modules/users.js"
import { albumsView, getAllAlbums } from "./modules/albums.js"
import { getAllPhotos } from "./modules/photos.js"

const $main = document.querySelector('.main')
let posts = []
let users = []
let albums = []
let photos = []
let $userContent //this container load content when you click in a button (posts, information, albums)
let user
let userAlbumHTML
document.addEventListener('DOMContentLoaded', async ()=>{
    try{
        posts = await getAllPost()
        users = await getAllUsers()
        albums = await getAllAlbums()
        photos = await getAllPhotos()
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
    $postsButton.style.backgroundColor = 'var(--color3)'

    const $albumsButton = document.querySelector('.user__albums-btn')
    $albumsButton.addEventListener('click', handleAlbums)

    const $postUsername = document.querySelectorAll('.post__username')
    $postUsername.forEach(element =>{
        element.addEventListener('click', ()=>{window.scrollTo({top: 0, behavior: 'smooth'})})
    })

    const $postUserimage = document.querySelectorAll('.post__userimage')
    $postUserimage.forEach(element =>{
        element.addEventListener('click', ()=>{window.scrollTo({top: 0, behavior: 'smooth'})})
    })
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

function handleInfo() {
    resetUserControllsBtnStyle(this)
    this.style.backgroundColor = 'var(--color3)'

    $userContent.innerHTML = userInformationView(user)
    const $infoContainer = $userContent.querySelector('.info__container')

    handleInfoBtnStyle()
    
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

//manage style of clicked buttons in information section
const handleInfoBtnStyle = () => {
    const $btns = $userContent.querySelectorAll('[class*="-btn"]')
    $btns[0].style.color = 'var(--iconColor)'
    $btns[0].style.backgroundColor = 'var(--color3)'
    $btns[0].style.textDecoration = 'underline'
    $btns.forEach(element => {
        element.addEventListener('click', function(){
            $btns.forEach(el =>{ 
                el.style.color = '#fff'
                el.style.backgroundColor = 'var(--color2)'
                el.style.textDecoration = 'none'
            })
            this.style.color = 'var(--iconColor)'
            this.style.backgroundColor = 'var(--color3)'
            this.style.textDecoration = 'underline'
        });
    })
}

const resetUserControllsBtnStyle = (thisElement) => {
    const $userControllsBtn = document.querySelector('.user__controlls').querySelectorAll('[class *= "-btn"]')
    $userControllsBtn.forEach( element => {
        element.style.backgroundColor = 'transparent'
        element.addEventListener('mouseover', ()=> element.style.backgroundColor = 'var(--color3)')
        element.addEventListener('mouseleave', ()=> {
            if(thisElement != element) element.style.backgroundColor = 'transparent' //thisElement referece the last button clicked
        })
    })
}

function handleAlbums(){
    resetUserControllsBtnStyle(this)
    console.log(this);
    this.style.backgroundColor = 'var(--color3)'

    const albumsXuser = albums.filter( album => album.userId == user.id)

    $userContent.innerHTML = ''
    const albumContainer = document.createElement('div')
    albumContainer.classList.add('albums__container')
    $userContent.append(albumContainer)
    const container = $userContent.querySelector('.albums__container')
    let albumsHTML = ''
    albumsXuser.map( album => {
        const photosXalbum = photos.filter( photo => photo.albumId == album.id)
        albumsHTML += albumsView(album, photosXalbum) 
    })
    container.innerHTML = albumsHTML
}
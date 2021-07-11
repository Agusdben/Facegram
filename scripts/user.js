import {handleComments, searchCommentsXidPost} from "./main.js"
import {getAllPost, postsView} from "./modules/posts.js"
import {getAllUsers, userAddressInfoView, userBasicInfoView, userInformationView, userView, userWorkInfoView} from "./modules/users.js"
import { albumsView, getAllAlbums } from "./modules/albums.js"
import { getAllPhotos, pohotosView } from "./modules/photos.js"

const $main = document.querySelector('.main')
let posts = []
let users = []
let albums = []
let photos = []
let $userContent //this container load content when you click in a button (posts, information, albums)
let user

document.addEventListener('DOMContentLoaded', async()=>{
    try{
        posts = await getAllPost()
        users = await getAllUsers()
        albums = await getAllAlbums()
        photos = await getAllPhotos()
    }catch (e) {
        console.error(e);
    }
    load()
    controller()
    document.querySelector('.user__posts-btn').click()
})


const load = () => {
    const params = new URLSearchParams(window.location.search)
    const username = params.get('username')
    user = users.filter(user => user.username == username)
    user = user[0]
    userView(user, $main)
    $userContent = document.querySelector('.user__content')
}

const controller = () =>{
    const $postsButton = document.querySelector('.user__posts-btn')
    $postsButton.addEventListener('click', handlePost)

    const $informationButton = document.querySelector('.user__information-btn')
    $informationButton.addEventListener('click', handleInfo)

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


function handlePost() {
    resetUserControllsBtnStyle()
    this.style.backgroundColor = 'var(--color3)'
    $userContent.innerHTML = ''

    const userPost = posts.filter(post => post.userId == user.id)
    
    userPost.map(post =>{
        const comments = searchCommentsXidPost(post.id)
        postsView(post, user, comments, $userContent)
    })

    const $commentsBtn = document.querySelectorAll('.post__comments-btn')
    $commentsBtn.forEach(element => {
        element.addEventListener('click', handleComments)
    })
}

function handleInfo() {
    resetUserControllsBtnStyle()
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

const resetUserControllsBtnStyle = () => {
    const $userControllsBtn = document.querySelector('.user__controlls').querySelectorAll('[class *= "-btn"]')
    $userControllsBtn.forEach( element => {element.style.backgroundColor = 'transparent'})
}

function handleAlbums(){
    resetUserControllsBtnStyle()
    this.style.backgroundColor = 'var(--color3)'

    const albumsXuser = albums.filter( album => album.userId == user.id)

    $userContent.innerHTML = ''
    const albumContainer = document.createElement('div')
    albumContainer.classList.add('albums__container')
    const h3 = document.createElement('h3')
    h3.classList.add('Albums__title')
    h3.innerText = 'Albums'
    albumContainer.append(h3)
    $userContent.append(albumContainer)
    const container = $userContent.querySelector('.albums__container')

    let albumsHTML = ''
    let photosXalbums = []
    albumsXuser.map( album => {
        const photosXalbum = photos.filter( photo => photo.albumId == album.id)
        photosXalbums.push(photosXalbum)
        albumsHTML += albumsView(album, photosXalbum) 
    })
    container.innerHTML += albumsHTML

    document.querySelectorAll('.album')
    .forEach( element => {
        element.addEventListener('click', handleModalPhotos)
    })
    
}


async function handleModalPhotos(){
    document.body.style.overflowY = 'hidden'

    const albumName = this.querySelector('.album__title').innerText.toLowerCase() 

    const album = albums.filter( album => album.title == albumName)
    const photosXalbum = photos.filter(photo => photo.albumId == album[0].id);

    document.body.innerHTML += pohotosView(photosXalbum, photosXalbum[0])

    document.querySelector('.fa-times-circle').addEventListener('click', function(){
        document.querySelector('.photos').remove()
        document.body.style.overflowY = 'unset'

        //js take document as new, so i need to load again the controlls 
        load() 
        controller()

        document.querySelector('.user__albums-btn').addEventListener('click', handleAlbums)
        document.querySelector('.user__albums-btn').click()
    })

    document.querySelectorAll('.photos__container img').forEach(element => {
        element.addEventListener('click', function(){
            const thisThumbnailUrl = this.getAttribute('src')
            const photo = photosXalbum.filter(photo => photo.thumbnailUrl == thisThumbnailUrl)
            document.querySelector('.photos__active img').setAttribute('src', photo[0].url)
            document.querySelector('.photos__title').innerText = photo[0].title
        })
    })
}
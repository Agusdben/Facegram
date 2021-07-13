import { getAllPost } from "./modules/posts.js";
import { getAllUsers } from "./modules/users.js";
import { getAllPhotos, loadPhotos } from "./modules/photos.js"

let posts
let users
let photos
document.addEventListener('DOMContentLoaded', async ()=>{
    try{
        posts = await getAllPost()
        users = await getAllUsers()
        photos = await getAllPhotos()
    }catch (e) {
        console.error(e);
    }
    controller()
    console.log(photos.length);
})


const controller = () =>{
    showPhotos()
}


const showPhotos = async () =>{

    const rollAndShowNewPhotos = () => {
        for(let i = 0; i < 5000; i++){
            let randomId = Math.floor( Math.random() * photosId.length )
            let photo = photos[photosId[randomId]]
            console.log(photo);
            photosToShow.push(photo)
            photosId.splice(randomId, 1)
        }

        document.querySelector('.photos__compass-container').innerHTML += loadPhotos(photosToShow)
        document.querySelectorAll('img').forEach( element => {
            element.style.display = 'grid'
            element.style.gridTemplateColumns = 'repeat(4, 1fr)'
            element.style.overflow = 'unset'
        })
    }


    let photosId = photos.map( photo => photo.id)
    let photosToShow = []
    let photosToLoad = 50
    rollAndShowNewPhotos(photosToShow)

    window.addEventListener("scroll", function(){
        let scrollMaxY = (document.documentElement.scrollHeight - document.documentElement.clientHeight)
        let lasKnowScrollPosition = window.scrollY;
        console.log(scrollMaxY);
        if(lasKnowScrollPosition == scrollMaxY && photosToLoad < photos.length){
            photosToShow = []
            photosToLoad += 50
            rollAndShowNewPhotos(photosToShow)
        }

    });
    

}
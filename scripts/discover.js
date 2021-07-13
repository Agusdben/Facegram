import { getAllPost } from "./modules/posts.js";
import { getAllUsers } from "./modules/users.js";
import { getAllPhotos, loadPhotos } from "./modules/photos.js"

const container = document.querySelector('.photos__compass-container')
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
        let fragment = document.createDocumentFragment()
        let i = 0
        let photo
        do{
            let randomId = Math.floor( Math.random() * photos.length )
            if (randomId == 5000) randomId = 4999
            if(rolls.indexOf(randomId) == -1 ) photo = photos[randomId]
            else continue
            rolls.push(randomId)

            let img = new Image()
            img.src = photo.thumbnailUrl
            img.alt = photo.title

            fragment.appendChild(img)
            i++
        } while (i < 100)

        container.appendChild(fragment)
    }


    let photosToLoad = 50
    let rolls = []
    rollAndShowNewPhotos()

    window.addEventListener("scroll", function(){
        let scrollMaxY = (document.documentElement.scrollHeight - document.documentElement.clientHeight)
        let lasKnowScrollPosition = window.scrollY;
        if(lasKnowScrollPosition == scrollMaxY && photosToLoad < photos.length){
            photosToLoad += 50
            rollAndShowNewPhotos()
        }

    });
    

}
import { getAllPost } from "./modules/posts";
import { getAllUsers } from "./modules/users";
import { getAllPhotos } from "./modules/photos"

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
})


const controller = () =>{

}
import { postsView } from "../modules/posts.js"

async function getAllUsers(){
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
    const users = await response.json()
    return users
}

function userView(user, container) {
    container.innerHTML = 
    `
    <div class="user">
            <div class="user__container">
                <div class="user__coverpage">
                    <div class="user__card">
                        <div class="user__img">
                            <div class="user__userimage">${user.id}</div>
                        </div>
                        <h3 class="user__username">${user.username}</h3>
                        <h5 class="user__name">${user.name}</h5>
                    </div>
                </div>
                <div class="user__controlls">
                    <div class="user__posts-btn button"><i class="fas fa-globe"></i> <p>Posts</p></div>
                    <div class="user__information-btn button"><i class="fas fa-info"></i> <p>Information</p></div>
                    <div class="user__albums-btn button"><i class="fas fa-images"></i> <p>Albums</p></div>
                </div>
                <div class="user__content">
                </div>
            </div>
        </div>
    `
}
export {getAllUsers, userView}
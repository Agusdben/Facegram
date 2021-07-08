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

const userInformationView = () =>{
    return `
    <div class="info">
        <div class="info__controlls">
            <div class="info__basic-btn button">Basic</div>
            <div class="info__address-btn button">Address</div>
            <div class="info__work-btn button">Work</div>
        </div>
        <div class="info__container">
        </div>
    </div>
    `
}

const userBasicInfoView = (user) => {
    return `
        <h3 class="info__title">Basic Info</h3>
        <h3 class="info__email"><i class="fas fa-envelope"></i><p>${user.email}</p></h3>
        <h3 class="info__phone"><i class="fas fa-phone"></i><p>${user.phone}</p></h3>
        <h3 class="info__website"><i class="fas fa-link"></i><p>${user.website}</p></h3>
    `
}

const userAddressInfoView = (user) => {
    return `
        <h3 class="info__title">Address Info</h3>
        <h3 class="info__city"><i class="fas fa-map-marker-alt"></i><p>${user['address'].city}</p></h3>
        <h3 class="info__street"><i class="fas fa-road"></i><p>${user['address'].street}</p></h3>
        <h3 class="info__zipcode"><i class="fas fa-mail-bulk"></i><p>${user['address'].zipcode}</p></h3>
    `
}

const userWorkInfoView = (user) => {
    return `
        <h3 class="info__title">Work Info</h3>
        <h3 class="info__company-name"><i class="fas fa-briefcase"></i><p>${user['company'].name}</p></h3>
        <h3 class="info__catchPhrase"><i class="fas fa-quote-left"></i><p>${user['company'].catchPhrase}</p></h3>
        <h3 class="info__bs"><i class="fas fa-tag"></i><p>${user['company'].bs}</p></h3>
    `
}

export {getAllUsers, userView, userInformationView, userBasicInfoView, userAddressInfoView, userWorkInfoView}
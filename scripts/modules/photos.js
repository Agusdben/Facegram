async function getAllPhotos(){
    try{
        const reponse = await fetch('https://jsonplaceholder.typicode.com/photos')
        const photos = await reponse.json()
        return photos
    }catch(e){
        console.error(e);
    }
}

const pohotosView = (photos, active) => {
    return `
        <div class = "photos">
            <i class="far fa-window-close"></i>
            <div class = "photos__active">
                <h3 class="photos__title">${active.title}</h3>
                <img src="${active.url}" alt="${active.title}">
            </div>
            <div class = "photos__container">
                ${loadPhotos(photos)}
            </div>
        </div>
    `
}

const loadPhotos = (photos) => {
    let photosHTML = ''
    photos.map(photo =>{
        photosHTML += `<img src="${photo.thumbnailUrl}" alt="${photo.title}">`
    })
    return photosHTML
}

export {getAllPhotos, pohotosView}
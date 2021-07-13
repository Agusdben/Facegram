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
            <div class="photos__content">
                <i class="fas fa-times-circle"></i>
                <div class = "photos__active">
                        <h3 class="photos__title">${active.title}</h3>
                        <img src="${active.url}" alt="${active.title}">
                    </div>
                    <div class = "photos__container">
                        ${loadPhotos(photos)}
                    </div>
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

export {getAllPhotos, pohotosView, loadPhotos}
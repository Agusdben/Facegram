async function getAllAlbums(){
    try{
        const reponse = await fetch('https://jsonplaceholder.typicode.com/albums')
        const albums = await reponse.json()
        return albums
    }catch(e){
        console.error(e);
    }
}


const albumsView = (album, albumImg) => {
    return `
        <div class = "album">
            <div class = "album__pictures"> 
                <div class = "album__img"><img src ='${albumImg[0].thumbnailUrl}' alt='${albumImg[0].title}'></div>
                <div class = "album__img"><img src ='${albumImg[1].thumbnailUrl}' alt='${albumImg[1].title}'></div>
                <div class = "album__img"><img src ='${albumImg[2].thumbnailUrl}' alt='${albumImg[2].title}'></div>
                <div class = "album__img"><img src ='${albumImg[3].thumbnailUrl}' alt='${albumImg[3].title}'><p class = "albums__pic-lefts">+${albumImg.length - 4}</p></div>
            </div>
            <h3 class = "album__title">${album.title}</h3>
        </div>
    `
}

const albumContainerLoad = ()=>{
    
}

export {getAllAlbums, albumsView}
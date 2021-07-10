async function getAllPhotos(){
    try{
        const reponse = await fetch('https://jsonplaceholder.typicode.com/photos')
        const photos = await reponse.json()
        return photos
    }catch(e){
        console.error(e);
    }
}

export {getAllPhotos}
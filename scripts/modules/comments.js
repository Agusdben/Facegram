async function getAllComments(){
    try{
        const reponse = await fetch('https://jsonplaceholder.typicode.com/comments')
        const comments = await reponse.json()
        console.log(comments);
        return comments
    }catch(e){
        console.error(e);
    }
}

export {getAllComments}
import { findUserFromUserimage, findUserFromUsername } from "../main.js"

const searchUser = (users) => {
    document.querySelector('input[type="search"]').addEventListener('keyup', function() {
        const boxSearch = document.querySelector('.box-search')
        boxSearch.innerHTML = ''
        if(this.value == "") boxSearch.style.display = 'none'
        else boxSearch.style.display = 'block'
        const match = users.filter(user => user.username.toLowerCase().includes(this.value.toLowerCase()));
        let userFragment = document.createDocumentFragment()
        match.forEach(user => {
            userFragment.appendChild(createUserFragment(user))
        boxSearch.appendChild(userFragment)
        })

        document.querySelectorAll('.box-search__username').forEach(element =>{
            element.addEventListener('click', findUserFromUsername)
        })
    
        document.querySelectorAll('.box-search__userimage').forEach(element =>{
            element.addEventListener('click', findUserFromUserimage)
        })
    })
}

const createUserFragment = user =>{
    const div = document.createElement('div')
    div.classList.add('box-search__user')
    
    const img = document.createElement('div')
    img.classList.add('box-search__img')
    const userImage = document.createElement('h3')
    userImage.setAttribute('class', 'box-search__userimage')
    userImage.innerText = user.id
    img.appendChild(userImage)
    div.appendChild(img)
    
    const info = document.createElement('div')
    info.classList.add('box-search__information')
    const username = document.createElement('h3')
    username.setAttribute('class', 'box-search__username')
    username.innerText = user.username
    const h5 = document.createElement('h5')
    h5.classList.add('box-search__name')
    h5.innerText = user.name
    info.appendChild(username)
    info.appendChild(h5)

    div.appendChild(info)

    return div
}

export {searchUser}
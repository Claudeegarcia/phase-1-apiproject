const BASE_URL = 'https://pokeapi.co/api/v2/'

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('type').addEventListener('click', getTypes)
    getTypes()
})

function getTypes(){
    
    let main = document.getElementById('main ul')
    let info = document.getElementById('info')
    let typeLis = document.getElementById('type-list')
    info.innerHTML = ""
    fetch(`https://pokeapi.co/api/v2/type`)
        .then(res => res.json())
        .then(name => {
            name.results.map(type => {
                typeLis.innerHTML += `
                <li>
                    <a href="#" data-id="${type.url}" data-value=${type.name}>${type.name}</a>
                    <button data-likes="0" id="${type.id}" class="buttons">like!</button>
                </li>
                `
                
            })

         attachClicksToLinks()
            

        })

        


}

function attachClicksToLinks(){
    const likeButtons = document.querySelectorAll('button.buttons')
    likeButtons.forEach(show =>{
        show.addEventListener('click', likeType)
    })
    const type = document.querySelectorAll('li a')
    type.forEach(type => {
        type.addEventListener('click', displayType)
    })
}


function likeType(e){
    
    const li = e.target.parentElement
    const button = e.target
    const likes = li.querySelector('p')
    button.dataset.likes ++
    likes === null ? li.insertAdjacentHTML('beforeend', `<p <id='likes'> Likes: ${button.dataset.likes}</p>`) : likes.innerText = `Likes: ${button.dataset.likes}`
}
// e = event
async function displayType(e) {
    console.log(e.target)
    let info = document.getElementById('info')
    let typeLis = document.getElementById('type-list')
    typeLis.innerHTML = ""
    let type = e.target.dataset.value
    
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
        .then(res => res.json())
        .then(name => {
            info.innerHTML = 
            `${name.damage_relations.double_damage_from[0].url}`
            console.log(name)
        })
}
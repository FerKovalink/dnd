let personajes = []
let formPer
let formPjs
let inPj
let inRaza
let inDes
let inImg
let verPjs
let cartelPj

class Personaje {
    constructor(pj, raza, des, img) {
        this.pj = pj
        this.raza = raza.toUpperCase()
        this.des = des
        this.img = img
    }
}

function iniciarElementos() {
    formPer = document.getElementById("formPer")
    formPjs = document.getElementById("formPjs")
    inPj = document.getElementById("inPj")
    inRaza = document.getElementById("inRaza")
    inDes = document.getElementById("inDes")
    inImg = document.getElementById("inImg")
    verPjs = document.getElementById("verPjs")
    cartelPj = document.getElementById("cartelPj")
}

function iniciarEventos() {
    formPjs.onsubmit = (event) => validPjs(event)
}

function validPjs(event) {
    event.preventDefault()
    let pj = inPj.value
    let raza = inRaza.value
    let des = inDes.value
    let img = inImg.value

    const valPj = personajes.some((personaje) => personaje.pj === pj)

    if (personajes.length > 2) {
        cartelPjs("Solo puedes crear hasta 3 personajes")
    } else {
        if (!valPj) {
            let nuevoPj = new Personaje(pj, raza, des, img)

            personajes.push(nuevoPj)
            formPjs.reset()
            updatePjs()
            mostrarPjs()
        } else {
            cartelPjs("El nombre ya esta en uso, elije otro")
        }
    }
}

function cartelPjs(mensaje) {
    const cartel = document.createElement("div")
    cartel.className = "alert"
    cartel.innerHTML = `<h3> ${mensaje} </h3>`
    cartelPj.append(cartel)
    setTimeout(function () {
        cartel.style.display = "none"
    }, 2000)
}

function delPj(personaje) {
    let borrarPj = document.createElementById(`card-${personaje}`)
    let indexPj = personajes.findIndex((personaje) => personaje.pj === personaje)

    personajes.splice(indexPj, 1)
    borrarPj.remove()
    updatePjs()
}

function mostrarPjs() {
    personajes.forEach((personaje) => {
        let card = document.createElement("div")
        card.className = "carousel-item active"
        card.id = `card-${personaje.pj}`
        card.innerHTML = `
        <div class="product-card">
        <div class="product-image">
            <img src=${personaje.img}>
        </div>
        <div class="product-details">
            <h2>${personaje.pj}</h2>
            <h3>${personaje.raza}</h3>
            <p>${personaje.des}</p>
        </div>`
        verPjs.append(card)

        // let btnDel = document.getElementsById(`btnDel-${personaje.pj}`)
        // btnDel.onclick = () => delPj(personaje.pj)
    })
}

function updatePjs() {
    let pjJSON = JSON.stringify(personajes)
    localStorage.setItem("personajes", pjJSON)
}

function getPjs() {
    let pjJSON = localStorage.getItem("personajes")
    if (pjJSON) {
        personajes.JSON.parse(pjJSON)
        mostrarPjs()
    }
}

function delAll() {
    localStorage.clear()
    personajes = []
    mostrarPjs()
}

function armar() {
    let nuevoPj = new Personaje("Dungeon Master", "DM", "Patt creador, director y guionista de las aventuras. Cabeza y parte del team", "src/img/pjs/dm.png")
    let nuevoPjs = new Personaje("Thork", "enano", "Un enano de las montañas del sur pija larga", "src/img/pjs/dm.png")

    personajes.push(nuevoPj, nuevoPjs)
    updatePjs()
    mostrarPjs()

}

function main() {
    iniciarElementos()
    iniciarEventos()
    // armar()
    getPjs()
}

main()
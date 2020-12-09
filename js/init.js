window.mostrar = (personajes) =>{

    const molde = document.querySelector(".molde-personaje");
    const contenedor = document.querySelector(".contenedor");
    for(let i=0; i < personajes.length; ++1){
        let p = personajes[i];
        let copia = molde.cloneNode(true);
        copia.querySelector('.nombre-titulo').innerText = p.name;
        copia.querySelector('.imagen-personaje').src = p.img;
        contenedor.appendChild(copia);

    }

};


window.addEventListener('DOMContentLoaded', async ()=>{

    let respuesta = await axios.get("https://www.breakingbadapi.com/api/characters");
    let personajes = respuesta.data;
    window.mostrar(personajes);
});
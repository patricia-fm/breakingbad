if(navigator.serviceWorker){
    navigator.serviceWorker.register("/sw.js");
}

window.mostrarPersonaje = function(){
    let molde = document.querySelector('.molde-info-personaje').cloneNode(true);
    let personaje = this.personaje;
    molde.querySelector('.personaje-nombre').innerText = personaje.name;
    molde.querySelector('.personaje-ocupacion').innerText = personaje.occupation;

    const icono = molde.querySelector('.icono-estado');
    if(personaje.status == "Deceased"){
        icono.classList.add("fas", "fa-skull-crossbones", "text-danger")
    }else if(personaje.status == "Alive"){
        icono.classList.add("fab", "fa-creative-commons-sampling-plus", "text-success")
    }else if(personaje.status == "Presumed dead"){
        icono.classList.add("far", "fa-question-circle", "text-primary")
    }
    molde.querySelector('.personaje-apodo').innerText = personaje.nickname;
    molde.querySelector('.personaje-actor').innerText = personaje.portrayed;
    molde.querySelector('.personaje-imagen').src = personaje.img;
   
    Swal.fire({
        title: personaje.name,
        html: molde.innerHTML
    });

};

window.mostrar = (personajes) =>{

    const molde = document.querySelector(".molde-personaje");
    const contenedor = document.querySelector(".contenedor");
    for(let i=0; i < personajes.length; ++i ){
        let p = personajes[i];
        let copia = molde.cloneNode(true);
        copia.querySelector(".nombre-titulo").innerText = p.name;
        copia.querySelector(".imagen-personaje").src = p.img;
        copia.querySelector(".btn-personaje").personaje = p;
        copia.querySelector(".btn-personaje").addEventListener("click", window.mostrarPersonaje);
        contenedor.appendChild(copia);

        

    }

};


window.addEventListener("DOMContentLoaded", async ()=>{

    let respuesta = await axios.get("https://www.breakingbadapi.com/api/characters?limit=16&offset=0");
    let personajes = respuesta.data;
    window.mostrar(personajes);
});
window.addEventListener('DOMContentLoaded', async ()=>{
    let respuesta = await axios.get("https://www.breakingbadapi.com/api/characters");
    console.log(respuesta);
});
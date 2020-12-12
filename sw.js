const APP_SHELL = [
    //"/",
    "index.html",
    "vendor/fontawesome-free-5.15.1-web/fontawesome-free-5.15.1-web/css/all.min.css",
    "css/style.css",
    "img/breaking bad.png",
    "js/init.js"
];

const APP_SHELL_INMUTABLE = [
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js",
    "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
    "https://cdn.jsdelivr.net/npm/sweetalert2@10"

];

const CACHE_ESTATICO = "estatico-v1";
const CACHE_INMUTABLE = "inmutable-v1";

self.addEventListener('install', e=>{
    const cacheEstatico = caches.open(CACHE_ESTATICO).then(cache=>cache.addAll(APP_SHELL));
    const cacheInmutable = caches.open(CACHE_INMUTABLE).then(cache=>cache.addAll(APP_SHELL_INMUTABLE));
    e.waitUntil(Promise.all([cacheEstatico, cacheInmutable]));

});


self.addEventListener('install', e=>{
    console.log("El service worker fue instalado");
});

self.addEventListener('activate', e=>{
    console.log("El service worker fue activado");
});

self.addEventListener('fetch', e=>{
    const respuesta = caches.match(e.request).then(res=>{
        if(res && !e.request.url.includes("/api")){
            return res;

        } else {
            const petInternet = fetch(e.request).then(newRes=>{
                if(newRes.ok || newRes.type =='opaque'){
                    return caches.open("dinamico-v1").then(cache=>{
                        cache.put(e.request, newRes.clone());
                        return newRes.clone();
                    });
                
                } else {
                    console.log(newRes);
                    return newRes;
                }

            }).catch(error=>caches.match(e.request));
            return petInternet;

        }

    });

    e.respondWith(respuesta);
});
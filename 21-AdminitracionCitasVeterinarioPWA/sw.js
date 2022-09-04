const nombreCache = "APP-4";
const archivos = [
    '/',
    'css/css.css',
    'js/app.js',
    'Index.html',
    'Error.html'
]

self.addEventListener("install", e => {

    // Es un buen lugar para cachear las diferentes páginas
    // porque es en el primer momento que se incia la service worker
    e.waitUntil(
        caches.open(nombreCache)
            .then( cache => {
                cache.addAll(archivos);
            })
    )
})

self.addEventListener("activate", e => {
    console.log("Service Worker Activado");

    // Usar la última version de cache
    e.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(keys
                    .filter(key => key !== nombreCache)
                    .map(key => caches.delete(key)) // borrar los demas
                )
            })
    )
})

self.addEventListener("fetch", e => {
    console.log("Fetch..", e)
    e.respondWith(
        caches.match(e.request)
            .then(respuestaCache => {
                return respuestaCache || fetch(e.request);
            })
            .catch( e => { caches.match('/Error.html')
        })
    );
})


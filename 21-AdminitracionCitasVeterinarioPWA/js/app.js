if("serviceWorker" in navigator){
    navigator.serviceWorker.register("./sw.js")
        .catch( error => console.log(error));
}
else{
    console.log("Service Workers no soportados")
}



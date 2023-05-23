const txtAreaIngresado = document.getElementById('texto-ingresado');
const txtAreaResultado = document.getElementById('texto-resultado');
const seccionPresentacion = document.querySelector('.seccion-presentacion');
const seccionResultado = document.querySelector('.seccion-resultado');

var mapEncriptar = new Map();
var mapDesencriptar = new Map();

mapEncriptar.set('a', 'ai');
mapEncriptar.set('e','enter');
mapEncriptar.set('i','imes');
mapEncriptar.set('o','ober');
mapEncriptar.set('u','ufat');

mapDesencriptar.set('ai','a');
mapDesencriptar.set('enter','e');
mapDesencriptar.set('imes','i');
mapDesencriptar.set('ober','o');
mapDesencriptar.set('ufat','u');

txtAreaIngresado.addEventListener("keypress",verificar);

function verificar(e) {
    if(e.key.match(/[a-z\s]/i)===null) {
        e.preventDefault();
    }
}

function encriptar(){
    let textoIngresado = txtAreaIngresado.value;
    let textoEncriptado = '';
    let caracter = '';

    textoIngresado = textoIngresado.toLowerCase();

    if (textoIngresado == "") {
        return
    }
    console.log(textoIngresado);
       
    for(let i=0; i<textoIngresado.length; i++){
        caracter = textoIngresado[i];

        switch(caracter){
            case 'a':
            case 'e':
            case 'i':
            case 'o':
            case 'u':
                textoEncriptado += mapEncriptar.get(caracter);
                break;
            default:
                textoEncriptado += caracter;
        }
    }
    seccionPresentacion.style.visibility = 'hidden';
    seccionPresentacion.style.height = '0';
    seccionPresentacion.style.width = '0';
    seccionPresentacion.style.margin = '0';
    seccionResultado.style.visibility = 'visible';
    txtAreaResultado.value = textoEncriptado;
    txtAreaIngresado.value = "";
    txtAreaResultado.focus();
}

function desencriptar(){
    let textoDesencriptado = txtAreaIngresado.value;

    if (textoDesencriptado == "") {
        return
    }

    for (let clave of mapDesencriptar.keys()) {
        if (textoDesencriptado.includes(clave)){
            textoDesencriptado = textoDesencriptado.replaceAll(clave, mapDesencriptar.get(clave));
        }
    }
    
    seccionPresentacion.style.visibility = 'hidden';
    seccionResultado.style.visibility = 'visible';
    txtAreaResultado.value = textoDesencriptado;
    txtAreaIngresado.value = "";
    txtAreaResultado.focus();
}

function copiar(){
    navigator.clipboard.writeText(txtAreaResultado.value);
    txtAreaIngresado.focus();
}
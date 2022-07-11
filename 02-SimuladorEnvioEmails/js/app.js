const formContenedor = document.querySelector('.form-contenedor');

const destinatario = document.querySelector('#destinatario');
const asunto = document.querySelector('#asunto');
const cuerpoEmail = document.querySelector('#cuerpoEmail');

const btnEnviar = document.querySelector('.btn-Enviar');
const btnResetear = document.querySelector('.btn-Resetear');

cargarEventListeners();


function cargarEventListeners() {

    document.addEventListener('DOMContentLoaded', inicioApp);

    destinatario.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    cuerpoEmail.addEventListener('blur', validarFormulario);

    // Lo haces al formulario completo porque no haces una cosa específica con el boton, 
    // si no que añades algo al html.
    // Se utiliza el evento submit para indicar que se hace un evento cuando se pulsa un
    // boton de submit
    formContenedor.addEventListener('submit', enviarForm);

    btnResetear.addEventListener('click',resetearForm);

    btn
}

function validarFormulario(e)
{
   if(destinatario.value !== '' && asunto.value !== '' && cuerpoEmail.value !== '' ) {
      btnEnviar.disabled = false;
      btnEnviar.classList.remove('desactivado');
   }
   else
   {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('desactivado');
   }
}

function inicioApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('desactivado');
}

function resetearForm(e){
    e.preventDefault();
    formContenedor.reset();
}

function enviarForm(e)
{
    e.preventDefault();
    console.log('Toda esta puta mierda AAAAA');
    const hola = document.createElement('p');
    hola.textContent = "hola";
    formContenedor.append(hola);
}
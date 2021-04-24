document.getElementById("btn__iniciar-sesion").addEventListener("click",inisiarSesion);
document.getElementById("btn__registrarse").addEventListener("click",register);

window.addEventListener=("resize",anchopagina);

/*var UserName,password, expresion;
UserName = document.getElementById(UserName).value;
password = document.getElementById(password).value;
var error = document.getElementById(error);
error.style.color= "red";

var form = document.getElementById("formulario-login");
form.addEventListener("submit", function(evt){
    evt.preventDefault();
    var mensajesError =[];
    if(UserName === "" ){
        mensajesError.push("Ingresa tu Username");
    }else if(UserName.length>25){
        mensajesError.push("Username demasiado largo");
    };

    if( password === "" ){
        mensajesError.push("Ingresa tu password");
    };
    error.innerHTML = mensajesError.join(", ");
})*/




//topbar animaciones

[].slice.call(document.querySelectorAll('.dropdown .nav-link')).forEach(function(el){
    el.addEventListener('click', onClick, false);
});

function onClick(e){
    e.preventDefault();
    var el = this.parentNode;
    el.classList.contains('show-submenu') ? hideSubMenu(el) : showSubMenu(el);
}

function showSubMenu(el){
    el.classList.add('show-submenu');
    document.addEventListener('click', function onDocClick(e){
        e.preventDefault();
        if(el.contains(e.target)){
            return;
        }
        document.removeEventListener('click', onDocClick);
        hideSubMenu(el);
    });
}

function hideSubMenu(el){
    el.classList.remove('show-submenu');
}


//animacionlogeo-register
    //varibles

var contenedor_login_register=document.querySelector(".contenedor__login-register");
var formulario_login=document.querySelector(".formulario__login");
var formulario_register=document.querySelector(".formulario__register");
var caja_trasera_login=document.querySelector(".caja__trasera-login");
var caja_trasera_regiter=document.querySelector(".caja__trasera-register");

function anchopagina(){
    if(window.innerWidth>850){
        caja_trasera_login.style.display="block";
        caja_trasera_regiter.style.display="block";
    }else{
        caja_trasera_regiter.style.display = "block";
        caja_trasera_regiter.style.opacity="1";
        caja_trasera_login.style.display="none";
        formulario_login.style.display="block";
        formulario_register.style.display="none";
        contenedor_login_register.style.left ="0px";
    }
}

anchopagina();

function inisiarSesion () {

    if(window.innerWidth > 850){
        formulario_register.style.display = "none";
        contenedor_login_register.style.left ="10px";
        formulario_login.style.display = "block";
        caja_trasera_regiter.style.opacity = "1";
        caja_trasera_login.style.opacity = "0";
    }else{
        formulario_register.style.display = "none";
        contenedor_login_register.style.left ="0px";
        formulario_login.style.display = "block";
        caja_trasera_regiter.style.display = "block";
        caja_trasera_login.style.display = "none";
    }
}

function register () {

    if(window.innerWidth >850){
        formulario_register.style.display = "block";
        contenedor_login_register.style.left ="410px";
        formulario_login.style.display = "none";
        caja_trasera_regiter.style.opacity = "0";
        caja_trasera_login.style.opacity = "1";
    }else{
        formulario_register.style.display = "block";
        contenedor_login_register.style.left ="0px";
        formulario_login.style.display = "none";
        caja_trasera_regiter.style.display = "none";
        caja_trasera_login.style.display= "block";
        caja_trasera_login.style.opacity = "1";
    }
}
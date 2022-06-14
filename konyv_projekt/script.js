let button = document.querySelector('#button');
button.addEventListener('click',Darkmode)

function Darkmode() {
 let element = document.body;
    element.classList.toggle("dark-mode");
 }
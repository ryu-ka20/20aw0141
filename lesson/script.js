'use strict'
let list = document.querySelectorAll('.list');

function clickElm(){
    list[0].children[1].classList.toggle('none');
    list[0].children[1].classList.toggle('active');
}
list[0].addEventListener('click',clickElm)
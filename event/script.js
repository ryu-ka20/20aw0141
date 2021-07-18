'use strict'
let list = document.querySelectorAll('.list');
let title = document.querySelectorAll('title_');
    for(let i = 0;i < list.length; i++){
        function clickElm(){
        this.children[1].classList.toggle('inactive');
        this.children[1].classList.toggle('active');
    }
    list[i].addEventListener('click',clickElm)
}
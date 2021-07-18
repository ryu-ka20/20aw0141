window.addEventListener("scroll",function(){
    let scroll = document.documentElement.scrollTop;
    document.getElementById("scrollValue").textContent = scroll;
 
    if(scroll >= 300){
        document.querySelector("img").classList.add("ball");
    }else{
        document.querySelector("img").classList.remove("ball");
    }
});
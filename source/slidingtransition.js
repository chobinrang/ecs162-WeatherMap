function slide(){
    var box = document.getElementById("bottom");
    box.style.top = '0';
    var cover = document.getElementById("cover");
    cover.style.display = "none";
    //cover.style.display='none';
}

function slidedown(){
    var box = document.getElementById("bottom");
    box.style.top = '100%';
    var cover = document.getElementById("cover");
    cover.style.display = "block";
    //cover.style.display='none';
}
function slide(){
    var box = document.getElementById("bottom");
    box.style.top = '0';
    var cover = document.getElementById("cover");
    cover.style.height = "0";
    cover.style.padding = "0";
    //cover.style.display = "none";
    //cover.style.display='none';
}

function slidedown(){
    var box = document.getElementById("bottom");
    box.style.top = '100%';
    var cover = document.getElementById("cover");
    cover.style.height = "100vh";
    cover.style.padding = "0.5em";

    //cover.style.display = "block";
    //cover.style.display='none';
}
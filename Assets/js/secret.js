let siren = document.querySelector(".siren");
let gap = 350;

function change_blue(){
    siren.style.setProperty('background-color', 'blue');
    setTimeout(change_red, gap);
    return;
}

function change_red(){
    siren.style.setProperty('background-color', 'red');
    setTimeout(change_blue, gap);
    return;
}

change_blue();
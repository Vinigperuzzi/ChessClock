let alertAudio = new Audio ("Assets/audio/alert.mp3");
let endAudio = new Audio ("Assets/audio/end.mp3");
let counting = false;

const whiteDisplay = {
  HoursDisplay: document.querySelector('#white-hours'),
  MinutesDisplay: document.querySelector('#white-minutes'),
  SecondsDisplay: document.querySelector('#white-seconds')
};

const blackDisplay = {
  HoursDisplay: document.querySelector('#black-hours'),
  MinutesDisplay: document.querySelector('#black-minutes'),
  SecondsDisplay: document.querySelector('#black-seconds')
};

let whiteTimer;
let blackTimer;

function getTimerFromHTML(hour, minute, second, incHour, incMinute, incSecond){
  return {
    hour: parseInt(hour, 10),
    minute: parseInt(minute, 10),
    second: parseInt(second, 10),
    incHour: parseInt(incHour, 10),
    incMinute: parseInt(incMinute, 10),
    incSecond: parseInt(incSecond, 10)
  };
}

const form = [];
const evClick = [];
form[0] = document.querySelector("#form-1");
form[1] = document.querySelector("#form-2");
evClick[0] = document.querySelector("#white-click");
evClick[1] = document.querySelector("#black-click");

form[0].addEventListener('submit', (event) => {
    setTime(event, 0);
});
form[1].addEventListener('submit', (event) => {
    setTime(event, 1);
});
evClick[0].addEventListener('click', (event) => {
  click(event, 0);
});
evClick[1].addEventListener('click', (event) => {
  click(event, 1);
});

let [whiteReady, blackReady, toClick] = [false, false, 0];

function setTime (event, index){
  event.preventDefault();
  if (counting){
    return;
  }
    const timer = form[index].querySelector(`#timer-${index+1}`);
    const incremento = form[index].querySelector(`#incremento-${index+1}`);
    let oldColor = document.querySelector(':root');
    let whiteColor = document.querySelector("#white-click p");
    let blackColor = document.querySelector("#black-click p");
    whiteColor.innerHTML = "click!";
    blackColor.innerHTML = "click!";
    oldColor.style.setProperty('--cor3', '#eecfc4');
    oldColor.style.setProperty('--cor1', '#d3c6cc');
    let [hours, minutes, seconds] = timer.value.split(":");
    let [incHours, incMinutes, incSeconds] = incremento.value.split(":");
    if (index == 0){
      whiteTimer = getTimerFromHTML(hours, minutes, seconds, incHours, incMinutes, incSeconds);
      whiteReady = true;
      displayTwoZeroWhite();
    } else {
      blackTimer = getTimerFromHTML(hours, minutes, seconds, incHours, incMinutes, incSeconds);
      blackReady = true;
      displayTwoZeroBlack();
    }
}

let whiteIntervalID, blackIntervalID;

function click (event, index){
  event.preventDefault();
  if (!whiteReady){
    alert("Ops... Valores ainda não definidos para o jogador de brancas.");
    return;
  }
  if (!blackReady){
    alert("Ops... Valores ainda não definidos para o jogador de negras.");
    return;
  }
  if (index == 0 && toClick != 0){
    return;
  }
  if (index == 1 && toClick != 1){
    return;
  }
  if (index == 0 && toClick == 0){
    clearInterval(whiteIntervalID);
    setInc(0);
    blackIntervalID = setInterval(displayBlackTimer, 1000);
  }
  if (index == 1 && toClick == 1){
    clearInterval(blackIntervalID);
    setInc(1);
    whiteIntervalID = setInterval(displayWhiteTimer, 1000);
  }
  toClick = (++toClick)%2;
}

function displayWhiteTimer(){
  whiteTimer.second--;
  if (whiteTimer.second < 0){
    whiteTimer.second = 59;
    whiteTimer.minute--;
    if(whiteTimer.minute < 0){
      whiteTimer.minute = 59;
      whiteTimer.hour--;
    }
  }
  displayTwoZeroWhite();
  if (whiteTimer.hour == 0 && whiteTimer.minute == 0 && whiteTimer.second == 59){
    alertAudio.play();
  }
  if (whiteTimer.hour <= -1){
    clearInterval(blackIntervalID);
    clearInterval(whiteIntervalID);
    endAudio.play();
    endGame(0);
  }
}

function displayBlackTimer(){
  blackTimer.second--;
  if (blackTimer.second < 0){
    blackTimer.second = 59;
    blackTimer.minute--;
    if(blackTimer.minute < 0){
      blackTimer.minute = 59;
      blackTimer.hour--;
    }
  }
  displayTwoZeroBlack();
  if (blackTimer.hour == 0 && blackTimer.minute == 0 && blackTimer.second == 59){
    alertAudio.play();
  }
  if (blackTimer.hour <= -1){
    clearInterval(whiteIntervalID);
    clearInterval(blackIntervalID);
    endAudio.play();
    endGame(1);
  }
}

function displayTwoZeroWhite(){
  let h = whiteTimer.hour < 10 ? '0' + `${whiteTimer.hour}` : `${whiteTimer.hour}`;
  let m = whiteTimer.minute < 10 ? '0' + `${whiteTimer.minute}` : `${whiteTimer.minute}`;
  let s = whiteTimer.second < 10 ? '0' + `${whiteTimer.second}` : `${whiteTimer.second}`;
  whiteDisplay.HoursDisplay.innerHTML = `${h}`;
  whiteDisplay.MinutesDisplay.innerHTML = `${m}`;
  whiteDisplay.SecondsDisplay.innerHTML = `${s}`;
}

function displayTwoZeroBlack(){
  let h = blackTimer.hour < 10 ? '0' + `${blackTimer.hour}` : `${blackTimer.hour}`;
  let m = blackTimer.minute < 10 ? '0' + `${blackTimer.minute}` : `${blackTimer.minute}`;
  let s = blackTimer.second < 10 ? '0' + `${blackTimer.second}` : `${blackTimer.second}`;
  blackDisplay.HoursDisplay.innerHTML = `${h}`;
  blackDisplay.MinutesDisplay.innerHTML = `${m}`;
  blackDisplay.SecondsDisplay.innerHTML = `${s}`;
}

let firstMove = false;
function setInc(index){
  if(!firstMove){
    firstMove = true;
    counting = true;
    return;
  }
  if(index == 1){
    blackTimer.hour += blackTimer.incHour;
    blackTimer.minute += blackTimer.incMinute;
    blackTimer.second += blackTimer.incSecond;
    if(blackTimer.second >= 60 || blackTimer.minute >= 60){
      fixInc(1);
    }
    displayTwoZeroBlack();
  } else {
    whiteTimer.hour += whiteTimer.incHour;
    whiteTimer.minute += whiteTimer.incMinute;
    whiteTimer.second += whiteTimer.incSecond;
    if(whiteTimer.second >= 60 || whiteTimer.minute >= 60){
      fixInc(0);
    }
    displayTwoZeroWhite();
  }
}

function fixInc(index){
  if(index == 0){
    if(whiteTimer.second >= 60){
      whiteTimer.minute++;
      whiteTimer.second = whiteTimer.second - 60;
    }
    if(whiteTimer.minute >= 60){
      whiteTimer.hour++;
      whiteTimer.minute = whiteTimer.minute - 60;
    }
  } else {
    if(blackTimer.second >= 60){
      blackTimer.minute++;
      blackTimer.second = blackTimer.second - 60;
    }
    if(blackTimer.minute >= 60){
      blackTimer.hour++;
      blackTimer.minute = blackTimer.minute - 60;
    }
  }
}

function endGame(index){
  let [lostColor, winColor] = ["#a31041", "#1035a3"];
  if(index == 0){
    let newColor = document.querySelector(':root');
    let resultWin = document.querySelector("#white-click p");
    let resultLoss = document.querySelector("#black-click p");
    resultWin.innerHTML = "perdeu!";
    resultLoss.innerHTML = "ganhou!";
    newColor.style.setProperty('--cor3', lostColor);
    newColor.style.setProperty('--cor1', winColor);
    whiteDisplay.HoursDisplay.innerHTML = `00`;
    whiteDisplay.MinutesDisplay.innerHTML = `00`;
    whiteDisplay.SecondsDisplay.innerHTML = `00`;
  } else {
    let newColor = document.querySelector(':root');
    newColor.style.setProperty('--cor1', lostColor);
    newColor.style.setProperty('--cor3', winColor);
    let resultWin = document.querySelector("#black-click p");
    let resultLoss = document.querySelector("#white-click p");
    resultWin.innerHTML = "perdeu!";
    resultLoss.innerHTML = "ganhou!";
    blackDisplay.HoursDisplay.innerHTML = `00`;
    blackDisplay.MinutesDisplay.innerHTML = `00`;
    blackDisplay.SecondsDisplay.innerHTML = `00`;
  }
  counting = false; whiteReady = false; blackReady = false; firstMove = false;
}

//TODO: fazer a lógica do gameover quando algum lado chegar a 0
//      e ajustar os incrementos para que não passem de 60 segundos ou minutos

let whiteHours, whiteMinutes, whiteSeconds, blackHours, blackMinutes, blackSeconds;
let whiteIncHours, whiteIncMinutes, whiteIncSeconds, blackIincHours, blackIncMinutes, blackIncSeconds;

let whiteHoursDisplay = document.querySelector('#white-hours');
let whiteMinutesDisplay = document.querySelector('#white-minutes');
let whiteSecondsDisplay = document.querySelector('#white-seconds');
let blackHoursDisplay = document.querySelector('#black-hours');
let blackMinutesDisplay = document.querySelector('#black-minutes');
let blackSecondsDisplay = document.querySelector('#black-seconds');

let whiteReady = false, blackReady = false;

const form = [];
form[0] = document.querySelector("#form-1");
form[1] = document.querySelector("#form-2");


form[0].addEventListener('submit', (event) => {
    setTime(event, 1);
  });
form[1].addEventListener('submit', (event) => {
    setTime(event, 2);
  });

function setTime (event, index){
    const timer = form[index-1].querySelector(`#timer-${index}`);
    const incremento = form[index-1].querySelector(`#incremento-${index}`);
    event.preventDefault();
    if (index == 1){
        [whiteHours, whiteMinutes, whiteSeconds] = timer.value.split(":");
        [whiteIncHours, whiteIncMinutes, whiteIncSeconds] = incremento.value.split(":");
        console.log(`Hours: ${whiteHours}, minutes: ${whiteMinutes} and seconds: ${whiteSeconds}`);
        console.log(`Hours: ${whiteIncHours}, minutes: ${whiteIncMinutes} and seconds: ${whiteIncSeconds}`);
        console.log(`E o parâmetro é: ${index}`);
    } else {
        [blackHours, blackMinutes, blackSeconds] = timer.value.split(":");
        [blackIncHours, blackIncMinutes, blackIncSeconds] = incremento.value.split(":");
        console.log(`Hours: ${blackHours}, minutes: ${blackMinutes} and seconds: ${blackSeconds}`);
        console.log(`Hours: ${blackIncHours}, minutes: ${blackIncMinutes} and seconds: ${blackIncSeconds}`);
        console.log(`E o parâmetro é: ${index}`);
    }
    
}


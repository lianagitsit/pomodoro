/* POMODORO CLOCK
   A timer that allows the user to set work times and break times.
   Defaults to 25 minute work time and 5 minute break time, but times 
   are customizable in one-minute increments. At the end of each time
   period, a bell rings to notify the user and the countdown automatically
   begins for the next period. The user can reset the clock for their next 
   pomodoro.
*/

$(document).ready(function () {
    console.log("Okay I'm ready");

    var timer = document.getElementById("timer");
    var userInput = document.getElementById("userInput");

    var minutes = userInput.value;

    var seconds = 10;
    console.log("input: " + userInput);

    // listens for user entry into input field and fires timer setting
    userInput.addEventListener("input", myFunc);

    function myFunc(event){
        // console.log(event);
        console.log("input received: " + event.target.value);

        // sets the empty timer space to user's input
        // convert minutes to seconds
        // change this to more secure method
        timer.innerHTML = minutes;
    }


    // fires the countdown function every second
    //var count = setInterval(countdown, 1000);

    function countdown(){
        // stop the countdown when the timer reaches 0
        if (minutes === 0 && seconds === 0){
            clearInterval(count);
            timer.innerHTML = "Time's up!";
            return;
        // roll over from one minute to the next
        } else if (seconds === 0 && minutes >= 1){
            seconds = 59;
            minutes = minutes - 1;
        }

        // format timer display
        if (seconds < 10){
            timer.innerHTML = minutes + ":0" + seconds;                    
        } else {
            timer.innerHTML = minutes + ":" + seconds;                    
        }

        // decrement timer by seconds
        seconds = seconds - 1;
    }
});
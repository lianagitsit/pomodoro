/* POMODORO CLOCK
   A timer that allows the user to set work times and break times.
   Defaults to 25 minute work time and 5 minute break time, but times 
   are customizable in one-minute increments. At the end of each time
   period, a bell rings to notify the user and the countdown automatically
   begins for the next period. The user can reset the clock for their next 
   pomodoro.
*/

$(document).ready(function () {

    var timerDisplay = document.getElementById("timerDisplay");
    var workInput = document.getElementById("workInput");
    var breakInput = document.getElementById("breakInput");
    var message = document.getElementById("message");
    var count;
    var timerIsOn = false;

    const WORK_DEFAULT = 1;
    const BREAK_DEFAULT = 1;

    // create sound object
    //var timesUpSound = new Audio("wind-chime-2.mp3");

    //set default time
    workInput.value = WORK_DEFAULT;
    breakInput.value = BREAK_DEFAULT;
    //timerDisplay.textContent = WORK_DEFAULT;

    // countdown from defaults
    // when user clicks timer display, start countdown
    timerDisplay.addEventListener("click", startClock);

    function startClock(){
        var minutes;
        var seconds;
        var itsWorkTime = true;
        var myInterval = 500;

        timerIsOn = true;
        if (timerIsOn){
            timerDisplay.removeEventListener("click", startClock);
            //timerDisplay.addEventListener("click", pauseClock);
        }
        
        minutes = workInput.value;
        seconds = 0;

        // fires the countdown function every second
        setTimeout(countdown, myInterval);

        function countdown() {

            if (itsWorkTime){
                message.innerHTML = "Work :-(";
            } else {
                message.innerHTML = "Break :-)";
            }    

            // when one timer finishes, roll to the next
            if (minutes === 0 && seconds === 0) {
                document.getElementById("sound").play();
                //timesUpSound.play();
                if (itsWorkTime){
                    minutes = breakInput.value;
                    itsWorkTime = false;    
                } else {
                    minutes = workInput.value;
                    itsWorkTime = true;
                }
            }       

            // format timer display
            if (seconds < 10) {
                timerDisplay.innerHTML = minutes + ":0" + seconds;
            } else {
                timerDisplay.innerHTML = minutes + ":" + seconds;
            }

            // decrement to 59s to roll over the minute
            if (seconds === 0 && minutes >= 1) {
                seconds = 59;
                minutes = minutes - 1;
            } else {
                seconds = seconds - 1;
            }        

            setTimeout(countdown, myInterval);
            
            //console.log("Time left: " + minutes + "minutes and " + seconds + " seconds.");
        }

    }


       /* // listens for user entry into input field and fires timer setting
    workInput.addEventListener("input", myFunc);

    function myFunc(event) {
        // console.log(event);
        console.log("input received: " + event.target.value);

        // sets the empty timer space to user's input
        // convert minutes to seconds
        // change this to more secure method
        timerDisplay.innerHTML = workInput.value;
    }
    */

});
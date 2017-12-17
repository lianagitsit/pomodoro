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

    var reset = document.getElementById("reset");
    var resetClicked = false;

    var count = 0;
    var timerIsOn = false;

    const WORK_DEFAULT = 1;
    const BREAK_DEFAULT = 1;

    //set default time
    workInput.value = WORK_DEFAULT;
    breakInput.value = BREAK_DEFAULT;
  
    // when user clicks START, start clock
    timerDisplay.addEventListener("click", handleTimerClick);

    // when user clicks RESET, start clock from defaults
    //reset.addEventListener("click", clickReset);

    /*function clickReset(){
        timerIsOn = false;
    }*/

    var myInterval = 500;

    function handleTimerClick(){
        // if the timer isn't on and it's the first session, start the clock
        if (!timerIsOn && count === 0){
            timerIsOn = true;
            countdown();
        // if the clock is running, pause
        } else if (timerIsOn){
            timerIsOn = false;
        } else if (!timerIsOn && count > 0){
            timerIsOn = true;
            countdown();
        }
    }

    /*function startClock(){
        var minutes = workInput.value;
        var seconds = 0;
        
        timerIsOn = true;

        /*if (timerIsOn){
            //timerDisplay.removeEventListener("click", startClock);
            //reset.removeEventListener("click", startClock);
            timerDisplay.addEventListener("click", pauseClock);
        }*/

        // fires the countdown function at interval
        //setTimeout(countdown, myInterval);


        /*function pauseClock(){
            timerIsOn = false;
            //timerDisplay.removeEventListener("click", pauseClock);
            //timerDisplay.addEventListener("click", resumeClock);
            //reset.addEventListener("click", startClock);
        }

        function resumeClock(){
            timerIsOn = true;
            //timerDisplay.removeEventListener("click", resumeClock);
            //timerDisplay.addEventListener("click", pauseClock);
            countdown();
        }
    }*/

    var minutes = workInput.value;
    var seconds = 0;
    var itsWorkTime = true;

    function countdown() {

        // check for pause condition
        if (!timerIsOn){
            return;
        }

        if (itsWorkTime){
           $(breakInput).removeClass("green");
           $(workInput).addClass("red");
        } else {
            $(workInput).removeClass("red");
            $(breakInput).addClass("green");
        }

        if (minutes === 0 && seconds === 0) {
            // play chime at end of current timer
            document.getElementById("sound").play();

            // when one timer finishes, set timer to the next
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
        
        count += 1;
        console.log("count: " + count);

        setTimeout(countdown, myInterval);           
        
    }

});
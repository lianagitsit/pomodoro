$(document).ready(function () {
    console.log("Okay I'm ready");

    var timer = document.getElementById("timer");
    var userInput = document.getElementById("userInput");

    var minutes = userInput.value;

    var seconds = 10;
    console.log("input: " + userInput);

    userInput.addEventListener("input", myFunc);

    function myFunc(event){
        // console.log(event);
        console.log("input received: " + event.target.value);
        timer.innerHTML = minutes;
    }



    //var count = setInterval(countdown, 1000);

    function countdown(){
        if (minutes === 0 && seconds === 0){
            clearInterval(count);
            timer.innerHTML = "Time's up!";
            return;
        } else if (seconds === 0 && minutes >= 1){
            seconds = 59;
            minutes = minutes - 1;
        }

        if (seconds < 10){
            timer.innerHTML = minutes + ":0" + seconds;                    
        } else {
            timer.innerHTML = minutes + ":" + seconds;                    
        }
        seconds = seconds - 1;
    }
});
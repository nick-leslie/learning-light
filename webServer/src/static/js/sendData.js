let lightOn = false;
let previoiusState;
//the goal is to make it so when the user presses the botton it resets the timer
let skipTimeStep = false;
let proposedState;
let timePressed = 0;
$(document).ready(function() {
    let dateManiger = new Date();
    if(dateManiger.getTime() - timePressed >= 5000) {
        $(".requstButtion").click(()=> {
                timePressed = dateManiger.getTime()
                lightOn = !lightOn;
                changeLightState(lightOn);
                skipTimeStep = true;
                $.ajax({
                    type: 'POST',
                    crossDomain: true,
                    dataType: 'JSON',
                    url:   ip() + 'jobs/request', // put server ip in an envorment varuble
                    data: jobConstructor(lightOn.toString(),10000),
                    success: function(jsondata){
                        console.log(jsondata);
                    }
                });
        });
    }
    function jobConstructor(cmd,time) {
        let job = 
        { 
            "token": sessionStorage.Token,
            "cmd":cmd,
            "time":time
        }
        console.log(job);
        return job;
    }
});
function startGetingState() {
    setInterval(() => {
            $.ajax({
                type: 'POSt',
                crossDomain: true,
                dataType: 'JSON',
                //un hard code this latter
                url:  ip() + 'status', // put server ip in an envorment varuble
                data: {token:sessionStorage.Token},
                success: function(jsondata){
                    console.log(jsondata);
                    if(lightOn != stringToBool(jsondata.status)) {
                        if(stringToBool(jsondata.status) == proposedState) {
                            changeLightState(stringToBool(jsondata.status));
                            lightOn = stringToBool(jsondata.status);
                        } else {
                            proposedState = stringToBool(jsondata.status)
                        }
                    } 
                    console.log(lightOn + "in state check")
                }
            });
    }, 1000);
}
function changeLightState(state) {
    if(state == true) {
        $('.state').text("the light is:ON");
    } else {
        $('.state').text("the light is:OFF");
    }
}
function stringToBool(string) {
    string = string.toString().toLowerCase();
    if(string == 'true') {
        return true;
    } else if(string == 'false') {
        return false;
    } else {
        return;
    }
}
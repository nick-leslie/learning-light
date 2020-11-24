let lightOn = false;
let previoiusState;
$(document).ready(function() {
    $(".requstButtion").click(()=> {
        lightOn = !lightOn;
        changeLightState(lightOn);
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
function startGetingState(teacher) {
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
                changeLightState(stringToBool(jsondata.status));
                lightOn = stringToBool(jsondata.status);
                console.log(lightOn + "in state check")
            }
        });
    }, 500);
}
function changeLightState(state) {
    if(state==previoiusState) {
        if(state == true) {
        $('.state').text("the light is:ON");
        } else {
            $('.state').text("the light is:OFF");
        }
    }
    previoiusState=state;
}
function stringToBool(string) {
    string = string.toLowerCase();
    if(string == 'true') {
        return true;
    } else if(string == 'false') {
        return false;
    } else {
        return;
    }
}
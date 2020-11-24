$(".login").click(() => {
    console.log("click hit");
    $.ajax({
        type: 'POST',
        crossDomain: true,
        dataType: 'JSON',
        url:  ip() +'login',
        data: {key: $(".code").val()},
        success: function(jsondata){
            console.log(jsondata);
            sessionStorage.Token = jsondata.token
            hideLogin();
            if(jsondata.status=="student") {
                showLight();
                startGetingState(jsondata)
            } else if (jsondata.status=="teacher") {
               let key = document.createElement('h1')
               key.innerHTML = "your key is:" + jsondata.keys;
               $("body").append(key);
            } else if (jsondata.status=="admin") {
                let key = document.createElement('h1')
                key.innerHTML = JSON.stringify(jsondata.keys);
                $("body").append(key);
            }
        } 
    });
});
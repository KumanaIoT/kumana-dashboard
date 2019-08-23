function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function pumpController(btnState) {
    if (!btnState.checked) {
        pState = "on";

        var payloadondata = {
            "state": {
                "desired": {
                    "latest": {
                        "sensors": {
                            "waterpump": "on"
                        },
                        "actuators": {

                        }
                    }
                },
                "reported": {
                    "latest": {
                        "sensors": {
                        }
                        ,
                        "actuators": {
                        }
                    }
                }
            }
        };

        $.ajax({
            url: KIOT_MQTT_DOMAIN_ENDPOINT + '/api/1/mqtt/device/' + KIOT_DEVICE_ID,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + keycloak.token
            },
            type: 'PUT',
            data: JSON.stringify(payloadondata),
            success: function () {
                console.log("mqtt sim success ON");
            }
        });
    } else {
        pState = "off";
        var payloadoffdata = {
            "state": {
                "desired": {
                    "latest": {
                        "sensors": {
                            "waterpump": "off"
                        },
                        "actuators": {

                        }
                    }
                },
                "reported": {
                    "latest": {
                        "sensors": {
                        }
                        ,
                        "actuators": {
                        }
                    }
                }
            }
        };

        $.ajax({
            url: KIOT_MQTT_DOMAIN_ENDPOINT + '/api/1/mqtt/device/' + KIOT_DEVICE_ID,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + keycloak.token
            },
            type: 'PUT',
            data: JSON.stringify(payloadoffdata),
            success: function () {
                console.log("mqtt sim success OFF");
            }
        });
        
    }

    var x = document.getElementById("snackbar")
    x.className = "show";
    x.className = x.className.replace("show", "");
    
    var tag = document.getElementById("switch");
    tag.className = "w3-mygreen w3-tag w3-large";
    tag.innerHTML = " Command Sent! System will be updated in a while...";

}
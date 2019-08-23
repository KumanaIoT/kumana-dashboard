var actionBt;
var cmdOn = "on";
var cmdOff = "off";

setInterval(function () {

    var tag = document.getElementById("pump_state");
    tag.className = "w3-red w3-tag w3-large";
    var status = " UNKNOWN";
    var pumpStateSensorValue;
    for (var i = 0; i < sensorsList.length; i++) {
        var PS = "";
        for (var i = 0; i < sensorsList.length; i++) {
            if (sensorsList[i].sensorId == KIOT_PUMP_STATE) {
                PS = sensorsList[i].readings[0].sensorValue;
                if (PS == cmdOn) {
                    tag.className = "w3-mygreen w3-tag w3-large";
                    status = " RUNNING";
                } else if (PS == cmdOff) {
                    tag.className = "w3-red w3-tag w3-large";
                    status = " NOT RUNNING";
                } else {
                }
            }
        }
        tag.innerHTML = status;
    }
}, 5000);

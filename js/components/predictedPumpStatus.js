var actionBt;
var pumpOn = "on";
var pumpOff = "off";
var fixedValueV = 24.0;
var fixedValueA = 0.9;
var currentCurent = 0;
var currentVoltage = 0;
setInterval(function () {

    var PredPmpStV = 0;
    var PredPmpStC = 0;
    for (var i = 0; i < sensorsList.length; i++) {
        if (sensorsList[i].sensorId == KIOT_VOLTAGE_SENSOR_ID) {

            PredPmpStV = sensorsList[i].readings[0].sensorValue;
            currentVoltage = sensorsList[i].readings[0].sensorValue;// variable will get exact values from here
        }
        if (sensorsList[i].sensorId == KIOT_CURRENT_SENSOR_ID) {
            PredPmpStC = sensorsList[i].readings[0].sensorValue;
            currentCurrent = sensorsList[i].readings[0].sensorValue;
        }
    }

    if (currentVoltage >= fixedValueV && currentCurrent >= fixedValueA) {
        var tag = document.getElementById("predicted_pump_state");
        tag.className = "w3-mygreen w3-tag w3-large";
        tag.innerHTML = " ON";
    } else {
        var tag = document.getElementById("predicted_pump_state");
        tag.className = "w3-red w3-tag w3-large";
        tag.innerHTML = " OFF";
    }
}, 5000);







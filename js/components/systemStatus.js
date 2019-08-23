var actionBt;
var latestVoltage = {};
var latestCurrent = {};


function findLatestObjectByTimeValue(objectValue, fn) {
    var latestTimestamp;
    if (typeof objectValue === 'object' && Array.isArray(objectValue.readings) 
        && objectValue.readings.length > 0) {
        
        getLatestSensorTelemetryTimestamp(objectValue.readings, function(latestTime) {
          latestTimestamp = latestTime; 
        });
        
        objectValue.readings.forEach(function (element) {
            if (element.reportedTimestamp == latestTimestamp.getTime()) {
                fn(element);
                return;
            }
        });
    }
}

setInterval(function () {
    findLatestObjectByTimeValue(voltageSensorValue, function(obj) {latestVoltage = obj; console.log("voltageSensorValue =========== : "+ latestVoltage)});
    findLatestObjectByTimeValue(currentSensorValue, function(obj) {latestCurrent = obj; console.log("currentSensorValue =========== : "+ latestCurrent)});
    
    if(latestVoltage.sensorValue !== null && latestCurrent.sensorValue !== null) {
        if (latestVoltage.sensorValue >= SYSTEM_VOLTAGE_INDICATOR_VALUE 
            && latestCurrent.sensorValue >= SYSTEM_CURRENT_INDICATOR_VALUE) {
    
            var tag = document.getElementById("System_state");
            tag.className = "w3-mygreen w3-tag w3-large";
    
            tag.innerHTML = " ON";
        }
        else {
            var tag = document.getElementById("System_state");
            tag.className = "w3-red w3-tag w3-large";
    
            tag.innerHTML = " OFF";
        }
    }
}, 5000);

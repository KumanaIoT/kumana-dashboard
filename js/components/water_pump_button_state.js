var actionBt;
var cmdOn = "on";
var cmdOff = "off";
var prevStatus=null;

setInterval(function () {
    for (var i = 0; i < sensorsList.length; i++) {
        setInterval(function () {
            var PS = "";
            for (var i = 0; i < sensorsList.length; i++) {
                if (sensorsList[i].sensorId == KIOT_PUMP_STATE) {
                    PS = sensorsList[i].readings[0].sensorValue;
                    if (PS == cmdOn) {
                    	document.getElementById("myonoffswitch").checked = false;
                        document.getElementById("spanCurrentMotorStatus").innerHTML = "Current Pump Status : ON";
                    } else if (PS == cmdOff) {
                        document.getElementById("spanCurrentMotorStatus").innerHTML = "Current Pump Status : OFF";
                    	document.getElementById("myonoffswitch").checked = true;
                    } else {
                        document.getElementById("spanCurrentMotorStatus").innerHTML = "Current Pump Status : UNKNOWN";
                    } 
                    if(prevStatus !=PS){
                    	document.getElementById("switch").innerHTML = "";
                        document.getElementById("spanCurrentMotorStatus").innerHTML = "Current Pump Status : UNKNOWN";
                    	prevStatus=PS;
                    }
                }
            }
        }, 5000);
    }
}
)

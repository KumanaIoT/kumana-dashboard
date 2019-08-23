setInterval(function () {
    var temV = 0;
    for (var i = 0; i < sensorsList.length; i++) {
        if (sensorsList[i].sensorId == KIOT_TEMPERATURE_SENSOR_ID) {

            temV = sensorsList[i].readings[0].sensorValue;
            var element = document.getElementById("temp-sensor");
            var temp = sensorsList[i].readings[0].sensorValue;
            var tempN = new Number(temp);
            element.innerHTML = tempN.toFixed(2) + "℃";
            var temValue = tempN.toFixed(0) * 2;
            if (temValue > 100) {
                temValue = 100;
            } else if (temValue < 0) {
                temValue = 0;
            }
            element.style.width = temValue + "%";
            if (sensorsList[i].readings[0].sensorValue > 0 && sensorsList[i].readings[0].sensorValue <= 25) {
                element.style.width = temValue + "%";
                element.style.backgroundColor = "#ff8000";

            } else if (sensorsList[i].readings[0].sensorValue > 25 && sensorsList[i].readings[0].sensorValue < 35) {
                element.style.width = temValue + "%";
                element.style.backgroundColor = "#ff0008";
            } else if (sensorsList[i].readings[0].sensorValue >= 35 && sensorsList[i].readings[0].sensorValue <= 100) {
                element.style.width = temValue + "%";
                element.style.backgroundColor = "#ff0008";
            }
        }
    }
}, 5000);







setInterval(function () {
    var humV = 0;
    for (var i = 0; i < sensorsList.length; i++) {
        if (sensorsList[i].sensorId == KIOT_HUMIDITY_SENSOR_ID) {
            humV = sensorsList[i].readings[0].sensorValue;
            var element = document.getElementById("hum");
            var hum = sensorsList[i].readings[0].sensorValue;
            var humN = new Number(hum);
            element.innerHTML = humN.toFixed(2) + "RH";
            element.style.width = humN.toFixed(0) + "%";
            //  document.alert(humN);
            if (sensorsList[i].readings[0].sensorValue > 0 && sensorsList[i].readings[0].sensorValue <= 25) {
                element.style.width = humN.toFixed(0) + "%";
                element.style.backgroundColor = "#ff3333";
            } else if (sensorsList[i].readings[0].sensorValue > 25 && sensorsList[i].readings[0].sensorValue <= 50) {
                element.style.width = humN.toFixed(0) + "%";
                element.style.backgroundColor = "#ff8000";
            } else if (sensorsList[i].readings[0].sensorValue > 50 && sensorsList[i].readings[0].sensorValue <= 75) {
                element.style.width = humN.toFixed(0) + "%";
                element.style.backgroundColor = "#ffcc00";
            } else if ((sensorsList[i].readings[0].sensorValue > 75 && sensorsList[i].readings[0].sensorValue <= 100)) {
                element.style.width = humN.toFixed(0) + "%";
                element.style.backgroundColor = "#33cc00";
            }
        }
    }
}, 5000);

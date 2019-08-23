function chargebattery() {
    var a;
    a = document.getElementById("div1");
    a.innerHTML = "&#xf244;";
    setTimeout(function () {
        a.innerHTML = "&#xf243;";
        a.style.color = "#ff3333";
    }, 1000);
    setTimeout(function () {
        a.innerHTML = "&#xf242;";
        a.style.color = "#ff8000";
    }, 2000);
    setTimeout(function () {
        a.innerHTML = "&#xf241;";
        a.style.color = "#ffcc00";
    }, 3000);
    setTimeout(function () {
        a.innerHTML = "&#xf240;";
        a.style.color = "#33cc00";
    }, 4000);
}
//chargebattery();
//setInterval(chargebattery, 5000);

setInterval(function () {
    var batteryGauge;
    a = document.getElementById("div1");
    a.innerHTML = "&#xf244;";
    document.getElementById('preview-textfield8').innerHTML = "0%";
    var bbtrV = 0;
    for (var i = 0; i < sensorsList.length; i++) {
        // look for the entry with a matching `code` value
        if (sensorsList[i].sensorId == KIOT_BATTERY_SENSOR_ID) {
            bbtrV = sensorsList[i].readings[0].sensorValue;
            var batteryLvl = new Number(sensorsList[i].readings[0].sensorValue).toFixed(2);
            // console.log(batteryLvl);
            if (batteryLvl > 0 && batteryLvl <= 25) {
                document.getElementById('preview-textfield8').innerHTML = batteryLvl + "%";
                a.innerHTML = "&#xf243;";
                a.style.color = "#ff3333";
            } else if (batteryLvl > 25 && batteryLvl <= 50) {
                document.getElementById('preview-textfield8').innerHTML = batteryLvl + "%";
                a.innerHTML = "&#xf242;";
                a.style.color = "#ff8000";
            } else if (batteryLvl > 50 && batteryLvl <= 75) {
                document.getElementById('preview-textfield8').innerHTML = batteryLvl + "%";
                a.innerHTML = "&#xf241;";
                a.style.color = "#ffcc00";
            } else if ((batteryLvl > 75 && batteryLvl <= 100)) {
                document.getElementById('preview-textfield8').innerHTML = batteryLvl + "%";
                a.innerHTML = "&#xf240;";
                a.style.color = "#33cc00";
            }
        }
    }
}, 5000);

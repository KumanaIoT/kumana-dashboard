setInterval(function () {
    var gsmCon = 0;
    for (var i = 0; i < sensorsList.length; i++) {
        if (sensorsList[i].sensorId == "e90a3dbd-83f3-44ab-944c-6dd94978de3d") {
            gsmCon = sensorsList[i].readings[0].sensorValue;
            var element = document.getElementById("gsmicon");
            /*   element.innerHTML = sensorsList[i].value + "";
             element.style.width = sensorsList[i].value + "%";
             */
            w3.toggleClass('#gsmicon', 'fa fa-signal', 'fa fa-exclamation-triangle');
        }
    }
}, 5000);
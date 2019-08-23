setInterval(function () {
    var conn = 0;
    for (var i = 0; i < sensorsList.length; i++) {
        if (sensorsList[i].sensorId == "e90a3dbd-83f3-44ab-944c-6dd94978de3d") {
            conn = sensorsList[i].readings[0].sensorValue;
            var element = document.getElementById("concerticon");
            console.log("connection :" + sensorsList[i].readings[0].sensorValue);
            /*   element.innerHTML = sensorsList[i].value + "";
             element.style.width = sensorsList[i].value + "%";
             */
            w3.toggleClass('#concerticon', 'fa fa-link', 'fa fa-exclamation-triangle');
        }
    }
}, 5000);
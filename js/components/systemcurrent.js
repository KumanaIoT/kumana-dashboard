setInterval(function () {
  var volt = 0;
  var ampere = 0;
  for (var i = 0; i < sensorsList.length; i++) {
    if (sensorsList[i].sensorId == KIOT_CURRENT_SENSOR_ID) {
      ampere = sensorsList[i].readings[0].sensorValue;
    }
    if (sensorsList[i].sensorId == KIOT_VOLTAGE_SENSOR_ID) {
      volt = sensorsList[i].readings[0].sensorValue;
    }
  }
  var element = document.getElementById("ampnvolt");
  var ampN = new Number(ampere);
  var voltN = new Number(volt);
  var s = new glareWidget(ampN.toFixed(2) + " A", voltN.toFixed(2) + " V", element);
}, 5000);


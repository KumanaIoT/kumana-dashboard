google.charts.load('current', { 'packages': ['gauge'] });
google.charts.setOnLoadCallback(function() {
    drawChart();
});

function drawChart() {

  var data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['RPM', 0]

  ]);

  var options = {
    height: 400, width : 305,
    whiteFrom: 0, whiteTo: 1000,
    yellowFrom: 1000, yellowTo: 3000,
    greenFrom: 3000, greenTo: 5000,
    minorTicks: 10,
    majorTricks: 5,
    max: 5000,
    min: 0
  };

  var chart = new google.visualization.Gauge(document.getElementById('pump-status'));
  chart.draw(data, options);

  setInterval(function () {
    var waterPumpSt=0;
    var rpm = 0
    var sList = [];
    sList = sensorsList;

    for (var k = 0; k < sList.length; k++){        
        if (sList[k].sensorId == KIOT_PUMP_SPEED_SENSOR_ID){

            waterPumpSt = sList[k].readings[0].sensorValue;

            // console.log("rpm val "+waterPumpSt);
            if (isNaN(waterPumpSt)) {
                return;
            } else {
                rpm = waterPumpSt;
                data.setValue(0, 1, Number(rpm));
                chart.draw(data, options);
            }
        }
      }
  }, 5000);

}

google.charts.load('current', {'packages': ['line', 'corechart']});

function drawChartLightLevelVSSystemCurrent(luxSensorData, currentSensorData) {
    var luxArray = []; 
    var ampArray = [];

    if(luxSensorData != null && Array.isArray(luxSensorData.readings)){
        luxArray = luxSensorData.readings; 
    }
    
    if(currentSensorData != null && Array.isArray(currentSensorData.readings)){
        ampArray = currentSensorData.readings;
    }
    
    var chartOptions = {
        legend: {position: 'bottom'},
        series: {
            0: {axis: 'LightLevel'},
            1: {axis: 'SystemCurrent'}
        },
        axes: {
            y: {
                LightLevel: {label: 'Light Level'},
                SystemCurrent: {label: 'System Current'}
            }
        },
        backgroundColor: {
            'fill': '#ffff',
            'fillOpacity': 0.5
        }
    };

    var chartDiv = document.getElementById('frvsrpm');
    var materialChart = new google.charts.Line(chartDiv);
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Time');
    data.addColumn('number', "Light Level");
    data.addColumn('number', "System Current");
    
    var luxArrayLength = luxArray.length;
    var ampArrayLength = ampArray.length;
    var iterateLimit = -1;
    if (luxArrayLength < ampArrayLength) {
        iterateLimit = luxArrayLength - 1;
    } else {
        iterateLimit = ampArrayLength - 1;
    }
    for (var i = iterateLimit; i >= 0; i--) {
        data.addRows([[formatGraphDateStr(luxArray[i].reportedTimestamp), Number(luxArray[i].sensorValue), Number(ampArray[i].sensorValue)]]);
    }
    
    if(iterateLimit <= 0){
        $('#noDataLightLevelSystemCurrent').removeClass("hidden"); 
        chartDiv.innerHTML = ""; // could have used this instead of using a seperate span ;) :P
    }else{
        $('#noDataLightLevelSystemCurrent').addClass("hidden");
        materialChart.draw(data, chartOptions);
    }    
}

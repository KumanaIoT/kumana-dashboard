google.charts.load('current', {'packages': ['line', 'corechart']});

function drawChartWaterFlowRateVSSystemCurrent(waterFlowSensorData, currentSensorData) {
    var waterArray = [];
    var currentArray = [];
    
    if(waterFlowSensorData != null && Array.isArray(waterFlowSensorData.readings)){
        waterArray = waterFlowSensorData.readings;
    }
    
    if(currentSensorData != null && Array.isArray(currentSensorData.readings)){
        currentArray = currentSensorData.readings;
    }
    
    var chartOptions = {
        series: {
            // Gives each series an axis name that matches the Y-axis below.
            0: {axis: 'waterFlowRate'},
            1: {axis: 'systemCurrent'}
        },
        axes: {
            y: {
                waterFlowRate: {label: 'Water Flow Rate'},
                systemCurrent: {label: 'System Current'}
            }
        },
        backgroundColor: {
            'fill': '#ffff',
            'fillOpacity': 0.5
        },
        legend: {position: 'bottom'},
    };

    var chartDiv = document.getElementById('wfrsc');
    var materialChart = new google.charts.Line(chartDiv);
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Time');
    data.addColumn('number', "Water Flow Rate");
    data.addColumn('number', "System Current");

    var waterArrayLength = waterArray.length;
    var currentArrayLength = currentArray.length;

    var iterateLimit = -1;
    if (waterArrayLength < currentArrayLength) {
        iterateLimit = waterArrayLength - 1;
    } else {
        iterateLimit = currentArrayLength - 1;
    }
    for (var i = iterateLimit; i >= 0; i--) {
        data.addRows([[formatGraphDateStr(waterArray[i].reportedTimestamp), Number(waterArray[i].sensorValue), Number(currentArray[i].sensorValue)]]);
    }
    
    if(iterateLimit <= 0){
        $('#noDataWaterFlowSystemCurrent').removeClass("hidden");   
        chartDiv.innerHTML = ""; // could have used this instead of using a seperate span ;) :P
    }else{
        $('#noDataWaterFlowSystemCurrent').addClass("hidden");  
        materialChart.draw(data, chartOptions);
    }    
}

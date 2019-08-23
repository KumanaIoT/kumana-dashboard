var sensorsList = [];
var alertList = [];
var chartArray = [];
var chartArrayTwo = [];
var incr = 0;
var lastUpdateTime;
var userName;
var alertsAndNotificationList = [];
var alertTypeMap = new Map();
var alertAndNotificationTableObjArr = [];
var waterLevelSensorValue, waterFlowSensorValue, batterySensorValue, currentSensorValue,
    humiditySensorValue, temperatureSensorValue, luxSensorValue, voltageSensorValue, 
    pumpSpeedSensorValue, pumpStateSensorValue, latestReportedTimestamp; 
var formatSensorDataReceived = moment().format('ddd MMM DD YYYY HH:mm:ss');
var aggregateSensorValue = [];   
var DATA_HISTORY_PERIOD_DATES = 1;
var periodChanged = false;


function resetData(){
    waterLevelSensorValue = [];
    waterFlowSensorValue= [];
    batterySensorValue= [];
    currentSensorValue = [];
    humiditySensorValue= [];
    temperatureSensorValue= [];
    luxSensorValue= [];
    voltageSensorValue= []; 
    pumpSpeedSensorValue = [];
    pumpStateSensorValue= [];
    latestReportedTimestamp = [];
    sensorsList = [];
}

function lastUpdateDateTime() {
    var updatedDateTime = document.getElementById("dateTime");
    if( Array.isArray(aggregateSensorValue) && aggregateSensorValue.length > 0) {
        getLatestSensorTelemetryTimestamp(aggregateSensorValue, function(latestTime) {
          latestReportedTimestamp = latestTime; 
        });
        formatSensorDataReceived = moment(latestReportedTimestamp).format('ddd MMM DD YYYY HH:mm:ss');
        aggregateSensorValue = [];
    }   
    updatedDateTime.innerHTML = "Last sensor data received : " + formatSensorDataReceived;
}

function findSensorInformationById(sensorId, fn) {
    sensorsList.filter(function(elem) {
      if (elem.sensorId == sensorId) {
        fn(elem);
      }  
    });        
}

function getLatestSensorTelemetryTimestamp(sensorInfo, fn) {
  var latestDate = new Date(Math.max.apply(null, sensorInfo.map(function(e) {

    return new Date(e.reportedTimestamp);
  })));
  fn(latestDate);
}

function seperateSensorValue() {
    console.log("finding sensor value for water level");
    findSensorInformationById(KIOT_WATER_LEVEL_SENSOR_ID, function(obj){ waterLevelSensorValue = obj;}) ;
    console.log("finding sensor value for water flow");
    findSensorInformationById(KIOT_WATER_FLOW_SENSOR_ID, function(obj){ waterFlowSensorValue = obj; }) ;
    console.log("finding sensor value for battery");
    findSensorInformationById(KIOT_BATTERY_SENSOR_ID, function(obj){ batterySensorValue = obj; }) ;
    console.log("finding sensor value for current");
    findSensorInformationById(KIOT_CURRENT_SENSOR_ID, function(obj){ currentSensorValue = obj; }) ;
    console.log("finding sensor value for humidity");
    findSensorInformationById(KIOT_HUMIDITY_SENSOR_ID, function(obj){ humiditySensorValue = obj; }) ;
    console.log("finding sensor value for temperature");
    findSensorInformationById(KIOT_TEMPERATURE_SENSOR_ID, function(obj){ temperatureSensorValue = obj; }) ;
    console.log("finding sensor value for lux");
    findSensorInformationById(KIOT_LUX_SENSOR_ID, function(obj){ luxSensorValue = obj; }) ;
    console.log("finding sensor value for voltage");
    findSensorInformationById(KIOT_VOLTAGE_SENSOR_ID, function(obj){ voltageSensorValue = obj; }) ;
    console.log("finding sensor value for pump speed");
    findSensorInformationById(KIOT_PUMP_SPEED_SENSOR_ID, function(obj){ pumpSpeedSensorValue = obj; }) ;
    console.log("finding sensor value for pump state");
    findSensorInformationById(KIOT_PUMP_STATE, function(obj){ pumpStateSensorValue = obj; }) ;

}

function aggregateSensorData() {
    aggregateSensorValue = aggregateSensorValue.concat(waterLevelSensorValue && Array.isArray(waterLevelSensorValue.readings) ? waterLevelSensorValue.readings : [],
                                                waterFlowSensorValue && Array.isArray(waterFlowSensorValue.readings) ? waterFlowSensorValue.readings : [],
                                                batterySensorValue && Array.isArray(batterySensorValue.readings) ? batterySensorValue.readings : [],
                                                currentSensorValue && Array.isArray(currentSensorValue.readings) ? currentSensorValue.readings : [],  
                                                humiditySensorValue && Array.isArray(humiditySensorValue.readings) ? humiditySensorValue.readings : [],
                                                temperatureSensorValue && Array.isArray(temperatureSensorValue.readings) ? temperatureSensorValue.readings : [],
                                                luxSensorValue && Array.isArray(luxSensorValue.readings) ? luxSensorValue.readings : [], 
                                                voltageSensorValue && Array.isArray(voltageSensorValue.readings) ? voltageSensorValue.readings : [], 
                                                pumpSpeedSensorValue && Array.isArray(pumpSpeedSensorValue.readings) ? pumpSpeedSensorValue.readings : [], 
                                                pumpStateSensorValue && Array.isArray(pumpStateSensorValue.readings) ? pumpStateSensorValue.readings : []);
    console.log(aggregateSensorValue.length);
}

var keycloak = Keycloak({
    url: KIOT_SSO_DOMAIN_ENDPOINT + '/auth',
    realm: REALM,
    clientId: CLIENT_ID,
    redirect_uri: REDIRECT_URL,
    flow: 'standard',
    'enable-cors': true,
    'ssl-required': SSL_REQUIRED
});

keycloak.init({
    onLoad: 'login-required',
    checkLoginIframe: false
})
        .success(authenticated => {
            if (!authenticated) {
            } else {
                document.getElementById("userName").innerHTML = keycloak.tokenParsed.preferred_username;
                if (keycloak.tokenParsed.preferred_username == "kiot-guest") {
                    document.getElementById("Cpanel").children[0].style.display = "none"
                } else {
                }
            }
        });

setInterval(function () {
    if (incr < 1) {
        document.getElementById('loading-wrapper').style.visibility = 'visible';
    }


    
    keycloak.updateToken(30).success(function () {
        $.ajax({
            url: KIOT_REPORTING_URL,
            headers: {
                'Authorization': 'Bearer ' + keycloak.token
            },
            type: 'GET',
            contentType: 'application/json',
            data: {
                sensorIds: [
                        KIOT_WATER_LEVEL_SENSOR_ID,
                        KIOT_WATER_FLOW_SENSOR_ID,
                        KIOT_BATTERY_SENSOR_ID,
                        KIOT_CURRENT_SENSOR_ID,
                        KIOT_HUMIDITY_SENSOR_ID,
                        KIOT_TEMPERATURE_SENSOR_ID,
                        KIOT_LUX_SENSOR_ID,
                        KIOT_VOLTAGE_SENSOR_ID,
                        KIOT_PUMP_SPEED_SENSOR_ID,
                        KIOT_PUMP_STATE,
                        ]
                        
               // since: since.format(),
               // before: before.format()                        
            },
            success: function (snapData) {
                console.log(snapData);
                if(snapData && snapData.sensors.length > 0) {
                    sensorsList = snapData.sensors;
                    console.log("snapData length :"+ snapData.sensors.length);
                    seperateSensorValue();
                    aggregateSensorData();
                } else{
                    resetData();
                }
                lastUpdateDateTime();
                
                if (incr < 1) {
                    document.getElementById('loading-wrapper').style.visibility = 'hidden';
                    incr++;
                }
                if(periodChanged){
                    drawCharts();
                    enabledPeriodSelectors();
                    periodChanged = false;
                }
            },
            async : false
        });

        function closeAction() {
            var close = document.getElementsByClassName("closebtn");
            var i;

            for (i = 0; i < close.length; i++) {
                close[i].onclick = function () {
                    var div = this.parentElement.parentElement.parentElement.parentElement.parentElement;
                    div.style.opacity = "0";
                    setTimeout(function () {
                        div.style.display = "none";
                    }, 600);
                }
            }
        }
    }).error(function () {
        keycloak.logout();
    });
}, SENSOR_VALUE_REFRESH_INTERVAL_MILLS);


keycloak.onTokenExpired = function () {

};


function drawCharts() {
    $(".progressDiv").removeClass("hidden");
    $(".progressDiv").addClass("show");
   
    drawChartLightLevelVSSystemCurrent(luxSensorValue,currentSensorValue);
    drawChartWaterFlowRateVSSystemCurrent(waterFlowSensorValue, currentSensorValue);
    
    if (incr < 1) {
        document.getElementById('loading-wrapper').style.visibility = 'hidden';
        incr++;
    }
    $(".progressDiv").removeClass("show");
    $(".progressDiv").addClass("hidden");
}

// charts
var graphGenReadyStatusCheckTimer = setInterval(function () {    
    drawCharts();
    setInterval(function () {
        drawCharts();
    }, GRAPH_REFRESH_INTERVAL_MILLS);
    clearInterval(graphGenReadyStatusCheckTimer);    
}, 5000);

keycloak.onTokenExpired = function () {

};

function retrieveDisplayMessageFromAlertType(alertType) {
    var primaryCode = alertType.primaryCode;
    var secondaryCode = alertType.secondaryCode;
    var description;
    if (primaryCode == "water-pump-message" && secondaryCode == "off-command-received") {
        description = "Pump OFF";
    } else if (primaryCode == "water-pump-message" && secondaryCode == "on-command-received") {
        description = "Pump ON";
    } else if (primaryCode == "water-pump-critical") {
        description = "Water Pump Critical";
    } else if (primaryCode == "battery-critical") {
        description = "Battery Critical";
    } else if (primaryCode == "current-critical") {
        description = "Current Critical";
    } else if (primaryCode == "water-flow-critical") {
        description = "Water Flow Critical";
    } else if (primaryCode == "temperature-critical") {
        description = "Temperature Critical";
    } else if (primaryCode == "humidity-critical") {
        description = "Humidity Critical";
    } else if (primaryCode == "lux-critical") {
        description = "Lux Critical";
    } else {
        description = primaryCode;
    }
    return description;
}

var KIOT_ALERTS_URL = KIOT_API_DOMAIN_ENDPOINT + "/api/1/alert-types/";
var KIOT_REPORTED_ALERTS_URL = KIOT_API_DOMAIN_ENDPOINT + "/api/1/alerts/devices/";

// Alerts & Notifications
function fetchAlertAndNotification(){
    $.ajax({
        url: KIOT_REPORTED_ALERTS_URL + KIOT_DEVICE_ID + "/paged?includeActive=true&includeResolved=true&includeInformational=true&orderBy=TIME_RAISED&page=0&size=" + NUM_OF_ALERTS_TO_SHOW,
        headers: {
            'Authorization': 'Bearer ' + keycloak.token
        },
        type: 'GET',
        contentType: 'application/json',

        success: function (allertsArray) {
            //createTableHeaderInAlertsAndNotificationTable()
            for (i = 0; i < allertsArray.length; i++) {
                var alert = allertsArray[i];
                var alertTypeId = alert.alertTypeId;

                // fetching alert-type for alert...
                // checking whether alert-type is cached already,
                var hasAlertType = alertTypeMap.has(alertTypeId);
                if (!hasAlertType) {
                    // alert type has not been cached before, fetching from backend...
                    $.ajax({
                        url: KIOT_ALERTS_URL + alertTypeId,
                        headers: {
                            'Authorization': 'Bearer ' + keycloak.token
                        },
                        type: 'GET',
                        contentType: 'application/json',
                        async: false,

                        success: function (alertType) {
                            alertTypeMap.set(alertType.id, alertType);
                        }
                    });
                }

                // getting alert type from alert type cache...
                var alertType = alertTypeMap.get(alertTypeId);

                // gatherting information to display,
                var timeAlertLastUpdated = formatAlertDate(alert.timeUpdated);
                var timeAlertReported = formatAlertDate(alert.timeFirstReported);
                var description = retrieveDisplayMessageFromAlertType(alertType);
                var alertSeverity = alertType.severity;

                var tableRowObj = new Object();
                tableRowObj.lastUpdatedTime = timeAlertLastUpdated;
                tableRowObj.reportedTime = timeAlertReported;
                tableRowObj.alertSevirity = alertSeverity;
                tableRowObj.description = description;
                alertAndNotificationTableObjArr[alertAndNotificationTableObjArr.length] = tableRowObj;
            }
            updateAlertsAndNotificationTable();
        }
    });
}

setTimeout(function (){
    fetchAlertAndNotification();
    setInterval(function (){
        fetchAlertAndNotification();
    }, ALERT_FETCH_INTERVAL_MILLS);
}, 4000);

// end alerts

function createTableHeaderInAlertsAndNotificationTable() {
    var alertsAndNotificationTable = document.getElementById("alertAndNotificationTable");
    alertsAndNotificationTable.innerHTML = "";
    var newTableRow = alertsAndNotificationTable.insertRow();
    var descriptionCell = newTableRow.insertCell(0);
    var severityCell = newTableRow.insertCell(1);
    var timeReportedCell = newTableRow.insertCell(2);
    var lastUpdatedCell = newTableRow.insertCell(3);
    descriptionCell.innerHTML = "<b>Description</b>";
    severityCell.innerHTML = "<b>Severity</b>";
    timeReportedCell.innerHTML = "<b>Time Reported</b>";
    lastUpdatedCell.innerHTML = "<b>Last Updated</b>";
}

function populateAlertAndNotificationTableRow(tableRowObj) {
    var alertsAndNotificationTable = document.getElementById("alertAndNotificationTable");
    var newTableRow = alertsAndNotificationTable.insertRow();
    var descriptionCell = newTableRow.insertCell(0);
    var severityCell = newTableRow.insertCell(1);
    var timeReportedCell = newTableRow.insertCell(2);
    var lastUpdatedCell = newTableRow.insertCell(3);

    descriptionCell.innerText = tableRowObj.description;
    severityCell.innerText = tableRowObj.alertSevirity;
    timeReportedCell.innerText = tableRowObj.reportedTime;
    lastUpdatedCell.innerText = tableRowObj.lastUpdatedTime;
}

function updateAlertsAndNotificationTable() {
    createTableHeaderInAlertsAndNotificationTable();
    for (var i = 0; i < alertAndNotificationTableObjArr.length; i++) {
        var tableRowObj = alertAndNotificationTableObjArr[i];
        populateAlertAndNotificationTableRow(tableRowObj);
    }
    alertAndNotificationTableObjArr = [];
}

function dataPeriodChangedWaterFlowAndSystemCurrent(){
    var changedValue = document.getElementById('dataPeriodSelectWaterFlowAndSystemCurrent').value;
    document.getElementById('dataPeriodSelectLightLevelAndSystemCurrent').value = changedValue;
    DATA_HISTORY_PERIOD_DATES = changedValue;
    disablePeriodSelectors();
}

function dataPeriodChangedLightLevelAndSystemCurrent(){
    var changedValue = document.getElementById('dataPeriodSelectLightLevelAndSystemCurrent').value;
    document.getElementById('dataPeriodSelectWaterFlowAndSystemCurrent').value = changedValue;
    DATA_HISTORY_PERIOD_DATES = changedValue;
    disablePeriodSelectors();
}

function disablePeriodSelectors(){
    document.getElementById('dataPeriodSelectWaterFlowAndSystemCurrent').disabled = true;
    document.getElementById('dataPeriodSelectLightLevelAndSystemCurrent').disabled = true;
    periodChanged = true;
    setTimeout(function() {enabledPeriodSelectors()}, GRAPH_REFRESH_INTERVAL_MILLS);
}

function enabledPeriodSelectors(){
    document.getElementById('dataPeriodSelectWaterFlowAndSystemCurrent').disabled = false;
    document.getElementById('dataPeriodSelectLightLevelAndSystemCurrent').disabled = false;
}


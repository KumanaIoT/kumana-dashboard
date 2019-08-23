var KIOT_DEVICE_ID = "1adffec3-0242-4d8b-a50d-db3c3f327350";
var KIOT_API_DOMAIN_ENDPOINT = "https://api.chamara-ratnaweera.iotpdev.com";
var KIOT_SSO_DOMAIN_ENDPOINT = "https://sso.chamara-ratnaweera.iotpdev.com";
var KIOT_MQTT_DOMAIN_ENDPOINT = "https://mqttsim.chamara-ratnaweera.iotpdev.com";
var CLIENT_ID = "kiotdashboard";
var REDIRECT_URL = "http://localhost:8085/home.html";
var SSL_REQUIRED = "external";
var REALM = "authenticate";
var KIOT_SSO_URL = KIOT_SSO_DOMAIN_ENDPOINT + "/auth/realms/iotpdev/protocol/openid-connect/token";
var KIOT_API_URL = KIOT_API_DOMAIN_ENDPOINT + "/api/1/devices/" + KIOT_DEVICE_ID + "/snapshot";
var DEVICE_ENDPOINT = "/api/1/device/";
var KIOT_ALERT_URL = KIOT_API_DOMAIN_ENDPOINT + "/api/1/alerts/devices/" + KIOT_DEVICE_ID + "";

//Charts
var KIOT_REPORTING_URL = KIOT_API_DOMAIN_ENDPOINT + "/api/1/reporting/devices/" + KIOT_DEVICE_ID + "";
var KIOT_CONNECTION_REPORTING_URL = KIOT_API_DOMAIN_ENDPOINT + "/api/1/reporting?deviceIds=" + KIOT_DEVICE_ID + "&recordLimit=1";

// Sensor IDs
var KIOT_WATER_LEVEL_SENSOR_ID = "ec154874-3c7a-4d25-ab00-7f05b82c10fd";
var KIOT_WATER_FLOW_SENSOR_ID = "f0778d65-05da-4f97-bd04-a669429f7b82";
var KIOT_BATTERY_SENSOR_ID = "9393bd36-417f-4627-9d33-e5e0c69efcb6";
var KIOT_CURRENT_SENSOR_ID = "f03fc335-5daf-41da-90e4-17695b6fd2f2";
var KIOT_HUMIDITY_SENSOR_ID = "31db7477-09cb-4ef9-9cf2-c0f3b6e9b786";
var KIOT_TEMPERATURE_SENSOR_ID = "7d526be6-67ea-4c63-a249-a366f8c79216";
var KIOT_LUX_SENSOR_ID = "469001aa-b2bf-4d0a-9ea8-a636b915b550";
var KIOT_VOLTAGE_SENSOR_ID = "038fdc25-92e5-4e4b-8b67-b42b12f3242e";
var KIOT_PUMP_SPEED_SENSOR_ID = "70e396bf-d741-46c8-b690-974033f51812";
var KIOT_PUMP_STATE = "8cd31c80-2e53-4dde-8dba-34dd4e5023ff";

var SENSOR_VALUE_REFRESH_INTERVAL_MILLS = 15000;
var GRAPH_REFRESH_INTERVAL_MILLS = 30000;
var NUM_OF_ALERTS_TO_SHOW = 10;
var ALERT_FETCH_INTERVAL_MILLS = 30000;

var SYSTEM_VOLTAGE_INDICATOR_VALUE = '10.00';
var SYSTEM_CURRENT_INDICATOR_VALUE = '0.1';

var pState;


var gauge1=new RadialGauge({
    renderTo: 'radgauge1',
    title: 'LPM',
    TitleSize: 30,
    TitleStyle: 'arial',
    width: 280,
    height: 280,
    animationRule: 'bounce',
    animationDuration: 500,
    valueDec:0,
  highlights: [
        { from: 0, to: 20, color: '#FFFFFF' },
        { from: 20, to: 40, color: '#FFFA5F' },
        { from: 40, to: 60, color: '#FE970B'},
        { from: 60, to: 80, color: '#1CD755'},
        { from: 80, to: 100, color: '#15A119' }
       
    ]
}).draw();

if (!window.addEventListener) {
    window.addEventListener = function (evt, listener) {
        window.attachEvent('on' + evt, listener);
    };
}
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (cb) {
        var i = 0, s = this.length;
        for (; i < s; i++) {
            cb && cb(this[i], i, this);
        }
    }
}
// animage all gauges on a page
window.addEventListener('load', function () {
    document.gauges.forEach(function (gauge) {
        setInterval(function () {
            var watelFlrRate=0;
            for (var i = 0; i < sensorsList.length; i++) {
                if (sensorsList[i].sensorId == KIOT_WATER_FLOW_SENSOR_ID) {
                    watelFlrRate = sensorsList[i].readings[0].sensorValue;
                    gauge1.value = sensorsList[i].readings[0].sensorValue;
                }
            }
        }, 5000);
    });
});

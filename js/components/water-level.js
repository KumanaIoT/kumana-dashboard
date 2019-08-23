setInterval(function () {
    var wterLvl = 0;
    for (var i = 0; i < sensorsList.length; i++) {
        if (sensorsList[i].sensorId == KIOT_WATER_LEVEL_SENSOR_ID) {
            wterLvl = sensorsList[i].readings[0].sensorValue;
            var colorInc = 100 / 3;
            var val = (new Number(sensorsList[i].readings[0].sensorValue) / 5) * 100;
            if (val != "" && !isNaN(val) && val <= 100 && val >= 0) {
                var valOrig = val;
                val = 100 - val;
                if (valOrig == 0) {
                    $("#percent-box").val(0);
                    $(".progress .percent").text(0 + "");
                } else
                    $(".progress .percent").text((valOrig / 100) * 5 + "");

                $(".progress").parent().removeClass();
                $(".progress .water").css("top", val + "%");

                if (valOrig < colorInc * 1)
                    $(".progress").parent().addClass("red");
                else if (valOrig < colorInc * 2)
                    $(".progress").parent().addClass("orange");
                else
                    $(".progress").parent().addClass("green");
            } else {
                $(".progress").parent().removeClass();
                $(".progress").parent().addClass("green");
                $(".progress .water").css("top", 100 - 67 + "%");
                $(".progress .percent").text(0 + "%");
                $("#percent-box").val("");
            }
        }
    }
}, 5000);

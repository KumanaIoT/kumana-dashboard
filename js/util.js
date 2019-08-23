function formatGraphDateStr(timeStamp){
    return new Date(timeStamp).toLocaleDateString() + "\n" + new Date(timeStamp).toLocaleTimeString();
}

function formatAlertDate(timeStamp) {
    return new Date(timeStamp).toLocaleDateString() + " - " + new Date(timeStamp).toLocaleTimeString();
}
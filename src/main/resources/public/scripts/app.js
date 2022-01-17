function httpGetAsync(callback) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            callback(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", "/api/getPageContent", true);
    xmlHttp.send(null);
}

httpGetAsync(function (text) {
    document.querySelector(".content").textContent = text;
});
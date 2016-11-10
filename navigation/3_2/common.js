// JavaScript Document
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key))
            size++;
    }
    return size;
};

function GetFilename(url) {
    if (url) {
        var m = url.toString().match(/.*\/(.+?)\./);
        if (m && m.length > 1) {
            return m[1];
        }
    }
    return "";
}

function getActivitySignature() {
    return mySignature
}

function displayItem(theItem) {

}

function initLibrary() {
    //importXML("xml/" + GetFilename(document.location.href) + ".xml");
    importXML("3.xml");
}

function importXML(xmlfile) {
    try {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", xmlfile, false);
    } catch (Exception) {
        var ie = (typeof window.ActiveXObject != 'undefined');

        if (ie) {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            while (xmlDoc.readyState != 4) {
            }
            ;
            xmlDoc.load(xmlfile);
            makePageChanges(readXML());
            xmlloaded = true;
        } else {
            xmlDoc = document.implementation.createDocument("", "", null);
            xmlDoc.onload = makePageChanges(readXML());
            xmlDoc.load(xmlfile);
            xmlloaded = true;

        }
    }

    if (!xmlloaded) {
        xmlhttp.setRequestHeader('Content-Type', 'text/xml')
        xmlhttp.send("");
        xmlDoc = xmlhttp.responseXML;
        makePageChanges(readXML());
        xmlloaded = true;
    }
}

function updateMain(theExePointer) {
    var localIndex = parseInt(GetFilename(theExePointer.location.href));
    //window.parent.updatePageReviewStatus(localIndex, 2);
}

function sendMyRubric() {
    var myPath = this.location.href;
    var lastLine = myPath.lastIndexOf("/");
    myPath = myPath.substr(0, lastLine);
    lastLine = myPath.lastIndexOf("/");
    var myIndex = myPath.substring(lastLine + 1);
    window.parent.updateRubricsArray(myIndex, exJSON.exercise.rubric);
}
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.status.toString().match('^[2][0-9]{2}$')) {
                resolve(xhr.responseText);
            } else  if (xhr.status.toString().match('^[4,5][0-9]{2}$')) {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("XHR Failed");
            }
        }
        xhr.open(methodType, url, async);
        if (data) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else xhr.send();
        console.log(methodType+" request sent to the server.")
    });
}

const getURL = "http://localhost:3000/employees/1";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get User Data: "+responseText);
    })
    .catch(err => console.log("GET Error:" +JSON.stringify(err)));

const deleteURL = "http://localhost:3000/employees/4";
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
        console.log("User Deleted: "+responseText);
    })
    .catch(err => console.log("DELETE Error:" +JSON.stringify(err)));

const postURL = "http://localhost:3000/employees";
const empData = {"name": "kalki", "salary": "21000"};
makePromiseCall("POST", postURL, true, empData)
    .then(responseText => {
        console.log("User Added:" + responseText);
    })
    .catch(err => console.log("POST Error:" +JSON.stringify(err)));   
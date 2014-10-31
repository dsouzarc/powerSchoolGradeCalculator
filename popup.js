document.addEventListener('DOMContentLoaded', function () {
    show_periods();
});

chrome.extension.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
        message.innerText = request.source;
    }
});

function onWindowLoad() {

      var message = document.querySelector('#message');

        chrome.tabs.executeScript(null, {
                file: "getPagesSource.js"
              }, function() {if (chrome.extension.lastError) {
                        message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
                            }
          });

}

window.onload = onWindowLoad;

function show_periods() { 
    chrome.storage.sync.get(null, function(items) { 
        const allWeights = items.allWeights;
        const allIDs = items.allIDs;

        for(var i = 0; i < allWeights.length; i++) { 
            var period = document.createElement("input");
            period.setAttribute("type", "button");
            period.setAttribute("value", "Period " + (i + 1));
            period.setAttribute("id", "p" + i);
            period.onclick = function() { 
                console.log("HERE: " + getText());
                window.alert(getText());
                chrome.tabs.getCurrent(function(tab) { 
                    window.alert(index);
                    console.log("WHAT: " + index);
                });
            };
            document.getElementById("period_choices").appendChild(period);
        }
    });

    var query = { active: true, currentWindow: true };
    chrome.tabs.query(query, callback);
}

function callback(tabs) {
      var currentTab = tabs[0].title;
      console.log(currentTab);
      var newPara = document.createElement('p');
      newPara.textContent = currentTab + " + " + getText() + " END" + 
          document.all[0].outerHTML + " REAL" + document.body.outerHTML ;
      document.getElementById("period_choices").appendChild(newPara);
}

function getText(){
        return document.body.innerText
}
function getHTML(){
        return document.body.outerHTML
}

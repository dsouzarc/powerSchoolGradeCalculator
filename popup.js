document.addEventListener('DOMContentLoaded', function () {
    show_periods();
});

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
        newPara.textContent = currentTab + " + " + getText() + " END";
        document.getElementById("period_choices").appendChild(newPara);
}

function getText(){
        return document.body.innerText
}
function getHTML(){
        return document.body.outerHTML
}

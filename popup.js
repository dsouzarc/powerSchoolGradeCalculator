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
                alert(allWeights[i]);
                document.getElementById('demo').textContent = allWeights[i];
            };
            document.getElementById("period_choices").appendChild(period);

        }
    });
}

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
            document.getElementById("period_choices").appendChild(period);

        }
    });
}

document.getElementById('do-count').onclick = new function() { 
};

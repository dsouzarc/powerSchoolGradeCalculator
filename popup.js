document.addEventListener('DOMContentLoaded', function () {
    show_periods();
});

function show_periods() { 
    chrome.storage.sync.get(null, function(items) { 
        const allWeights = items.allWeights;
        const allIDs = items.allIDs;
        alert(allWeights);
    });
}

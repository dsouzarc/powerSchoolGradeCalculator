chrome.extension.onMessage.addListener(function (message, sender, callback) {
    if (message == "Rerun script") {
        chrome.tabs.executeScript({
                        file: "rerunInjection.js"
                    }, function () {
                                    console.log("Injection is Completed");
                                            });
            }
});

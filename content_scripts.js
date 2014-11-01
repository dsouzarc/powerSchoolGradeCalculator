function getText(){
        return document.body.innerText
}
function getHTML(){
        return document.body.outerHTML
}
console.log(getText());             //Gives you all the text on the page
console.log(getHTML());             //Gives you the whole HTML of the page


window.onpopstate = function (event) {
    chrome.extension.sendMessage("Rerun script");
};

history.pushState({
        page: 1
}, "title 1", "imghp?hl=en&tab=wi");

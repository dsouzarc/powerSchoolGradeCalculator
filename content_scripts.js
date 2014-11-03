function toType(obj) {
      return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
function getText(){
        return "getText()"; //document.body.innerText
}
function getHTML(){
    var grades = document.getElementsByTagName("th");
    for(var i = 0; i < grades.length; i++) { 
        if(grades[i].innerHTML == "Score") { 
            console.log("MISSION SUCCESS MOTHER FUCKER");
            var parent2 = grades[i].parentNode.parentNode.parentNode;

            for(var j = 0; j < parent2.childNodes.length; j++) {
                if(parent2.childNodes[j].nodeType !=  3) { 
                    if (parent2.childNodes[j].tagName.toUpperCase() === "TBODY") { 
                        var tbody = parent2.childNodes[j];
                        for(var k = 0; k < tbody.childNodes.length; k++) { 
                            try { 
                                var tbody2 = tbody.childNodes[k].getElementsByTagName("td");
                                var arr = Array.prototype.slice.call(tbody2);
                                for(var z = 0; z < arr.length; z++) { 
                                    console.log(z + " Z " + arr[z].innerHTML);
                                }
                            }
                            catch(err) { 
                                console.log(err + "err");
                            }
                        }
                    }

                }
            }

        }

    }
        return "fine"; //grades; //document.body.id;  //.outerHTML
}
console.log("HTML: " + getHTML());             //Gives you the whole HTML of the page


window.onpopstate = function (event) {
    chrome.extension.sendMessage("Rerun script");
};

history.pushState({
        page: 1
}, "title 1", "imghp?hl=en&tab=wi");

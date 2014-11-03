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
                                }
                                console.log(linkProp(arr[1]) + " " + arr[2].innerHTML + " " + getGrade(arr[8]) + " " + arr[10].innerHTML);
                            }
                            catch(err) { 
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

function getGrade(obj1) { 
    var obj = obj1.innerHTML;
    var gradeStart = obj.indexOf(">") + 1;
    var gradeEnd = obj.indexOf("</");
    var entire = obj.substring(gradeStart, gradeEnd);
    var numerator = entire.substring(0, entire.indexOf("/"));
    if(entire.indexOf("--") > -1) { 
        return [];
    }
    var denominator = entire.substring(entire.indexOf("/") + 1);
    if(denominator.indexOf("nbsp") > -1) { 
        return [];
    }
    return [numerator, denominator];
}

function linkProp(obj1) { 
    var obj = obj1.innerHTML;
    if(obj.indexOf("href") === -1) { 
        return obj;
    }
    var titleStart = obj.indexOf(">") + 1;
    var titleEnd = obj.indexOf("</");
    return obj.substring(titleStart, titleEnd);
}

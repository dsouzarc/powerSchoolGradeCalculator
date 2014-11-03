function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}


function getText() {
    return "getText()"; //document.body.innerText
}

var allNames = [];
var allWeights = [];
var allIDs = [];

function getHTML() {

    chrome.storage.sync.get(null, function(items) {
        allNames = items.allNames;
        allWeights = items.allWeights;
        allIDs = items.allIDs;
        analyzeGrades();
    });
}

function analyzeGrades() {
    var classNum = 0;
    for(var y = 0; y < allNames.length; y++) { 
        if(window.find(allNames[y])) { 
            classNum = y;
        }
    }
    
    var useGrades = allWeights[classNum];
    var useIDs = allIDs[classNum];
    var isStraightAverage = useGrades.length == 0;

    var everythingNumerator = [];
    var everythingDenominator = [];
    var forStraightNumerator =  [];
    var forStraightDenominator = [];
    for(var i = 0; i < useIDs.length; i++) { 
        forStraightNumerator.push([]);
        forStraightDenominator.push([]);
    }

    alert(isStraightAverage);


    var grades = document.getElementsByTagName("th");
    for (var i = 0; i < grades.length; i++) {
        if (grades[i].innerHTML == "Score") {
            console.log("MISSION SUCCESS MOTHER FUCKER");
            var parent2 = grades[i].parentNode.parentNode.parentNode;

            for (var j = 0; j < parent2.childNodes.length; j++) {
                if (parent2.childNodes[j].nodeType != 3) {
                    if (parent2.childNodes[j].tagName.toUpperCase() === "TBODY") {
                        var tbody = parent2.childNodes[j];
                        for (var k = 0; k < tbody.childNodes.length; k++) {
                            try {
                                var tbody2 = tbody.childNodes[k].getElementsByTagName("td");
                                var arr = Array.prototype.slice.call(tbody2);
                                
                                var assignmentType = linkProp(arr[1]);
                                var grade = getGrade(arr[8]);
                                console.log("GRADE: " + grade);
                                if(grade.length == 2) { 
                                    if(isStraightAverage) { 
                                        forStraightNumerator.push(grade[0]);
                                        forStraightDenominator.push(grade[1]);
                                    }
                                    else { 
                                        for(var rr = 0; rr < useIDs.length; rr++) { 
                                            if(assignmentType.indexOf(useIDs[rr]) > -1) { 
                                                everythingNumerator[rr].push(grade[0]);
                                                everythingDenominator[rr].push(grade[1]);
                                            }
                                        }
                                    }
                                }
                            } catch (err) {
                                console.log(err + "?");    
                            }
                        }
                    }
                }
            }
        }
    }

    if(isStraightAverage) { 
        var numSum = 0;
        var denomSum = 0;

        for(var i = 0; i < forStraightNumerator.length; i++) { 
            numSum = forStraightNumerator[i] + numSum;
            denomSumm = forStraightDenominator[i] + denomSum;
        }

        console.log(numSum);
        console.log(denomSum);
        console.log(forStraightNumerator);
        console.log(forStraightDenominator);

        alert(numSum / denomSum);
    }
    return "fine";
}
console.log("HTML: " + getHTML()); //Gives you the whole HTML of the page


window.onpopstate = function(event) {
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
    if (entire.indexOf("--") > -1) {
        return [];
    }
    var denominator = entire.substring(entire.indexOf("/") + 1);
    if (denominator.indexOf("nbsp") > -1) {
        return [];
    }
    return [numerator, denominator];
}

function linkProp(obj1) {
    var obj = obj1.innerHTML;
    if (obj.indexOf("href") === -1) {
        return obj;
    }
    var titleStart = obj.indexOf(">") + 1;
    var titleEnd = obj.indexOf("</");
    return obj.substring(titleStart, titleEnd);
}

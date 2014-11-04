/** This is responsible for calculating the grades
and displaying it to the user. 
This page should only be called when viewing the quarter grades for a specific class */

/** Returns the name of the obj */
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}


/** Returns the pages' text */
function getText() {
    return "getText()"; //document.body.innerText
}

//Class Names (ex. Gym, Math, Science)
var allNames = []; 

//2D array, weights for all classes (0.3, 0.7 for class1, 0.6, 0.4 for class 2
var allWeights = [];

//2D array, assignment ids for all classes (HW, classwork, QUIZ/TEST 
var allIDs = [];


//Returns the HTML. THIS IS THE GOOD STUFF. 
function getHTML() {

    //Gets the classes/weights/IDs from Chromse sync
    chrome.storage.sync.get(null, function(items) {
        allNames = items.allNames;
        allWeights = items.allWeights;
        allIDs = items.allIDs;
        analyzeGrades();
    });
}


/** Responsible for analyzing grades and showing an alert for a percentage */
function analyzeGrades() {

    //Finds the index of the class (looks through all classes to see which one this is)
    var classNum = 0;
    for(var y = 0; y < allNames.length; y++) { 
        if(window.find(allNames[y])) { 
            classNum = y;
        }
    }
    
    //Updates variables with the class
    var useGrades = allWeights[classNum];
    var useIDs = allIDs[classNum];

    //If there are no grades inputted, is a straight average
    var isStraightAverage = useGrades.length === 0;

    console.log("USE GRADES: " + useGrades);
    console.log("USE IDS: " + useIDs);
    console.log("IS STRAIGHT: " + isStraightAverage);

    //For counting the numerator and denominator
    var numSum = 0;
    var denomSum = 0;
    var count = 0;

    var grades = document.getElementsByTagName("th");
    for (var i = 0; i < grades.length; i++) {

        //Anything that makes it past this is related to score
        if (grades[i].innerHTML == "Score") {
            var parent2 = grades[i].parentNode.parentNode.parentNode;

            for (var j = 0; j < parent2.childNodes.length; j++) {
                if (parent2.childNodes[j].nodeType != 3) {
                    if (parent2.childNodes[j].tagName.toUpperCase() === "TBODY") {
                        var tbody = parent2.childNodes[j];
                        for (var k = 0; k < tbody.childNodes.length; k++) {
                            try {

                                //Important stuff needed for grades
                                var tbody2 = tbody.childNodes[k].getElementsByTagName("td");
                                var arr = Array.prototype.slice.call(tbody2);
                                var assignmentType = linkProp(arr[1]);
                                var grade = getGrade(arr[8]);
                                console.log("GRADE: " + grade);

                                //If the grade has two values (means its completed like 90/100, not --/100)
                                if(grade.length == 2) { 
                                    count++;

                                    //If it's a straight average, just add it to numerator and denominator
                                    if(isStraightAverage) {
                                        console.log("RIGHT HERE: " + grade);
                                        numSum += (grade[0]);
                                        denomSum += (grade[1]);
                                    }

                                    //If it's weighted
                                    else { 
                                        console.log("Not straight");
                                        for(var rr = 0; rr < useIDs.length; rr++) { 

                                            //Look through all the assignment types to find the right type and weight
                                            if(assignmentType.indexOf(useIDs[rr]) > -1) { 
                                                console.log("HH: " + useGrades[rr]);
                                                console.log((parseInt(grade[1]) * parseFloat(useGrades[rr])) + " YOLO");

                                                //Multiply num and denom by weight, add it to total num and denom
                                                numSum += (parseInt(grade[0]) * parseFloat(useGrades[rr]));
                                                denomSum += (parseInt(grade[1]) * parseFloat(useGrades[rr]));
                                                console.log(numSum + " / " + denomSum);
                                            }
                                            else { 
                                                console.log("NO: " + assignmentType);
                                            }
                                        }
                                    }
                                }
                            } catch (err) {
                                console.log(err.message + "?");    
                            }
                        }
                    }
                }
            }
        }
    }

    //Print results
    if(numSum != "NaN%") { 
        alert("Grade: " + (((numSum / denomSum)) * 100) + "%");
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


/** Returns the grade as an array [scoreReceived, totalPossibleScore] (ex. [50, 100]) */
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
    return [parseInt(numerator), parseInt(denominator)];
}

/** Returns assignment title nicely formatted (b/c sometimes has a link, looks bad */
function linkProp(obj1) {
    var obj = obj1.innerHTML;
    if (obj.indexOf("href") === -1) {
        return obj;
    }
    var titleStart = obj.indexOf(">") + 1;
    var titleEnd = obj.indexOf("</");
    return obj.substring(titleStart, titleEnd);
}

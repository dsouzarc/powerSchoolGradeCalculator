/** Responsible for saving
1. Periods
2. Each period's assignment type
3. Each period's assignment tyes' weight */

document.addEventListener('DOMContentLoaded', restore_options);

var counter = 1;


var allNames = [];
var allWeights = [];
var allIDs = [];


/** Show options saved */
function restore_options() {
    allNames = [];
    allWeights = [];
    allIDs = [];
    chrome.storage.sync.get(null, function(items) {
        allNames = items.allNames;
        allWeights = items.allWeights;
        allIDs = items.allIDs;
        alert("ALL NAMES: " + allNames);
        alert("ALL WEIGHTS: " + allWeights);
        alert("ALL IDS: " + allIDs);
    });
}

/** Called when adding a class */
function add_class() {

    //Only if there are less than 8 classes
	if(counter <= 8) {
		const classNumber = counter;
		var numWeights = 0;

        //Add the html title of Period X
		var header = document.createElement("h1");
		header.setAttribute("name", "header" + classNumber);
		header.appendChild(document.createTextNode("Period " + classNumber));
		document.getElementById("class_div").appendChild(header);

        //Add a label for inputting class title
        var nameLabel = document.createElement("p");
        nameLabel.appendChild(document.createTextNode("Period Name"));
        document.getElementById("class_div").appendChild(nameLabel);

        //Actual textfield for putting in class title
        var nameTextField = document.createElement("input");
        nameTextField.setAttribute("type", "text");
        nameTextField.setAttribute("name", classNumber + "nameText");
        nameTextField.setAttribute("Value", "Class " + classNumber);
        document.getElementById("class_div").appendChild(nameTextField);

		var div = document.createElement("div");
		div.id = "div" + classNumber;
		document.getElementById("class_div").appendChild(div);


        //Add weight button
		var addWeightButton = document.createElement("input");
		addWeightButton.setAttribute("type", "button");
		addWeightButton.setAttribute("value", "Add weight");
		addWeightButton.id="add_weight" + classNumber;
		document.getElementById("class_div").appendChild(addWeightButton);

        //When add weight button is clicked
		document.getElementById("add_weight" + classNumber).onclick = function() {
			if(numWeights >= 5) {
				return;
			}

            //Add a label prompting for assignment type
			var classificationLabel = document.createElement("p");
			classificationLabel.appendChild(document.createTextNode("Assignment Type"));

            //Assignment type textfield
			var classificationTextField = document.createElement("input");
			classificationTextField.setAttribute("type", "text");
			classificationTextField.setAttribute("name", classNumber + "classText" + numWeights);
			classificationTextField.setAttribute("value", "here" + classNumber);

            //Weight label
			var weightLabel = document.createElement("p");
			weightLabel.appendChild(document.createTextNode("Weight as decimal"));

            //Weight textfield
			var weightTextField = document.createElement("input");
			weightTextField.setAttribute("type", "text");
			weightTextField.setAttribute("name", classNumber + "classWeight" + numWeights);
			weightTextField.setAttribute("value", "weight " + classNumber);

            //Add all items to html
			const location = document.getElementById("div" + classNumber);
			location.appendChild(classificationLabel);
			location.appendChild(classificationTextField);
			location.appendChild(weightLabel);
			location.appendChild(weightTextField);

			numWeights++;
		};
		counter++;
	}
}

/** Saves options to Chrome cloud sync */
function save_options() {
	const elements = document.getElementsByTagName('input');

    //For holding all classes and their weights/assignment types
    const allNames = [];
    const allWeights = [];
    const allIDs = [];
    const allClasses = [];

    //For holding a single class and its weight
    var tempWeights = [];
	var tempIDs = [];
	var tempClassNum = 1;


    //Look through items, parse for classNum and weight num
	for(var i = 0; i < elements.length; i++) {
        var input = elements[i];
		var id = elements[i].name;
        if(id.indexOf("nameText") > -1) {
            allNames.push(input.value);
        }

        //If we're dealing with a textfield
        if(input.type == "text") {

            //If its the same index as the class we're on
            if(tempClassNum == id.charAt(0)) {

                /If its a class weight
                if(id.indexOf("classWeight") > -1) {
                    tempWeights.push(input.value);
                }

                //Or an assignment type
                else if(id.indexOf("classText") > -1) {
                    tempIDs.push(input.value);
                }
            }

            //If it's a different class (ie. Period 2
            else {

                //Add the temp values to the array for holding all classes
                var obj = {
                    "classWeight" : tempWeights,
                    "classText" : tempIDs };
                allClasses.push(obj);
                allWeights.push(tempWeights);
                allIDs.push(tempIDs);

                //Reinitialize them to blank variables
                tempWeights = [];
                tempIDs = [];
                tempClassNum = id.charAt(0);

                //Add the vals to this new array
                if(id.indexOf("classWeight") > -1) {
                    tempWeights.push(input.value);
                }
                else if(id.indexOf("classText") > -1) {
                    tempIDs.push(input.value);
                }
             }
		}
    }

    //Add the last values
    allWeights.push(tempWeights);
    allIDs.push(tempIDs);

    console.log("ALL NAMES: ");
    console.log(allNames);

    console.log("ALL WEIGHTS: ");
    console.log(allWeights);

    console.log("ALL IDS: ");
    console.log(allIDs);

    //Save results
    var vals = {'allWeights' : allWeights, 'allIDs' : allIDs, 'allNames' : allNames};
    chrome.storage.sync.set({'allIDs' :  allIDs});
    chrome.storage.sync.set({'allNames' : allNames});
    chrome.storage.sync.set({'allWeights' :  allWeights});
    chrome.storage.sync.set({'all' : vals});
}

document.getElementById('save').addEventListener('click', save_options);
document.getElementById('add_class').addEventListener('click', add_class);

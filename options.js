document.addEventListener('DOMContentLoaded', restore_options);

var counter = 1;

function restore_options() {
    try { 
        var allNames = [];
        var allWeights = [];
        var allIDs = [];
       chrome.storage.sync.get(null, function(items) {
           allNames = items.allNames;
           allWeights = items.allWeights;
           allIDs = items.allIDs;
           alert("ALL NAMES: " + allNames);
           alert("ALL WEIGHTS: " + allWeights);
           alert("ALL IDS: " + allIDs);
       });
    }   
    catch(err) { 
        console.log("Err: " + err);
    }
}

function add_class() { 
	if(counter <= 8) { 
		const classNumber = counter;
		var numWeights = 0;
		var header = document.createElement("h1");
		header.setAttribute("name", "header" + classNumber);
		header.appendChild(document.createTextNode("Period " + classNumber));		
		document.getElementById("class_div").appendChild(header);		

        var nameLabel = document.createElement("p");
        nameLabel.appendChild(document.createTextNode("Period Name"));
        document.getElementById("class_div").appendChild(nameLabel);

        var nameTextField = document.createElement("input");
        nameTextField.setAttribute("type", "text");
        nameTextField.setAttribute("name", classNumber + "nameText");
        nameTextField.setAttribute("Value", "Class " + classNumber);
        document.getElementById("class_div").appendChild(nameTextField);
		
		var div = document.createElement("div");
		div.id = "div" + classNumber;
		document.getElementById("class_div").appendChild(div);

		var addWeightButton = document.createElement("input");
		addWeightButton.setAttribute("type", "button");
		addWeightButton.setAttribute("value", "Add weight");
		addWeightButton.id="add_weight" + classNumber;
		document.getElementById("class_div").appendChild(addWeightButton);
	
		document.getElementById("add_weight" + classNumber).onclick = function() { 
			if(numWeights >= 5) { 
				return;
			}

			var classificationLabel = document.createElement("p");
			classificationLabel.appendChild(document.createTextNode("Assignment Type"));

			var classificationTextField = document.createElement("input");
			classificationTextField.setAttribute("type", "text");
			classificationTextField.setAttribute("name", classNumber + "classText" + numWeights);
			classificationTextField.setAttribute("value", "here" + classNumber);

			var weightLabel = document.createElement("p");
			weightLabel.appendChild(document.createTextNode("Weight as decimal"));

			var weightTextField = document.createElement("input");
			weightTextField.setAttribute("type", "text");
			weightTextField.setAttribute("name", classNumber + "classWeight" + numWeights);
			weightTextField.setAttribute("value", "weight " + classNumber);

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


function save_options() {
	const elements = document.getElementsByTagName('input');
    const allNames = [];
    const allWeights = [];
    const allIDs = [];
    const allClasses = [];

    var tempWeights = [];
	var tempIDs = [];
	var tempClassNum = 1;

	for(var i = 0; i < elements.length; i++) {
        var input = elements[i];
		var id = elements[i].name;
        if(id.indexOf("nameText") > -1) { 
            allNames.push(input.value);
        }
        if(input.type == "text") {     
            if(tempClassNum == id.charAt(0)) {  
                if(id.indexOf("classWeight") > -1) { 
                    tempWeights.push(input.value);
                }
                else if(id.indexOf("classText") > -1) { 
                    tempIDs.push(input.value);
                }
            }
            else {
                var obj = { 
                    "classWeight" : tempWeights,
                    "classText" : tempIDs };
                allClasses.push(obj);
                allWeights.push(tempWeights);
                allIDs.push(tempIDs);

                tempWeights = [];
                tempIDs = [];
                tempClassNum = id.charAt(0);

                if(id.indexOf("classWeight") > -1) { 
                    tempWeights.push(input.value);
                }
                else if(id.indexOf("classText") > -1) { 
                    tempIDs.push(input.value);
                }
             }
		}
    }
    allWeights.push(tempWeights);
    allIDs.push(tempIDs);

    console.log("ALL NAMES: ");
    console.log(allNames);
    
    console.log("ALL WEIGHTS: ");
    console.log(allWeights);
   
    console.log("ALL IDS: ");
    console.log(allIDs);

    var vals = {'allWeights' : allWeights, 'allIDs' : allIDs, 'allNames' : allNames};
    chrome.storage.sync.set({'allIDs' :  allIDs});
    chrome.storage.sync.set({'allNames' : allNames});
    chrome.storage.sync.set({'allWeights' :  allWeights});
    chrome.storage.sync.set({'all' : vals});
}

document.getElementById('save').addEventListener('click', save_options);
document.getElementById('add_class').addEventListener('click', add_class);

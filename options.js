document.addEventListener('DOMContentLoaded', restore_options);

var counter = 1;

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
}

function add_class() { 
	if(counter <= 8) { 
		const classNumber = counter;
		var numWeights = 0;
		var header = document.createElement("h1");
		header.setAttribute("name", "header" + classNumber);
		header.appendChild(document.createTextNode("Period " + classNumber));		
		document.getElementById("class_div").appendChild(header);		
		
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
            console.log(weightTextField.name);

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
    const allWeights = [];
    const allIDs = [];
    const allClasses = [];
    
    var tempWeights = [];
	var tempIDs = [];
	var tempClassNum = 1;

    var tt = "";

	for(var i = 0; i < elements.length; i++) {
        var input = elements[i];
		var id = elements[i].name;
		tt += id;
        if(input.type == "text") {     
            console.log(id.charAt(0) + " WHAT: " + id);
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
    alert(tt);

    allWeights.push(tempWeights);
    allIDs.push(tempIDs);
    
    console.log("ALL WEIGHTS: ");
    console.log(allWeights);
   
    console.log("ALL IDS: ");
    console.log(allIDs);
}

document.getElementById('save').addEventListener('click', save_options);
document.getElementById('add_class').addEventListener('click', add_class);

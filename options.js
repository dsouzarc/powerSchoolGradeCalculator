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
	var text = "";
	var elements = document.getElementsByTagName('input');
	var tempWeights = [];
	var tempIDs = [];
    var allWeights = [[]];
    var allIDs = [[]];
	var tempClassNum = 1;
    var allClasses = [];
	for(var i = 0; i < elements.length; i++) {
		if(elements[i].type == "text") { 
			var input = elements[i];
			var id = elements[i].name;
            if(tempClassNum == id.charAt(0)) {  
                if(id.indexOf("classWeight") > -1) { 
                    tempWeights.push(input.value);
                }
                else if(id.indexOf("classText") > -1) { 
                    tempIDs.push(input.value);
                }
            }
            else {
			    var input = elements[i];
			    var id = elements[i].name;
                var obj = { 
                    "classWeight" : tempWeights,
                    "classText" : tempIDs };
                console.log("We good");
                allClasses.push(obj);
                tempClassNum = id.charAt(0);
                if(id.indexOf("classWeight") > -1) { 
                    tempWeights.push(input.value);
                }
                else if(id.indexOf("classText") > -1) { 
                    tempIDs.push("Ryan D'souza"); //input.value);
                }
             }
		}
    }
    allWeights.push(tempWeights);
    allIDs.push(tempIDs);
    console.log("HERE");
    console.log(allWeights);
    for(var i = 0; i < allWeights.length; i++) { 
        var vals = allWeights[i];
        console.log("DOWN");
        for(var  y = 0; y < vals.length; y++) { 
            console.log(vals[y]);
        }
    }

}

document.getElementById('save').addEventListener('click',
    save_options);

document.getElementById('add_class').addEventListener('click', add_class);

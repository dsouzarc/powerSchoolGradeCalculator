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
	var allElements = document.getElementsByTagName("div");
	var allIds = [];
	for (var i = 0, n = allElements.length; i < n; ++i) {
  		var el = allElements[i];
  		if (el.id) { 
			allIds.push(el.id); 
			var searchStuff = document.getElementById(allElements[i].id).children;
			for(i = 0; i < searchStuff.length; i++) { 
				allIds.push(searchStuff[i].value);
			}
		}
	}
alert("HERE" + allIds);
var text = "";
var elements = document.getElementsByTagName('input')
  for(var i=0; i<elements.length; i++) {
    var input = elements[i];
    text += input.value + " VALUE";
    //alert(input.value + " VALUE");
  }
alert(text);
}

document.getElementById('save').addEventListener('click',
    save_options);

document.getElementById('add_class').addEventListener('click', add_class);

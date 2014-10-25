// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function save_options() {
	var color = document.getElementById('color').value;
	var likesColor = document.getElementById('like').checked;
	chrome.storage.sync.set({
		favoriteColor: color,
		likesColor: likesColor
 	 }, function() {
    		// Update status to let user know options were saved.
    		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
    		setTimeout(function() {
     		 status.textContent = '';
    		}, 750);
  	});
}

function restore_options() {
	// Use default value color = 'red' and likesColor = true.
	chrome.storage.sync.get({
	favoriteColor: 'red',
	likesColor: true
	}, function(items) {
   		document.getElementById('color').value = items.favoriteColor;
 		document.getElementById('like').checked = items.likesColor;
  	});
}

var counter = 1;

function add_class() { 
	if(counter <= 8) { 
		const classNumber = counter;
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
			var classificationLabel = document.createElement("p");
			classificationLabel.appendChild(document.createTextNode("Classification: "));

			var classificationTextField = document.createElement("input");
			classificationTextField.setAttribute("type", "text");
			classificationTextField.setAttribute("name", "classText" + counter);
			classificationTextField.setAttribute("value", "here" + classNumber);

			const location = document.getElementById("div" + classNumber);

			location.appendChild(classificationLabel);
			location.appendChild(classificationTextField);
		};
		counter++;
	}
}	

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

document.getElementById('add_class').addEventListener('click', add_class);


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


function add_class() { 
  var add_weightButton = document.createElement("input");
  add_weightButton.setAttribute("button", "button");
  add_weightButton.setAttribute("Hi", button);
  add_weightButton.onClick = function() { 
  var para = document.createElement("p");
  var node = document.createTextNode("Paragraph paragraph");
  var element = document.getElementById('class_id');
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

document.getElementById('add_class').addEventListener('click', add_class);

function save_options() {
  var probability = document.getElementById('probability').value;

  p = parseInt(probability);

  if (p < 0) {
    p = 0;
  }

  if (p > 100) {
    p = 100;
  }

  chrome.storage.sync.set({
    probability: p
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
  chrome.storage.sync.get({
    probability: probability
  }, function(items) {
    document.getElementById('probability').value = items.probability;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

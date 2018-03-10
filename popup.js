document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      d = document;

      var f = d.createElement('form');
      f.action = 'http://gtmetrix.com/analyze.html?bm';
      f.method = 'post';
      var i = d.createElement('input');
      i.type = 'hidden';
      i.name = 'url';
      i.value = tab.url;
      f.appendChild(i);
      d.body.appendChild(f);
      f.submit();
    });
  }, false);
}, false);
searchUrbanDict = function(word){
  var query = word.selectionText;
  chrome.tabs.create({url: "http://www.urbandictionary.com/define.php?term=" + query});
};

chrome.contextMenus.create({
  title: "Look for Right Donations",
  contexts:["selection"],
  onclick: searchUrbanDict
});

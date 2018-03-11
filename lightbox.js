chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if ( request.action == "startLightbox" ) {

  background = document.createElement('div');
  background.id = "lightbox_background";
  lightbox = document.createElement('div');
  lightbox.id = "lightbox_extension";

  loadJSON(function(response) {
  // Parse JSON string into object
  var actual_JSON = JSON.parse(response);
    alert(JSON.stringify(actual_JSON.description));
 });
  lightbox.innerHTML = "<H1>Donation Helper</H1>";


  document.body.appendChild(background);
  background.appendChild( lightbox );
  closeScriptureLightbox = function() {

      var lb = document.getElementById('lightbox_background');
      lb.parentNode.removeChild( lb );

  }
  button = document.createElement('button');
  button.onclick=closeScriptureLightbox;
  button.textContent='Close';
  lightbox.appendChild(button);
  sendResponse({farewell: "goodbye"});

      }
  });

  function loadJSON(callback) {

      var xobj = new XMLHttpRequest();
          xobj.overrideMimeType("application/json");
      xobj.open('GET', 'test.json', true);
      xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
              // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
              callback(xobj.responseText);
            }
      };
      xobj.send(null);
   }

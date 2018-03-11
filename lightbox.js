chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if ( request.action == "startLightbox" ) {

  background = document.createElement('div');
  background.id = "lightbox_background";
  lightbox = document.createElement('div');
  lightbox.id = "lightbox_extension";
  reasons = document.createElement('div');
  reasons.id = "lightbox_reason";
  don = document.createElement('div');
  don.id = "lightbox_donation";
  don0 = document.createElement('div');
  don0.id = "lightbox_don0";
  don1 = document.createElement('div');
  don1.id = "lightbox_don1";
  don2 = document.createElement('div');
  don2.id = "lightbox_don2";

  loadJSON(function(response) {
  // Parse JSON string into object
  var actual_JSON = JSON.parse(response);
    //alert(JSON.stringify(actual_JSON.description));
    var reason = JSON.stringify(actual_JSON.description);
    lightbox.innerHTML = '<H1>Donation Helper</H1>';
    reasons.innerHTML = '<span>' + reason + '<span>' + '<BR>';
    var i;
    obj = JSON.parse(response);
    //var donations = JSON.parse(actual_JSON.donation);
    //alert(obj.donation[1].name);
    don0.innerHTML = "<div>" + "<span style='size:14;font-weight:bold'>" + obj.donation[0].name + "</span>" + "<BR>" +
                    "<img src= '" + obj.donation[0].image + "' height='80' width='80' >" + "<BR>" +
                    "<span>$" + obj.donation[0].amount + "</span>" + "<BR>" +
                    "<span>" + "<a href='" + obj.donation[0].link + "'>Donate</a>" + "</span>" + "</div>";
    don1.innerHTML = "<div>" + "<span style='size:14;font-weight:bold'>" + obj.donation[1].name + "</span>" + "<BR>" +
                    "<img src= '" + obj.donation[1].image + "' height='80' width='80' >" + "<BR>" +
                    "<span>$" + obj.donation[1].amount + "</span>" + "<BR>" +
                    "<span>" + "<a href='" + obj.donation[1].link + "'>Donate</a>" + "</span>" + "</div>";
    don2.innerHTML = "<div>" + "<span style='size:14;font-weight:bold'>" + obj.donation[2].name + "</span>" + "<BR>" +
                    "<img src= '" + obj.donation[2].image + "' height='80' width='80' >" + "<BR>" +
                    "<span>$" + obj.donation[2].amount + "</span>" + "<BR>" +
                    "<span>" + "<a href='" + obj.donation[2].link + "'>Donate</a>" + "</span>" + "</div>" + "<BR>";

  document.body.appendChild(background);
  background.appendChild(lightbox);
  lightbox.appendChild(reasons);
  lightbox.appendChild(don);
  don.appendChild(don0);
  don.appendChild(don1);
  don.appendChild(don2);

  closeScriptureLightbox = function() {

      var lb = document.getElementById('lightbox_background');
      lb.parentNode.removeChild( lb );

  }
  button = document.createElement('button');
  button.onclick=closeScriptureLightbox;
  button.textContent='Close';
  lightbox.appendChild(button);
  sendResponse({farewell: "goodbye"});
});
      }

  });

  function loadJSON(callback) {

      var xobj = new XMLHttpRequest();
          xobj.overrideMimeType("application/json");
      xobj.open('GET', 'https://raw.githubusercontent.com/JagjitUvic/daan-extension/master/test.json', true);
      xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
              // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
              callback(xobj.responseText);
            }
      };
      xobj.send(null);
   }

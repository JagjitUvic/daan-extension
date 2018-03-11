chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "startLightbox") {
            //adding DOM elements
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

            loadJSON(function(response) {
                // Parse JSON string into object
                var actual_JSON = JSON.parse(response);
                //print reason
                var reason = actual_JSON.name;
                var image = actual_JSON.image_url;
                var text = actual_JSON.text;
                var url = actual_JSON.url;
                var news_headline = actual_JSON.news_headline;
                var news_image_url = actual_JSON.news_image_url;
                var news_url = actual_JSON.news_url;

                lightbox.innerHTML = '<H1>Donation Helper</H1>';
                reasons.innerHTML = "<span style='size:18;font-weight:bold'>" + text + '<span>' + '<BR>';
                //print donations
                don0.innerHTML = "<div>" + "<span style='size:16;font-weight:bold'>" + reason + "</span>" + "<BR>" +
                    "<img src= '" + image + "' height='80' width='80' >" + "<BR>" +
                    "<span style='size:14;font-weight:bold'>$" + "10" + "</span>" + "<BR>" +
                    "<span>" + "<a href='" + url + "'>Donate</a>" + "</span>" + "</div>" + "<BR>";
                don1.innerHTML = "<div>" + "Related News : <span style='size:16;font-weight:bold'>" + news_headline + "</span>" + "<BR>" +
                    "<img src= '" + news_image_url + "' height='80' width='80' >" + "<BR>" +
                    "<span>" + "<a href='" + news_url + "'>Read More</a>" + "</span>" + "</div>";
                fb = document.createElement('div');
                fb.id = "fb";
                fb.innerHTML = "<iframe src='https://www.facebook.com/plugins/share_button.php?href=" + url + "&layout=button_count&size=small&mobile_iframe=true&appId=676605482470190&width=69&height=20' width='69' height='20' style='border:none;overflow:hidden' scrolling='no' frameborder='0' allowTransparency='true'></iframe>";

                //append HTMl elements
                document.body.appendChild(background);
                background.appendChild(lightbox);
                lightbox.appendChild(reasons);
                lightbox.appendChild(don);
                don.appendChild(don0);
                don.appendChild(don1);
                lightbox.appendChild(fb);
                closeScriptureLightbox = function() {

                    var lb = document.getElementById('lightbox_background');
                    lb.parentNode.removeChild(lb);

                }

                button = document.createElement('button');
                button.onclick = closeScriptureLightbox;
                button.textContent = 'Close';
                lightbox.appendChild(button);
                sendResponse({
                    farewell: "goodbye"
                });
            });
        }

    });

function loadJSON(callback) {
    var query = window.getSelection();
    var url = "https://arcane-headland-29308.herokuapp.com/daan?id=" + query;
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

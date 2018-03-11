//adding context menus in chrome
chrome.runtime.onInstalled.addListener(function() {
    var id = chrome.contextMenus.create({
        "title": "Suggested Donations",
        "contexts": ["selection"],
        "id": "donation"
    });
});

//function to send search and load lightbox
function contextClicked(info, tab) {
    //call the request function
    //sendRequest(info);
    if (info.menuItemId == "donation") {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                "action": "startLightbox"
            });
        });
    }
};


//Instruct Chrome to launch a particular function when context menu items are clicked.
chrome.contextMenus.onClicked.addListener(contextClicked);

//send request for donation sugesstions
function sendRequest(info) {

}

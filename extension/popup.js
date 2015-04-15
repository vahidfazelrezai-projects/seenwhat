function getTabInfo(callback) {

  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    var title = tab.title;
    var favIconUrl = tab.favIconUrl;

    console.assert(typeof url == 'string', 'tab.url should be a string');
    console.assert(typeof title == 'string', 'tab.title should be a string');
    console.assert(typeof favIconUrl == 'string', 'tab.favIconUrl should be a string');

    callback(url, title, favIconUrl);
  });

}

document.addEventListener('DOMContentLoaded', function() {
  getTabInfo(function(url, title, favIconUrl) {
    document.getElementById('link').textContent = favIconUrl;
    document.getElementById('link').href = title;
    document.getElementById('favicon').src = favIconUrl;
  });
});

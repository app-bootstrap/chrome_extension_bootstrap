'use strict';

var href = location.href;
var hostname = location.hostname;
var previous_version;

chrome.runtime.onInstalled.addListener(function(d) {
  previous_version = d.previousVersion;
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  switch (request.type) {
    case 'background_info':
      sendResponse({
        extension_id: hostname,
        extension_url: href,
        previous_version: previous_version
      });
      break;
  }
});

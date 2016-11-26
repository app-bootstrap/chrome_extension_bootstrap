'use strict';

(function() {
  var bridge = {
    getDataFromBackground: function(options) {
      chrome.extension.sendRequest({
        type: options.type,
        data: options.data
      }, function(response) {
        options.success(response);
      });
    }
  };

  bridge.getDataFromBackground({
    type: 'background_info',
    data: {},
    success: function(res) {
      init(res);
    }
  });

  var initView = function() {
    var element = document.createElement('div');
    var styles = {
      position: 'fixed',
      width: '20%',
      height: '100%',
      zIndex: 9999,
      background: 'rgba(146, 146, 146, 0.5)',
      top: 0,
      right: 0
    };
    Object.assign(element.style, styles);
    document.body.appendChild(element);
  };

  var printInfo = function(background_info) {
    var table = [];
    Object.keys(background_info).forEach(function(key) {
      table.push({
        name: key,
        value: background_info[key]
      });
    });
    console.table(table);
  };

  var init = function(background_info) {
    try {
      printInfo(background_info);
      initView();
    } catch (e) {
      console.log(e);
    }
  };
})();

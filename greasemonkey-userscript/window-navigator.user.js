// ==UserScript==
// @name         window.navigator
// @description  Modify 'window.navigator' property values.
// @version      0.1.1
// @include      *
// @icon         https://github.com/google/material-design-icons/raw/4.0.0/png/action/explore/materialiconsoutlined/48dp/2x/outline_explore_black_48dp.png
// @run-at       document-start
// @homepage     https://github.com/warren-bank/crx-window-navigator/tree/greasemonkey-userscript
// @supportURL   https://github.com/warren-bank/crx-window-navigator/issues
// @downloadURL  https://github.com/warren-bank/crx-window-navigator/raw/greasemonkey-userscript/greasemonkey-userscript/window-navigator.user.js
// @updateURL    https://github.com/warren-bank/crx-window-navigator/raw/greasemonkey-userscript/greasemonkey-userscript/window-navigator.user.js
// @namespace    warren-bank
// @author       Warren Bank
// @copyright    Warren Bank
// ==/UserScript==

// https://www.tampermonkey.net/documentation.php

var options = {
  chrome_version: '84.0.4147.89',
  debug:          false
}

var navigator_attributes = {
  language:    'en-US',
  platform:    'Win64',
  product:     'Gecko',
  vendor:      'Google Inc.',
  appCodeName: 'Mozilla',
  appName:     'Netscape',
  appVersion:          '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + options.chrome_version + ' Safari/537.36',
  userAgent:   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + options.chrome_version + ' Safari/537.36'
}

var update_obj_attribute = function(obj, key, val, log) {
  if (!obj || !key || !val)     return
  if (!(obj instanceof Object)) return

  Object.defineProperty(
    obj,
    key,
    {
      get: function (){return val},
      set: function (){}
    }
  )

  if (options.debug && log && (log instanceof Function)) {
    log('window.navigator["' + key + '"] = ' + obj[key])

    if (obj[key] !== val) {
      log(' >> assertion error: does not equal expected value = ' + val)
    }
  }
}

var process_nav_properties = function(nav, log) {
  var key, val

  for (key in nav) {
    val = navigator_attributes[key]

    if (val) {
      update_obj_attribute(nav, key, val, log)
    }
  }
}

process_nav_properties(
  unsafeWindow.navigator,
  unsafeWindow.console.log.bind(unsafeWindow.console)
)

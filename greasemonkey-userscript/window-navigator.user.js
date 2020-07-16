// ==UserScript==
// @name         window.navigator
// @description  Modify 'window.navigator' attribute values.
// @version      0.1.0
// @include      *
// @icon         https://upload.wikimedia.org/wikipedia/commons/0/08/Netscape_icon.svg
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

const options = {
  chrome_version: '84.0.4147.89',
  debug:          true
}

const navigator_attributes = {
  language:    'en-US',
  platform:    'Win64',
  product:     'Gecko',
  vendor:      'Google Inc.',
  appCodeName: 'Mozilla',
  appName:     'Netscape',
  appVersion:          `5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${options.chrome_version} Safari/537.36`,
  userAgent:   `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${options.chrome_version} Safari/537.36`
}

const update_obj_attribute = (obj, key, val, log) => {
  if (!obj || !key || !val)     return
  if (!(obj instanceof Object)) return

  if (options.debug && log && (log instanceof Function))
    log(`window.navigator.${key} =`, val)

  Object.defineProperty(
    obj,
    key,
    {
      get: function (){return val},
      set: function (){}
    }
  )
}

(function(nav, log){
  let key, val

  for (key in nav) {
    val = navigator_attributes[key]
    update_obj_attribute(nav, key, val, log)
  }
})(unsafeWindow.navigator, unsafeWindow.console.log)

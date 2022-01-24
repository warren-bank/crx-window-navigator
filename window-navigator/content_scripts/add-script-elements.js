var debug      = false
var parentNode = null

var getParentNode = function() {
  if (!parentNode) {
    parentNode = window.document.getElementsByTagName('head')[0]
  }
  if (!parentNode && window.document.documentElement) {
    parentNode = window.document.createElement('head')
    window.document.documentElement.appendChild(parentNode)
  }
}

var add_script_element = function(url, text) {
  if (!url && !text) return

  getParentNode()
  if (!parentNode) return

  var el = window.document.createElement('script')

  if (url)
    el.setAttribute('src', url)

  if (text)
    el.innerHTML = text

  parentNode.appendChild(el)
  return el
}

var add_remote_script_element = function(url) {
  return add_script_element(url)
}

var add_embedded_script_element = function(path) {
  var url = chrome.runtime.getURL(path)
  return add_script_element(url)
}

var add_inline_script_element = function(text) {
  return add_script_element(null, text)
}

// -----------------------------------------------------------------------------

chrome.storage.sync.get(['nav_value'], function(result) {
  if (!result['nav_value']) return

  var $dependency = add_embedded_script_element('js/window-navigator.js')

  $dependency.addEventListener('load', function(){
    add_inline_script_element(
      [
        'window.update_navigator_properties(',
        [
          JSON.stringify(result['nav_value']),
          debug ? 'true' : 'false'
        ].join(', '),
        ')'
      ].join("\n")
    )
  })
})

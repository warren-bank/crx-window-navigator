var populate_nav_value = function(nav_value) {
  if (!nav_value) return

  if (nav_value instanceof Object)
    nav_value = JSON.stringify(nav_value, null, 2)

  if (typeof nav_value !== 'string') return

  var $nav_value = document.getElementById('nav_value')
  $nav_value.value = nav_value
}

var restore_nav_value = function() {
  chrome.storage.sync.get(['nav_value'], function(result) {
    populate_nav_value(result['nav_value'])
  })
}

var demo_nav_value = function() {
  var chrome_version = '84.0.4147.89'

  populate_nav_value({
    language:    'en-US',
    platform:    'Win64',
    product:     'Gecko',
    vendor:      'Google Inc.',
    appCodeName: 'Mozilla',
    appName:     'Netscape',
    appVersion:          '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + chrome_version + ' Safari/537.36',
    userAgent:   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + chrome_version + ' Safari/537.36'
  })
}

var save_nav_value = function() {
  var $nav_value = document.getElementById('nav_value')
  var  nav_value = $nav_value.value

  if (validate_nav_value(nav_value)) {
    chrome.storage.sync.set(
      {"nav_value": nav_value},
      function() {
        set_status_with_timer('Options saved.')
      }
    )
  }
  else {
    set_status_with_timer('Invalid JSON.')
  }
}

var validate_nav_value = function(nav_value) {
  var nav
  try {
    nav = JSON.parse(nav_value)
    if (!(nav instanceof Object)) throw ''
    return true
  }
  catch(e) {
    return false
  }
}

var status_timer = 0
var set_status_timer = function($status, delay) {
  if (!($status instanceof HTMLElement)) {
    $status = document.getElementById('status')
  }

  if (typeof delay !== 'number') {
    delay = 1500
  }

  if (status_timer !== 0) {
    clearTimeout(status_timer)
  }

  status_timer = setTimeout(
    function() {
      $status.textContent = ''
      status_timer = 0
    },
    delay
  )
}

var set_status_with_timer = function(status_message, $status, delay) {
  if (typeof status_message !== 'string') return

  if (!($status instanceof HTMLElement)) {
    $status = document.getElementById('status')
  }

  // Update status
  $status.textContent = status_message

  // Clear status after a delay
  set_status_timer($status, delay)
}

var add_events = function() {
  var $demo = document.getElementById('demo')
  var $save = document.getElementById('save')

  $demo.addEventListener('click', demo_nav_value)
  $save.addEventListener('click', save_nav_value)
}

restore_nav_value()
add_events()

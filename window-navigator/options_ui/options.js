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

  chrome.storage.sync.set(
    {"nav_value": nav_value},
    function() {
      // Update status to let user know options were saved.
      var $status = document.getElementById('status')
      $status.textContent = 'Options saved.'

      // Clear status message after a brief period of time
      setTimeout(function() {
        $status.textContent = ''
      }, 750)
    }
  )
}

var add_events = function() {
  var $demo = document.getElementById('demo')
  var $save = document.getElementById('save')

  $demo.addEventListener('click', demo_nav_value)
  $save.addEventListener('click', save_nav_value)
}

restore_nav_value()
add_events()

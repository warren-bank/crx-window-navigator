window.update_navigator_properties = function(navigator_attributes, log) {
  if (!navigator_attributes) return

  if (typeof navigator_attributes === 'string') {
    try {
      navigator_attributes = JSON.parse(navigator_attributes)
    }
    catch(e) {}
  }

  if (!(navigator_attributes instanceof Object)) return

  if (log === true) {
    log = window.console.log.bind(window.console)
  }

  var update_obj_attribute = function(obj, key, val) {
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

    if (log instanceof Function) {
      log('window.navigator["' + key + '"] = ' + obj[key])

      if (obj[key] !== val) {
        log(' >> assertion error: does not equal expected value = ' + val)
      }
    }
  }

  var process_nav_properties = function(nav) {
    var key, val

    for (key in nav) {
      val = navigator_attributes[key]

      if (val) {
        update_obj_attribute(nav, key, val)
      }
    }
  }

  process_nav_properties(window.navigator)
}

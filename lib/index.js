var tests = [];

var defaults = {
  storageKey: 'OILER',
  timeout: 2500
};

exports.defaults(function(obj) {
  for (var key in obj) {
    defaults[key] = obj[key];
  }
});

function processConfig(config) {
  var obj = {};
  var key;
  for (key in defaults) {
    obj[key] = defaults[key];
  }
  for (key in config) {
    obj[key] = config[key];
  }
  if (!('run' in obj)) {
    throw new Error('Missing "run" function for test page');
  }
  return obj;
}

exports.page = function(config) {
  config = processConfig(config);
  tests.push(config);
};

function run() {
  var next = Number(window.sessionStorage.getItem(defaults.storageKey)) || 0;
  var page = tests[next];
  if (!page) {
    throw new Error('Failed to get page config: ' + next);
  }

  ++next;
  window.sessionStorage.setItem(defaults.storageKey, String(next));
  window.location.reload();
}

window.addEventListener('load', run);

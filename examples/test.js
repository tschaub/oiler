var test = require('../lib');

test.page({
  id: 'some id',
  query: {
    foo: 'bar'
  },
  hash: 'foo/bar',
  timeout: 2000,
  run: function(done) {
    done();
  }
});

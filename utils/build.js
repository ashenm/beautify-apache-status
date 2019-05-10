/**
 * BeautifyApacheStatus
 * An Apache built-in Server Status Page Beautifier
 * https://github.com/ashenm/beautify-apache-status
 *
 * Ashen Gunaratne
 * mail@ashenm.ml
 *
 */

const fs = require('fs');

fs.readFile('src/beautify.js', 'utf8', function (error, data) {

  let result;

  if (error) {
    throw error;
  }

  if ((result = require('uglify-js').minify(data)).error) {
    throw result.error;
  }

  fs.writeFileSync('build/beautify.min.js', result.code, { mode: 0o600 });

});

var ecstatic = require('ecstatic')
var st = ecstatic(__dirname + '/public')
var http = require('http')
var server = http.createServer(function (req, res) {
  st(req, res)
})
server.listen(5000)

var wsock = require('websocket-stream')
var split = require('split2')
var through = require('through2')
var onend = require('end-of-stream')

wsock.createServer({ server: server }, function (stream) {
  stream.pipe(process.stdout)
  var i = 0
  var iv = setInterval(function () {
    stream.write('HELLO ' + (i++) + '\n')
  }, 1000)
  onend(stream, function () { clearInterval(iv) })
})

var test = require('tinytap');
var tessel = require('tessel');
var async = require('async');
var AttinyLib = require('../lib');

var irTiny;
var ambientTiny;
var irPort = process.argv[2] || 'A';
var ambientPort = process.argv[3] || 'B';
var irTiny = new AttinyLib(tessel.port[irPort]);
var ambientTiny = new AttinyLib(tessel.port[ambientPort]);

test.count(3);

async.series([
  test('creating a new attiny', function(t) {
    t.ok(irTiny, 'could not create the IR tiny object');
    t.ok(ambientTiny, 'could not create the Ambient tiny object');
    t.ok(irTiny.hardware, 'did not initialize hardware properties correctly');
    t.end();
  }),

  test('initializing the ir tiny', function(t) {

    var firmwareOptions = {
      firmwareFile : './test/infrared-attx4.hex',
      firmwareVersion : 0x04,
      moduleID : 0x08,
      signature : 0x930C,
      crc : (0x52 << 8) | 0x88,
    }

    irTiny.initialize(firmwareOptions, function(err) {
      console.log('err', err);
      t.equal(err, undefined, 'error thrown on valid initialization');
      t.end();
    });
  }),

  ],
  function(err) {
    console.log('err running tests', err);
  }
);

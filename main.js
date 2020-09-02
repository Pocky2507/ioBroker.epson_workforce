/* jshint -W097 */ // jshint strict:false
/*jslint node: true */

"use strict";
var utils = require('@iobroker/adapter-core'); // Get common adapter utils
var request = require('request');
var lang = 'de';
var callReadPrinter;
var ip = '';
var baselevel = 50; // bedeutet: in der Webseite wird ein Balken von 100% Höhe 50px hoch gezeichnet. 
                    // Also entspricht ein gezeigtes Tintenlevel von 25 (px) dann 50% und eines von 10 (px) dann 20%
var link = '';
var sync = 180;

var adapter = utils.Adapter({
    name: 'epson_workforce',
    systemConfig: true,
    useFormatDate: true,
    
    unload: function(callback) {
        try {
            adapter.log.info('terminating epson printer adapter');
            stopReadPrinter();
            callback();
        } catch (e) {
            callback();
        }
    },
    ready: function() {
        adapter.log.debug('initializing objects');
        main();
    }
});


var ink = {
    'cyan' : {
        'state': 'cyan',
        'name': 'Cyan',
        'cut':  'IMAGE/Ink_C.PNG\' height=',
        'cartridge_cut': '(C)&nbsp;:</span></dt><dd class="value clearfix"><div class="preserve-white-space">'    
    },
    'yellow' : {
        'state': 'yellow',
        'name': 'Yellow',
        'cut':  'IMAGE/Ink_Y.PNG\' height=',
        'cartridge_cut': '(Y)&nbsp;:</span></dt><dd class="value clearfix"><div class="preserve-white-space">'    
    },
    'black' : {
        'state': 'black',
        'name': 'Black',
        'cut':  'IMAGE/Ink_K.PNG\' height=',
        'cartridge_cut': '(BK)&nbsp;:</span></dt><dd class="value clearfix"><div class="preserve-white-space">'    
    },
    'magenta' : {
        'state': 'magenta',
        'name': 'Magenta',
        'cut':  'IMAGE/Ink_M.PNG\' height=',
        'cartridge_cut': '(M)&nbsp;:</span></dt><dd class="value clearfix"><div class="preserve-white-space">'    
    },
    'waste' : {
        'state': 'waste',
        'name': 'Waste',
        'cut':  'IMAGE/Ink_Waste.PNG\' height=',
        'cartridge_cut': 'Wartungsbox&nbsp;:</span></dt><dd class="value clearfix"><div class="preserve-white-space">'    
    }
};

function readSettings() {
    //check if IP is entered in settings
    
    if (!adapter.config.printerip) {
        adapter.log.warn('No IP adress of printer set up. Adapter will be stopped.');
        //stopReadPrinter();
    } 
    else { // ip entered
        ip = (adapter.config.printerport.length > 0) ? adapter.config.printerip + ':' + adapter.config.printerport : adapter.config.printerip; // if port is set then ip+port else ip only
        adapter.log.debug('IP: ' + ip);
        link = 'http://' + ip + '/PRESENTATION/ADVANCED/INFO_PRTINFO/TOP';
    
        //check if sync time is entered in settings
        sync = (!adapter.config.synctime) ? 180 : parseInt(adapter.config.synctime,10);
        adapter.log.debug('ioBroker reads printer every ' + sync + ' minutes');

    } // end ip entered
}

function readPrinterStatus() {

    var mac_cut = 'MAC-Adresse&nbsp;:</span></dt><dd class="value clearfix"><div class="preserve-white-space">',
        mac_cut2 = '</div>'
        firmware_cut = 'Firmware-Version&nbsp;:</span></dt><dd class="value clearfix"><div class="preserve-white-space">', 
        firmware_cut2 = '</div>',
        serial_cut = 'Seriennummer&nbsp;:</span></dt><dd class="value clearfix"><div class="preserve-white-space">',
        serial_cut2 = '<div>';
 
    adapter.setState('ip', {
        val: ip,
        ack: false
    });
 
    var unreach = true;
    request({"rejectUnauthorized": false, "url": link, "method": "GET"}, function(error, response, body) {
        if (!error && response.statusCode === 200) {
        
            unreach = false;
            adapter.setState('ip', {
                val: ip,
                ack: true
            });
            
            // MAC ADRESSE EINLESEN
            var mac_cut_position = body.indexOf(mac_cut) + mac_cut.length,
                mac_cut2_position = body.indexOf(mac_cut2) - 1;
            var mac_string = body.substring(mac_cut_position, mac_cut2_position);
            adapter.setState('mac', {val: mac_string, ack: true});
            
            // read firmware version
            var firmware_cut_position = body.indexOf(firmware_cut) + firmware_cut.length,
                firmware_cut2_position = body.indexOf(firmware_cut2) - 1;
            var firmware_string = body.substring(firmware_cut_position, firmware_cut2_position);
            adapter.setState('firmware', {val: firmware_string, ack: true});

            // read serial number
            var serial_cut_position = body.indexOf(serial_cut) + serial_cut.length,
                serial_cut2_position = body.indexOf(serial_cut2) - 1;
            var serial_string = body.substring(serial_cut_position, serial_cut2_position);
            adapter.setState('serial', {val: serial_string, ack: true});
        
            for (var i in ink) {
               adapter.setObjectNotExists('inks.' + ink[i].state + '.level', {
                    type: 'state',
                    common: {
                        name: 'Level of ' + ink[i].name,
                        desc: 'Level of ' + ink[i].name,
                        type: 'number',
                        unit: '%',
                        read: true,
                        write: false
                    },
                    native: {}
                });
                // create state with ink name + cartrigde
                adapter.setObjectNotExists('inks.' + ink[i].state + '.cartridge', {
                    type: 'state',
                    common: {
                        name: 'Cartridge name for ' + ink[i].name,
                        desc: 'Cartridge name for ' + ink[i].name,
                        type: 'string',
                        def:  '-',
                        read: true,
                        write: false
                    },
                    native: {}
                });
           
                // read levels
            
                var cut_position = body.indexOf(ink[i].cut) + ink[i].cut.length + 1;
                var level_string = body.substring(cut_position, cut_position + 2);
                //adapter.log.debug(ink[i].name + ' Levelstring: ' + level_string + 'px');
                var level = parseInt(level_string,10) * 100 / parseInt(baselevel,10);
                adapter.setState('inks.' + ink[i].state + '.level', {val: level, ack: true});
                adapter.log.debug(ink[i].name + ' Level: ' + level + '%');
              
                // read cartridge
                cut_position = body.indexOf(ink[i].cartridge_cut) + ink[i].cartridge_cut.length;
                var cut_end_pos = body.indexOf("<", cut_position + 1);
                var cartridge_string = body.substring(cut_position, cut_end_pos);
                adapter.log.debug(ink[i].name + ' cartridgestring: ' + cartridge_string);
                adapter.setState('inks.' + ink[i].state + '.cartridge', {val: cartridge_string, ack: true});
            } // end for
            
            adapter.log.debug('Channels and states created/read');
            
        } else {
            adapter.log.warn('Cannot connect to Printer: ' + error);
            unreach = true;
        }
        // Write connection status
        adapter.setState('UNREACH', {
            val: unreach,
            ack: true
        });
    }); // End request 
    adapter.log.debug('finished reading printer status data');
}

function readPrinterNetWork() {

    var name_cut = 'Druckername&nbsp;:&nbsp;',
        name_cut2 = 'Verbindungsstatus',
        connect_cut = 'Verbindungsstatus&nbsp;:&nbsp;',
        connect_cut2 = 'IP-Adresse beziehen',
        model_cut = '<title>',
        model_cut2 = '</title>';
 
    adapter.setState('ip', {
        val: ip,
        ack: false
    });
 
    var unreach = true;
    request({"rejectUnauthorized": false, "url": link, "method": "GET"}, function(error, response, body) {
        if (!error && response.statusCode === 200) {
        
            unreach = false;
            adapter.setState('ip', {
                val: ip,
                ack: true
            });
             // NAME EINLESEN
            var name_cut_position = body.indexOf(name_cut) + name_cut.length,
                name_cut2_position = body.indexOf(name_cut2) - 1;
            var name_string = body.substring(name_cut_position, name_cut2_position);
            adapter.setState('name', {val: name_string, ack: true});  
            
            // MODELL EINLESEN
            var model_cut_position = body.indexOf(model_cut) + model_cut.length,
                model_cut2_position = body.indexOf(model_cut2);
            var model_string = body.substring(model_cut_position, model_cut2_position);
            adapter.setState('model', {val: model_string, ack: true});  
            
            // CONNECTION EINLESEN
            var connect_cut_position = body.indexOf(connect_cut) + connect_cut.length,
                connect_cut2_position = body.indexOf(connect_cut2) - 1;
            var connect_string = body.substring(connect_cut_position, connect_cut2_position);
            adapter.setState('connect', {val: connect_string, ack: true});
            
            adapter.log.debug('Channels and states created/read');
            
        } else {
            adapter.log.warn('Cannot connect to Printer: ' + error);
            unreach = true;
        }
        // Write connection status
        adapter.setState('UNREACH', {
            val: unreach,
            ack: true
        });
    }); // End request 
    adapter.log.debug('finished reading printer network data');
}

function stopReadPrinter() {
    clearInterval(callReadPrinter);
    adapter.log.info('Epson Workforce adapter stopped');
}

function main() {
    //adapter.subscribeStates('*'); 
    readSettings();
    adapter.log.debug('Epson Workforce adapter started...');
    readPrinterNetwork();
    readPrinterStatus();
    callReadPrinter = setInterval(function() {
        adapter.log.debug('connecting printer webserver ...');
        readPrinter();
    }, sync * 1000 * 60);
}

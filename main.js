/* jshint -W097 */ // jshint strict:false
/*jslint node: true */

"use strict";
var utils = require('@iobroker/adapter-core'); // Get common adapter utils
var adapter = utils.Adapter('epson_workforce');
//var configChanged = false;
var request = require('request');
var lang = 'de';
var callReadPrinter;
var ip = '';
var baselevel = 50; // bedeutet: in der Webseite wird ein Balken von 100% Höhe 50px hoch gezeichnet. 
                    // Also entspricht ein gezeigtes Tintenlevel von 25 (px) dann 50% und eines von 10 (px) dann 20%
var sync = 180;

//var adapter = utils.Adapter({
//    name: 'epson_workforce',
//    systemConfig: true,
//    useFormatDate: true,
    
adapter.on('unload', function (callback) {
    try {
        adapter.log.info('terminating epson printer adapter');
        stopReadPrinter();
        callback();
    } catch (e) {
        callback();
    }
});

adapter.on('ready', function () {
    adapter.log.debug('initializing objects');
    main();
});

var ink = {
    'cyan' : {
        'state': 'cyan',
        'name': 'Cyan',
        'inklvl_rx':  "IMAGE\\/Ink_C\\.PNG\\' height=\\'([0-9]{1,2})\\'",
        'cartridge_rx': "\\(C\\)&nbsp;\\:<\\/span><\\/dt><dd class=\\\"value clearfix\\\"><div class=\\\"preserve-white-space\\\">([a-zA-Z0-9\\/]*)<\\/div>"
    },
    'yellow' : {
        'state': 'yellow',
        'name': 'Yellow',
        'inklvl_rx':  "IMAGE\\/Ink_Y\\.PNG\\' height=\\'([0-9]{1,2})\\'",
        'cartridge_rx': "\\(Y\\)&nbsp;\\:<\\/span><\\/dt><dd class=\\\"value clearfix\\\"><div class=\\\"preserve-white-space\\\">([a-zA-Z0-9\\/]*)<\\/div>"    
    },
    'black' : {
        'state': 'black',
        'name': 'Black',
        'inklvl_rx':  "IMAGE\\/Ink_K\\.PNG\\' height=\\'([0-9]{1,2})\\'",
        'cartridge_rx': "\\(BK\\)&nbsp;\\:<\\/span><\\/dt><dd class=\\\"value clearfix\\\"><div class=\\\"preserve-white-space\\\">([a-zA-Z0-9\\/]*)<\\/div>" 
    },
    'magenta' : {
        'state': 'magenta',
        'name': 'Magenta',
        'inklvl_rx':  "IMAGE\\/Ink_M\\.PNG\\' height=\\'([0-9]{1,2})\\'",
        'cartridge_rx': "\\(M\\)&nbsp;\\:<\\/span><\\/dt><dd class=\\\"value clearfix\\\"><div class=\\\"preserve-white-space\\\">([a-zA-Z0-9\\/]*)<\\/div>"    
    },
    'waste' : {
        'state': 'waste',
        'name': 'Waste',
        'inklvl_rx':  "IMAGE\\/Ink_Waste\\.PNG\\' height=\\'([0-9]{1,2})\\'",
        'cartridge_rx': "Wartungsbox&nbsp;\\:<\\/span><\\/dt><dd class=\\\"value clearfix\\\"><div class=\\\"preserve-white-space\\\">([a-zA-Z0-9\\/]*)<\\/div>"    
    }
};

function readSettings() {
    //check if IP is entered in settings
    
    if (!adapter.config.printerip) {
        adapter.log.warn('No IP adress of printer set up. Adapter will be stopped.');
        stopReadPrinter();
    } 
    else { // ip entered
        ip = (adapter.config.printerport.length > 0) ? adapter.config.printerip + ':' + adapter.config.printerport : adapter.config.printerip; // if port is set then ip+port else ip only
        adapter.log.debug('IP: ' + ip);
    
        //check if sync time is entered in settings
        sync = (!adapter.config.synctime) ? 180 : parseInt(adapter.config.synctime,10);
        adapter.log.debug('ioBroker reads printer every ' + sync + ' minutes');

    } // end ip entered
}

function readPrinterStatus() {
    var link = 'http://' + ip + '/PRESENTATION/ADVANCED/INFO_PRTINFO/TOP';
    var unreach = true;

    request({"rejectUnauthorized": false, "url": link, "method": "GET"}, async function(error, response, body) {
        if (!error && response.statusCode === 200) {
            unreach = false;
            var match, rx;
            // MAC ADRESSE EINLESEN
            rx = new RegExp( /(?:MAC-Adresse|MAC Address|Adresse MAC Wi-Fi\/R.seau|Indirizzo MAC Wi-Fi\/rete|Dirección MAC de Wi-Fi\/Red|Endereço MAC de Wi-Fi\/Rede)&nbsp;:<\/span><\/dt><dd class=\"value clearfix\"><div class=\"preserve-white-space\">([a-zA-Z0-9:]*)<\/div>/g );
            while((match = rx.exec(body)) != null) {
                var mac_string = match[1];
            }
            adapter.log.debug('mac_string: ' + mac_string);
            adapter.setState('mac', {val: mac_string, ack: true});
            
            // read firmware version
            rx = new RegExp( /(?:Firmware-Version|Firmware Version|Version firmware|Versione firmware|Versión del firmware|Versão do firmware)&nbsp;:<\/span><\/dt><dd class=\"value clearfix\"><div class=\"preserve-white-space\">([a-zA-Z0-9 äöüÄÖÜ\-\_\.]*)<\/div>/g );
            while((match = rx.exec(body)) != null) {
                var firmware_string = match[1];
            }
            adapter.log.debug('firmware_string: ' + firmware_string);
            adapter.setState('firmware', {val: firmware_string, ack: true});

            // read serial number
            rx = new RegExp( /(?:Seriennummer|Serial Number|Numéro de série|Numero di serie|Número de serie|Número de série)&nbsp;:<\/span><\/dt><dd class=\"value clearfix\"><div class=\"preserve-white-space\">([a-zA-Z0-9]*)<\/div>/g );
            while((match = rx.exec(body)) != null) {
                var serial_string = match[1];
            }
            adapter.log.debug('serial_string: ' + serial_string);
            adapter.setState('serial', {val: serial_string, ack: true});

            for (var i in ink) {
               await adapter.setObjectNotExistsAsync('inks.' + ink[i].state + '.level', {
                    type: 'state',
                    common: {
                        name: 'Level of ' + ink[i].name,
                        desc: 'Level of ' + ink[i].name,
                        type: 'number',
                        role: 'value.fill',
                        unit: '%',
                        read: true,
                        write: false
                    },
                    native: {}
                });
                // create state with ink name + cartrigde
                await adapter.setObjectNotExistsAsync('inks.' + ink[i].state + '.cartridge', {
                    type: 'state',
                    common: {
                        name: 'Cartridge name for ' + ink[i].name,
                        desc: 'Cartridge name for ' + ink[i].name,
                        type: 'string',
                        role: 'text',
                        def:  'unknown',
                        read: true,
                        write: false
                    },
                    native: {}
                });
           
                // read levels
                rx = new RegExp(ink[i].inklvl_rx, "g");
                while((match = rx.exec(body)) != null) {
                    var level_string = match[1];
                }
                adapter.log.debug(ink[i].name + ' Levelstring: ' + level_string + 'px');
                var level = parseInt(level_string,10) * 100 / parseInt(baselevel,10);
                adapter.setState('inks.' + ink[i].state + '.level', {val: level, ack: true});
                adapter.log.debug(ink[i].name + ' Level: ' + level + '%');
              
                // read cartridge
                rx = new RegExp(ink[i].cartridge_rx, "g");
                while((match = rx.exec(body)) != null) {
                    var cartridge_string = match[1];
                }
                adapter.log.debug(ink[i].name + ' cartridge_string: ' + cartridge_string);
                adapter.setState('inks.' + ink[i].state + '.cartridge', {val: cartridge_string, ack: true});
                
            } // end for
            
            adapter.log.debug('Channels and states created/read');
            
        } else {
            adapter.log.warn('Cannot connect to Printer: ' + error);
            unreach = true;
        }
        // Write connection status
        adapter.setState('UNREACH', {val: unreach, ack: true});
    }); // End request 
    adapter.log.debug('finished reading printer status data');
}

function readPrinterNetwork() {
    var link = 'http://' + ip + '/PRESENTATION/ADVANCED/INFO_NWINFO/TOP';
    var unreach = true;
    adapter.setState('ip', {val: ip, ack: true});

    request({"rejectUnauthorized": false, "url": link, "method": "GET"}, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            unreach = false;
            var match, rx;
            // NAME EINLESEN
            rx = new RegExp( /(?:Druckername|Printer Name|Nom de l\'imprimante|Nome stampante|Nombre de la impresora|Nome da impressora)&nbsp;:<\/span><\/dt><dd class=\"value clearfix\"><div class=\"preserve-white-space\">([a-zA-Z0-9 äöüÄÖÜ\-\_]*)<\/div>/g );
            while((match = rx.exec(body)) != null) {
                var name_string = match[1];
            }
            adapter.log.debug('name_string: ' + name_string);
            adapter.setState('name', {val: name_string, ack: true});
            
            // MODELL EINLESEN
            rx = new RegExp( /<title>([a-zA-Z0-9 äöüÄÖÜ\-\_]*)<\/title>/g );
            while((match = rx.exec(body)) != null) {
                var model_string = match[1];
            }
            adapter.log.debug('model_string: ' + model_string);
            adapter.setState('model', {val: model_string, ack: true});
            
            adapter.log.debug('states updated');
            
        } else {
            adapter.log.warn('Cannot connect to Printer: ' + error);
            unreach = true;
        }
        // Write connection status
        adapter.setState('UNREACH', {val: unreach, ack: true});
    }); // End request 
    adapter.log.debug('finished reading printer network data');
}

function readPrinterMaintenance() {

    var link = 'http://' + ip + '/PRESENTATION/ADVANCED/INFO_MENTINFO/TOP';
 
    adapter.setState('ip', {val: ip, ack: true});
 
    var unreach = true;
    request({"rejectUnauthorized": false, "url": link, "method": "GET"}, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            unreach = false;
            var match, rx;

            // ERSTDRUCKDATUM EINLESEN
            rx = new RegExp( /(?:Erstdruckdatum|First Printing Date|Date de première impression|Data prima stampa|Primera fecha de impresión|Data da primeira impressão)&nbsp;\:<\/span><\/dt><dd class=\"value clearfix\"><div class=\"preserve-white-space\">(\d\d\-\d\d\-\d\d\d\d)<\/div>/g );
            while((match = rx.exec(body)) != null) {
                var first_print_string = match[1];
            }
            adapter.log.debug('first_print_string: ' + first_print_string);
            adapter.setState('first_print_date', {val: first_print_string, ack: true});
            
            // GESAMTZAHL SEITEN
            rx = new RegExp( /(?:Total Number of Pages|Gesamtanzahl Seiten)&nbsp;\:<\/span><\/dt><dd class=\"value clearfix\"><div class=\"preserve-white-space\">(\d*)<\/div>/g );
            while((match = rx.exec(body)) != null) {
                var pages_string = match[1];
            }
            adapter.log.debug('pages_string: ' + pages_string);
            var page_count = parseInt(pages_string, 10);
            adapter.log.debug('page_count: ' + page_count);
            adapter.setState('page_count', {val: page_count, ack: true});
            
            // GESAMTZAHL SEITEN: S&W SCAN
            rx = new RegExp( /(?:W-Scan)&nbsp;\:<\/span><\/dt><dd class=\"value clearfix\"><div class=\"preserve-white-space\">(\d*)<\/div>/g );
            while((match = rx.exec(body)) != null) {
                var pages_string = match[1];
            }
            adapter.log.debug('b&w scanned pages string: ' + pages_string);
            var page_count = parseInt(pages_string, 10);
            adapter.log.debug('b&w scanned page_count: ' + page_count);
            adapter.setState('scan_count_bw', {val: page_count, ack: true});

            // GESAMTZAHL SEITEN: FARBE SCAN
            rx = new RegExp( /(?:Color Scan|Farbe-Scan)&nbsp;\:<\/span><\/dt><dd class=\"value clearfix\"><div class=\"preserve-white-space\">(\d*)<\/div>/g );
            while((match = rx.exec(body)) != null) {
                var pages_string = match[1];
            }
            adapter.log.debug('color scanned pages string: ' + pages_string);
            var page_count = parseInt(pages_string, 10);
            adapter.log.debug('color scanned page_count: ' + page_count);
            adapter.setState('scan_count_color', {val: page_count, ack: true});

            adapter.log.debug('states updated');
        } else {
            adapter.log.warn('Cannot connect to Printer: ' + error);
            unreach = true;
        }
        // Write connection status
        adapter.setState('UNREACH', {val: unreach, ack: true});
    }); // End request 
    adapter.log.debug('finished reading printer maintenance data');
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
    readPrinterMaintenance();
    callReadPrinter = setInterval(function() {
        adapter.log.debug('connecting printer webserver ...');
        readPrinterNetwork();
        readPrinterStatus();
        readPrinterMaintenance();
    }, sync * 1000 * 60);
}

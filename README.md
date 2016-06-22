![Logo](admin/epson_stylus_px830.png)
# ioBroker.epson_stylus_px830
=================

[![NPM version](http://img.shields.io/npm/v/iobroker.epson_stylus_px830.svg)](https://www.npmjs.com/package/iobroker.epson_stylus_px830)
[![Downloads](https://img.shields.io/npm/dm/iobroker.epson_stylus_px830.svg)](https://www.npmjs.com/package/iobroker.epson_stylus_px830)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.epson_stylus_px830.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.epson_stylus_px830)

[![NPM](https://nodei.co/npm/iobroker.epson_stylus_px830.png?downloads=true)](https://nodei.co/npm/iobroker.epson_stylus_px830/)

## Beschreibung / Description
:de: Dieser Adapter liest den Zustand der Tintenpatronen eines Epson Stylus Photo PX830 von des Webseite ein

:uk: This adapter reads the ink levels of an Epson Stylus Photo PX830 from the printers website

![alt text](img/printer_website.png "Website of EPSON Stylus Photo PX830")

## Einstellungen / Configuration
### IP / Port
Die IP Adresse des Druckers im lokalen Netzwerk. Ohne Eingabe gibt es keine Abfrage. Die Portnummer ist optional und wird nur bei Eingabe einer IP-Adresse berücksichtigt.

IP adress of Epson Printer within local network. The adapter will stop if no IP is entered. The port number is optional and only will be considered if an ip adress was set before.

### Synchronisation
Dauer zwischen den Abfragen des Druckers durch ioBroker. Die Eingabe ist optional. Standard ist 180 Minuten (alle 3 Stunden).

In synctime you can choose the frequency of connections to the printer in minutes. Default is 180min, input is optional.

##  Datenpunkte / Datapoints
![alt text](img/epson_stylus_px830SettingScreenshot.jpg "Screenshot Settings")

## Aktivierung / Schedule
Der Adapter startet wie in den Einstellungen angegeben.

The adapter starts as often as set up in the settings window.

##  Datenpunkte / Datapoints

epson_stylus_px830.0.__UNREACH__ (*boolean*)

epson_stylus_px830.0.__IP__(*string*)

epson_stylus_px830.0.__connect__ (*string*)

epson_stylus_px830.0.__name__  (*string*)

epson_stylus_px830.0.__model__ (*string*)

epson_stylus_px830.0.__mac__ (*string*)

epson_stylus_px830.0.__inks__ (*channel*)

For every color:

epson_stylus_px830.0.__inks.color.level__ (*number 0-100%*)

epson_stylus_px830.0.__inks.color.cartridge__ (*string*) -> Epson product name for its ink

## VIS
### Widget
Example set of widgets for VIS
![alt text](img/VISScreenshot.jpg "Example VIS Widgets")
```
[{"tpl":"tplImage","data":{"visibility-cond":"==","visibility-val":1,"refreshInterval":"0","refreshOnWakeUp":"false","refreshOnViewChange":"false","name":"idealo.de Preisechart","src":"http://cdn.idealo.com/folder/Product/1057/8/1057817/s1_pricetrendFaceliftLarge.png","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"575px","top":"193px","z-index":"20","width":"405px","height":"233px"},"widgetSet":"basic"},{"tpl":"tplFrame","data":{"visibility-cond":"==","visibility-val":1,"title":"idealo.de Preisentwicklung der letzten 90 Tage","title_color":"rgba(250,250,250,1)","title_top":"18","title_left":"15","header_height":"0","header_color":"red","title_font":"RobotoCondensed-Regular, Futura","title_back":"","name":"Hintergrund idealo","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"553px","top":"61px","width":"445px","height":"656px","background":"","background-color":"rgba(100,100,100,0.2)","z-index":"10","border-radius":"20px","border-style":"none","font-size":"16px","font-family":""},"widgetSet":"basic"},{"tpl":"tplHtml","data":{"visibility-cond":"==","visibility-val":1,"refreshInterval":"0","name":"Hinweis Tintenpackung","html":"<a target=\"_blank\" href=\"http://www.idealo.de/preisvergleich/OffersOfProduct/1057817_-t0807-multipack-6-farbig-c13t08074010-epson.html\">Multipack Epson T0807</a> (ca. 60€)","class":"pix_link","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"575px","top":"164px","z-index":"25","color":"rgba(250,250,250,1)","font-family":"","font-size":"14px","width":"auto","height":"26px","font-style":"oblique"},"widgetSet":"basic"},{"tpl":"tplHtml","data":{"visibility-cond":"==","visibility-val":1,"refreshInterval":"0","html":"Druckertinte","name":"Überschrift","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"83px","top":"22px","width":"200px","height":"29px","color":"rgba(250,250,250,1)","text-align":"left","text-shadow":"2px 3px rgba(250,250,250,0.2)","font-family":"RobotoCondensed-Regular, Futura","font-style":"italic","font-variant":"normal","font-weight":"normal","font-size":"25px","z-index":"40"},"widgetSet":"basic"},{"tpl":"tplHtml","data":{"visibility-cond":"==","visibility-val":1,"refreshInterval":"0","name":"Hinweis Tintenpackung Ersatz","html":"<a target=\"_blank\" href=\"http://www.idealo.de/preisvergleich/OffersOfProduct/2612885_-e111v-schwarz-farbe-mit-chip-vorteilspack-kmp.html\">KMP E111V</a> (ca. 22€)","class":"pix_link","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"577px","top":"437px","z-index":"25","color":"rgba(250,250,250,1)","font-family":"","font-size":"14px","width":"auto","height":"26px","font-style":"oblique"},"widgetSet":"basic"},{"tpl":"tplValueTimestamp","data":{"oid":"epson_stylus_px830.0.inks.cyan.level","visibility-cond":"==","visibility-val":1,"format_date":"DD.MM.YYYY hh:mm:ss","html_prepend":"<span style=\"font-size: 14px; line-height: 14px;\">Aktualisierung:&nbsp;&nbsp;</span>","name":"Letzte Aktualisierung (Cyan)","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"is_milliseconds":true},"style":{"left":"88px","top":"511px","z-index":"21","color":"rgba(250,250,250,1)","font-family":"","text-align":"right","width":"390px","height":"22px","font-size":"12px","line-height":"14px"},"widgetSet":"basic"},{"tpl":"tplValueFloatBar","data":{"oid":"epson_stylus_px830.0.inks.cyan.level","visibility-cond":"==","visibility-val":1,"factor":"1","color":"cyan","name":"Cyan","reverse":true,"orientation":"vertical","min":"0","max":"100","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"87px","top":"193px","z-index":"22","color":"rgba(250,250,250,1);","width":"53px","height":"180px"},"widgetSet":"basic"},{"tpl":"tplValueFloatBar","data":{"oid":"epson_stylus_px830.0.inks.yellow.level","visibility-cond":"==","visibility-val":1,"factor":"1","color":"yellow","name":"Yellow","reverse":true,"orientation":"vertical","html":"Druckertinte","min":"0","max":"100","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"220px","top":"193px","z-index":"22","color":"rgba(250,250,250,1);","width":"53px","height":"180px"},"widgetSet":"basic"},{"tpl":"tplValueFloatBar","data":{"oid":"epson_stylus_px830.0.inks.cyanlight.level","visibility-cond":"==","visibility-val":1,"factor":"1","color":"#d5f1f1","name":"Light Cyan","reverse":true,"orientation":"vertical","html":"Druckertinte","min":"0","max":"100","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"153px","top":"193px","z-index":"22","color":"rgba(250,250,250,1);","width":"53px","height":"180px"},"widgetSet":"basic"},{"tpl":"tplValueFloatBar","data":{"oid":"epson_stylus_px830.0.inks.black.level","visibility-cond":"==","visibility-val":1,"factor":"1","color":"black","name":"Black","reverse":true,"orientation":"vertical","html":"Druckertinte","min":"0","max":"100","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"286px","top":"193px","z-index":"22","color":"rgba(250,250,250,1);","width":"53px","height":"180px"},"widgetSet":"basic"},{"tpl":"tplValueFloatBar","data":{"oid":"epson_stylus_px830.0.inks.magenta.level","visibility-cond":"==","visibility-val":1,"factor":"1","color":"Magenta","name":"Magenta","reverse":true,"orientation":"vertical","html":"Druckertinte","min":"0","max":"100","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"353px","top":"193px","z-index":"22","color":"rgba(250,250,250,1);","width":"53px","height":"180px"},"widgetSet":"basic"},{"tpl":"tplValueFloatBar","data":{"oid":"epson_stylus_px830.0.inks.magentalight.level","visibility-cond":"==","visibility-val":1,"factor":"1","color":"#ecb1eb","name":"Magenta Light","reverse":true,"orientation":"vertical","html":"Druckertinte","min":"0","max":"100","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"420px","top":"193px","z-index":"22","color":"rgba(250,250,250,1);","width":"53px","height":"180px"},"widgetSet":"basic"},{"tpl":"tplMetroTileString","data":{"visibility-cond":"<=","visibility-val":"20","bg_class_false":"bg-transparent","bg_class_true":"bg-transparent","icon_class_false":"icon-droplet","icon_class_true":"","badge_bg_class_false":"","badge_bg_class_true":"","icon_badge_false":"","icon_badge_true":"","brand_bg_class_false":"","brand_bg_class_true":"","name":"LowInk Warnung Magenta Light","icon_false":"","visibility-oid":"epson_stylus_px830.0.inks.magentalight.level","html":"Druckertinte","badge_top":"0","badge_left":"0","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"421px","top":"194px","border-style":"none","width":"47px","height":"54px","border-width":"","z-index":"30","background":"red"},"widgetSet":"metro"},{"tpl":"tplMetroTileString","data":{"visibility-cond":"<=","visibility-val":"20","bg_class_false":"bg-transparent","bg_class_true":"bg-transparent","icon_class_false":"icon-droplet","icon_class_true":"","badge_bg_class_false":"","badge_bg_class_true":"","icon_badge_false":"","icon_badge_true":"","brand_bg_class_false":"","brand_bg_class_true":"","name":"LowInk Warnung Magenta","icon_false":"","visibility-oid":"epson_stylus_px830.0.inks.magenta.level","html":"Druckertinte","badge_top":"0","badge_left":"0","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"354px","top":"194px","border-style":"none","width":"47px","height":"54px","border-width":"","z-index":"30","background":"red"},"widgetSet":"metro"},{"tpl":"tplMetroTileString","data":{"visibility-cond":"<=","visibility-val":"20","bg_class_false":"bg-transparent","bg_class_true":"bg-transparent","icon_class_false":"icon-droplet","icon_class_true":"","badge_bg_class_false":"","badge_bg_class_true":"","icon_badge_false":"","icon_badge_true":"","brand_bg_class_false":"","brand_bg_class_true":"","name":"LowInk Warnung Light Cyan","icon_false":"","visibility-oid":"epson_stylus_px830.0.inks.cyanlight.level","html":"Druckertinte","badge_top":"0","badge_left":"0","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"154px","top":"194px","border-style":"none","width":"47px","height":"54px","border-width":"","z-index":"30","background":"red"},"widgetSet":"metro"},{"tpl":"tplMetroTileString","data":{"visibility-cond":"<=","visibility-val":"20","bg_class_false":"bg-transparent","bg_class_true":"bg-transparent","icon_class_false":"icon-droplet","icon_class_true":"","badge_bg_class_false":"","badge_bg_class_true":"","icon_badge_false":"","icon_badge_true":"","brand_bg_class_false":"","brand_bg_class_true":"","name":"LowInk Warnung Cyan","icon_false":"","visibility-oid":"epson_stylus_px830.0.inks.cyan.level","badge_top":"0","badge_left":"0","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"88px","top":"194px","border-style":"none","width":"47px","height":"54px","border-width":"","z-index":"30","background":"red"},"widgetSet":"metro"},{"tpl":"tplMetroTileString","data":{"visibility-cond":"<=","visibility-val":"20","bg_class_false":"bg-transparent","bg_class_true":"bg-transparent","icon_class_false":"icon-droplet","icon_class_true":"","badge_bg_class_false":"","badge_bg_class_true":"","icon_badge_false":"","icon_badge_true":"","brand_bg_class_false":"","brand_bg_class_true":"","name":"LowInk Warnung Yellow","icon_false":"","visibility-oid":"epson_stylus_px830.0.inks.yellow.level","html":"Druckertinte","badge_top":"0","badge_left":"0","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"221px","top":"194px","border-style":"none","width":"47px","height":"54px","border-width":"","z-index":"30","background":"red"},"widgetSet":"metro"},{"tpl":"tplMetroTileString","data":{"visibility-cond":"<=","visibility-val":"20","bg_class_false":"bg-transparent","bg_class_true":"bg-transparent","icon_class_false":"icon-droplet","icon_class_true":"","badge_bg_class_false":"","badge_bg_class_true":"","icon_badge_false":"","icon_badge_true":"","brand_bg_class_false":"","brand_bg_class_true":"","name":"LowInk Warnung Black","icon_false":"","visibility-oid":"epson_stylus_px830.0.inks.black.level","html":"Druckertinte","badge_top":"0","badge_left":"0","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"287px","top":"194px","border-style":"none","width":"47px","height":"54px","border-width":"","z-index":"30","background":"red"},"widgetSet":"metro"},{"tpl":"tplHtml","data":{"visibility-cond":"==","visibility-val":1,"refreshInterval":"0","name":"Hinweis Tintenpackung","html":"Multipack Epson T0807","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"89px","top":"165px","z-index":"25","color":"rgba(250,250,250,1)","font-family":"","font-size":"14px","width":"182px","height":"26px","font-style":"oblique"},"widgetSet":"basic"},{"tpl":"tplHtml","data":{"visibility-cond":"==","visibility-val":1,"refreshInterval":"0","html":"<span style=\"float: left;\">Model: </span>\n<span style=\"float: right; font-size: 12px; line-height: 14px;\">{epson_stylus_px830.0.model}</span>\n<br>\n<span style=\"float: left;\">Bezeichnung: </span>\n<span style=\"float: right; font-size: 12px; line-height: 14px;\">{epson_stylus_px830.0.name}</span>\n<br>\n<span style=\"float: left;\">MAC-Adresse: </span>\n<span style=\"float: right; font-size: 12px; line-height: 14px;\">{epson_stylus_px830.0.mac}</span>\n<br>","gestures-offsetX":0,"gestures-offsetY":0,"name":"Model/Bezeichnung/MAC","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"86px","top":"79px","z-index":"15","color":"rgba(250,250,250,1)","font-family":"","font-size":"14px","width":"390px","height":"80px"},"widgetSet":"basic"},{"tpl":"tplValueFloat","data":{"oid":"epson_stylus_px830.0.inks.cyan.level","visibility-cond":"==","visibility-val":1,"is_comma":false,"factor":"1","html_append_plural":"%<br><br>{epson_stylus_px830.0.inks.cyan.cartridge}<br><br>Cyan","html_append_singular":"%<br><br>{epson_stylus_px830.0.inks.cyan.cartridge}<br><br>Cyan","html_prepend":"","name":"Cyan Info","is_tdp":false,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"digits":"0"},"style":{"left":"88px","top":"380px","z-index":"25","color":"rgba(250,250,250,1)","width":"53px","height":"97px","font-family":"","font-size":"14px","text-align":"center"},"widgetSet":"basic"},{"tpl":"tplValueFloat","data":{"oid":"epson_stylus_px830.0.inks.cyanlight.level","visibility-cond":"==","visibility-val":1,"is_comma":false,"factor":"1","html_append_plural":"%<br><br>{epson_stylus_px830.0.inks.cyanlight.cartridge}<br><br>Cyan Light","html_append_singular":"%<br><br>{epson_stylus_px830.0.inks.cyanlight.cartridge}<br><br>Cyan Light","html_prepend":"","name":"Cyan Light Info","html":"Druckertinte","is_tdp":false,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"digits":"0"},"style":{"left":"154px","top":"380px","z-index":"25","color":"rgba(250,250,250,1)","width":"53px","height":"103px","font-family":"","font-size":"14px","text-align":"center"},"widgetSet":"basic"},{"tpl":"tplValueFloat","data":{"oid":"epson_stylus_px830.0.inks.yellow.level","visibility-cond":"==","visibility-val":1,"is_comma":false,"factor":"1","html_append_plural":"%<br><br>{epson_stylus_px830.0.inks.yellow.cartridge}<br><br>Yellow","html_append_singular":"%<br><br>{epson_stylus_px830.0.inks.yellow.cartridge}<br><br>Yellow","html_prepend":"","name":"Yellow Info","html":"Druckertinte","is_tdp":false,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"digits":"0"},"style":{"left":"221px","top":"380px","z-index":"25","color":"rgba(250,250,250,1)","width":"53px","height":"96px","font-family":"","font-size":"14px","text-align":"center"},"widgetSet":"basic"},{"tpl":"tplValueFloat","data":{"oid":"epson_stylus_px830.0.inks.black.level","visibility-cond":"==","visibility-val":1,"is_comma":false,"factor":"1","html_append_plural":"%<br><br>{epson_stylus_px830.0.inks.black.cartridge}<br><br>Black","html_append_singular":"%<br><br>{epson_stylus_px830.0.inks.black.cartridge}<br><br>Black","html_prepend":"","name":"Black Info","html":"Druckertinte","is_tdp":false,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"digits":"0"},"style":{"left":"287px","top":"380px","z-index":"25","color":"rgba(250,250,250,1)","width":"53px","height":"96px","font-family":"","font-size":"14px","text-align":"center"},"widgetSet":"basic"},{"tpl":"tplValueFloat","data":{"oid":"epson_stylus_px830.0.inks.magenta.level","visibility-cond":"==","visibility-val":1,"is_comma":false,"factor":"1","html_append_plural":"%<br><br>{epson_stylus_px830.0.inks.magenta.cartridge}<br><br>Magenta","html_append_singular":"%<br><br>{epson_stylus_px830.0.inks.magenta.cartridge}<br><br>Magenta","html_prepend":"","name":"Magenta Info","html":"Druckertinte","is_tdp":false,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"digits":"0"},"style":{"left":"354px","top":"380px","z-index":"25","color":"rgba(250,250,250,1)","width":"53px","height":"96px","font-family":"","font-size":"14px","text-align":"center"},"widgetSet":"basic"},{"tpl":"tplValueFloat","data":{"oid":"epson_stylus_px830.0.inks.magentalight.level","visibility-cond":"==","visibility-val":1,"is_comma":false,"factor":"1","html_append_plural":"%<br><br>{epson_stylus_px830.0.inks.magentalight.cartridge}<br><br>Magenta Light","html_append_singular":"%<br><br>{epson_stylus_px830.0.inks.magentalight.cartridge}<br><br>Magenta Light","html_prepend":"","name":"Magenta Light Info","html":"Druckertinte","is_tdp":false,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"digits":"0"},"style":{"left":"421px","top":"380px","z-index":"25","color":"rgba(250,250,250,1)","width":"53px","height":"113px","font-family":"","font-size":"14px","text-align":"center"},"widgetSet":"basic"},{"tpl":"tplImage","data":{"visibility-cond":"==","visibility-val":1,"refreshInterval":"0","refreshOnWakeUp":"false","refreshOnViewChange":"false","name":"idealo.de Preisechart Ersatz","src":"http://cdn.idealo.com/folder/Product/2612/8/2612885/s1_pricetrendFaceliftLarge.png","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"577px","top":"466px","z-index":"20","width":"405px","height":"233px"},"widgetSet":"basic"}]
```

## Changelog
### 0.0.1 (2016-06-22)
* (pix) first release

## ToDo
### Nicer icon !

## License

The MIT License (MIT)

Copyright (c) 2016 pix

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---
*Dank an die Erfinder des Basisskripts zum Parsen der Daten, Idittmar und MistyReblaus aus dem [Homematic-Forum](http://homematic-forum.de/forum/viewtopic.php?f=31&t=25140).* :+1: 
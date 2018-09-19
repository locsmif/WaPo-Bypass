// ==UserScript==
// @name WaPo Bypass
// @description Bypasses WaPo GDPR wall, soft paywall and removes Urchin Tracking Module query fragments.
// @namespace (c) Michiel de Boer a.k.a. 'locsmif'
// @version 0.1
// @match https://www.washingtonpost.com/*
// @grant none
// ==/UserScript==

var DEBUG = 0;

function dbg(msg) {
  if (DEBUG == 1) {
    alert(msg);
  }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var domain = 'www.washingtonpost.com';
var base = 'https://' + domain;
var gdprStr = 'gdpr-consent';
var regex = 'https?://' + domain + '/' + gdprStr + '/\?destination=(.*)$'
var url = document.location.href;
var goto;
var reUtm;
dbg(getCookie('wp_gdpr'));

if (url.startsWith(base + '/' + gdprStr) && getCookie('wp_gdpr') != '1|1') {
  
  setCookie('wp_gdpr', '1|1', 365);
  
  //var re = /^https?:\/\/www.washingtonpost.com\/gdpr-consent\/\?destination=(.*)$/;
  //var re = new RegExp('^https?://' + domain + '/gdpr-consent/\?destination=(.*)$');
  var re = new RegExp(regex);
  var arr = re.exec(url);
  goto = decodeURIComponent(arr[1]);
  reUtm = /utm_term=[\.0-9a-f]+&?/g;
  goto = base + goto.replace(reUtm, '');
  goto = goto.replace(/\?$/, '');

  dbg("DEBUG: goto='" + goto + "'");
  document.location.href = goto;
}
else {
  //dbg('DEBUG: Failed to match!');
  window.addEventListener('load', function() {
    // Make sure this variable is freshly set after the document is done loading 
    // and WaPo's JS screws it up.
    url = document.location.href; 
    reUtm = /utm_term=[\.0-9a-f]+&?/g;
    goto = url.replace(reUtm, '');
    goto = goto.replace(/\?$/, '');
    if (url != goto) {     
      // Repair URL in address bar without reloading and re-triggering the irritating
      // UTM campaign code.
      var stateObj;
      history.pushState(stateObj, document.title, goto);
    }
  }, false);
}





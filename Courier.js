(function(a) {
  "use strict";
  var b = a.HTMLCanvasElement && a.HTMLCanvasElement.prototype,
    c = a.Blob && function() {
      try {
        return Boolean(new Blob)
      } catch (a) {
        return !1
      }
    }(),
    d = c && a.Uint8Array && function() {
      try {
        return (new Blob([new Uint8Array(100)])).size === 100
      } catch (a) {
        return !1
      }
    }(),
    e = a.BlobBuilder || a.WebKitBlobBuilder || a.MozBlobBuilder || a.MSBlobBuilder,
    f = (c || e) && a.atob && a.ArrayBuffer && a.Uint8Array && function(a) {
      var b, f, g, h, i, j;
      a.split(",")[0].indexOf("base64") >= 0 ? b = atob(a.split(",")[1]) : b = decodeURIComponent(a.split(",")[1]), f = new ArrayBuffer(b.length), g = new Uint8Array(f);
      for (h = 0; h < b.length; h += 1) g[h] = b.charCodeAt(h);
      return i = a.split(",")[0].split(":")[1].split(";")[0], c ? new Blob([d ? g : f], {
        type: i
      }) : (j = new e, j.append(f), j.getBlob(i))
    };
  a.HTMLCanvasElement && !b.toBlob && (b.mozGetAsFile ? b.toBlob = function(a, c, d) {
    d && b.toDataURL && f ? a(f(this.toDataURL(c, d))) : a(this.mozGetAsFile("blob", c))
  } : b.toDataURL && f && (b.toBlob = function(a, b, c) {
    a(f(this.toDataURL(b, c)))
  })), typeof define == "function" && define.amd ? define(function() {
    return f
  }) : a.dataURLtoBlob = f
})(this);

Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}

function Courier(id, settings) {

  var canvas = document.getElementById(id),
    fields = Object.keys(settings),
    formData = [],
    XHR = [],
    courier_blob;

  // determine services from settings
  var services = [];
  for (var i = 0; i < fields.length; i++) {
    var service_name = fields[i].split('_')[0];
    services.push(service_name);
  };
  services = services.getUnique();

  canvas.toBlob(function(blob) {
    courier_blob = blob;
  });

  // Append non-endpoint & callback fields to form,
  // then set endpoint & callback 
  // then send form
  for (var i = 0; i < fields.length; i++) {
    fields[i]
  };

  for (var i = 0; i < services.length; i++) {
    formData[i] = new FormData();
    var endpoint, callback, file_field;
    for (var i = 0; i < fields.length; i++) {
      var service = fields[i].split('_')[0];
      var key = fields[i].split(service + '_')[1];

      if (services[i] == service) {
        var value = settings[fields[i]];
        if (key != 'endpoint' 
          && key != 'callback' 
          && key != 'file_field') {
          console.log('not weird', key);
          formData[i].append(key, value);
        }
        if (key == 'file_field') {
          console.log('file',key);
          file_field = settings[fields[i]];
          formData[i].append(file_field,courier_blob);
        };
        if (key == 'endpoint') {
          console.log('endpoint:',endpoint);
          endpoint = value;
        }
        if (key == 'callback') {
          console.log('callback:',callback);
          callback = value;
        }
        console.log(value);
      }
    };

    XHR[i] = new XMLHttpRequest();
    XHR[i].onreadystatechange = function() {
      if (XHR[i].readyState == 4 && XHR[i].status == 200) {
        callback(XHR[i].responseText);
      }
    }
    console.log('endpoint:', endpoint);
    XHR[i].open('POST', endpoint, true);
    XHR[i].send(formData[i]);
  };
}

Courier('your-canvas-id', 
    { 
      facebook_to: (FB.getUserID()),
      facebook_access_token: (FB.getAccessToken()),
      facebook_file_field: 'file',
      facebook_endpoint: 'https://graph.facebook.com/'+(FB.getUserID())+'/photos',
      facebook_callback: function(response){
        //do something with response
        console.log(response);
      }
    }
)


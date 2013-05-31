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

function Courier(options){
  this.canvas = document.getElementById(options.canvas_id);
  var settings = options.settings;
  var callback = options.callback;
  if (options.service == 'fb') {
    var  fb_target = 'https://graph.facebook.com/'+settings.fb_id+'/photos';
    this.canvas.toBlob(function(blob){
      var formData = new FormData();
      formData.append('file',blob);
      formData.append('to',settings.fb_id);
      formData.append('access_token',settings.token);

      var XHR = new XMLHttpRequest();
      XHR.onreadystatechange=function(){
        if (XHR.readyState==4 && XHR.status==200){
          callback(XHR.responseText);
        }
      }
      XHR.open('POST',fb_target,true);
      XHR.send(formData);
    })
  };
}

Courier({
  service:'fb',
  canvas_id:'your-canvas-id',
  settings:{
    fb_id:(FB.getUserID()),
    token:(FB.getAccessToken())
  },
  callback: function(response){
    // do something with response
    // probably looks like:
    // {'id':'1234','post_id':'4567'}
    console.log(response);
  }
});

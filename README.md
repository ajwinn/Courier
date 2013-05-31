Courier
=======

Dude! Upload canvas images to Facebook &amp; other services.

# Why

Front-end developers puke when they think about needing server-side code. `#stereotype`

And yet, web services like the Facebook API generally want **files** POSTed to them - not the `base64` encoded version of the `<canvas>` that comes from `.toDataURL()`.

With the monumental, stupendous, magical, heroic, tasty help of [Canvas-to-Blob.js](https://github.JavaScript-Canvas-to-Blob), Courier.js can carry your image to a web service in all its binary-ish glory.


# Usage

## Install

1. Include `<script src='Courier.js'></script>` in `<head></head>`, you silly goose.
2. Done.

## Facebook


**First, be sure your user has given your app the `publish_actions` extended permission.**

After that, it's dead simple.

```js
Courier({
  service:'fb',
  canvas_id:'your-canvas-id',
  settings:{
    fb_id:(FB.getUserID()),      // feel free to change the values
    token:(FB.getAccessToken())  // if you don't use FB's JS SDK
  },
  callback: function(response){
    // do something with response
    // probably looks like:
    // {'id':'1234','post_id':'4567'}
    console.log(response);
  }
});
```

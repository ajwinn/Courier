Courier
=======

Upload canvas images to Facebook &amp; other services

# Install

1. Include `<script src='Courier.js'></script>`
2. Get `publish_actions` extended permissions from Facebook if using Facebook

# Use

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

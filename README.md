Courier
=======

Upload canvas images to Facebook &amp; other services

# Install
Include `<script src='Courier.js'></script>`

# Use

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

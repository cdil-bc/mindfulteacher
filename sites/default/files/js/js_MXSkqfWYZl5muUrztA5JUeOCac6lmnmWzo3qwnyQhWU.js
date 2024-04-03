(function() {
    var
            fullScreenApi = {
        supportsFullScreen: false,
        isFullScreen: function() {
            return false;
        },
        requestFullScreen: function() {
        },
        cancelFullScreen: function() {
        },
        fullScreenEventName: '',
        prefix: ''
    },
    browserPrefixes = 'webkit moz o ms khtml'.split(' ');

    // check for native support
    if (typeof document.cancelFullScreen != 'undefined') {
        fullScreenApi.supportsFullScreen = true;
    } else {
        // check for fullscreen support by vendor prefix
        for (var i = 0, il = browserPrefixes.length; i < il; i++) {
            fullScreenApi.prefix = browserPrefixes[i];

            if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined') {
                fullScreenApi.supportsFullScreen = true;

                break;
            }
        }
    }

    // update methods to do something useful
    if (fullScreenApi.supportsFullScreen) {
        fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';

        fullScreenApi.isFullScreen = function() {
            switch (this.prefix) {
                case '':
                    return document.fullScreen;
                case 'webkit':
                    return document.webkitIsFullScreen;
                default:
                    return document[this.prefix + 'FullScreen'];
            }
        }
        fullScreenApi.requestFullScreen = function(el) {
            return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
        }
        fullScreenApi.cancelFullScreen = function(el) {
            return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
        }
    }

    // jQuery plugin
    if (typeof jQuery != 'undefined') {
        jQuery.fn.requestFullScreen = function() {

            return this.each(function() {
                if (fullScreenApi.supportsFullScreen) {
                    fullScreenApi.requestFullScreen(this);
                }
            });
        };
    }

    // export api
    window.fullScreenApi = fullScreenApi;
})();

/**
 * Fade out everything but the main node body
 * @param {type} $
 * @returns {undefined}
 */
(function($) {
    $(document).ready(function() {
       /* var $elem = $('.node-type-article #main-content'),
                height = $elem.height();
        if (fullScreenApi.supportsFullScreen) {
            $('#article-icon').click( function() {
                fullScreenApi.requestFullScreen(document.getElementById('page'));
                $('#main-content').css({
                    position: 'static'
                });
            });
        }
        $elem.css({
            position: 'relative',
            top: 0,
            left: 0,
            'z-index': 10
        });
        var clear = true;
        $elem.mouseover(function() {
            clear = false;
            console.log('mouseover' + clear);
        });
        $elem.mouseout(function() {
            clear = true;
            console.log('mouseout' + clear);
        });
        $elem.parent().height(height + 100);
        $('body').append('<div id="fadeBG" style="background:#fff;position:absolute;width:100%;height:5000px;z-index:9;opacity:0;filter:alpha(opacity=0);top:0;"></div>');
        var $fade = $('#fadeBG');
        function intervalEvent() {
            if (fadeout) {
                $fade.show().css({opacity: 0}).fadeTo(3000, 0.85, function() {
                    fadeout = false;
                    fadein = true;
                });
                clearInterval(intervalTiming);
            }
        }
        ;
        var fadeout = true, fadein = false;
        var intervalTiming = setInterval(intervalEvent, 500);
        $('body').mousemove(function() {
            if (clear) {
                $fade.stop().css({opacity: 0}).hide();
                fadeout = true;
                fadein = false;
                clearInterval(intervalTiming);
                intervalTiming = setInterval(intervalEvent, 500);
            }
        });
        $('body').keypress(function() {
            if (clear) {
                $fade.stop().css({opacity: 0}).hide();
                fadeout = true;
                fadein = false;
                clearInterval(intervalTiming);
                intervalTiming = setInterval(intervalEvent, 500);
            }
        });*/
    });
})(jQuery);

;
(function($, Drupal, undefined){
  /**
   * When set to enable mediaelement for all audio/video files add it to the page.
   */
  Drupal.behaviors.mediaelement = {
    attach: function(context, settings) {
      if (settings.mediaelement !== undefined) {
        // @todo Remove anonymous function.
        $.each(settings.mediaelement, function(selector, options) {
          var opts;
          $(selector, context).once('mediaelement', function() {
            if (options.controls) {
              $(this).mediaelementplayer(options.opts);
            }
            else {
              $(this).mediaelement();
            }
          });
        });
      }
      // The global option is seperate from the other selectors as it should be
      // run after any other selectors.
      if (settings.mediaelementAll !== undefined) {
        $('video,audio', context).once('mediaelement', function() {
          $(this).mediaelementplayer();
        });
      }
    }
  };
})(jQuery, Drupal);;

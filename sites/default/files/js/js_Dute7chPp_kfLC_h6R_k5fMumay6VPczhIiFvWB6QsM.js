/*!
 * jQuery UI Mouse 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function(b){b.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var a=this;this.element.bind("mousedown."+this.widgetName,function(c){return a._mouseDown(c)}).bind("click."+this.widgetName,function(c){if(true===b.data(c.target,a.widgetName+".preventClickEvent")){b.removeData(c.target,a.widgetName+".preventClickEvent");c.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)},_mouseDown:function(a){a.originalEvent=
a.originalEvent||{};if(!a.originalEvent.mouseHandled){this._mouseStarted&&this._mouseUp(a);this._mouseDownEvent=a;var c=this,e=a.which==1,f=typeof this.options.cancel=="string"?b(a.target).parents().add(a.target).filter(this.options.cancel).length:false;if(!e||f||!this._mouseCapture(a))return true;this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){c.mouseDelayMet=true},this.options.delay);if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a)){this._mouseStarted=
this._mouseStart(a)!==false;if(!this._mouseStarted){a.preventDefault();return true}}true===b.data(a.target,this.widgetName+".preventClickEvent")&&b.removeData(a.target,this.widgetName+".preventClickEvent");this._mouseMoveDelegate=function(d){return c._mouseMove(d)};this._mouseUpDelegate=function(d){return c._mouseUp(d)};b(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);a.preventDefault();return a.originalEvent.mouseHandled=
true}},_mouseMove:function(a){if(b.browser.msie&&!(document.documentMode>=9)&&!a.button)return this._mouseUp(a);if(this._mouseStarted){this._mouseDrag(a);return a.preventDefault()}if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a))(this._mouseStarted=this._mouseStart(this._mouseDownEvent,a)!==false)?this._mouseDrag(a):this._mouseUp(a);return!this._mouseStarted},_mouseUp:function(a){b(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
if(this._mouseStarted){this._mouseStarted=false;a.target==this._mouseDownEvent.target&&b.data(a.target,this.widgetName+".preventClickEvent",true);this._mouseStop(a)}return false},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true}})})(jQuery);
;
/*
 * jQuery UI Slider 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Slider
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(d){d.widget("ui.slider",d.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var b=this,a=this.options;this._mouseSliding=this._keySliding=false;this._animateOff=true;this._handleIndex=null;this._detectOrientation();this._mouseInit();this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all");a.disabled&&this.element.addClass("ui-slider-disabled ui-disabled");
this.range=d([]);if(a.range){if(a.range===true){this.range=d("<div></div>");if(!a.values)a.values=[this._valueMin(),this._valueMin()];if(a.values.length&&a.values.length!==2)a.values=[a.values[0],a.values[0]]}else this.range=d("<div></div>");this.range.appendTo(this.element).addClass("ui-slider-range");if(a.range==="min"||a.range==="max")this.range.addClass("ui-slider-range-"+a.range);this.range.addClass("ui-widget-header")}d(".ui-slider-handle",this.element).length===0&&d("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");
if(a.values&&a.values.length)for(;d(".ui-slider-handle",this.element).length<a.values.length;)d("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");this.handles=d(".ui-slider-handle",this.element).addClass("ui-state-default ui-corner-all");this.handle=this.handles.eq(0);this.handles.add(this.range).filter("a").click(function(c){c.preventDefault()}).hover(function(){a.disabled||d(this).addClass("ui-state-hover")},function(){d(this).removeClass("ui-state-hover")}).focus(function(){if(a.disabled)d(this).blur();
else{d(".ui-slider .ui-state-focus").removeClass("ui-state-focus");d(this).addClass("ui-state-focus")}}).blur(function(){d(this).removeClass("ui-state-focus")});this.handles.each(function(c){d(this).data("index.ui-slider-handle",c)});this.handles.keydown(function(c){var e=true,f=d(this).data("index.ui-slider-handle"),h,g,i;if(!b.options.disabled){switch(c.keyCode){case d.ui.keyCode.HOME:case d.ui.keyCode.END:case d.ui.keyCode.PAGE_UP:case d.ui.keyCode.PAGE_DOWN:case d.ui.keyCode.UP:case d.ui.keyCode.RIGHT:case d.ui.keyCode.DOWN:case d.ui.keyCode.LEFT:e=
false;if(!b._keySliding){b._keySliding=true;d(this).addClass("ui-state-active");h=b._start(c,f);if(h===false)return}break}i=b.options.step;h=b.options.values&&b.options.values.length?(g=b.values(f)):(g=b.value());switch(c.keyCode){case d.ui.keyCode.HOME:g=b._valueMin();break;case d.ui.keyCode.END:g=b._valueMax();break;case d.ui.keyCode.PAGE_UP:g=b._trimAlignValue(h+(b._valueMax()-b._valueMin())/5);break;case d.ui.keyCode.PAGE_DOWN:g=b._trimAlignValue(h-(b._valueMax()-b._valueMin())/5);break;case d.ui.keyCode.UP:case d.ui.keyCode.RIGHT:if(h===
b._valueMax())return;g=b._trimAlignValue(h+i);break;case d.ui.keyCode.DOWN:case d.ui.keyCode.LEFT:if(h===b._valueMin())return;g=b._trimAlignValue(h-i);break}b._slide(c,f,g);return e}}).keyup(function(c){var e=d(this).data("index.ui-slider-handle");if(b._keySliding){b._keySliding=false;b._stop(c,e);b._change(c,e);d(this).removeClass("ui-state-active")}});this._refreshValue();this._animateOff=false},destroy:function(){this.handles.remove();this.range.remove();this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
this._mouseDestroy();return this},_mouseCapture:function(b){var a=this.options,c,e,f,h,g;if(a.disabled)return false;this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};this.elementOffset=this.element.offset();c=this._normValueFromMouse({x:b.pageX,y:b.pageY});e=this._valueMax()-this._valueMin()+1;h=this;this.handles.each(function(i){var j=Math.abs(c-h.values(i));if(e>j){e=j;f=d(this);g=i}});if(a.range===true&&this.values(1)===a.min){g+=1;f=d(this.handles[g])}if(this._start(b,
g)===false)return false;this._mouseSliding=true;h._handleIndex=g;f.addClass("ui-state-active").focus();a=f.offset();this._clickOffset=!d(b.target).parents().andSelf().is(".ui-slider-handle")?{left:0,top:0}:{left:b.pageX-a.left-f.width()/2,top:b.pageY-a.top-f.height()/2-(parseInt(f.css("borderTopWidth"),10)||0)-(parseInt(f.css("borderBottomWidth"),10)||0)+(parseInt(f.css("marginTop"),10)||0)};this.handles.hasClass("ui-state-hover")||this._slide(b,g,c);return this._animateOff=true},_mouseStart:function(){return true},
_mouseDrag:function(b){var a=this._normValueFromMouse({x:b.pageX,y:b.pageY});this._slide(b,this._handleIndex,a);return false},_mouseStop:function(b){this.handles.removeClass("ui-state-active");this._mouseSliding=false;this._stop(b,this._handleIndex);this._change(b,this._handleIndex);this._clickOffset=this._handleIndex=null;return this._animateOff=false},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(b){var a;
if(this.orientation==="horizontal"){a=this.elementSize.width;b=b.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)}else{a=this.elementSize.height;b=b.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)}a=b/a;if(a>1)a=1;if(a<0)a=0;if(this.orientation==="vertical")a=1-a;b=this._valueMax()-this._valueMin();return this._trimAlignValue(this._valueMin()+a*b)},_start:function(b,a){var c={handle:this.handles[a],value:this.value()};if(this.options.values&&this.options.values.length){c.value=
this.values(a);c.values=this.values()}return this._trigger("start",b,c)},_slide:function(b,a,c){var e;if(this.options.values&&this.options.values.length){e=this.values(a?0:1);if(this.options.values.length===2&&this.options.range===true&&(a===0&&c>e||a===1&&c<e))c=e;if(c!==this.values(a)){e=this.values();e[a]=c;b=this._trigger("slide",b,{handle:this.handles[a],value:c,values:e});this.values(a?0:1);b!==false&&this.values(a,c,true)}}else if(c!==this.value()){b=this._trigger("slide",b,{handle:this.handles[a],
value:c});b!==false&&this.value(c)}},_stop:function(b,a){var c={handle:this.handles[a],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(a);c.values=this.values()}this._trigger("stop",b,c)},_change:function(b,a){if(!this._keySliding&&!this._mouseSliding){var c={handle:this.handles[a],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(a);c.values=this.values()}this._trigger("change",b,c)}},value:function(b){if(arguments.length){this.options.value=
this._trimAlignValue(b);this._refreshValue();this._change(null,0)}return this._value()},values:function(b,a){var c,e,f;if(arguments.length>1){this.options.values[b]=this._trimAlignValue(a);this._refreshValue();this._change(null,b)}if(arguments.length)if(d.isArray(arguments[0])){c=this.options.values;e=arguments[0];for(f=0;f<c.length;f+=1){c[f]=this._trimAlignValue(e[f]);this._change(null,f)}this._refreshValue()}else return this.options.values&&this.options.values.length?this._values(b):this.value();
else return this._values()},_setOption:function(b,a){var c,e=0;if(d.isArray(this.options.values))e=this.options.values.length;d.Widget.prototype._setOption.apply(this,arguments);switch(b){case "disabled":if(a){this.handles.filter(".ui-state-focus").blur();this.handles.removeClass("ui-state-hover");this.handles.attr("disabled","disabled");this.element.addClass("ui-disabled")}else{this.handles.removeAttr("disabled");this.element.removeClass("ui-disabled")}break;case "orientation":this._detectOrientation();
this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);this._refreshValue();break;case "value":this._animateOff=true;this._refreshValue();this._change(null,0);this._animateOff=false;break;case "values":this._animateOff=true;this._refreshValue();for(c=0;c<e;c+=1)this._change(null,c);this._animateOff=false;break}},_value:function(){var b=this.options.value;return b=this._trimAlignValue(b)},_values:function(b){var a,c;if(arguments.length){a=this.options.values[b];
return a=this._trimAlignValue(a)}else{a=this.options.values.slice();for(c=0;c<a.length;c+=1)a[c]=this._trimAlignValue(a[c]);return a}},_trimAlignValue:function(b){if(b<=this._valueMin())return this._valueMin();if(b>=this._valueMax())return this._valueMax();var a=this.options.step>0?this.options.step:1,c=(b-this._valueMin())%a;alignValue=b-c;if(Math.abs(c)*2>=a)alignValue+=c>0?a:-a;return parseFloat(alignValue.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},
_refreshValue:function(){var b=this.options.range,a=this.options,c=this,e=!this._animateOff?a.animate:false,f,h={},g,i,j,l;if(this.options.values&&this.options.values.length)this.handles.each(function(k){f=(c.values(k)-c._valueMin())/(c._valueMax()-c._valueMin())*100;h[c.orientation==="horizontal"?"left":"bottom"]=f+"%";d(this).stop(1,1)[e?"animate":"css"](h,a.animate);if(c.options.range===true)if(c.orientation==="horizontal"){if(k===0)c.range.stop(1,1)[e?"animate":"css"]({left:f+"%"},a.animate);
if(k===1)c.range[e?"animate":"css"]({width:f-g+"%"},{queue:false,duration:a.animate})}else{if(k===0)c.range.stop(1,1)[e?"animate":"css"]({bottom:f+"%"},a.animate);if(k===1)c.range[e?"animate":"css"]({height:f-g+"%"},{queue:false,duration:a.animate})}g=f});else{i=this.value();j=this._valueMin();l=this._valueMax();f=l!==j?(i-j)/(l-j)*100:0;h[c.orientation==="horizontal"?"left":"bottom"]=f+"%";this.handle.stop(1,1)[e?"animate":"css"](h,a.animate);if(b==="min"&&this.orientation==="horizontal")this.range.stop(1,
1)[e?"animate":"css"]({width:f+"%"},a.animate);if(b==="max"&&this.orientation==="horizontal")this.range[e?"animate":"css"]({width:100-f+"%"},{queue:false,duration:a.animate});if(b==="min"&&this.orientation==="vertical")this.range.stop(1,1)[e?"animate":"css"]({height:f+"%"},a.animate);if(b==="max"&&this.orientation==="vertical")this.range[e?"animate":"css"]({height:100-f+"%"},{queue:false,duration:a.animate})}}});d.extend(d.ui.slider,{version:"1.8.11"})})(jQuery);
;
/** The minplayer namespace. */
var minplayer = minplayer || {};

// Private function to check a single element's play type.
function checkPlayType(elem, playType) {
  if ((typeof elem.canPlayType) === 'function') {
    if (typeof playType === 'object') {
      var i = playType.length;
      var mimetype = '';
      while (i--) {
        mimetype = checkPlayType(elem, playType[i]);
        if (!!mimetype) {
          break;
        }
      }
      return mimetype;
    }
    else {
      var canPlay = elem.canPlayType(playType);
      if (('no' !== canPlay) && ('' !== canPlay)) {
        return playType;
      }
    }
  }
  return '';
}

/**
 * @constructor
 * @class This class is used to define the types of media that can be played
 * within the browser.
 * <p>
 * <strong>Usage:</strong>
 * <pre><code>
 *   var playTypes = new minplayer.compatibility();
 *
 *   if (playTypes.videoOGG) {
 *     console.log("This browser can play OGG video");
 *   }
 *
 *   if (playTypes.videoH264) {
 *     console.log("This browser can play H264 video");
 *   }
 *
 *   if (playTypes.videoWEBM) {
 *     console.log("This browser can play WebM video");
 *   }
 *
 *   if (playTypes.audioOGG) {
 *     console.log("This browser can play OGG audio");
 *   }
 *
 *   if (playTypes.audioMP3) {
 *     console.log("This browser can play MP3 audio");
 *   }
 *
 *   if (playTypes.audioMP4) {
 *     console.log("This browser can play MP4 audio");
 *   }
 * </code></pre>
 */
minplayer.compatibility = function() {
  var elem = null;

  // Create a video element.
  elem = document.createElement('video');

  /** Can play OGG video */
  this.videoOGG = checkPlayType(elem, 'video/ogg');

  /** Can play H264 video */
  this.videoH264 = checkPlayType(elem, [
    'video/mp4',
    'video/h264'
  ]);

  /** Can play WEBM video */
  this.videoWEBM = checkPlayType(elem, [
    'video/x-webm',
    'video/webm',
    'application/octet-stream'
  ]);

  /** Can play MPEG URL streams. */
  this.videoMPEGURL = checkPlayType(elem, 'application/vnd.apple.mpegurl');

  // Create an audio element.
  elem = document.createElement('audio');

  /** Can play audio OGG */
  this.audioOGG = checkPlayType(elem, 'audio/ogg');

  /** Can play audio MP3 */
  this.audioMP3 = checkPlayType(elem, 'audio/mpeg');

  /** Can play audio MP4 */
  this.audioMP4 = checkPlayType(elem, 'audio/mp4');
};

if (!minplayer.playTypes) {

  /** The compatible playtypes for this browser. */
  minplayer.playTypes = new minplayer.compatibility();

  /** See if we are an android device. */
  minplayer.isAndroid = (/android/gi).test(navigator.appVersion);

  /** See if we are an iOS device. */
  minplayer.isIDevice = (/iphone|ipad/gi).test(navigator.appVersion);

  /** See if we are a playbook device. */
  minplayer.isPlaybook = (/playbook/gi).test(navigator.appVersion);

  /** See if we are a touchpad device. */
  minplayer.isTouchPad = (/hp-tablet/gi).test(navigator.appVersion);

  /** Determine if we have a touchscreen. */
  minplayer.hasTouch = 'ontouchstart' in window && !minplayer.isTouchPad;
}

// Get the URL variables.
if (!minplayer.urlVars) {

  /** The URL variables for the minplayer. */
  minplayer.urlVars = {};

  // Get the URL variables.
  var regEx = /[?&]+([^=&]+)=([^&]*)/gi;
  window.location.href.replace(regEx, function(m, key, value) {
    minplayer.urlVars[key] = value;
  });
}
;
/** The minplayer namespace. */
var minplayer = minplayer || {};

/**
 * @constructor
 * @class This is a class used to keep track of flag states
 * which is used to control the busy cursor, big play button, among other
 * items in which multiple components can have an interest in hiding or
 * showing a single element on the screen.
 *
 * <p>
 * <strong>Usage:</strong>
 * <pre><code>
 *   // Declare a flags variable.
 *   var flags = new minplayer.flags();
 *
 *   // Set the flag based on two components interested in the flag.
 *   flags.setFlag("component1", true);
 *   flags.setFlag("component2", true);
 *
 *   // Print out the value of the flags. ( Prints 3 )
 *   console.log(flags.flags);
 *
 *   // Now unset a single components flag.
 *   flags.setFlag("component1", false);
 *
 *   // Print out the value of the flags.
 *   console.log(flags.flags);
 *
 *   // Unset the other components flag.
 *   flags.setFlag("component2", false);
 *
 *   // Print out the value of the flags.
 *   console.log(flags.flags);
 * </code></pre>
 * </p>
 */
minplayer.flags = function() {

  /** The flag. */
  this.flag = 0;

  /** Id map to reference id with the flag index. */
  this.ids = {};

  /** The number of flags. */
  this.numFlags = 0;
};

/**
 * Sets a flag based on boolean logic operators.
 *
 * @param {string} id The id of the controller interested in this flag.
 * @param {boolean} value The value of this flag ( true or false ).
 */
minplayer.flags.prototype.setFlag = function(id, value) {

  // Define this id if it isn't present.
  if (!this.ids.hasOwnProperty(id)) {
    this.ids[id] = this.numFlags;
    this.numFlags++;
  }

  // Use binary operations to keep track of the flag state
  if (value) {
    this.flag |= (1 << this.ids[id]);
  }
  else {
    this.flag &= ~(1 << this.ids[id]);
  }
};
;
/** The minplayer namespace. */
var minplayer = minplayer || {};

/**
 * @constructor
 * @class This class keeps track of asynchronous get requests for certain
 * variables within the player.
 */
minplayer.async = function() {

  /** The final value of this asynchronous variable. */
  this.value = null;

  /** The queue of callbacks to call when this value is determined. */
  this.queue = [];
};

/**
 * Retrieve the value of this variable.
 *
 * @param {function} callback The function to call when the value is determined.
 * @param {function} pollValue The poll function to try and get the value every
 * 1 second if the value is not set.
 */
minplayer.async.prototype.get = function(callback, pollValue) {

  // If the value is set, then immediately call the callback, otherwise, just
  // add it to the queue when the variable is set.
  if (this.value !== null) {
    callback(this.value);
  }
  else {

    // Add this callback to the queue.
    this.queue.push(callback);
  }
};

/**
 * Sets the value of an asynchronous value.
 *
 * @param {void} val The value to set.
 */
minplayer.async.prototype.set = function(val) {

  // Set the value.
  this.value = val;

  // Get the callback queue length.
  var i = this.queue.length;

  // Iterate through all the callbacks and call them.
  if (i) {
    while (i--) {
      this.queue[i](val);
    }

    // Reset the queue.
    this.queue = [];
  }
};
;
/** The minplayer namespace. */
minplayer = minplayer || {};

/** Static array to keep track of all plugins. */
minplayer.plugins = minplayer.plugins || {};

/** Static array to keep track of queues. */
minplayer.queue = minplayer.queue || [];

/** Mutex lock to keep multiple triggers from occuring. */
minplayer.lock = false;

/**
 * @constructor
 * @class The base class for all plugins.
 *
 * @param {string} name The name of this plugin.
 * @param {object} context The jQuery context.
 * @param {object} options This components options.
 * @param {object} queue The event queue to pass events around.
 */
minplayer.plugin = function(name, context, options, queue) {

  // Make sure we have some options.
  this.options = options || {};

  /** The name of this plugin. */
  this.name = name;

  /** The ready flag. */
  this.pluginReady = false;

  /** The event queue. */
  this.queue = queue || {};

  /** Keep track of already triggered events. */
  this.triggered = {};

  /** Create a queue lock. */
  this.lock = false;

  /** The universally unique ID for this plugin. */
  this.uuid = 0;

  // Only call the constructor if we have a context.
  if (context) {

    /** Keep track of the context. */
    this.context = jQuery(context);

    // Initialize the default options.
    var defaults = {};

    // Get the default options.
    this.defaultOptions(defaults);

    /** The options for this plugin. */
    for (var param in defaults) {
      if (!this.options.hasOwnProperty(param)) {
        this.options[param] = defaults[param];
      }
    }

    // Initialize this plugin.
    this.initialize();
  }
};

/**
 * Initialize function for the plugin.
 */
minplayer.plugin.prototype.initialize = function() {

  // Construct this plugin.
  this.construct();
};

/**
 * Get the default options for this plugin.
 *
 * @param {object} options The default options for this plugin.
 */
minplayer.plugin.prototype.defaultOptions = function(options) {
};

/**
 * The constructor which is called once the context is set.
 * Any class deriving from the plugin class should place all context
 * dependant functionality within this function instead of the standard
 * constructor function since it is called on object derivation as well
 * as object creation.
 */
minplayer.plugin.prototype.construct = function() {

  /** Say that we are active. */
  this.active = true;

  // Adds this as a plugin.
  this.addPlugin();
};

/**
 * Destructor.
 */
minplayer.plugin.prototype.destroy = function() {

  // Unbind all events.
  this.active = false;
  this.unbind();
};

/**
 * Creates a new plugin within this context.
 *
 * @param {string} name The name of the plugin you wish to create.
 * @param {object} base The base object for this plugin.
 * @param {object} context The context which you would like to create.
 * @return {object} The new plugin object.
 */
minplayer.plugin.prototype.create = function(name, base, context) {
  var plugin = null;

  // Make sure we have a base object.
  base = base || 'minplayer';
  if (!window[base][name]) {
    base = 'minplayer';
  }

  // Make sure there is a context.
  context = context || this.display;

  // See if this plugin exists within this object.
  if (window[base][name]) {

    // Set the plugin.
    plugin = window[base][name];

    // See if a template version of the plugin exists.
    if (plugin[this.options.template]) {

      plugin = plugin[this.options.template];
    }

    // Make sure the plugin is a function.
    if (typeof plugin !== 'function') {
      plugin = window.minplayer[name];
    }

    // Make sure it is a function.
    if (typeof plugin === 'function') {
      return new plugin(context, this.options);
    }
  }

  return null;
};

/**
 * Plugins should call this method when they are ready.
 */
minplayer.plugin.prototype.ready = function() {

  // Keep this plugin from triggering multiple ready events.
  if (!this.pluginReady) {

    // Set the ready flag.
    this.pluginReady = true;

    // Now trigger that I am ready.
    this.trigger('ready');

    // Check the queue.
    this.checkQueue();
  }
};

/**
 * Returns if this component is valid.
 *
 * @return {boolean} TRUE if the plugin display is valid.
 */
minplayer.plugin.prototype.isValid = function() {
  return !!this.options.id && this.active;
};

/**
 * Allows a plugin to do something when it is added to another plugin.
 *
 * @param {object} plugin The plugin that this plugin was added to.
 */
minplayer.plugin.prototype.onAdded = function(plugin) {
};

/**
 * Adds a new plugin to this player.
 *
 * @param {string} name The name of this plugin.
 * @param {object} plugin A new plugin object, derived from media.plugin.
 */
minplayer.plugin.prototype.addPlugin = function(name, plugin) {
  name = name || this.name;
  plugin = plugin || this;

  // Make sure the plugin is valid.
  if (plugin.isValid()) {

    // If the plugins for this instance do not exist.
    if (!minplayer.plugins[this.options.id]) {

      // Initialize the plugins.
      minplayer.plugins[this.options.id] = {};
    }

    if (!minplayer.plugins[this.options.id][name]) {

      // Add the plugins array.
      minplayer.plugins[this.options.id][name] = [];
    }

    // Add this plugin.
    var instance = minplayer.plugins[this.options.id][name].push(plugin);

    // Set the uuid.
    this.uuid = this.options.id + '__' + name + '__' + instance;

    // Now check the queue for this plugin.
    this.checkQueue(plugin);

    // Now let the plugin do something with this plugin.
    plugin.onAdded(this);
  }
};

/** Create timers for the polling. */
minplayer.timers = {};

/**
 * Create a polling timer.
 *
 * @param {string} name The name of the timer.
 * @param {function} callback The function to call when you poll.
 * @param {integer} interval The interval you would like to poll.
 * @return {string} The setTimeout ID.
 */
minplayer.plugin.prototype.poll = function(name, callback, interval) {
  if (minplayer.timers.hasOwnProperty(name)) {
    clearTimeout(minplayer.timers[name]);
  }
  minplayer.timers[name] = setTimeout((function(context) {
    return function callLater() {
      if (callback.call(context)) {
        minplayer.timers[name] = setTimeout(callLater, interval);
      }
    };
  })(this), interval);
  return minplayer.timers[name];
};

/**
 * Gets a plugin by name and calls callback when it is ready.
 *
 * @param {string} plugin The plugin of the plugin.
 * @param {function} callback Called when the plugin is ready.
 * @return {object} The plugin if no callback is provided.
 */
minplayer.plugin.prototype.get = function(plugin, callback) {

  // If they pass just a callback, then return all plugins when ready.
  if (typeof plugin === 'function') {
    callback = plugin;
    plugin = null;
  }

  // Return the minplayer.get equivalent.
  return minplayer.get.call(this, this.options.id, plugin, callback);
};

/**
 * Check the queue and execute it.
 *
 * @param {object} plugin The plugin object to check the queue against.
 */
minplayer.plugin.prototype.checkQueue = function(plugin) {

  // Initialize our variables.
  var q = null, i = 0, check = false;

  // Normalize the plugin variable.
  plugin = plugin || this;

  // Set the lock.
  minplayer.lock = true;

  // Iterate through all the queues.
  var length = minplayer.queue.length;
  for (i = 0; i < length; i++) {
    if (minplayer.queue.hasOwnProperty(i)) {

      // Get the queue.
      q = minplayer.queue[i];

      // Now check to see if this queue is about us.
      check = !q.id && !q.plugin;
      check |= (q.plugin === plugin.name);
      check &= (!q.id || (q.id === this.options.id));

      // If the check passes, and hasn't already been added...
      if (check && !q.addedto.hasOwnProperty(plugin.options.id)) {
        q.addedto[plugin.options.id] = true;
        check = minplayer.bind.call(
          q.context,
          q.event,
          this.options.id,
          plugin.name,
          q.callback,
          true
        );
      }
    }
  }

  // Release the lock.
  minplayer.lock = false;
};

/**
 * All minplayer event types.
 */
minplayer.eventTypes = {};

/**
 * Determine if an event is of a certain type.
 *
 * @param {string} name The full name of the event.
 * @param {string} type The type of the event.
 * @return {boolean} If this named event is of type.
 */
minplayer.plugin.prototype.isEvent = function(name, type) {
  // Static cache for performance.
  var cacheName = name + '__' + type;
  if (typeof minplayer.eventTypes[cacheName] !== 'undefined') {
    return minplayer.eventTypes[cacheName];
  }
  else {
    var regex = new RegExp('^(.*:)?' + type + '$', 'gi');
    minplayer.eventTypes[cacheName] = (name.match(type) !== null);
    return minplayer.eventTypes[cacheName];
  }
};

/**
 * Trigger a media event.
 *
 * @param {string} type The event type.
 * @param {object} data The event data object.
 * @param {boolean} noqueue If this trigger should not be queued.
 * @return {object} The plugin object.
 */
minplayer.plugin.prototype.trigger = function(type, data, noqueue) {

  // Don't trigger if this plugin is inactive.
  if (!this.active) {
    return this;
  }

  // Only queue if they wish it to be so...
  if (!noqueue) {

    // Add this to our triggered array.
    this.triggered[type] = data;
  }

  // Iterate through the queue.
  var i = 0, queue = {}, queuetype = null;

  // Iterate through all the queue items.
  for (var name in this.queue) {

    // See if this is an event we care about.
    if (this.isEvent(name, type)) {

      // Set the queuetype.
      queuetype = this.queue[name];

      // Iterate through all the callbacks in this queue.
      for (i in queuetype) {

        // Check to make sure the queue index exists.
        if (queuetype.hasOwnProperty(i)) {

          // Setup the event object, and call the callback.
          queue = queuetype[i];
          queue.callback({target: this, data: queue.data}, data);
        }
      }
    }
  }

  // Return the plugin object.
  return this;
};

/**
 * Unbind then Bind
 *
 * @param {string} type The event type.
 * @param {object} data The data to bind with the event.
 * @param {function} fn The callback function.
 * @return {object} The plugin object.
 */
minplayer.plugin.prototype.ubind = function(type, data, fn) {
  this.unbind(type);
  return this.bind(type, data, fn);
};

/**
 * Bind to a media event.
 *
 * @param {string} type The event type.
 * @param {object} data The data to bind with the event.
 * @param {function} fn The callback function.
 * @return {object} The plugin object.
 **/
minplayer.plugin.prototype.bind = function(type, data, fn) {

  // Only bind if active.
  if (!this.active) {
    return this;
  }

  // Allow the data to be the callback.
  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  // You must bind to a specific event and have a callback.
  if (!type || !fn) {
    return;
  }

  // Initialize the queue for this type.
  this.queue[type] = this.queue[type] || [];

  // Now add this event to the queue.
  this.queue[type].push({
    callback: fn,
    data: data
  });

  // Now see if this event has already been triggered.
  for (var name in this.triggered) {
    if (this.triggered.hasOwnProperty(name)) {
      if (this.isEvent(type, name)) {
        fn({target: this, data: data}, this.triggered[name]);
      }
    }
  }

  // Return the plugin.
  return this;
};

/**
 * Unbind a media event.
 *
 * @param {string} type The event type.
 * @return {object} The plugin object.
 **/
minplayer.plugin.prototype.unbind = function(type) {

  // If this is locked then try again after 10ms.
  if (this.lock) {
    setTimeout((function(plugin) {
      return function() {
        plugin.unbind(type);
      };
    })(this), 10);
  }

  // Set the lock.
  this.lock = true;

  if (!type) {
    this.queue = {};
  }
  else if (this.queue.hasOwnProperty(type) && (this.queue[type].length > 0)) {
    this.queue[type].length = 0;
  }

  // Reset the lock.
  this.lock = false;

  // Return the plugin.
  return this;
};

/**
 * Adds an item to the queue.
 *
 * @param {object} context The context which this is called within.
 * @param {string} event The event to trigger on.
 * @param {string} id The player ID.
 * @param {string} plugin The name of the plugin.
 * @param {function} callback Called when the event occurs.
 */
minplayer.addQueue = function(context, event, id, plugin, callback) {

  // See if it is locked...
  if (!minplayer.lock) {
    minplayer.queue.push({
      context: context,
      id: id,
      event: event,
      plugin: plugin,
      callback: callback,
      addedto: {}
    });
  }
  else {

    // If so, then try again after 10 milliseconds.
    setTimeout(function() {
      minplayer.addQueue(context, id, event, plugin, callback);
    }, 10);
  }
};

/**
 * Binds an event to a plugin instance, and if it doesn't exist, then caches
 * it for a later time.
 *
 * @param {string} event The event to trigger on.
 * @param {string} id The player ID.
 * @param {string} plugin The name of the plugin.
 * @param {function} callback Called when the event occurs.
 * @param {boolean} fromCheck If this is from a checkqueue.
 * @return {boolean} If the bind was successful.
 * @this The object in context who called this method.
 */
minplayer.bind = function(event, id, plugin, callback, fromCheck) {

  // If no callback exists, then just return false.
  if (!callback) {
    return false;
  }

  // Get the plugins.
  var plugins = minplayer.plugins, thisPlugin = null, thisId = null;

  // Determine the selected plugins.
  var selected = [];

  // Create a quick add.
  var addSelected = function(id, plugin) {
    if (plugins.hasOwnProperty(id) && plugins[id].hasOwnProperty(plugin)) {
      var i = plugins[id][plugin].length;
      while (i--) {
        selected.push(plugins[id][plugin][i]);
      }
    }
  };

  // If they provide id && plugin
  if (id && plugin) {
    addSelected(id, plugin);
  }

  // If they provide no id but a plugin.
  else if (!id && plugin) {
    for (thisId in plugins) {
      addSelected(thisId, plugin);
    }
  }

  // If they provide an id but no plugin.
  else if (id && !plugin && plugins[id]) {
    for (thisPlugin in plugins[id]) {
      addSelected(id, thisPlugin);
    }
  }

  // If they provide niether an id or a plugin.
  else if (!id && !plugin) {
    for (thisId in plugins) {
      for (thisPlugin in plugins[thisId]) {
        addSelected(thisId, thisPlugin);
      }
    }
  }

  // Iterate through the selected plugins and bind.
  /* jshint loopfunc: true */
  var i = selected.length;
  while (i--) {
    selected[i].bind(event, (function(context) {
      return function(event) {
        callback.call(context, event.target);
      };
    })(this));
  }

  // Add it to the queue for post bindings...
  if (!fromCheck) {
    minplayer.addQueue(this, event, id, plugin, callback);
  }

  // Return that this wasn't handled.
  return (selected.length > 0);
};

/**
 * The main API for minPlayer.
 *
 * Provided that this function takes three parameters, there are 8 different
 * ways to use this api.
 *
 *   id (0x100) - You want a specific player.
 *   plugin (0x010) - You want a specific plugin.
 *   callback (0x001) - You only want it when it is ready.
 *
 *   000 - You want all plugins from all players, ready or not.
 *
 *          var plugins = minplayer.get();
 *
 *   001 - You want all plugins from all players, but only when ready.
 *
 *          minplayer.get(function(plugin) {
 *            // Code goes here.
 *          });
 *
 *   010 - You want a specific plugin from all players, ready or not...
 *
 *          var medias = minplayer.get(null, 'media');
 *
 *   011 - You want a specific plugin from all players, but only when ready.
 *
 *          minplayer.get('player', function(player) {
 *            // Code goes here.
 *          });
 *
 *   100 - You want all plugins from a specific player, ready or not.
 *
 *          var plugins = minplayer.get('player_id');
 *
 *   101 - You want all plugins from a specific player, but only when ready.
 *
 *          minplayer.get('player_id', null, function(plugin) {
 *            // Code goes here.
 *          });
 *
 *   110 - You want a specific plugin from a specific player, ready or not.
 *
 *          var plugin = minplayer.get('player_id', 'media');
 *
 *   111 - You want a specific plugin from a specific player, only when ready.
 *
 *          minplayer.get('player_id', 'media', function(media) {
 *            // Code goes here.
 *          });
 *
 * @this The context in which this function was called.
 * @param {string} id The ID of the widget to get the plugins from.
 * @param {string} plugin The name of the plugin.
 * @param {function} callback Called when the plugin is ready.
 * @return {object} The plugin object if it is immediately available.
 */
minplayer.get = function(id, plugin, callback) {

  // Get the parameter types.
  var idType = typeof id;
  var pluginType = typeof plugin;
  var callbackType = typeof callback;

  // Normalize the arguments for a better interface.
  if (idType === 'function') {
    callback = id;
    plugin = id = null;
  }
  else if (pluginType === 'function') {
    callback = plugin;
    plugin = id;
    id = null;
  }
  else if ((pluginType === 'undefined') && (callbackType === 'undefined')) {
    plugin = id;
    callback = id = null;
  }

  // Make sure the callback is a callback.
  callback = (typeof callback === 'function') ? callback : null;

  // If a callback was provided, then just go ahead and bind.
  if (callback) {
    minplayer.bind.call(this, 'ready', id, plugin, callback);
    return;
  }

  // Get the plugins.
  var plugins = minplayer.plugins, thisId = null;

  // 0x000
  if (!id && !plugin && !callback) {
    return plugins;
  }
  // 0x100
  else if (id && !plugin && !callback) {
    return plugins[id];
  }
  // 0x110
  else if (id && plugin && !callback) {
    return plugins[id][plugin];
  }
  // 0x010
  else if (!id && plugin && !callback) {
    var plugin_types = [];
    for (thisId in plugins) {
      if (plugins.hasOwnProperty(thisId) &&
          plugins[thisId].hasOwnProperty(plugin)) {
        var i = plugins[thisId][plugin].length;
        while (i--) {
          plugin_types.push(plugins[thisId][plugin][i]);
        }
      }
    }
    return plugin_types;
  }
};
;
/** The minplayer namespace. */
minplayer = minplayer || {};

/**
 * @constructor
 * @extends minplayer.plugin
 * @class Base class used to provide the display and options for any component
 * deriving from this class.  Components who derive are expected to provide
 * the elements that they define by implementing the getElements method.
 *
 * @param {string} name The name of this plugin.
 * @param {object} context The jQuery context this component resides.
 * @param {object} options The options for this component.
 * @param {object} queue The event queue to pass events around.
 */
minplayer.display = function(name, context, options, queue) {

  // Derive from plugin
  minplayer.plugin.call(this, name, context, options, queue);
};

/** Derive from minplayer.plugin. */
minplayer.display.prototype = new minplayer.plugin();

/** Reset the constructor. */
minplayer.display.prototype.constructor = minplayer.display;

/**
 * Returns the display for this component.
 *
 * @param {object} context The context which this display is within.
 * @param {object} options The options to get the display.
 *
 * @return {object} The jQuery context for this display.
 */
minplayer.display.prototype.getDisplay = function(context, options) {

  // Return the context.
  return context;
};

/**
 * @see minplayer.plugin.initialize
 */
minplayer.display.prototype.initialize = function() {

  // Only set the display if it hasn't already been set.
  if (!this.display) {

    // Set the display.
    this.display = this.getDisplay(this.context, this.options);
  }

  // Only continue loading this plugin if there is a display.
  if (this.display) {

    // Set the plugin name within the options.
    this.options.pluginName = 'display';

    // Get the display elements.
    this.elements = this.getElements();

    // Call the plugin initialize method.
    minplayer.plugin.prototype.initialize.call(this);
  }
};

/**
 * @see minplayer.plugin.construct
 */
minplayer.display.prototype.construct = function() {

  // Call the plugin constructor.
  minplayer.plugin.prototype.construct.call(this);

  // Set if this display is in autohide.
  this.autoHide = false;

  // Only do this if they allow resize for this display.
  if (this.onResize) {

    // Set the resize timeout and this pointer.
    var resizeTimeout = 0;

    // Add a handler to trigger a resize event.
    jQuery(window).resize((function(display) {
      return function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
          display.onResize();
        }, 200);
      };
    })(this));
  }
};

/**
 * Called when the window resizes.
 */
minplayer.display.prototype.onResize = false;

/**
 * Wrapper around hide that will always not show.
 *
 * @param {object} element The element you wish to hide.
 */
minplayer.display.prototype.hide = function(element) {
  element = element || this.display;
  if (element) {
    element.forceHide = true;
    element.unbind().hide();
  }
};

/**
 * Gets the full screen element.
 *
 * @return {object} The display to be used for full screen support.
 */
minplayer.display.prototype.fullScreenElement = function() {
  return this.display;
};

/**
 * Fix for the click function in jQuery to be cross platform.
 *
 * @param {object} element The element that will be clicked.
 * @param {function} fn Called when the element is clicked.
 * @return {object} The element that is to be clicked.
 */
minplayer.click = function(element, fn) {
  var flag = false;
  element = jQuery(element);
  element.bind('touchstart click', function(event) {
    if (!flag) {
      flag = true;
      setTimeout(function() {
        flag = false;
      }, 100);
      fn.call(this, event);
    }
  });
  return element;
};

/**
 * Determines if the player is in focus or not.
 *
 * @param {boolean} focus If the player is in focus.
 */
minplayer.display.prototype.onFocus = function(focus) {
  this.hasFocus = this.focus = focus;

  // If they have autoHide enabled, then show then hide this element.
  if (this.autoHide) {
    this.showThenHide(
      this.autoHide.element,
      this.autoHide.timeout,
      this.autoHide.cb
    );
  }
};

/**
 * Called if you would like for your plugin to show then hide.
 *
 * @param {object} element The element you would like to hide or show.
 * @param {number} timeout The timeout to hide and show.
 * @param {function} cb Called when something happens.
 */
minplayer.display.prototype.showThenHide = function(element, timeout, cb) {

  // Get the element type.
  var elementType = (typeof element);

  // Set some interface defaults.
  if (elementType === 'undefined') {
    cb = null;
    element = this.display;
  }
  else if (elementType === 'number') {
    cb = timeout;
    timeout = element;
    element = this.display;
  }
  else if (elementType === 'function') {
    cb = element;
    element = this.display;
  }

  if (!element) {
    return;
  }

  // Make sure we have a timeout.
  timeout = timeout || 5000;

  // Set the autohide variable.
  this.autoHide = {
    element: element,
    timeout: timeout,
    cb: cb
  };

  // Show the element.
  if (!element.forceHide) {
    if (typeof element.showMe !== 'undefined') {
      if (element.showMe) {
        element.showMe(cb);
      }
    }
    else {
      element.show();
      if (cb) {
        cb(true);
      }
    }
  }

  // Define the hover state for this element.
  if (!element.hoverState) {
    jQuery(element).bind('mouseenter', function() {
      element.hoverState = true;
    });
    jQuery(element).bind('mouseleave', function() {
      element.hoverState = false;
    });
  }

  // Clear the timeout and start it over again.
  clearTimeout(this.showTimer);
  this.showTimer = setTimeout((function(self) {
    return function tryAgain() {

      // Check the hover state.
      if (!element.hoverState) {
        if (typeof element.hideMe !== 'undefined') {
          if (element.hideMe) {
            element.hideMe(cb);
          }
        }
        else {
          // Hide the element.
          element.hide('slow', function() {
            if (cb) {
              cb(false);
            }
          });
        }
      }
      else {

        // Try again in the timeout time.
        self.showTimer = setTimeout(tryAgain, timeout);
      }
    };
  })(this), timeout);
};

/**
 * Make this display element go fullscreen.
 *
 * @param {boolean} full Tell the player to go into fullscreen or not.
 */
minplayer.display.prototype.fullscreen = function(full) {
  var isFull = this.isFullScreen();
  var element = this.fullScreenElement();
  if (isFull && !full) {
    element.removeClass('fullscreen');
    if (screenfull) {
      screenfull.exit();
    }
    this.trigger('fullscreen', false);
  }
  else if (!isFull && full) {
    element.addClass('fullscreen');
    if (screenfull) {
      screenfull.request(element[0]);
      screenfull.onchange = (function(display) {
        return function(e) {
          if (!screenfull.isFullscreen) {
            display.fullscreen(false);
          }
        };
      })(this);
    }
    this.trigger('fullscreen', true);
  }
};

/**
 * Toggle fullscreen.
 */
minplayer.display.prototype.toggleFullScreen = function() {
  this.fullscreen(!this.isFullScreen());
};

/**
 * Checks to see if we are in fullscreen mode.
 *
 * @return {boolean} TRUE - fullscreen, FALSE - otherwise.
 */
minplayer.display.prototype.isFullScreen = function() {
  return this.fullScreenElement().hasClass('fullscreen');
};

/**
 * Returns a scaled rectangle provided a ratio and the container rect.
 *
 * @param {number} ratio The width/height ratio of what is being scaled.
 * @param {object} rect The bounding rectangle for scaling.
 * @return {object} The Rectangle object of the scaled rectangle.
 */
minplayer.display.prototype.getScaledRect = function(ratio, rect) {
  var scaledRect = {};
  scaledRect.x = rect.x ? rect.x : 0;
  scaledRect.y = rect.y ? rect.y : 0;
  scaledRect.width = rect.width ? rect.width : 0;
  scaledRect.height = rect.height ? rect.height : 0;
  if (ratio) {
    if ((rect.width / rect.height) > ratio) {
      scaledRect.height = rect.height;
      scaledRect.width = Math.floor(rect.height * ratio);
    }
    else {
      scaledRect.height = Math.floor(rect.width / ratio);
      scaledRect.width = rect.width;
    }
    scaledRect.x = Math.floor((rect.width - scaledRect.width) / 2);
    scaledRect.y = Math.floor((rect.height - scaledRect.height) / 2);
  }
  return scaledRect;
};

/**
 * Returns all the jQuery elements that this component uses.
 *
 * @return {object} An object which defines all the jQuery elements that
 * this component uses.
 */
minplayer.display.prototype.getElements = function() {
  return {};
};

/**
 * From https://github.com/sindresorhus/screenfull.js
 */
/*global Element:true*/
(function(window, document) {
  'use strict';
  var methods = (function() {
    var methodMap = [
      [
        'requestFullscreen',
        'exitFullscreen',
        'fullscreenchange',
        'fullscreen',
        'fullscreenElement'
      ],
      [
        'webkitRequestFullScreen',
        'webkitCancelFullScreen',
        'webkitfullscreenchange',
        'webkitIsFullScreen',
        'webkitCurrentFullScreenElement'
      ],
      [
        'mozRequestFullScreen',
        'mozCancelFullScreen',
        'mozfullscreenchange',
        'mozFullScreen',
        'mozFullScreenElement'
      ]
    ];
    for (var i = 0, l = methodMap.length; i < l; i++) {
      if (methodMap.hasOwnProperty(i)) {
        var val = methodMap[i];
        if (val[1] in document) {
          return val;
        }
      }
    }
  })();

  if (!methods) {
    window.screenfull = false;
    return window.screenfull;
  }

  var keyboardAllowed = 'ALLOW_KEYBOARD_INPUT' in Element;

  var screenfull = {
    init: function() {
      document.addEventListener(methods[2], function(e) {
        screenfull.isFullscreen = document[methods[3]];
        screenfull.element = document[methods[4]];
        screenfull.onchange(e);
      });
      return this;
    },
    isFullscreen: document[methods[3]],
    element: document[methods[4]],
    request: function(elem) {
      elem = elem || document.documentElement;
      elem[methods[0]](keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT);
      // Work around Safari 5.1 bug: reports support for keyboard in fullscreen
      // even though it doesn't.
      if (!document.isFullscreen) {
        elem[methods[0]]();
      }
    },
    exit: function() {
      document[methods[1]]();
    },
    toggle: function(elem) {
      if (this.isFullscreen) {
        this.exit();
      } else {
        this.request(elem);
      }
    },
    onchange: function() {}
  };

  window.screenfull = screenfull.init();
})(window, document);
;
// Add a way to instanciate using jQuery prototype.
if (!jQuery.fn.minplayer) {

  /**
   * @constructor
   *
   * Define a jQuery minplayer prototype.
   *
   * @param {object} options The options for this jQuery prototype.
   * @return {Array} jQuery object.
   */
  jQuery.fn.minplayer = function(options) {
    return jQuery(this).each(function() {
      options = options || {};
      options.id = options.id || jQuery(this).attr('id') || Math.random();
      if (!minplayer.plugins[options.id]) {
        options.template = options.template || 'default';
        if (minplayer[options.template]) {
          new minplayer[options.template](jQuery(this), options);
        }
        else {
          new minplayer(jQuery(this), options);
        }
      }
    });
  };
}

/**
 * @constructor
 * @extends minplayer.display
 * @class The core media player class which governs the media player
 * functionality.
 *
 * <p><strong>Usage:</strong>
 * <pre><code>
 *
 *   // Create a media player.
 *   var player = jQuery("#player").minplayer({
 *
 *   });
 *
 * </code></pre>
 * </p>
 *
 * @param {object} context The jQuery context.
 * @param {object} options This components options.
 */
minplayer = jQuery.extend(function(context, options) {

  // Derive from display
  minplayer.display.call(this, 'player', context, options);
}, minplayer);

/** Derive from minplayer.display. */
minplayer.prototype = new minplayer.display();

/** Reset the constructor. */
minplayer.prototype.constructor = minplayer;

/**
 * Get the default options for this plugin.
 *
 * @param {object} options The default options for this plugin.
 */
minplayer.prototype.defaultOptions = function(options) {

  // Assign the default options.
  options.id = 'player';
  options.build = false;
  options.wmode = 'transparent';
  options.preload = true;
  options.autoplay = false;
  options.autoload = true;
  options.loop = false;
  options.width = '100%';
  options.height = '350px';
  options.debug = false;
  options.volume = 80;
  options.files = null;
  options.file = '';
  options.preview = '';
  options.attributes = {};
  options.plugins = {};
  options.logo = '';
  options.link = '';
  options.duration = 0;

  // Allow them to provide arguments based off of the DOM attributes.
  jQuery.each(this.context[0].attributes, function(index, attr) {
    options[attr.name] = attr.value;
  });

  // Set the parent options.
  minplayer.display.prototype.defaultOptions.call(this, options);
};

/**
 * @see minplayer.plugin.construct
 */
minplayer.prototype.construct = function() {

  // Call the minplayer display constructor.
  minplayer.display.prototype.construct.call(this);

  // Initialize all plugins.
  var plugin = null;
  for (var pluginName in this.options.plugins) {
    plugin = this.options.plugins[pluginName];
    if (minplayer[plugin]) {
      plugin = minplayer[plugin];
      if (plugin[this.options.template] && plugin[this.options.template].init) {
        plugin[this.options.template].init(this);
      }
      else if (plugin.init) {
        plugin.init(this);
      }
    }
  }

  // Set the plugin name within the options.
  this.options.pluginName = 'player';

  /** The controller for this player. */
  this.controller = this.create('controller');

  /** The play loader for this player. */
  this.playLoader = this.create('playLoader');

  /** Add the logo for the player. */
  if (this.options.logo && this.elements.logo) {

    var code = '';
    if (this.options.link) {
      code += '<a target="_blank" href="' + this.options.link + '">';
    }
    code += '<img src="' + this.options.logo + '" >';
    if (this.options.link) {
      code += '</a>';
    }
    this.logo = this.elements.logo.append(code);
  }

  /** Variable to store the current media player. */
  this.currentPlayer = 'html5';

  // Add key events to the window.
  this.addKeyEvents();

  // Called to add events.
  this.addEvents();

  // Now load these files.
  this.load(this.getFiles());

  // The player is ready.
  this.ready();
};

/**
 * Set the focus for this player.
 *
 * @param {boolean} focus If the player is in focus or not.
 */
minplayer.prototype.setFocus = function(focus) {

  // Tell all plugins about this.
  minplayer.get.call(this, this.options.id, null, function(plugin) {
    plugin.onFocus(focus);
  });

  // Trigger an event that a focus event has occured.
  this.trigger('playerFocus', focus);
};

/**
 * Called when an error occurs.
 *
 * @param {object} plugin The plugin you wish to bind to.
 */
minplayer.prototype.bindTo = function(plugin) {
  plugin.ubind(this.uuid + ':error', (function(player) {
    return function(event, data) {
      if (player.currentPlayer === 'html5') {
        minplayer.player = 'minplayer';
        player.options.file.player = 'minplayer';
        player.loadPlayer();
      }
      else {
        player.showError(data);
      }
    };
  })(this));

  // Bind to the fullscreen event.
  plugin.ubind(this.uuid + ':fullscreen', (function(player) {
    return function(event, data) {
      player.resize();
    };
  })(this));
};

/**
 * We need to bind to events we are interested in.
 */
minplayer.prototype.addEvents = function() {

  // Keep track if we are inside the player or not.
  var inside = false;

  // Set the focus when they enter the player.
  this.display.bind('mouseenter', (function(player) {
    return function() {
      inside = true;
      player.setFocus(true);
    };
  })(this));


  this.display.bind('mouseleave', (function(player) {
    return function() {
      inside = false;
      player.setFocus(false);
    };
  })(this));

  var moveThrottle = false;
  this.display.bind('mousemove', (function(player) {
    return function() {
      if (!moveThrottle) {
        moveThrottle = setTimeout(function() {
          moveThrottle = false;
          if (inside) {
            player.setFocus(true);
          }
        }, 300);
      }
    };
  })(this));

  minplayer.get.call(this, this.options.id, null, (function(player) {
    return function(plugin) {
      player.bindTo(plugin);
    };
  })(this));
};

/**
 * Sets an error on the player.
 *
 * @param {string} error The error to display on the player.
 */
minplayer.prototype.showError = function(error) {
  if (typeof error !== 'object') {
    error = error || '';
    if (this.elements.error) {

      // Set the error text.
      this.elements.error.text(error);
      if (error) {
        // Show the error message.
        this.elements.error.show();

        // Only show this error for a time interval.
        setTimeout((function(player) {
          return function() {
            player.elements.error.hide('slow');
          };
        })(this), 5000);
      }
      else {
        this.elements.error.hide();
      }
    }
  }
};

/**
 * Adds key events to the player.
 */
minplayer.prototype.addKeyEvents = function() {
  jQuery(document).bind('keydown', (function(player) {
    return function(event) {
      switch (event.keyCode) {
        case 113: // ESC
        case 27:  // Q
          if (player.isFullScreen()) {
            player.fullscreen(false);
          }
          break;
      }
    };
  })(this));
};

/**
 * Returns all the media files available for this player.
 *
 * @return {array} All the media files for this player.
 */
minplayer.prototype.getFiles = function() {

  // If they provide the files in the options, use those first.
  if (this.options.files) {
    return this.options.files;
  }

  if (this.options.file) {
    return this.options.file;
  }

  var files = [];
  var mediaSrc = null;

  // Get the files involved...
  if (this.elements.media) {
    mediaSrc = this.elements.media.attr('src');
    if (mediaSrc) {
      files.push({'path': mediaSrc});
    }
    jQuery('source', this.elements.media).each(function() {
      files.push({
        'path': jQuery(this).attr('src'),
        'mimetype': jQuery(this).attr('type'),
        'codecs': jQuery(this).attr('codecs')
      });
    });
  }

  return files;
};

/**
 * Returns the full media player object.
 *
 * @param {array} files An array of files to chose from.
 * @return {object} The best media file to play in the current browser.
 */
minplayer.getMediaFile = function(files) {

  // If there are no files then return null.
  if (!files) {
    return null;
  }

  // If the file is already a file object then just return.
  if ((typeof files === 'string') || files.path || files.id) {
    return new minplayer.file(files);
  }

  // Add the files and get the best player to play.
  var bestPriority = 0, mFile = null, file = null;
  for (var i in files) {
    if (files.hasOwnProperty(i)) {
      file = new minplayer.file(files[i]);
      if (file.player && (file.priority > bestPriority)) {
        bestPriority = file.priority;
        mFile = file;
      }
    }
  }

  // Return the best minplayer file.
  return mFile;
};

/**
 * Loads a media player based on the current file.
 *
 * @return {boolean} If a new player was loaded.
 */
minplayer.prototype.loadPlayer = function() {

  // Do nothing if there isn't a file or anywhere to put it.
  if (!this.options.file || (this.elements.display.length === 0)) {
    return false;
  }

  // If no player is set, then also return false.
  if (!this.options.file.player) {
    return false;
  }

  // Reset the error.
  this.showError();

  // Only destroy if the current player is different than the new player.
  var player = this.options.file.player.toString();

  // If there isn't media or if the players are different.
  if (!this.media || (player !== this.currentPlayer)) {

    // Set the current media player.
    this.currentPlayer = player;

    // Do nothing if we don't have a display.
    if (!this.elements.display) {
      this.showError('No media display found.');
      return;
    }

    // Destroy the current media.
    var queue = {};
    if (this.media) {
      queue = this.media.queue;
      this.media.destroy();
    }

    // Get the class name and create the new player.
    pClass = minplayer.players[this.options.file.player];

    // Create the new media player.
    this.options.mediaelement = this.elements.media;
    this.media = new pClass(this.elements.display, this.options, queue);
    this.media.load(this.options.file);
    this.display.addClass('minplayer-player-' + this.media.mediaFile.player);
    return true;
  }
  // If the media object already exists...
  else if (this.media) {

    // Now load the different media file.
    this.media.options = this.options;
    this.display.removeClass('minplayer-player-' + this.media.mediaFile.player);
    this.media.load(this.options.file);
    this.display.addClass('minplayer-player-' + this.media.mediaFile.player);
    return false;
  }
};

/**
 * Load a set of files or a single file for the media player.
 *
 * @param {array} files An array of files to chose from to load.
 */
minplayer.prototype.load = function(files) {

  // Set the id and class.
  var id = '', pClass = '';

  // If no file was provided, then get it.
  this.options.files = files || this.options.files;
  this.options.file = minplayer.getMediaFile(this.options.files);

  // Now load the player.
  if (this.loadPlayer()) {

    // Add the events since we now have a player.
    this.bindTo(this.media);

    // If the player isn't valid, then show an error.
    if (this.options.file.mimetype && !this.options.file.player) {
      this.showError('Cannot play media: ' + this.options.file.mimetype);
    }
  }
};

/**
 * Called when the player is resized.
 */
minplayer.prototype.resize = function() {

  // Call onRezie for each plugin.
  this.get(function(plugin) {
    if (plugin.onResize) {
      plugin.onResize();
    }
  });
};
;
/** The minplayer namespace. */
var minplayer = minplayer || {};

/**
 * @constructor
 * @class A class to easily handle images.
 * @param {object} context The jQuery context.
 * @param {object} options This components options.
 */
minplayer.image = function(context, options) {

  // Determine if the image is loaded.
  this.loaded = false;

  // The image loader.
  this.loader = null;

  // The ratio of the image.
  this.ratio = 0;

  // The image element.
  this.img = null;

  // Derive from display
  minplayer.display.call(this, 'image', context, options);
};

/** Derive from minplayer.display. */
minplayer.image.prototype = new minplayer.display();

/** Reset the constructor. */
minplayer.image.prototype.constructor = minplayer.image;

/**
 * @see minplayer.plugin.construct
 */
minplayer.image.prototype.construct = function() {

  // Call the media display constructor.
  minplayer.display.prototype.construct.call(this);

  // Set the plugin name within the options.
  this.options.pluginName = 'image';

  // Set the container to not show any overflow...
  this.display.css('overflow', 'hidden');

  /** The loader for the image. */
  this.loader = new Image();

  /** Register for when the image is loaded within the loader. */
  this.loader.onload = (function(image) {
    return function() {
      image.loaded = true;
      image.ratio = (image.loader.width / image.loader.height);
      image.resize();
      image.trigger('loaded');
    };
  })(this);

  // We are now ready.
  this.ready();
};

/**
 * Loads an image.
 *
 * @param {string} src The source of the image to load.
 */
minplayer.image.prototype.load = function(src) {

  // First clear the previous image.
  this.clear(function() {

    // Create the new image, and append to the display.
    this.display.empty();
    this.img = jQuery(document.createElement('img')).attr({src: ''}).hide();
    this.display.append(this.img);
    this.loader.src = src;
    this.img.attr('src', src);
  });
};

/**
 * Clears an image.
 *
 * @param {function} callback Called when the image is done clearing.
 */
minplayer.image.prototype.clear = function(callback) {
  this.loaded = false;
  if (this.img) {
    this.img.fadeOut(150, (function(image) {
      return function() {
        image.img.attr('src', '');
        image.loader.src = '';
        jQuery(this).remove();
        if (callback) {
          callback.call(image);
        }
      };
    })(this));
  }
  else if (callback) {
    callback.call(this);
  }
};

/**
 * Resize the image provided a width and height or nothing.
 *
 * @param {integer} width (optional) The width of the container.
 * @param {integer} height (optional) The height of the container.
 */
minplayer.image.prototype.resize = function(width, height) {
  width = width || this.display.parent().width();
  height = height || this.display.parent().height();
  if (width && height && this.loaded) {

    // Get the scaled rectangle.
    var rect = this.getScaledRect(this.ratio, {
      width: width,
      height: height
    });

    // Now set this image to the new size.
    if (this.img) {
      this.img.attr('src', this.loader.src).css({
        marginLeft: rect.x,
        marginTop: rect.y,
        width: rect.width,
        height: rect.height
      });
    }

    // Show the container.
    this.img.fadeIn(150);
  }
};

/**
 * @see minplayer.display#onResize
 */
minplayer.image.prototype.onResize = function() {

  // Resize the image to fit.
  this.resize();
};
;
/** The minplayer namespace. */
var minplayer = minplayer || {};

/**
 * @constructor
 * @class A wrapper class used to provide all the data necessary to control an
 * individual file within this media player.
 *
 * @param {object} file A media file object with minimal required information.
 */
minplayer.file = function(file) {

  // If there isn't a file provided, then just return null.
  if (!file) {
    return null;
  }

  file = (typeof file === 'string') ? {path: file} : file;

  // If we already are a minplayer file, then just return this file.
  if (file.hasOwnProperty('isMinPlayerFile')) {
    return file;
  }

  this.isMinPlayerFile = true;
  this.duration = file.duration || 0;
  this.bytesTotal = file.bytesTotal || 0;
  this.quality = file.quality || 0;
  this.stream = file.stream || '';
  this.path = file.path || '';
  this.codecs = file.codecs || '';

  // These should be provided, but just in case...
  this.extension = file.extension || this.getFileExtension();
  this.mimetype = file.mimetype || file.filemime || this.getMimeType();
  this.type = file.type || this.getType();

  // Fail safe to try and guess the mimetype and media type.
  if (!this.type) {
    this.mimetype = this.getMimeType();
    this.type = this.getType();
  }

  // Get the player.
  this.player = minplayer.player || file.player || this.getBestPlayer();
  this.priority = file.priority || this.getPriority();
  this.id = file.id || this.getId();
  if (!this.path) {
    this.path = this.id;
  }
};

/** Used to force the player for all media. */
minplayer.player = '';

/**
 * Returns the best player for the job.
 *
 * @return {string} The best player to play the media file.
 */
minplayer.file.prototype.getBestPlayer = function() {
  var bestplayer = null, bestpriority = 0;
  jQuery.each(minplayer.players, (function(file) {
    return function(name, player) {
      var priority = player.getPriority(file);
      if (player.canPlay(file) && (priority > bestpriority)) {
        bestplayer = name;
        bestpriority = priority;
      }
    };
  })(this));
  return bestplayer;
};

/**
 * The priority of this file is determined by the priority of the best
 * player multiplied by the priority of the mimetype.
 *
 * @return {integer} The priority of the media file.
 */
minplayer.file.prototype.getPriority = function() {
  var priority = 1;
  if (this.player) {
    priority = minplayer.players[this.player].getPriority(this);
  }
  switch (this.mimetype) {
    case 'video/x-webm':
    case 'video/webm':
    case 'application/octet-stream':
    case 'application/vnd.apple.mpegurl':
      return priority * 10;
    case 'video/mp4':
    case 'audio/mp4':
    case 'audio/mpeg':
      return priority * 9;
    case 'video/ogg':
    case 'audio/ogg':
    case 'video/quicktime':
      return priority * 8;
    default:
      return priority * 5;
  }
};

/**
 * Returns the file extension of the file path.
 *
 * @return {string} The file extension.
 */
minplayer.file.prototype.getFileExtension = function() {
  return this.path.substring(this.path.lastIndexOf('.') + 1).toLowerCase();
};

/**
 * Returns the proper mimetype based off of the extension.
 *
 * @return {string} The mimetype of the file based off of extension.
 */
minplayer.file.prototype.getMimeType = function() {
  switch (this.extension) {
    case 'mp4': case 'm4v': case 'flv': case 'f4v':
      return 'video/mp4';
    case 'm3u8':
      return 'application/vnd.apple.mpegurl';
    case'webm':
      return 'video/webm';
    case 'ogg': case 'ogv':
      return 'video/ogg';
    case '3g2':
      return 'video/3gpp2';
    case '3gpp':
    case '3gp':
      return 'video/3gpp';
    case 'mov':
      return 'video/quicktime';
    case'swf':
      return 'application/x-shockwave-flash';
    case 'oga':
      return 'audio/ogg';
    case 'mp3':
      return 'audio/mpeg';
    case 'm4a': case 'f4a':
      return 'audio/mp4';
    case 'aac':
      return 'audio/aac';
    case 'wav':
      return 'audio/vnd.wave';
    case 'wma':
      return 'audio/x-ms-wma';
    default:
      return 'unknown';
  }
};

/**
 * The type of media this is: video or audio.
 *
 * @return {string} "video" or "audio" based on what the type of media this
 * is.
 */
minplayer.file.prototype.getType = function() {
  var type = this.mimetype.match(/([^\/]+)(\/)/);
  type = (type && (type.length > 1)) ? type[1] : '';
  if (type === 'video') {
    return 'video';
  }
  if (type === 'audio') {
    return 'audio';
  }
  switch (this.mimetype) {
    case 'application/octet-stream':
    case 'application/x-shockwave-flash':
    case 'application/vnd.apple.mpegurl':
      return 'video';
  }
  return '';
};

/**
 * Returns the ID for this media file.
 *
 * @return {string} The id for this media file which is provided by the player.
 */
minplayer.file.prototype.getId = function() {
  var player = minplayer.players[this.player];
  return (player && player.getMediaId) ? player.getMediaId(this) : '';
};
;
/** The minplayer namespace. */
var minplayer = minplayer || {};

/**
 * @constructor
 * @extends minplayer.display
 * @class The play loader base class, which is used to control the busy
 * cursor, big play button, and the opaque background which shows when the
 * player is paused.
 *
 * @param {object} context The jQuery context.
 * @param {object} options This components options.
 */
minplayer.playLoader = function(context, options) {

  // Clear the variables.
  this.clear();

  // Derive from display
  minplayer.display.call(this, 'playLoader', context, options);
};

/** Derive from minplayer.display. */
minplayer.playLoader.prototype = new minplayer.display();

/** Reset the constructor. */
minplayer.playLoader.prototype.constructor = minplayer.playLoader;

/**
 * The constructor.
 */
minplayer.playLoader.prototype.construct = function() {

  // Call the media display constructor.
  minplayer.display.prototype.construct.call(this);

  // Set the plugin name within the options.
  this.options.pluginName = 'playLoader';

  // Get the media plugin.
  this.initializePlayLoader();

  // We are now ready.
  this.ready();
};

/**
 * Initialize the playLoader.
 */
minplayer.playLoader.prototype.initializePlayLoader = function() {

  // Get the media plugin.
  this.get('media', function(media) {

    // Only bind if this player does not have its own play loader.
    if (!media.hasPlayLoader(this.options.preview)) {

      // Enable the playLoader.
      this.enabled = true;

      // Get the poster image.
      if (!this.options.preview) {
        this.options.preview = media.poster;
      }

      // Determine if we should load the image.
      var shouldLoad = true;
      if (this.preview && this.preview.loader) {
        shouldLoad = (this.preview.loader.src !== this.options.preview);
      }

      // Only load the image if it is different.
      if (shouldLoad) {
        // Reset the media's poster image.
        media.elements.media.attr('poster', '');

        // Load the preview image.
        this.loadPreview();
      }

      // Trigger a play event when someone clicks on the controller.
      if (this.elements.bigPlay) {
        minplayer.click(this.elements.bigPlay.unbind(), function(event) {
          event.preventDefault();
          jQuery(this).hide();
          media.play();
        });
      }

      // Bind to the player events to control the play loader.
      media.ubind(this.uuid + ':loadstart', (function(playLoader) {
        return function(event, data, reset) {
          playLoader.busy.setFlag('media', true);
          playLoader.bigPlay.setFlag('media', true);
          playLoader.previewFlag.setFlag('media', true);
          playLoader.checkVisibility();
        };
      })(this));
      media.ubind(this.uuid + ':waiting', (function(playLoader) {
        return function(event, data, reset) {
          if (!reset) {
            playLoader.busy.setFlag('media', true);
            playLoader.checkVisibility();
          }
        };
      })(this));
      media.ubind(this.uuid + ':loadeddata', (function(playLoader) {
        return function(event, data, reset) {
          if (!reset) {
            playLoader.busy.setFlag('media', false);
            playLoader.checkVisibility();
          }
        };
      })(this));
      media.ubind(this.uuid + ':playing', (function(playLoader) {
        return function(event, data, reset) {
          if (!reset) {
            playLoader.busy.setFlag('media', false);
            playLoader.bigPlay.setFlag('media', false);
            if (media.mediaFile.type !== 'audio') {
              playLoader.previewFlag.setFlag('media', false);
            }
            playLoader.checkVisibility();
          }
        };
      })(this));
      media.ubind(this.uuid + ':pause', (function(playLoader) {
        return function(event, data, reset) {
          if (!reset) {
            playLoader.busy.setFlag('media', false);
            playLoader.bigPlay.setFlag('media', true);
            playLoader.checkVisibility();
          }
        };
      })(this));
    }
    else {

      // Hide the display.
      this.enabled = false;
      this.hide(this.elements.busy);
      this.hide(this.elements.bigPlay);
      this.hide(this.elements.preview);
      this.hide();
    }
  });
};

/**
 * Clears the playloader.
 *
 * @param {function} callback Called when the playloader is finished clearing.
 */
minplayer.playLoader.prototype.clear = function(callback) {

  // Define the flags that control the busy cursor.
  this.busy = new minplayer.flags();

  // Define the flags that control the big play button.
  this.bigPlay = new minplayer.flags();

  // Define the flags the control the preview.
  this.previewFlag = new minplayer.flags();

  /** If the playLoader is enabled. */
  this.enabled = true;

  // If the preview is defined, then clear the image.
  if (this.preview) {

    this.preview.clear((function(playLoader) {
      return function() {

        // Reset the preview.
        playLoader.preview = null;

        // If they wish to be called back after it is cleared.
        if (callback) {
          callback();
        }
      };
    })(this));
  }
  else {

    /** The preview image. */
    this.preview = null;

    // Return the callback.
    if (callback) {
      callback();
    }
  }
};

/**
 * Loads the preview image.
 *
 * @param {string} image The image you would like to load.
 * @return {boolean} Returns true if an image was loaded, false otherwise.
 */
minplayer.playLoader.prototype.loadPreview = function(image) {

  // Get the image to load.
  image = image || this.options.preview;
  this.options.preview = image;

  // Ignore if disabled.
  if (!this.enabled || (this.display.length === 0)) {
    return;
  }

  // If the preview element exists.
  if (this.elements.preview) {

    // If there is a preview to show...
    if (this.options.preview) {

      // Say that this has a preview.
      this.elements.preview.addClass('has-preview').show();

      // Create a new preview image.
      this.preview = new minplayer.image(this.elements.preview, this.options);

      // Create the image.
      this.preview.load(this.options.preview);
      return true;
    }
    else {

      // Hide the preview.
      this.elements.preview.hide();
    }
  }

  return false;
};

/**
 * Hide or show certain elements based on the state of the busy and big play
 * button.
 */
minplayer.playLoader.prototype.checkVisibility = function() {

  // Ignore if disabled.
  if (!this.enabled) {
    return;
  }

  // Hide or show the busy cursor based on the flags.
  if (this.busy.flag) {
    this.elements.busy.show();
  }
  else {
    this.elements.busy.hide();
  }

  // Hide or show the big play button based on the flags.
  if (this.bigPlay.flag) {
    this.elements.bigPlay.show();
  }
  else {
    this.elements.bigPlay.hide();
  }

  if (this.previewFlag.flag) {
    this.elements.preview.show();
  }
  else {
    this.elements.preview.hide();
  }

  // Show the control either flag is set.
  if (this.bigPlay.flag || this.busy.flag || this.previewFlag.flag) {
    this.display.show();
  }

  // Hide the whole control if both flags are 0.
  if (!this.bigPlay.flag && !this.busy.flag && !this.previewFlag.flag) {
    this.display.hide();
  }
};
;
/** The minplayer namespace. */
var minplayer = minplayer || {};

/** All the media player implementations */
minplayer.players = minplayer.players || {};

/**
 * @constructor
 * @extends minplayer.display
 * @class The base media player class where all media players derive from.
 *
 * @param {object} context The jQuery context.
 * @param {object} options This components options.
 * @param {object} queue The event queue to pass events around.
 */
minplayer.players.base = function(context, options, queue) {

  // Derive from display
  minplayer.display.call(this, 'media', context, options, queue);
};

/** Derive from minplayer.display. */
minplayer.players.base.prototype = new minplayer.display();

/** Reset the constructor. */
minplayer.players.base.prototype.constructor = minplayer.players.base;

/**
 * @see minplayer.display.getElements
 * @this minplayer.players.base
 * @return {object} The elements for this display.
 */
minplayer.players.base.prototype.getElements = function() {
  var elements = minplayer.display.prototype.getElements.call(this);
  return jQuery.extend(elements, {
    media: this.options.mediaelement
  });
};

/**
 * Get the priority of this media player.
 *
 * @param {object} file A {@link minplayer.file} object.
 * @return {number} The priority of this media player.
 */
minplayer.players.base.getPriority = function(file) {
  return 0;
};

/**
 * Returns the ID for the media being played.
 *
 * @param {object} file A {@link minplayer.file} object.
 * @return {string} The ID for the provided media.
 */
minplayer.players.base.getMediaId = function(file) {
  return '';
};

/**
 * Determine if we can play the media file.
 *
 * @param {object} file A {@link minplayer.file} object.
 * @return {boolean} If this player can play this media type.
 */
minplayer.players.base.canPlay = function(file) {
  return false;
};

/**
 * @see minplayer.plugin.construct
 * @this minplayer.players.base
 */
minplayer.players.base.prototype.construct = function() {

  // Call the media display constructor.
  minplayer.display.prototype.construct.call(this);

  // Set the poster if it exists.
  if (this.elements.media) {
    this.poster = this.elements.media.attr('poster');
  }

  // Set the plugin name within the options.
  this.options.pluginName = 'basePlayer';

  /** The ready queue for this player. */
  this.readyQueue = [];

  /** The currently loaded media file. */
  this.mediaFile = this.options.file;

  // Clear the media player.
  this.clear();

  // Now setup the media player.
  this.setupPlayer();
};

/**
 * Sets up a new media player.
 */
minplayer.players.base.prototype.setupPlayer = function() {

  // Get the player display object.
  if (!this.playerFound()) {

    // Add the new player.
    this.addPlayer();
  }

  // Get the player object...
  this.player = this.getPlayer();

  // Toggle playing if they click.
  minplayer.click(this.display, (function(player) {
    return function() {
      if (player.playing) {
        player.pause();
      }
      else {
        player.play();
      }
    };
  })(this));

  // Bind to key events...
  jQuery(document).bind('keydown', (function(player) {
    return function(event) {
      if (player.hasFocus) {
        event.preventDefault();
        switch (event.keyCode) {
          case 32:  // SPACE
          case 179: // GOOGLE play/pause button.
            if (player.playing) {
              player.pause();
            }
            else {
              player.play();
            }
            break;
          case 38:  // UP
            player.setVolumeRelative(0.1);
            break;
          case 40:  // DOWN
            player.setVolumeRelative(-0.1);
            break;
          case 37:  // LEFT
          case 227: // GOOGLE TV REW
            player.seekRelative(-0.05);
            break;
          case 39:  // RIGHT
          case 228: // GOOGLE TV FW
            player.seekRelative(0.05);
            break;
        }
      }
    };
  })(this));
};

/**
 * Adds the media player.
 */
minplayer.players.base.prototype.addPlayer = function() {

  // Remove the media element if found
  if (this.elements.media) {
    this.elements.media.remove();
  }

  // Create a new media player element.
  this.elements.media = jQuery(this.createPlayer());
  this.display.html(this.elements.media);
};

/**
 * @see minplayer.plugin.destroy.
 */
minplayer.players.base.prototype.destroy = function() {
  minplayer.plugin.prototype.destroy.call(this);
  this.clear();
};

/**
 * Clears the media player.
 */
minplayer.players.base.prototype.clear = function() {

  // Reset the ready flag.
  this.playerReady = false;

  // Reset the player.
  this.reset();

  // If the player exists, then unbind all events.
  if (this.player) {
    jQuery(this.player).remove();
    this.player = null;
  }
};

/**
 * Resets all variables.
 */
minplayer.players.base.prototype.reset = function() {

  // The duration of the player.
  this.duration = new minplayer.async();

  // The current play time of the player.
  this.currentTime = new minplayer.async();

  // The amount of bytes loaded in the player.
  this.bytesLoaded = new minplayer.async();

  // The total amount of bytes for the media.
  this.bytesTotal = new minplayer.async();

  // The bytes that the download started with.
  this.bytesStart = new minplayer.async();

  // The current volume of the player.
  this.volume = new minplayer.async();

  // Reset focus.
  this.hasFocus = false;

  // We are not playing.
  this.playing = false;

  // We are not loading.
  this.loading = false;

  // If we are loaded.
  this.loaded = false;

  // Tell everyone else we reset.
  this.trigger('pause', null, true);
  this.trigger('waiting', null, true);
  this.trigger('progress', {loaded: 0, total: 0, start: 0}, true);
  this.trigger('timeupdate', {currentTime: 0, duration: 0}, true);
};

/**
 * Called when the player is ready to recieve events and commands.
 */
minplayer.players.base.prototype.onReady = function() {

  // Only continue if we are not already ready.
  if (this.playerReady) {
    return;
  }

  // Set the ready flag.
  this.playerReady = true;

  // Set the volume to the default.
  this.setVolume(this.options.volume / 100);

  // Setup the progress interval.
  this.loading = true;

  // Create a poll to get the progress.
  this.poll('progress', (function(player) {
    return function() {

      // Only do this if the play interval is set.
      if (player.loading) {

        // Get the bytes loaded asynchronously.
        player.getBytesLoaded(function(bytesLoaded) {

          // Get the bytes total asynchronously.
          player.getBytesTotal(function(bytesTotal) {

            // Trigger an event about the progress.
            if (bytesLoaded || bytesTotal) {

              // Get the bytes start, but don't require it.
              var bytesStart = 0;
              player.getBytesStart(function(val) {
                bytesStart = val;
              });

              // Trigger a progress event.
              player.trigger('progress', {
                loaded: bytesLoaded,
                total: bytesTotal,
                start: bytesStart
              });

              // Say we are not longer loading if they are equal.
              if (bytesLoaded >= bytesTotal) {
                player.loading = false;
              }
            }
          });
        });
      }

      // Keep polling as long as its loading...
      return player.loading;
    };
  })(this), 1000);

  // We are now ready.
  this.ready();

  // Make sure the player is ready or errors will occur.
  if (this.isReady()) {

    // Iterate through our ready queue.
    for (var i in this.readyQueue) {
      this.readyQueue[i].call(this);
    }

    // Empty the ready queue.
    this.readyQueue.length = 0;
    this.readyQueue = [];

    if (!this.loaded) {

      // If we are still loading, then trigger that the load has started.
      this.trigger('loadstart');
    }
  }
  else {

    // Empty the ready queue.
    this.readyQueue.length = 0;
    this.readyQueue = [];
  }
};

/**
 * Returns the amount of seconds you would like to seek.
 *
 * @return {number} The number of seconds we should seek.
 */
minplayer.players.base.prototype.getSeek = function() {
  var seconds = 0, minutes = 0, hours = 0;

  // See if they would like to seek.
  if (minplayer.urlVars && minplayer.urlVars.seek) {

    // Get the seconds.
    seconds = minplayer.urlVars.seek.match(/([0-9])s/i);
    if (seconds) {
      seconds = parseInt(seconds[1], 10);
    }

    // Get the minutes.
    minutes = minplayer.urlVars.seek.match(/([0-9])m/i);
    if (minutes) {
      seconds += (parseInt(minutes[1], 10) * 60);
    }

    // Get the hours.
    hours = minplayer.urlVars.seek.match(/([0-9])h/i);
    if (hours) {
      seconds += (parseInt(hours[1], 10) * 3600);
    }

    // If no seconds were found, then just use the raw value.
    if (!seconds) {
      seconds = minplayer.urlVars.seek;
    }
  }

  return seconds;
};

/**
 * Should be called when the media is playing.
 */
minplayer.players.base.prototype.onPlaying = function() {

  // Trigger an event that we are playing.
  this.trigger('playing');

  // Say that this player has focus.
  this.hasFocus = true;

  // Set the playInterval to true.
  this.playing = true;

  // Create a poll to get the timeupate.
  this.poll('timeupdate', (function(player) {
    return function() {

      // Only do this if the play interval is set.
      if (player.playing) {

        // Get the current time asyncrhonously.
        player.getCurrentTime(function(currentTime) {

          // Get the duration asynchronously.
          player.getDuration(function(duration) {

            // Convert these to floats.
            currentTime = parseFloat(currentTime);
            duration = parseFloat(duration);

            // Trigger an event about the progress.
            if (currentTime || duration) {

              // Trigger an update event.
              player.trigger('timeupdate', {
                currentTime: currentTime,
                duration: duration
              });
            }
          });
        });
      }

      // Keep polling as long as it is playing.
      return player.playing;
    };
  })(this), 500);
};

/**
 * Should be called when the media is paused.
 */
minplayer.players.base.prototype.onPaused = function() {

  // Trigger an event that we are paused.
  this.trigger('pause');

  // Remove focus.
  this.hasFocus = false;

  // Say we are not playing.
  this.playing = false;
};

/**
 * Should be called when the media is complete.
 */
minplayer.players.base.prototype.onComplete = function() {
  if (this.playing) {
    this.onPaused();
  }

  // Stop the intervals.
  this.playing = false;
  this.loading = false;
  this.hasFocus = false;
  this.trigger('ended');
};

/**
 * Should be called when the media is done loading.
 */
minplayer.players.base.prototype.onLoaded = function() {

  // See if we are loaded.
  var isLoaded = this.loaded;

  // If we should autoplay, then just play now.
  if (!this.loaded && this.options.autoplay) {
    this.play();
  }

  // We are now loaded.
  this.loaded = true;

  // Trigger this event.
  this.trigger('loadeddata');

  // See if they would like to seek.
  if (!isLoaded) {
    var seek = this.getSeek();
    if (seek) {
      this.getDuration((function(player) {
        return function(duration) {
          if (seek < duration) {
            player.seek(seek);
            player.play();
          }
        };
      })(this));
    }
  }
};

/**
 * Should be called when the player is waiting.
 */
minplayer.players.base.prototype.onWaiting = function() {
  this.trigger('waiting');
};

/**
 * Called when an error occurs.
 *
 * @param {string} errorCode The error that was triggered.
 */
minplayer.players.base.prototype.onError = function(errorCode) {
  this.hasFocus = false;
  this.trigger('error', errorCode);
};

/**
 * @see minplayer.players.base#isReady
 * @return {boolean} Checks to see if the Flash is ready.
 */
minplayer.players.base.prototype.isReady = function() {

  // Return that the player is set and the ready flag is good.
  return (this.player && this.playerReady);
};

/**
 * Calls the callback when this player is ready.
 *
 * @param {function} callback Called when it is done performing this operation.
 */
minplayer.players.base.prototype.whenReady = function(callback) {

  // If the player is ready, then call the callback.
  if (this.isReady()) {
    callback.call(this);
  }
  else {

    // Add this to the ready queue.
    this.readyQueue.push(callback);
  }
};

/**
 * Determines if the player should show the playloader.
 *
 * @param {string} preview The preview image.
 * @return {bool} If this player implements its own playLoader.
 */
minplayer.players.base.prototype.hasPlayLoader = function(preview) {
  return false;
};

/**
 * Determines if the player should show the controller.
 *
 * @return {bool} If this player implements its own controller.
 */
minplayer.players.base.prototype.hasController = function() {
  return false;
};

/**
 * Returns if the media player is already within the DOM.
 *
 * @return {boolean} TRUE - if the player is in the DOM, FALSE otherwise.
 */
minplayer.players.base.prototype.playerFound = function() {
  return false;
};

/**
 * Creates the media player and inserts it in the DOM.
 *
 * @return {object} The media player entity.
 */
minplayer.players.base.prototype.createPlayer = function() {
  this.reset();
  return null;
};

/**
 * Returns the media player object.
 *
 * @return {object} The media player object.
 */
minplayer.players.base.prototype.getPlayer = function() {
  return this.player;
};

/**
 * Loads a new media player.
 *
 * @param {object} file A {@link minplayer.file} object.
 * @param {function} callback Called when it is done performing this operation.
 */
minplayer.players.base.prototype.load = function(file, callback) {

  // Store the media file for future lookup.
  var isString = (typeof this.mediaFile === 'string');
  var path = isString ? this.mediaFile : this.mediaFile.path;
  if (file && (file.path !== path)) {

    // If the player is not ready, then setup.
    if (!this.isReady()) {
      this.setupPlayer();
    }

    // Reset the media and set the media file.
    this.reset();
    this.mediaFile = file;
    if (callback) {
      callback.call(this);
    }
  }
};

/**
 * Play the loaded media file.
 *
 * @param {function} callback Called when it is done performing this operation.
 */
minplayer.players.base.prototype.play = function(callback) {
  this.options.autoload = true;
  this.options.autoplay = true;
  this.whenReady(callback);
};

/**
 * Pause the loaded media file.
 *
 * @param {function} callback Called when it is done performing this operation.
 */
minplayer.players.base.prototype.pause = function(callback) {
  this.whenReady(callback);
};

/**
 * Stop the loaded media file.
 *
 * @param {function} callback Called when it is done performing this operation.
 */
minplayer.players.base.prototype.stop = function(callback) {
  this.playing = false;
  this.loading = false;
  this.hasFocus = false;
  this.whenReady(callback);
};

/**
 * Seeks to relative position.
 *
 * @param {number} pos Relative position.  -1 to 1 (percent), > 1 (seconds).
 */
minplayer.players.base.prototype.seekRelative = function(pos) {

  // Get the current time asyncrhonously.
  this.getCurrentTime((function(player) {
    return function(currentTime) {

      // Get the duration asynchronously.
      player.getDuration(function(duration) {

        // Only do this if we have a duration.
        if (duration) {

          // Get the position.
          var seekPos = 0;
          if ((pos > -1) && (pos < 1)) {
            seekPos = ((currentTime / duration) + parseFloat(pos)) * duration;
          }
          else {
            seekPos = (currentTime + parseFloat(pos));
          }

          // Set the seek value.
          player.seek(seekPos);
        }
      });
    };
  })(this));
};

/**
 * Seek the loaded media.
 *
 * @param {number} pos The position to seek the minplayer. 0 to 1.
 * @param {function} callback Called when it is done performing this operation.
 */
minplayer.players.base.prototype.seek = function(pos, callback) {
  this.whenReady(callback);
};

/**
 * Gets a value from the player.
 *
 * @param {string} getter The getter method on the player.
 * @param {function} callback The callback function.
 */
minplayer.players.base.prototype.getValue = function(getter, callback) {
  if (this.isReady()) {
    var value = this.player[getter]();
    if ((value !== undefined) && (value !== null)) {
      callback(value);
    }
  }
};

/**
 * Set the volume of the loaded minplayer.
 *
 * @param {number} vol -1 to 1 - The relative amount to increase or decrease.
 */
minplayer.players.base.prototype.setVolumeRelative = function(vol) {

  // Get the volume
  this.getVolume((function(player) {
    return function(newVol) {
      newVol += parseFloat(vol);
      newVol = (newVol < 0) ? 0 : newVol;
      newVol = (newVol > 1) ? 1 : newVol;
      player.setVolume(newVol);
    };
  })(this));
};

/**
 * Set the volume of the loaded minplayer.
 *
 * @param {number} vol The volume to set the media. 0 to 1.
 * @param {function} callback Called when it is done performing this operation.
 */
minplayer.players.base.prototype.setVolume = function(vol, callback) {
  this.trigger('volumeupdate', vol);
  this.whenReady(callback);
};

/**
 * Get the volume from the loaded media.
 *
 * @param {function} callback Called when the volume is determined.
 * @return {number} The volume of the media; 0 to 1.
 */
minplayer.players.base.prototype.getVolume = function(callback) {
  return this.volume.get(callback);
};

/**
 * Get the current time for the media being played.
 *
 * @param {function} callback Called when the time is determined.
 * @return {number} The volume of the media; 0 to 1.
 */
minplayer.players.base.prototype.getCurrentTime = function(callback) {
  return this.currentTime.get(callback);
};

/**
 * Return the duration of the loaded media.
 *
 * @param {function} callback Called when the duration is determined.
 * @return {number} The duration of the loaded media.
 */
minplayer.players.base.prototype.getDuration = function(callback) {
  if (this.options.duration) {
    callback(this.options.duration);
  }
  else {
    return this.duration.get(callback);
  }
};

/**
 * Return the start bytes for the loaded media.
 *
 * @param {function} callback Called when the start bytes is determined.
 * @return {int} The bytes that were started.
 */
minplayer.players.base.prototype.getBytesStart = function(callback) {
  return this.bytesStart.get(callback);
};

/**
 * Return the bytes of media loaded.
 *
 * @param {function} callback Called when the bytes loaded is determined.
 * @return {int} The amount of bytes loaded.
 */
minplayer.players.base.prototype.getBytesLoaded = function(callback) {
  return this.bytesLoaded.get(callback);
};

/**
 * Return the total amount of bytes.
 *
 * @param {function} callback Called when the bytes total is determined.
 * @return {int} The total amount of bytes for this media.
 */
minplayer.players.base.prototype.getBytesTotal = function(callback) {
  return this.bytesTotal.get(callback);
};
;
/** The minplayer namespace. */
var minplayer = minplayer || {};

/** All the media player implementations */
minplayer.players = minplayer.players || {};

/**
 * @constructor
 * @extends minplayer.display
 * @class The HTML5 media player implementation.
 *
 * @param {object} context The jQuery context.
 * @param {object} options This components options.
 * @param {object} queue The event queue to pass events around.
 */
minplayer.players.html5 = function(context, options, queue) {

  // Derive players base.
  minplayer.players.base.call(this, context, options, queue);
};

/** Derive from minplayer.players.base. */
minplayer.players.html5.prototype = new minplayer.players.base();

/** Reset the constructor. */
minplayer.players.html5.prototype.constructor = minplayer.players.html5;

/**
 * @see minplayer.players.base#getPriority
 * @param {object} file A {@link minplayer.file} object.
 * @return {number} The priority of this media player.
 */
minplayer.players.html5.getPriority = function(file) {
  return 10;
};

/**
 * @see minplayer.players.base#canPlay
 *
 * @param {object} file A {@link minplayer.file} object.
 * @return {boolean} If this player can play this media type.
 */
minplayer.players.html5.canPlay = function(file) {
  switch (file.mimetype) {
    case 'video/ogg':
      return !!minplayer.playTypes.videoOGG;
    case 'video/mp4':
    case 'video/x-mp4':
    case 'video/m4v':
    case 'video/x-m4v':
      return !!minplayer.playTypes.videoH264;
    case 'application/vnd.apple.mpegurl':
      return !!minplayer.playTypes.videoMPEGURL;
    case 'video/x-webm':
    case 'video/webm':
    case 'application/octet-stream':
      return !!minplayer.playTypes.videoWEBM;
    case 'audio/ogg':
      return !!minplayer.playTypes.audioOGG;
    case 'audio/mpeg':
      return !!minplayer.playTypes.audioMP3;
    case 'audio/mp4':
      return !!minplayer.playTypes.audioMP4;
    default:
      return false;
  }
};

/**
 * @see minplayer.plugin.construct
 */
minplayer.players.html5.prototype.construct = function() {

  // Call base constructor.
  minplayer.players.base.prototype.construct.call(this);

  // Set the plugin name within the options.
  this.options.pluginName = 'html5';

  // Add the player events.
  this.addPlayerEvents();
};

/**
 * Adds a new player event.
 *
 * @param {string} type The type of event being fired.
 * @param {function} callback Called when the event is fired.
 */
minplayer.players.html5.prototype.addPlayerEvent = function(type, callback) {
  if (this.player) {

    // Add an event listener for this event type.
    this.player.addEventListener(type, (function(player) {

      // Get the function name.
      var func = type + 'Event';

      // If the callback already exists, then remove it from the player.
      if (player[func]) {
        player.player.removeEventListener(type, player[func], false);
      }

      // Create a new callback.
      player[func] = function(event) {
        callback.call(player, event);
      };

      // Return the callback.
      return player[func];

    })(this), false);
  }
};

/**
 * Add events.
 * @return {boolean} If this action was performed.
 */
minplayer.players.html5.prototype.addPlayerEvents = function() {

  // Check if the player exists.
  if (this.player) {

    this.addPlayerEvent('abort', function() {
      this.trigger('abort');
    });
    this.addPlayerEvent('loadstart', function() {
      this.onReady();
      if (!this.options.autoload) {
        this.onLoaded();
      }
    });
    this.addPlayerEvent('loadeddata', function() {
      this.onLoaded();
    });
    this.addPlayerEvent('loadedmetadata', function() {
      this.onLoaded();
    });
    this.addPlayerEvent('canplaythrough', function() {
      this.onLoaded();
    });
    this.addPlayerEvent('ended', function() {
      this.onComplete();
    });
    this.addPlayerEvent('pause', function() {
      this.onPaused();
    });
    this.addPlayerEvent('play', function() {
      this.onPlaying();
    });
    this.addPlayerEvent('playing', function() {
      this.onPlaying();
    });

    var errorSent = false;
    this.addPlayerEvent('error', function() {
      if (!errorSent && this.player) {
        errorSent = true;
        this.trigger('error', 'An error occured - ' + this.player.error.code);
      }
    });

    this.addPlayerEvent('waiting', function() {
      this.onWaiting();
    });
    this.addPlayerEvent('durationchange', function() {
      if (this.player) {
        this.duration.set(this.player.duration);
        this.trigger('durationchange', {duration: this.player.duration});
      }
    });
    this.addPlayerEvent('progress', function(event) {
      this.bytesTotal.set(event.total);
      this.bytesLoaded.set(event.loaded);
    });
    return true;
  }

  return false;
};

/**
 * @see minplayer.players.base#onReady
 */
minplayer.players.html5.prototype.onReady = function() {
  minplayer.players.base.prototype.onReady.call(this);

  // Android just say we are loaded here.
  if (minplayer.isAndroid) {
    this.onLoaded();
  }

  // iOS devices are strange in that they don't autoload.
  if (minplayer.isIDevice) {
    setTimeout((function(player) {
      return function() {
        player.pause();
        player.onLoaded();
      };
    })(this), 1);
  }
};

/**
 * @see minplayer.players.base#playerFound
 * @return {boolean} TRUE - if the player is in the DOM, FALSE otherwise.
 */
minplayer.players.html5.prototype.playerFound = function() {
  return (this.display.find(this.mediaFile.type).length > 0);
};

/**
 * @see minplayer.players.base#create
 * @return {object} The media player entity.
 */
minplayer.players.html5.prototype.createPlayer = function() {
  minplayer.players.base.prototype.createPlayer.call(this);
  var element = jQuery(document.createElement(this.mediaFile.type))
  .attr(this.options.attributes)
  .append(
    jQuery(document.createElement('source')).attr({
      'src': this.mediaFile.path
    })
  );

  // Fix the fluid width and height.
  element.eq(0)[0].setAttribute('width', '100%');
  element.eq(0)[0].setAttribute('height', '100%');
  var option = this.options.autoload ? 'metadata' : 'none';
  option = minplayer.isIDevice ? 'metadata' : option;
  element.eq(0)[0].setAttribute('preload', option);

  // Make sure that we trigger onReady if autoload is false.
  if (!this.options.autoload) {
    element.eq(0)[0].setAttribute('autobuffer', false);
  }

  return element;
};

/**
 * @see minplayer.players.base#getPlayer
 * @return {object} The media player object.
 */
minplayer.players.html5.prototype.getPlayer = function() {
  return this.elements.media.eq(0)[0];
};

/**
 * @see minplayer.players.base#load
 *
 * @param {object} file A {@link minplayer.file} object.
 */
minplayer.players.html5.prototype.load = function(file, callback) {

  // See if a load is even necessary.
  minplayer.players.base.prototype.load.call(this, file, function() {

    // Get the current source.
    var src = this.elements.media.attr('src');
    if (!src) {
      src = jQuery('source', this.elements.media).eq(0).attr('src');
    }

    // Only swap out if the new file is different from the source.
    if (src !== file.path) {

      // Add a new player.
      this.addPlayer();

      // Set the new player.
      this.player = this.getPlayer();

      // Add the events again.
      this.addPlayerEvents();

      // Change the source...
      var code = '<source src="' + file.path + '"></source>';
      this.elements.media.removeAttr('src').empty().html(code);
      if (callback) {
        callback.call(this);
      }
    }
  });
};

/**
 * @see minplayer.players.base#play
 */
minplayer.players.html5.prototype.play = function(callback) {
  minplayer.players.base.prototype.play.call(this, function() {
    this.player.play();
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#pause
 */
minplayer.players.html5.prototype.pause = function(callback) {
  minplayer.players.base.prototype.pause.call(this, function() {
    this.player.pause();
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#stop
 */
minplayer.players.html5.prototype.stop = function(callback) {
  minplayer.players.base.prototype.stop.call(this, function() {
    this.player.pause();
    this.player.src = '';
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#seek
 */
minplayer.players.html5.prototype.seek = function(pos, callback) {
  minplayer.players.base.prototype.seek.call(this, pos, function() {
    this.player.currentTime = pos;
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#setVolume
 */
minplayer.players.html5.prototype.setVolume = function(vol, callback) {
  minplayer.players.base.prototype.setVolume.call(this, vol, function() {
    this.player.volume = vol;
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#getVolume
 */
minplayer.players.html5.prototype.getVolume = function(callback) {
  this.whenReady(function() {
    callback(this.player.volume);
  });
};

/**
 * @see minplayer.players.base#getDuration
 */
minplayer.players.html5.prototype.getDuration = function(callback) {
  this.whenReady(function() {
    if (this.options.duration) {
      callback(this.options.duration);
    }
    else {
      this.duration.get(callback);
      if (this.player.duration) {
        this.duration.set(this.player.duration);
      }
    }
  });
};

/**
 * @see minplayer.players.base#getCurrentTime
 */
minplayer.players.html5.prototype.getCurrentTime = function(callback) {
  this.whenReady(function() {
    callback(this.player.currentTime);
  });
};

/**
 * @see minplayer.players.base#getBytesLoaded
 */
minplayer.players.html5.prototype.getBytesLoaded = function(callback) {
  this.whenReady(function() {
    var loaded = 0;

    // Check several different possibilities.
    if (this.bytesLoaded.value) {
      loaded = this.bytesLoaded.value;
    }
    else if (this.player.buffered &&
        this.player.buffered.length > 0 &&
        this.player.buffered.end &&
        this.player.duration) {
      loaded = this.player.buffered.end(0);
    }
    else if (this.player.bytesTotal !== undefined &&
             this.player.bytesTotal > 0 &&
             this.player.bufferedBytes !== undefined) {
      loaded = this.player.bufferedBytes;
    }

    // Return the loaded amount.
    callback(loaded);
  });
};

/**
 * @see minplayer.players.base#getBytesTotal
 */
minplayer.players.html5.prototype.getBytesTotal = function(callback) {
  this.whenReady(function() {
    var total = 0;

    // Check several different possibilities.
    if (this.bytesTotal.value) {
      total = this.bytesTotal.value;
    }
    else if (this.player.buffered &&
        this.player.buffered.length > 0 &&
        this.player.buffered.end &&
        this.player.duration) {
      total = this.player.duration;
    }
    else if (this.player.bytesTotal !== undefined &&
             this.player.bytesTotal > 0 &&
             this.player.bufferedBytes !== undefined) {
      total = this.player.bytesTotal;
    }

    // Return the loaded amount.
    callback(total);
  });
};
;
/** The minplayer namespace. */
var minplayer = minplayer || {};

/** All the media player implementations */
minplayer.players = minplayer.players || {};

/**
 * @constructor
 * @extends minplayer.display
 * @class The Flash media player class to control the flash fallback.
 *
 * @param {object} context The jQuery context.
 * @param {object} options This components options.
 * @param {object} queue The event queue to pass events around.
 */
minplayer.players.flash = function(context, options, queue) {

  // Derive from players base.
  minplayer.players.base.call(this, context, options, queue);
};

/** Derive from minplayer.players.base. */
minplayer.players.flash.prototype = new minplayer.players.base();

/** Reset the constructor. */
minplayer.players.flash.prototype.constructor = minplayer.players.flash;

/**
 * @see minplayer.plugin.construct
 * @this minplayer.players.flash
 */
minplayer.players.flash.prototype.construct = function() {

  // Call the players.base constructor.
  minplayer.players.base.prototype.construct.call(this);

  // Set the plugin name within the options.
  this.options.pluginName = 'flash';
};

/**
 * @see minplayer.players.base#getPriority
 *
 * @param {object} file A {@link minplayer.file} object.
 * @return {number} The priority of this media player.
 */
minplayer.players.flash.getPriority = function(file) {
  return 0;
};

/**
 * @see minplayer.players.base#canPlay
 *
 * @param {object} file A {@link minplayer.file} object.
 * @return {boolean} If this player can play this media type.
 */
minplayer.players.flash.canPlay = function(file) {
  return false;
};

/**
 * API to return the Flash player code provided params.
 *
 * @param {object} params The params used to populate the Flash code.
 * @return {object} A Flash DOM element.
 */
minplayer.players.flash.prototype.getFlash = function(params) {
  // Insert the swfobject javascript.
  var tag = document.createElement('script');
  tag.src = '//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Create the swfobject.
  setTimeout((function(player) {
    return function tryAgain() {
      if (typeof swfobject !== 'undefined') {
        swfobject.embedSWF(
          params.swf,
          params.id,
          params.width,
          params.height,
          '9.0.0',
          false,
          params.flashvars,
          {
            allowscriptaccess: 'always',
            allowfullscreen: 'true',
            wmode: params.wmode,
            quality: 'high'
          },
          {
            id: params.id,
            name: params.id,
            playerType: 'flash'
          },
          function(e) {
            player.player = e.ref;
          }
        );
      }
      else {

        // Try again after 200 ms.
        setTimeout(tryAgain, 200);
      }
    };
  })(this), 200);

  // Return the div tag...
  return '<div id="' + params.id + '"></div>';
};

/**
 * @see minplayer.players.base#playerFound
 * @return {boolean} TRUE - if the player is in the DOM, FALSE otherwise.
 */
minplayer.players.flash.prototype.playerFound = function() {
  return (this.display.find('object[playerType="flash"]').length > 0);
};
;
/** The minplayer namespace. */
var minplayer = minplayer || {};

/** All the media player implementations */
minplayer.players = minplayer.players || {};

/**
 * @constructor
 * @extends minplayer.display
 * @class The Flash media player class to control the flash fallback.
 *
 * @param {object} context The jQuery context.
 * @param {object} options This components options.
 * @param {object} queue The event queue to pass events around.
 */
minplayer.players.minplayer = function(context, options, queue) {

  // Derive from players flash.
  minplayer.players.flash.call(this, context, options, queue);
};

/** Derive from minplayer.players.flash. */
minplayer.players.minplayer.prototype = new minplayer.players.flash();

/** Reset the constructor. */
minplayer.players.minplayer.prototype.constructor = minplayer.players.minplayer;

/**
 * @see minplayer.plugin.construct
 * @this minplayer.players.minplayer
 */
minplayer.players.minplayer.prototype.construct = function() {

  // Call the players.flash constructor.
  minplayer.players.flash.prototype.construct.call(this);

  // Set the plugin name within the options.
  this.options.pluginName = 'minplayer';
};

/**
 * Called when the Flash player is ready.
 *
 * @param {string} id The media player ID.
 */
window.onFlashPlayerReady = function(id) {
  var media = minplayer.get(id, 'media');
  var i = media.length;
  while (i--) {
    media[i].onReady();
  }
};

/**
 * Called when the Flash player updates.
 *
 * @param {string} id The media player ID.
 * @param {string} eventType The event type that was triggered.
 */
window.onFlashPlayerUpdate = function(id, eventType) {
  var media = minplayer.get(id, 'media');
  var i = media.length;
  while (i--) {
    media[i].onMediaUpdate(eventType);
  }
};

/**
 * Used to debug from the Flash player to the browser console.
 *
 * @param {string} debug The debug string.
 */
window.onFlashPlayerDebug = function(debug) {
  if (console && console.log) {
    console.log(debug);
  }
};

/**
 * @see minplayer.players.base#getPriority
 * @param {object} file A {@link minplayer.file} object.
 * @return {number} The priority of this media player.
 */
minplayer.players.minplayer.getPriority = function(file) {
  // Force this player if the stream is set.
  return file.stream ? 100 : 1;
};

/**
 * @see minplayer.players.base#canPlay
 *
 * @param {object} file A {@link minplayer.file} object.
 * @return {boolean} If this player can play this media type.
 */
minplayer.players.minplayer.canPlay = function(file) {

  // If this has a stream, then the minplayer must play it.
  if (file.stream) {
    return true;
  }

  var isWEBM = jQuery.inArray(file.mimetype, [
    'video/x-webm',
    'video/webm',
    'application/octet-stream'
  ]) >= 0;
  return !isWEBM && (file.type === 'video' || file.type === 'audio');
};

/**
 * @see minplayer.players.base#create
 * @return {object} The media player entity.
 */
minplayer.players.minplayer.prototype.createPlayer = function() {

  // Make sure we provide default swfplayer...
  if (!this.options.swfplayer) {
    this.options.swfplayer = 'http://mediafront.org/assets/osmplayer/minplayer';
    this.options.swfplayer += '/flash/minplayer.swf';
  }

  minplayer.players.flash.prototype.createPlayer.call(this);

  // The flash variables for this flash player.
  var flashVars = {
    'id': this.options.id,
    'debug': this.options.debug,
    'config': 'nocontrols',
    'file': this.mediaFile.path,
    'autostart': this.options.autoplay,
    'autoload': this.options.autoload
  };

  // Add a stream if one is provided.
  if (this.mediaFile.stream) {
    flashVars.stream = this.mediaFile.stream;
  }

  // Return a flash media player object.
  return this.getFlash({
    swf: this.options.swfplayer,
    id: this.options.id + '_player',
    width: '100%',
    height: '100%',
    flashvars: flashVars,
    wmode: this.options.wmode
  });
};

/**
 * Called when the Flash player has an update.
 *
 * @param {string} eventType The event that was triggered in the player.
 */
minplayer.players.minplayer.prototype.onMediaUpdate = function(eventType) {
  switch (eventType) {
    case 'mediaMeta':
      this.onLoaded();
      break;
    case 'mediaConnected':
      this.onLoaded();
      this.onPaused();
      break;
    case 'mediaPlaying':
      this.onPlaying();
      break;
    case 'mediaPaused':
      this.onPaused();
      break;
    case 'mediaComplete':
      this.onComplete();
      break;
  }
};

/**
 * @see minplayer.players.base#load
 */
minplayer.players.minplayer.prototype.load = function(file, callback) {
  minplayer.players.flash.prototype.load.call(this, file, function() {
    this.player.loadMedia(file.path, file.stream);
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#play
 */
minplayer.players.minplayer.prototype.play = function(callback) {
  minplayer.players.flash.prototype.play.call(this, function() {
    this.player.playMedia();
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#pause
 */
minplayer.players.minplayer.prototype.pause = function(callback) {
  minplayer.players.flash.prototype.pause.call(this, function() {
    this.player.pauseMedia();
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#stop
 */
minplayer.players.minplayer.prototype.stop = function(callback) {
  minplayer.players.flash.prototype.stop.call(this, function() {
    this.player.stopMedia();
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#seek
 */
minplayer.players.minplayer.prototype.seek = function(pos, callback) {
  minplayer.players.flash.prototype.seek.call(this, pos, function() {
    this.player.seekMedia(pos);
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#setVolume
 */
minplayer.players.minplayer.prototype.setVolume = function(vol, callback) {
  minplayer.players.flash.prototype.setVolume.call(this, vol, function() {
    this.player.setVolume(vol);
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#getVolume
 */
minplayer.players.minplayer.prototype.getVolume = function(callback) {
  this.whenReady(function() {
    callback(this.player.getVolume());
  });
};

/**
 * @see minplayer.players.flash#getDuration
 */
minplayer.players.minplayer.prototype.getDuration = function(callback) {
  this.whenReady(function() {
    if (this.options.duration) {
      callback(this.options.duration);
    }
    else {
      // Check to see if it is immediately available.
      var duration = this.player.getDuration();
      if (duration) {
        callback(duration);
      }
      else {

        // If not, then poll every second for the duration.
        this.poll('duration', (function(player) {
          return function() {
            duration = player.player.getDuration();
            if (duration) {
              callback(duration);
            }
            return !duration;
          };
        })(this), 1000);
      }
    }
  });
};

/**
 * @see minplayer.players.base#getCurrentTime
 */
minplayer.players.minplayer.prototype.getCurrentTime = function(callback) {
  this.whenReady(function() {
    callback(this.player.getCurrentTime());
  });
};

/**
 * @see minplayer.players.base#getBytesLoaded
 */
minplayer.players.minplayer.prototype.getBytesLoaded = function(callback) {
  this.whenReady(function() {
    callback(this.player.getMediaBytesLoaded());
  });
};

/**
 * @see minplayer.players.base#getBytesTotal.
 */
minplayer.players.minplayer.prototype.getBytesTotal = function(callback) {
  this.whenReady(function() {
    callback(this.player.getMediaBytesTotal());
  });
};
;
/** The minplayer namespace. */
var minplayer = minplayer || {};

/** All the media player implementations */
minplayer.players = minplayer.players || {};

/**
 * @constructor
 * @extends minplayer.players.base
 * @class The YouTube media player.
 *
 * @param {object} context The jQuery context.
 * @param {object} options This components options.
 * @param {object} queue The event queue to pass events around.
 */
minplayer.players.youtube = function(context, options, queue) {

  /** The quality of the YouTube stream. */
  this.quality = 'default';

  // Derive from players base.
  minplayer.players.base.call(this, context, options, queue);
};

/** Derive from minplayer.players.base. */
minplayer.players.youtube.prototype = new minplayer.players.base();

/** Reset the constructor. */
minplayer.players.youtube.prototype.constructor = minplayer.players.youtube;

/**
 * @see minplayer.plugin.construct
 * @this minplayer.players.youtube
 */
minplayer.players.youtube.prototype.construct = function() {

  // Call the players.flash constructor.
  minplayer.players.base.prototype.construct.call(this);

  // Set the plugin name within the options.
  this.options.pluginName = 'youtube';
};

/**
 * @see minplayer.players.base#getPriority
 *
 * @param {object} file A {@link minplayer.file} object.
 * @return {number} The priority of this media player.
 */
minplayer.players.youtube.getPriority = function(file) {
  return 10;
};

/**
 * @see minplayer.players.base#canPlay
 *
 * @param {object} file A {@link minplayer.file} object.
 * @return {boolean} If this player can play this media type.
 */
minplayer.players.youtube.canPlay = function(file) {

  // Check for the mimetype for youtube.
  if (file.mimetype === 'video/youtube') {
    return true;
  }

  // If the path is a YouTube path, then return true.
  var regex = /^http(s)?\:\/\/(www\.)?(youtube\.com|youtu\.be)/i;
  return (file.path.search(regex) === 0);
};

/**
 * Return the ID for a provided media file.
 *
 * @param {object} file A {@link minplayer.file} object.
 * @return {string} The ID for the provided media.
 */
minplayer.players.youtube.getMediaId = function(file) {
  var regex = '^http[s]?\\:\\/\\/(www\\.)?';
  regex += '(youtube\\.com\\/watch\\?v=|youtu\\.be\\/)';
  regex += '([a-zA-Z0-9_\\-]+)';
  var reg = RegExp(regex, 'i');

  // Locate the media id.
  if (file.path.search(reg) === 0) {
    return file.path.match(reg)[3];
  }
  else {
    return file.path;
  }
};

/**
 * Returns a preview image for this media player.
 *
 * @param {object} file A {@link minplayer.file} object.
 * @param {string} type The type of image.
 * @param {function} callback Called when the image is retrieved.
 */
minplayer.players.youtube.getImage = function(file, type, callback) {
  type = (type === 'thumbnail') ? '1' : '0';
  callback('https://img.youtube.com/vi/' + file.id + '/' + type + '.jpg');
};

/**
 * Parse a single playlist node.
 *
 * @param {object} item The youtube item.
 * @return {object} The mediafront node.
 */
minplayer.players.youtube.parseNode = function(item) {
  var node = (typeof item.video !== 'undefined') ? item.video : item;
  return {
    title: node.title,
    description: node.description,
    mediafiles: {
      image: {
        'thumbnail': {
          path: node.thumbnail.sqDefault
        },
        'image': {
          path: node.thumbnail.hqDefault
        }
      },
      media: {
        'media': {
          player: 'youtube',
          id: node.id
        }
      }
    }
  };
};

/**
 * Returns information about this youtube video.
 *
 * @param {object} file The file to load.
 * @param {function} callback Called when the node is loaded.
 */
minplayer.players.youtube.getNode = function(file, callback) {
  var url = 'https://gdata.youtube.com/feeds/api/videos/' + file.id;
  url += '?v=2&alt=jsonc';
  jQuery.get(url, function(data) {
    callback(minplayer.players.youtube.parseNode(data.data));
  });
};

/**
 * Translates the player state for the YouTube API player.
 *
 * @param {number} playerState The YouTube player state.
 */
minplayer.players.youtube.prototype.setPlayerState = function(playerState) {
  switch (playerState) {
    case YT.PlayerState.CUED:
      break;
    case YT.PlayerState.BUFFERING:
      this.onWaiting();
      break;
    case YT.PlayerState.PAUSED:
      this.onPaused();
      break;
    case YT.PlayerState.PLAYING:
      this.onPlaying();
      break;
    case YT.PlayerState.ENDED:
      this.onComplete();
      break;
    default:
      break;
  }
};

/**
 * Called when an error occurs.
 *
 * @param {string} event The onReady event that was triggered.
 */
minplayer.players.youtube.prototype.onReady = function(event) {
  minplayer.players.base.prototype.onReady.call(this);
  if (!this.options.autoplay) {
    this.pause();
  }
  this.onLoaded();
};

/**
 * Checks to see if this player can be found.
 * @return {bool} TRUE - Player is found, FALSE - otherwise.
 */
minplayer.players.youtube.prototype.playerFound = function() {
  var id = 'iframe#' + this.options.id + '-player.youtube-player';
  var iframe = this.display.find(id);
  return (iframe.length > 0);
};

/**
 * Called when the player state changes.
 *
 * @param {object} event A JavaScript Event.
 */
minplayer.players.youtube.prototype.onPlayerStateChange = function(event) {
  this.setPlayerState(event.data);
};

/**
 * Called when the player quality changes.
 *
 * @param {string} newQuality The new quality for the change.
 */
minplayer.players.youtube.prototype.onQualityChange = function(newQuality) {
  this.quality = newQuality.data;
};

/**
 * Determines if the player should show the playloader.
 *
 * @param {string} preview The preview image.
 * @return {bool} If this player implements its own playLoader.
 */
minplayer.players.youtube.prototype.hasPlayLoader = function(preview) {
  return minplayer.hasTouch || !preview;
};

/**
 * Determines if the player should show the controller.
 *
 * @return {bool} If this player implements its own playLoader.
 */
minplayer.players.youtube.prototype.hasController = function() {
  return minplayer.isIDevice;
};

/**
 * @see minplayer.players.base#create
 * @return {object} The media player entity.
 */
minplayer.players.youtube.prototype.createPlayer = function() {
  minplayer.players.base.prototype.createPlayer.call(this);

  // Insert the YouTube iframe API player.
  var youtube_script = 'https://www.youtube.com/player_api';
  if (jQuery('script[src="' + youtube_script + '"]').length === 0) {
    var tag = document.createElement('script');
    tag.src = youtube_script;
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  // Get the player ID.
  this.playerId = this.options.id + '-player';

  // Poll until the YouTube API is ready.
  this.poll(this.options.id + '_youtube', (function(player) {
    return function() {
      var ready = jQuery('#' + player.playerId).length > 0;
      ready = ready && ('YT' in window);
      ready = ready && (typeof YT.Player === 'function');
      if (ready) {
        // Determine the origin of this script.
        jQuery('#' + player.playerId).addClass('youtube-player');
        var origin = location.protocol;
        origin += '//' + location.hostname;
        origin += (location.port && ':' + location.port);

        var playerVars = {};
        if (minplayer.isIDevice) {
          playerVars.origin = origin;
        }
        else {
          playerVars = {
            enablejsapi: minplayer.isIDevice ? 0 : 1,
            origin: origin,
            wmode: 'opaque',
            controls: minplayer.isAndroid ? 1 : 0,
            rel: 0,
            showinfo: 0
          };
        }

        // Create the player.
        player.player = new YT.Player(player.playerId, {
          height: '100%',
          width: '100%',
          frameborder: 0,
          videoId: player.mediaFile.id,
          playerVars: playerVars,
          events: {
            'onReady': function(event) {
              player.onReady(event);
            },
            'onStateChange': function(event) {
              player.onPlayerStateChange(event);
            },
            'onPlaybackQualityChange': function(newQuality) {
              player.onQualityChange(newQuality);
            },
            'onError': function(errorCode) {
              player.onError(errorCode);
            }
          }
        });
      }
      return !ready;
    };
  })(this), 200);

  // Return the player.
  return jQuery(document.createElement('div')).attr({
    id: this.playerId
  });
};

/**
 * @see minplayer.players.base#load
 */
minplayer.players.youtube.prototype.load = function(file, callback) {
  minplayer.players.base.prototype.load.call(this, file, function() {
    this.player.loadVideoById(file.id, 0, this.quality);
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#play
 */
minplayer.players.youtube.prototype.play = function(callback) {
  minplayer.players.base.prototype.play.call(this, function() {
    this.onWaiting();
    this.player.playVideo();
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#pause
 */
minplayer.players.youtube.prototype.pause = function(callback) {
  minplayer.players.base.prototype.pause.call(this, function() {
    this.player.pauseVideo();
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#stop
 */
minplayer.players.youtube.prototype.stop = function(callback) {
  minplayer.players.base.prototype.stop.call(this, function() {
    this.player.stopVideo();
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#seek
 */
minplayer.players.youtube.prototype.seek = function(pos, callback) {
  minplayer.players.base.prototype.seek.call(this, pos, function() {
    this.onWaiting();
    this.player.seekTo(pos, true);
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#setVolume
 */
minplayer.players.youtube.prototype.setVolume = function(vol, callback) {
  minplayer.players.base.prototype.setVolume.call(this, vol, function() {
    this.player.setVolume(vol * 100);
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#getVolume
 */
minplayer.players.youtube.prototype.getVolume = function(callback) {
  this.getValue('getVolume', callback);
};

/**
 * @see minplayer.players.base#getDuration.
 */
minplayer.players.youtube.prototype.getDuration = function(callback) {
  if (this.options.duration) {
    callback(this.options.duration);
  }
  else {
    this.getValue('getDuration', callback);
  }
};

/**
 * @see minplayer.players.base#getCurrentTime
 */
minplayer.players.youtube.prototype.getCurrentTime = function(callback) {
  this.getValue('getCurrentTime', callback);
};

/**
 * @see minplayer.players.base#getBytesStart.
 */
minplayer.players.youtube.prototype.getBytesStart = function(callback) {
  this.getValue('getVideoStartBytes', callback);
};

/**
 * @see minplayer.players.base#getBytesLoaded.
 */
minplayer.players.youtube.prototype.getBytesLoaded = function(callback) {
  this.getValue('getVideoBytesLoaded', callback);
};

/**
 * @see minplayer.players.base#getBytesTotal.
 */
minplayer.players.youtube.prototype.getBytesTotal = function(callback) {
  this.getValue('getVideoBytesTotal', callback);
};
;
/** The minplayer namespace. */
var minplayer = minplayer || {};

/** All the media player implementations */
minplayer.players = minplayer.players || {};

/**
 * @constructor
 * @extends minplayer.players.base
 * @class The vimeo media player.
 *
 * @param {object} context The jQuery context.
 * @param {object} options This components options.
 * @param {object} queue The event queue to pass events around.
 */
minplayer.players.vimeo = function(context, options, queue) {

  // Derive from players base.
  minplayer.players.base.call(this, context, options, queue);
};

/** Derive from minplayer.players.base. */
minplayer.players.vimeo.prototype = new minplayer.players.base();

/** Reset the constructor. */
minplayer.players.vimeo.prototype.constructor = minplayer.players.vimeo;

/**
 * @see minplayer.plugin.construct
 * @this minplayer.players.vimeo
 */
minplayer.players.vimeo.prototype.construct = function() {

  // Call the players.flash constructor.
  minplayer.players.base.prototype.construct.call(this);

  // Set the plugin name within the options.
  this.options.pluginName = 'vimeo';
};

/**
 * @see minplayer.players.base#getPriority
 * @param {object} file A {@link minplayer.file} object.
 * @return {number} The priority of this media player.
 */
minplayer.players.vimeo.getPriority = function(file) {
  return 10;
};

/**
 * @see minplayer.players.base#canPlay
 *
 * @param {object} file A {@link minplayer.file} object.
 * @return {boolean} If this player can play this media type.
 */
minplayer.players.vimeo.canPlay = function(file) {

  // Check for the mimetype for vimeo.
  if (file.mimetype === 'video/vimeo') {
    return true;
  }

  // If the path is a vimeo path, then return true.
  return (file.path.search(/^http(s)?\:\/\/(www\.)?vimeo\.com/i) === 0);
};

/**
 * Determines if the player should show the playloader.
 *
 * @param {string} preview The preview image.
 * @return {bool} If this player implements its own playLoader.
 */
minplayer.players.vimeo.prototype.hasPlayLoader = function(preview) {
  return minplayer.hasTouch;
};

/**
 * Determines if the player should show the playloader.
 *
 * @return {bool} If this player implements its own playLoader.
 */
minplayer.players.vimeo.prototype.hasController = function() {
  return minplayer.hasTouch;
};

/**
 * Return the ID for a provided media file.
 *
 * @param {object} file A {@link minplayer.file} object.
 * @return {string} The ID for the provided media.
 */
minplayer.players.vimeo.getMediaId = function(file) {
  var regex = /^http[s]?\:\/\/(www\.)?vimeo\.com\/(\?v\=)?([0-9]+)/i;
  if (file.path.search(regex) === 0) {
    return file.path.match(regex)[3];
  }
  else {
    return file.path;
  }
};

/**
 * Parse a single playlist node.
 *
 * @param {object} item The vimeo item.
 * @return {object} The mediafront node.
 */
minplayer.players.vimeo.parseNode = function(item) {
  return {
    title: item.title,
    description: item.description,
    mediafiles: {
      image: {
        'thumbnail': {
          path: item.thumbnail_small
        },
        'image': {
          path: item.thumbnail_large
        }
      },
      media: {
        'media': {
          player: 'vimeo',
          id: item.id
        }
      }
    }
  };
};

/** Keep track of loaded nodes from vimeo. */
minplayer.players.vimeo.nodes = {};

/**
 * Returns information about this vimeo video.
 *
 * @param {object} file The file to get the node from.
 * @param {function} callback Callback when the node is loaded.
 */
minplayer.players.vimeo.getNode = function(file, callback) {
  if (minplayer.players.vimeo.nodes.hasOwnProperty(file.id)) {
    callback(minplayer.players.vimeo.nodes[file.id]);
  }
  else {
    jQuery.ajax({
      url: 'https://vimeo.com/api/v2/video/' + file.id + '.json',
      dataType: 'jsonp',
      success: function(data) {
        var node = minplayer.players.vimeo.parseNode(data[0]);
        minplayer.players.vimeo.nodes[file.id] = node;
        callback(node);
      }
    });
  }
};

/**
 * Returns a preview image for this media player.
 *
 * @param {object} file A {@link minplayer.file} object.
 * @param {string} type The type of image.
 * @param {function} callback Called when the image is retrieved.
 */
minplayer.players.vimeo.getImage = function(file, type, callback) {
  minplayer.players.vimeo.getNode(file, function(node) {
    callback(node.mediafiles.image.image);
  });
};

/**
 * @see minplayer.players.base#reset
 */
minplayer.players.vimeo.prototype.reset = function() {

  // Reset the flash variables..
  minplayer.players.base.prototype.reset.call(this);
};

/**
 * @see minplayer.players.base#create
 * @return {object} The media player entity.
 */
minplayer.players.vimeo.prototype.createPlayer = function() {
  minplayer.players.base.prototype.createPlayer.call(this);

  // Insert the Vimeo Froogaloop player.
  var vimeo_script = 'http://a.vimeocdn.com/js/froogaloop2.min.js';
  if (jQuery('script[src="' + vimeo_script + '"]').length === 0) {
    var tag = document.createElement('script');
    tag.src = vimeo_script;
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  // Create the iframe for this player.
  var iframe = document.createElement('iframe');
  iframe.setAttribute('id', this.options.id + '-player');
  iframe.setAttribute('type', 'text/html');
  iframe.setAttribute('width', '100%');
  iframe.setAttribute('height', '100%');
  iframe.setAttribute('frameborder', '0');
  jQuery(iframe).addClass('vimeo-player');

  // Get the source.
  var src = 'https://player.vimeo.com/video/';
  src += this.mediaFile.id + '?';

  // Add the parameters to the src.
  src += jQuery.param({
    'wmode': 'opaque',
    'api': 1,
    'player_id': this.options.id + '-player',
    'title': 0,
    'byline': 0,
    'portrait': 0,
    'loop': this.options.loop
  });

  // Set the source of the iframe.
  iframe.setAttribute('src', src);

  // Now register this player when the froogaloop code is loaded.
  this.poll(this.options.id + '_vimeo', (function(player) {
    return function() {
      if (window.Froogaloop) {
        player.player = window.Froogaloop(iframe);
        var playerTimeout = 0;
        player.player.addEvent('ready', function() {
          clearTimeout(playerTimeout);
          player.onReady();
          player.onError('');
        });
        playerTimeout = setTimeout(function() {
          player.onReady();
        }, 3000);
      }
      return !window.Froogaloop;
    };
  })(this), 200);

  // Trigger that the load has started.
  this.trigger('loadstart');

  // Return the player.
  return iframe;
};

/**
 * @see minplayer.players.base#onReady
 */
minplayer.players.vimeo.prototype.onReady = function(player_id) {

  // Add the other listeners.
  this.player.addEvent('loadProgress', (function(player) {
    return function(progress) {
      player.duration.set(parseFloat(progress.duration));
      player.bytesLoaded.set(progress.bytesLoaded);
      player.bytesTotal.set(progress.bytesTotal);
    };
  })(this));

  this.player.addEvent('playProgress', (function(player) {
    return function(progress) {
      player.duration.set(parseFloat(progress.duration));
      player.currentTime.set(parseFloat(progress.seconds));
    };
  })(this));

  this.player.addEvent('play', (function(player) {
    return function() {
      player.onPlaying();
    };
  })(this));

  this.player.addEvent('pause', (function(player) {
    return function() {
      player.onPaused();
    };
  })(this));

  this.player.addEvent('finish', (function(player) {
    return function() {
      player.onComplete();
    };
  })(this));

  minplayer.players.base.prototype.onReady.call(this);
  this.onLoaded();

  // Make sure we autoplay if it is set.
  if (this.options.autoplay) {
    this.play();
  }
};

/**
 * Clears the media player.
 */
minplayer.players.vimeo.prototype.clear = function() {
  if (this.player) {
    this.player.api('unload');
  }

  minplayer.players.base.prototype.clear.call(this);
};

/**
 * @see minplayer.players.base#load
 */
minplayer.players.vimeo.prototype.load = function(file, callback) {
  minplayer.players.base.prototype.load.call(this, file, function() {
    this.construct();
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#play
 */
minplayer.players.vimeo.prototype.play = function(callback) {
  minplayer.players.base.prototype.play.call(this, function() {
    this.player.api('play');
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#pause
 */
minplayer.players.vimeo.prototype.pause = function(callback) {
  minplayer.players.base.prototype.pause.call(this, function() {
    this.player.api('pause');
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#stop
 */
minplayer.players.vimeo.prototype.stop = function(callback) {
  minplayer.players.base.prototype.stop.call(this, function() {
    this.player.api('unload');
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#seek
 */
minplayer.players.vimeo.prototype.seek = function(pos, callback) {
  minplayer.players.base.prototype.seek.call(this, pos, function() {
    this.player.api('seekTo', pos);
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#setVolume
 */
minplayer.players.vimeo.prototype.setVolume = function(vol, callback) {
  minplayer.players.base.prototype.setVolume.call(this, vol, function() {
    this.volume.set(vol);
    this.player.api('setVolume', vol);
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#getVolume
 */
minplayer.players.vimeo.prototype.getVolume = function(callback) {
  this.whenReady(function() {
    this.player.api('getVolume', function(vol) {
      callback(vol);
    });
  });
};

/**
 * @see minplayer.players.base#getDuration.
 */
minplayer.players.vimeo.prototype.getDuration = function(callback) {
  this.whenReady(function() {
    if (this.options.duration) {
      callback(this.options.duration);
    }
    else if (this.duration.value) {
      callback(this.duration.value);
    }
    else {
      this.player.api('getDuration', function(duration) {
        callback(duration);
      });
    }
  });
};
;
/*jshint maxlen:90 */

/** The minplayer namespace. */
var minplayer = minplayer || {};

/** All the media player implementations */
minplayer.players = minplayer.players || {};

/**
 * @constructor
 * @extends minplayer.players.base
 * @class The Dailymotion media player.
 *
 * @param {object} context The jQuery context.
 * @param {object} options This components options.
 * @param {object} queue The event queue to pass events around.
 */
minplayer.players.dailymotion = function(context, options, queue) {

  /** The quality of the Dailymotion stream. */
  this.quality = 'default';

  // Derive from players base.
  minplayer.players.base.call(this, context, options, queue);
};

/** Derive from minplayer.players.base. */
minplayer.players.dailymotion.prototype = new minplayer.players.base();

/** Reset the constructor. */
minplayer.players.dailymotion.prototype.constructor = minplayer.players.dailymotion;

/**
 * @see minplayer.plugin.construct
 * @this minplayer.players.dailymotion
 */
minplayer.players.dailymotion.prototype.construct = function() {

  // Call the players.flash constructor.
  minplayer.players.base.prototype.construct.call(this);

  // Set the plugin name within the options.
  this.options.pluginName = 'dailymotion';
};

/**
 * @see minplayer.players.base#getPriority
 * @param {object} file A {@link minplayer.file} object.
 * @return {number} The priority of this media player.
 */
minplayer.players.dailymotion.getPriority = function(file) {
  return 10;
};

/**
 * @see minplayer.players.base#canPlay
 *
 * @param {object} file A {@link minplayer.file} object.
 * @return {boolean} If this player can play this media type.
 */
minplayer.players.dailymotion.canPlay = function(file) {

  // Check for the mimetype for dailymotion.
  if (file.mimetype === 'video/dailymotion') {
    return true;
  }

  // If the path is a Dailymotion path, then return true.
  var regex = /^http(s)?\:\/\/(www\.)?(dailymotion\.com)/i;
  return (file.path.search(regex) === 0);
};

/**
 * Return the ID for a provided media file.
 *
 * @param {object} file A {@link minplayer.file} object.
 * @return {string} The ID for the provided media.
 */
minplayer.players.dailymotion.getMediaId = function(file) {
  var regex = '^http[s]?\\:\\/\\/(www\\.)?';
  regex += '(dailymotion\\.com\\/video/)';
  regex += '([a-z0-9\\-]+)';
  regex += '_*';
  var reg = RegExp(regex, 'i');

  // Locate the media id.
  if (file.path.search(reg) === 0) {
    return file.path.match(reg)[3];
  }
  else {
    return file.path;
  }
};

/**
 * Returns a preview image for this media player.
 *
 * @param {object} file A {@link minplayer.file} object.
 * @param {string} type The type of image.
 * @param {function} callback Called when the image is retrieved.
 */
minplayer.players.dailymotion.getImage = function(file, type, callback) {
  callback('http://www.dailymotion.com/thumbnail/video/' + file.id);
};

/**
 * Parse a single playlist node.
 *
 * @param {object} item The dailymotion item.
 * @return {object} The mediafront node.
 */
minplayer.players.dailymotion.parseNode = function(item) {
  return {
    title: node.title,
    description: node.description,
    mediafiles: {
      image: {
        'thumbnail': {
          path: node.thumbnail_small_url
        },
        'image': {
          path: node.thumbnail_url
        }
      },
      media: {
        'media': {
          player: 'dailymotion',
          id: node.id
        }
      }
    }
  };
};

/**
 * Returns information about this dailymotion video.
 *
 * @param {object} file The file to load.
 * @param {function} callback Called when the node is loaded.
 */
minplayer.players.dailymotion.getNode = function(file, callback) {

  var url = 'https://api.dailymotion.com/video/' + file.id;
  url += '?fields=title,id,description,thumbnail_small_url,thumbnail_url';
  jQuery.get(url, function(data) {
    callback(minplayer.players.dailymotion.parseNode(data.data));
  }, 'jsonp');
};

/**
 * Called when an API is loaded and ready.
 *
 * @param {string} event The onReady event that was triggered.
 */
minplayer.players.dailymotion.prototype.onReady = function(event) {
  minplayer.players.base.prototype.onReady.call(this);
  if (!this.options.autoplay) {
    this.pause();
  }
  this.onLoaded();
};

/**
 * Checks to see if this player can be found.
 * @return {bool} TRUE - Player is found, FALSE - otherwise.
 */
minplayer.players.dailymotion.prototype.playerFound = function() {
  return (this.display.find(this.mediaFile.type).length > 0);
};

/**
 * Called when the player quality changes.
 *
 * @param {string} newQuality The new quality for the change.
 */
minplayer.players.dailymotion.prototype.onQualityChange = function(newQuality) {
  this.quality = newQuality.data;
};

/**
 * Determines if the player should show the playloader.
 *
 * @param {string} preview The preview image.
 * @return {bool} If this player implements its own playLoader.
 */
minplayer.players.dailymotion.prototype.hasPlayLoader = function(preview) {
  return minplayer.hasTouch || !preview;
};

/**
 * Determines if the player should show the controller.
 *
 * @return {bool} If this player implements its own playLoader.
 */
minplayer.players.dailymotion.prototype.hasController = function() {
  return minplayer.isIDevice;
};

/**
 * @see minplayer.players.base#create
 * @return {object} The media player entity.
 */
minplayer.players.dailymotion.prototype.createPlayer = function() {
  minplayer.players.base.prototype.createPlayer.call(this);

  // Insert the Dailymotion iframe API player.
  var dailymotion_script = document.location.protocol;
  dailymotion_script += '//api.dmcdn.net/all.js';
  if (jQuery('script[src="' + dailymotion_script + '"]').length === 0) {
    var tag = document.createElement('script');
    tag.src = dailymotion_script;
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  // Get the player ID.
  this.playerId = this.options.id + '-player';

  // Poll until the Dailymotion API is ready.
  this.poll(this.options.id + '_dailymotion', (function(player) {
    return function() {
      var ready = jQuery('#' + player.playerId).length > 0;
      ready = ready && ('DM' in window);
      ready = ready && (typeof DM.player === 'function');
      if (ready) {
        // Determine the origin of this script.
        jQuery('#' + player.playerId).addClass('dailymotion-player');

        var params = {};
        params = {
          id: player.playerId,
          api: minplayer.isIDevice ? 0 : 1,
          wmode: 'opaque',
          controls: minplayer.isAndroid ? 1 : 0,
          related: 0,
          info: 0,
          logo: 0
        };


        // Create the player.
        player.player = new DM.player(player.playerId, {
          video: player.mediaFile.id,
          height: '100%',
          width: '100%',
          frameborder: 0,
          params: params
        });

        player.player.addEventListener('apiready', function() {
          player.onReady(player);
        });
        player.player.addEventListener('ended', function() {
          player.onComplete(player);
        });
        player.player.addEventListener('playing', function() {
          player.onPlaying(player);
        });
        player.player.addEventListener('progress', function() {
          player.onWaiting(player);
        });
        player.player.addEventListener('pause', function() {
          player.onPaused(player);
        });
        player.player.addEventListener('error', function() {
          player.onError(player);
        });
      }
      return !ready;
    };
  })(this), 200);

  // Return the player.
  return jQuery(document.createElement('div')).attr({
    id: this.playerId
  });
};

/**
 * @see minplayer.players.base#load
 */
minplayer.players.dailymotion.prototype.load = function(file, callback) {
  minplayer.players.base.prototype.load.call(this, file, function() {
    this.player.load(file.id);
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#play
 */
minplayer.players.dailymotion.prototype.play = function(callback) {
  minplayer.players.base.prototype.play.call(this, function() {
    this.onWaiting();
    this.player.play();
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#pause
 */
minplayer.players.dailymotion.prototype.pause = function(callback) {
  minplayer.players.base.prototype.pause.call(this, function() {
    if (this.loaded) {
      this.player.pause();
      if (callback) {
        callback.call(this);
      }
    }
  });
};

/**
 * @see minplayer.players.base#stop
 */
minplayer.players.dailymotion.prototype.stop = function(callback) {
  minplayer.players.base.prototype.stop.call(this, function() {
    this.player.pause();
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#seek
 */
minplayer.players.dailymotion.prototype.seek = function(pos, callback) {
  minplayer.players.base.prototype.seek.call(this, pos, function() {
    this.onWaiting();
    this.player.seek(pos);
    if (callback) {
      callback.call(this);
    }
  });
};

/**
 * @see minplayer.players.base#setVolume
 */
minplayer.players.dailymotion.prototype.setVolume = function(vol, callback) {
  minplayer.players.base.prototype.setVolume.call(this, vol, function() {
    if (this.loaded) {
      this.player.setVolume(vol);
      if (callback !== undefined) {
        callback.call(this);
      }
    }
  });

};

/**
 * @see minplayer.players.base#getValue
 */
minplayer.players.dailymotion.prototype.getValue = function(getter, callback) {
  if (this.isReady()) {
    var value = this.player[getter];
    if ((value !== undefined) && (value !== null) && callback) {
      callback(value);
    }
  }
};

/**
 * @see minplayer.players.base#getVolume
 */
minplayer.players.dailymotion.prototype.getVolume = function(callback) {
  this.getValue('volume', callback);
};

/**
 * @see minplayer.players.base#getDuration.
 */
minplayer.players.dailymotion.prototype.getDuration = function(callback) {
  if (this.options.duration && callback !== undefined) {
    callback(this.options.duration);
  }
  else {
    this.getValue('duration', callback);
  }
};

/**
 * @see minplayer.players.base#getCurrentTime
 */
minplayer.players.dailymotion.prototype.getCurrentTime = function(callback) {
  this.getValue('currentTime', callback);
};
;
/** The minplayer namespace. */
var minplayer = minplayer || {};

/**
 * @constructor
 * @extends minplayer.display
 * @class This is the base minplayer controller.  Other controllers can derive
 * from the base and either build on top of it or simply define the elements
 * that this base controller uses.
 *
 * @param {object} context The jQuery context.
 * @param {object} options This components options.
 */
minplayer.controller = function(context, options) {

  // Derive from display
  minplayer.display.call(this, 'controller', context, options);
};

/** Derive from minplayer.display. */
minplayer.controller.prototype = new minplayer.display();

/** Reset the constructor. */
minplayer.controller.prototype.constructor = minplayer.controller;

/**
 * A static function that will format a time value into a string time format.
 *
 * @param {integer} time An integer value of time.
 * @return {string} A string representation of the time.
 */
minplayer.formatTime = function(time) {
  time = time || 0;
  var seconds = 0, minutes = 0, hour = 0, timeString = '';

  hour = Math.floor(time / 3600);
  time -= (hour * 3600);
  minutes = Math.floor(time / 60);
  time -= (minutes * 60);
  seconds = Math.floor(time % 60);

  if (hour) {
    timeString += String(hour);
    timeString += ':';
  }

  timeString += (minutes >= 10) ? String(minutes) : ('0' + String(minutes));
  timeString += ':';
  timeString += (seconds >= 10) ? String(seconds) : ('0' + String(seconds));
  return {time: timeString, units: ''};
};

/**
 * @see minplayer.display#getElements
 * @return {object} The elements defined by this display.
 */
minplayer.controller.prototype.getElements = function() {
  var elements = minplayer.display.prototype.getElements.call(this);
  return jQuery.extend(elements, {
    play: null,
    pause: null,
    fullscreen: null,
    seek: null,
    progress: null,
    volume: null,
    timer: null
  });
};

/**
 * Get the default options for this plugin.
 *
 * @param {object} options The default options for this plugin.
 */
minplayer.controller.prototype.defaultOptions = function(options) {
  options.disptime = 0;
  minplayer.display.prototype.defaultOptions.call(this, options);
};

/**
 * @see minplayer.plugin#construct
 */
minplayer.controller.prototype.construct = function() {

  // Call the minplayer plugin constructor.
  minplayer.display.prototype.construct.call(this);

  // Set the plugin name within the options.
  this.options.pluginName = 'controller';

  // Keep track of if we are dragging...
  this.dragging = false;

  // Keep track of the current volume.
  this.vol = 0;

  // If they have a seek bar.
  if (this.elements.seek) {

    // Create the seek bar slider control.
    this.seekBar = this.elements.seek.slider({
      range: 'min',
      create: function(event, ui) {
        jQuery('.ui-slider-range', event.target).addClass('ui-state-active');
      }
    });
  }

  // If they have a volume bar.
  if (this.elements.volume) {

    // Create the volume bar slider control.
    this.volumeBar = this.elements.volume.slider({
      animate: true,
      range: 'min',
      orientation: 'vertical'
    });
  }

  // Get the player plugin.
  this.get('player', function(player) {

    // If they have a fullscreen button.
    if (this.elements.fullscreen) {

      // Bind to the click event.
      minplayer.click(this.elements.fullscreen.unbind(), function() {
        player.toggleFullScreen();
      }).css({'pointer' : 'hand'});
    }
  });

  // Get the media plugin.
  this.get('media', function(media) {

    // Only bind if this player does not have its own play loader.
    if (!media.hasController()) {

      // If they have a pause button
      if (this.elements.pause) {

        // Bind to the click on this button.
        minplayer.click(this.elements.pause.unbind(), (function(controller) {
          return function(event) {
            event.preventDefault();
            controller.playPause(false, media);
          };
        })(this));

        // Bind to the pause event of the media.
        media.ubind(this.uuid + ':pause', (function(controller) {
          return function(event) {
            controller.setPlayPause(true);
          };
        })(this));
      }

      // If they have a play button
      if (this.elements.play) {

        // Bind to the click on this button.
        minplayer.click(this.elements.play.unbind(), (function(controller) {
          return function(event) {
            event.preventDefault();
            controller.playPause(true, media);
          };
        })(this));

        // Bind to the play event of the media.
        media.ubind(this.uuid + ':playing', (function(controller) {
          return function(event) {
            controller.setPlayPause(false);
          };
        })(this));
      }

      // If they have a duration, then trigger on duration change.
      if (this.elements.duration) {

        // Bind to the duration change event.
        media.ubind(this.uuid + ':durationchange', (function(controller) {
          return function(event, data) {
            var duration = controller.options.disptime || data.duration;
            controller.setTimeString('duration', duration);
          };
        })(this));

        // Set the timestring to the duration.
        media.getDuration((function(controller) {
          return function(duration) {
            duration = controller.options.disptime || duration;
            controller.setTimeString('duration', duration);
          };
        })(this));
      }

      // If they have a progress element.
      if (this.elements.progress) {

        // Bind to the progress event.
        media.ubind(this.uuid + ':progress', (function(controller) {
          return function(event, data) {
            var percent = data.total ? (data.loaded / data.total) * 100 : 0;
            controller.elements.progress.width(percent + '%');
          };
        })(this));
      }

      // If they have a seek bar or timer, bind to the timeupdate.
      if (this.seekBar || this.elements.timer) {

        // Bind to the time update event.
        media.ubind(this.uuid + ':timeupdate', (function(controller) {
          return function(event, data) {
            if (!controller.dragging) {
              var value = 0;
              if (data.duration) {
                value = (data.currentTime / data.duration) * 100;
              }

              // Update the seek bar if it exists.
              if (controller.seekBar) {
                controller.seekBar.slider('option', 'value', value);
              }

              controller.setTimeString('timer', data.currentTime);
            }
          };
        })(this));
      }

      // If they have a seekBar element.
      if (this.seekBar) {

        // Register the events for the control bar to control the media.
        this.seekBar.slider({
          start: (function(controller) {
            return function(event, ui) {
              controller.dragging = true;
            };
          })(this),
          stop: (function(controller) {
            return function(event, ui) {
              controller.dragging = false;
              media.getDuration(function(duration) {
                media.seek((ui.value / 100) * duration);
              });
            };
          })(this),
          slide: (function(controller) {
            return function(event, ui) {
              media.getDuration(function(duration) {
                var time = (ui.value / 100) * duration;
                if (!controller.dragging) {
                  media.seek(time);
                }
                controller.setTimeString('timer', time);
              });
            };
          })(this)
        });
      }

      // Setup the mute button.
      if (this.elements.mute) {
        minplayer.click(this.elements.mute, (function(controller) {
          return function(event) {
            event.preventDefault();
            var value = controller.volumeBar.slider('option', 'value');
            if (value > 0) {
              controller.vol = value;
              controller.volumeBar.slider('option', 'value', 0);
              media.setVolume(0);
            }
            else {
              controller.volumeBar.slider('option', 'value', controller.vol);
              media.setVolume(controller.vol / 100);
            }
          };
        })(this));
      }

      // Setup the volume bar.
      if (this.volumeBar) {

        // Create the slider.
        this.volumeBar.slider({
          slide: function(event, ui) {
            media.setVolume(ui.value / 100);
          }
        });

        media.ubind(this.uuid + ':volumeupdate', (function(controller) {
          return function(event, vol) {
            controller.volumeBar.slider('option', 'value', (vol * 100));
          };
        })(this));

        // Set the volume to match that of the player.
        media.getVolume((function(controller) {
          return function(vol) {
            controller.volumeBar.slider('option', 'value', (vol * 100));
          };
        })(this));
      }
    }
    else {

      // Hide this controller.
      this.hide();
    }
  });

  // We are now ready.
  this.ready();
};

/**
 * Sets the play and pause state of the control bar.
 *
 * @param {boolean} state TRUE - Show Play, FALSE - Show Pause.
 */
minplayer.controller.prototype.setPlayPause = function(state) {
  var css = '';
  if (this.elements.play) {
    css = state ? 'inherit' : 'none';
    this.elements.play.css('display', css);
  }
  if (this.elements.pause) {
    css = state ? 'none' : 'inherit';
    this.elements.pause.css('display', css);
  }
};

/**
 * Plays or pauses the media.
 *
 * @param {bool} state true => play, false => pause.
 * @param {object} media The media player object.
 */
minplayer.controller.prototype.playPause = function(state, media) {
  var type = state ? 'play' : 'pause';
  this.display.trigger(type);
  this.setPlayPause(!state);
  if (media) {
    media[type]();
  }
};

/**
 * Sets the time string on the control bar.
 *
 * @param {string} element The name of the element to set.
 * @param {number} time The total time amount to set.
 */
minplayer.controller.prototype.setTimeString = function(element, time) {
  if (this.elements[element]) {
    this.elements[element].text(minplayer.formatTime(time).time);
  }
};
;
(function($) {
  var plugins = {};
  Drupal.behaviors.mediafront = {
    attach: function(context) {
      // Iterate through each mediafront player settings.
      if (Drupal.settings.hasOwnProperty('mediafront')) {
        $.each(Drupal.settings.mediafront, function(id, settings) {
          $("#" + id + ":not(.mediafront-processed)").each(function() {
            if (typeof plugins[settings.preset] !== 'object') {
              plugins[settings.preset] = {};
            }
            plugins[settings.preset][settings.id] = $(this).addClass('mediafront-processed').osmplayer(settings);
          });
        });
      }

      // Now setup the mediafront connections.
      if (Drupal.settings.hasOwnProperty('mediafront_connect')) {
        $.each(Drupal.settings.mediafront_connect, function(plugin_id, settings) {
          if (!settings.connected) {
            settings.connected = true;
            minplayer.get(plugin_id, settings.type, function(plugin) {
              $.each(settings.connect, function(preset, preset) {
                if (plugins[preset]) {
                  $.each(plugins[preset], function(player_id, player) {
                    minplayer.get(player_id, "player", function(player) {
                      player.addPlugin(settings.type, plugin);
                    });
                  });
                }
              });
            });
          }
        });
      }
    }
  };
})(jQuery);;
// Add a way to instanciate using jQuery prototype.
if (!jQuery.fn.osmplayer) {

  /**
   * A special jQuery event to handle the player being removed from DOM.
   *
   * @this The element that is being triggered with.
   **/
  jQuery.event.special.playerdestroyed = {
    remove: function(o) {
      if (o.handler) {
        o.handler(this);
      }
    }
  };

  /**
   * @constructor
   *
   * Define a jQuery osmplayer prototype.
   *
   * @param {object} options The options for this jQuery prototype.
   * @return {Array} jQuery object.
   */
  jQuery.fn.osmplayer = function(options) {
    return jQuery(this).each(function() {
      options = options || {};
      options.id = options.id || jQuery(this).attr('id') || Math.random();
      if (!minplayer.plugins[options.id]) {
        options.template = options.template || 'default';
        if (osmplayer[options.template]) {
          new osmplayer[options.template](jQuery(this), options);
        }
        else {
          new osmplayer(jQuery(this), options);
        }
      }
    });
  };
}

/**
 * @constructor
 * @extends minplayer
 * @class The main osmplayer class.
 *
 * <p><strong>Usage:</strong>
 * <pre><code>
 *
 *   // Create a media player.
 *   var player = jQuery("#player").osmplayer({
 *
 *   });
 *
 * </code></pre>
 * </p>
 *
 * @param {object} context The jQuery context.
 * @param {object} options This components options.
 */
osmplayer = function(context, options) {

  // Derive from minplayer
  minplayer.call(this, context, options);
};

/** Derive from minplayer. */
osmplayer.prototype = new minplayer();

/** Reset the constructor. */
osmplayer.prototype.constructor = osmplayer;

/**
 * Creates a new plugin within this context.
 *
 * @param {string} name The name of the plugin you wish to create.
 * @param {object} base The base object for this plugin.
 * @param {object} context The context which you would like to create.
 * @return {object} The new plugin object.
 */
osmplayer.prototype.create = function(name, base, context) {
  return minplayer.prototype.create.call(this, name, 'osmplayer', context);
};

/**
 * Get the default options for this plugin.
 *
 * @param {object} options The default options for this plugin.
 */
osmplayer.prototype.defaultOptions = function(options) {
  options.playlist = '';
  options.node = {};
  options.link = 'http://www.mediafront.org';
  options.logo = 'http://mediafront.org/assets/osmplayer/logo.png';
  minplayer.prototype.defaultOptions.call(this, options);
};

/**
 * @see minplayer.plugin.construct
 */
osmplayer.prototype.construct = function() {

  // Call the minplayer display constructor.
  minplayer.prototype.construct.call(this);

  // We need to cleanup the player when it has been destroyed.
  jQuery(this.display).bind('playerdestroyed', (function(player) {
    return function(element) {
      if (element === player.display.eq(0)[0]) {
        for (var plugin in minplayer.plugins[player.options.id]) {
          for (var index in minplayer.plugins[player.options.id][plugin]) {
            minplayer.plugins[player.options.id][plugin][index].destroy();
            delete minplayer.plugins[player.options.id][plugin][index];
          }
          minplayer.plugins[player.options.id][plugin].length = 0;
        }
        delete minplayer.plugins[player.options.id];
        minplayer.plugins[player.options.id] = null;
      }
    };
  })(this));

  /** The play queue and index. */
  this.playQueue = [];
  this.playIndex = 0;
  this.hasPlaylist = false;

  /** The playlist for this media player. */
  this.create('playlist', 'osmplayer');

  /** Get the playlist or any other playlist that connects. */
  this.get('playlist', function(playlist) {
    this.hasPlaylist = true;
    playlist.ubind(this.uuid + ':nodeLoad', (function(player) {
      return function(event, data) {
        player.loadNode(data);
      };
    })(this));
  });

  // Play each media sequentially...
  this.get('media', function(media) {
    media.ubind(this.uuid + ':ended', (function(player) {
      return function() {
        player.options.autoplay = true;
        player.playNext();
      };
    })(this));
  });

  // Load the node if one is provided.
  if (this.options.node) {
    this.loadNode(this.options.node);
  }
};

/**
 * Gets the full screen element.
 *
 * @return {object} The element that will go into fullscreen.
 */
osmplayer.prototype.fullScreenElement = function() {
  return this.elements.minplayer;
};

/**
 * Reset the osmplayer.
 *
 * @param {function} callback Called when it is done resetting.
 */
osmplayer.prototype.reset = function(callback) {

  // Empty the playqueue.
  this.playQueue.length = 0;
  this.playQueue = [];
  this.playIndex = 0;

  // Clear the playloader.
  if (this.playLoader && this.options.preview) {
    this.options.preview = '';
    this.playLoader.clear((function(player) {
      return function() {
        callback.call(player);
      };
    })(this));
  }
  else if (callback) {
    callback.call(this);
  }
};

/**
 * The load node function.
 *
 * @param {object} node A media node object.
 * @return {boolean} If the node was loaded.
 */
osmplayer.prototype.loadNode = function(node) {

  // Make sure this is a valid node.
  if (!node || (node.hasOwnProperty('length') && (node.length === 0))) {
    return false;
  }

  // Reset the player.
  this.reset(function() {

    // Set the hasMedia flag.
    this.hasMedia = node && node.mediafiles && node.mediafiles.media;

    // If this node is set and has files.
    if (node && node.mediafiles) {

      // Load the media files.
      var media = node.mediafiles.media;
      if (media) {
        var file = null;
        var types = [];

        // For mobile devices, we should only show the main media.
        if (minplayer.isAndroid || minplayer.isIDevice) {
          types = ['media'];
        }
        else {
          types = ['intro', 'commercial', 'prereel', 'media', 'postreel'];
        }

        // Iterate through the types.
        jQuery.each(types, (function(player) {
          return function(key, type) {
            file = player.addToQueue(media[type]);
            if (file) {
              file.queueType = type;
            }
          };
        })(this));
      }
      else {

        // Add a class to the display to let themes handle this.
        this.display.addClass('nomedia');
      }

      // Play the next media
      this.playNext();

      // Load the preview image.
      osmplayer.getImage(node.mediafiles, 'preview', (function(player) {
        return function(image) {
          if (player.playLoader && (player.playLoader.display.length > 0)) {
            player.playLoader.enabled = true;
            player.playLoader.loadPreview(image.path);
            player.playLoader.previewFlag.setFlag('media', true);
            if (!player.hasMedia) {
              player.playLoader.busy.setFlag('media', false);
              player.playLoader.bigPlay.setFlag('media', false);
            }
            player.playLoader.checkVisibility();
          }
        };
      })(this));
    }
  });
};

/**
 * Adds a file to the play queue.
 *
 * @param {object} file The file to add to the queue.
 * @return {object} The file that was added to the queue.
 */
osmplayer.prototype.addToQueue = function(file) {
  file = minplayer.getMediaFile(file);
  if (file) {
    this.playQueue.push(file);
  }
  return file;
};

/**
 * Plays the next media file in the queue.
 */
osmplayer.prototype.playNext = function() {
  if (this.playQueue.length > this.playIndex) {
    this.load(this.playQueue[this.playIndex]);
    this.playIndex++;
  }
  else if (this.options.repeat) {
    this.playIndex = 0;
    this.playNext();
  }
  else if (this.playQueue.length > 0) {

    // If we have a playlist, let them handle what to do next.
    if (this.hasPlaylist && this.options.autoNext) {
      this.trigger('player_ended');
    }
    else {
      // If there is no playlist, and no repeat, we will
      // just seek to the beginning and pause.
      this.options.autoplay = false;
      this.playIndex = 0;
      this.playNext();
    }
  }
  else if (this.media) {
    this.media.stop();

    // If there is no media found, then clear the player.
    if (!this.hasMedia) {
      this.media.clear();
    }
  }
};

/**
 * Returns a node.
 *
 * @param {object} node The node to get.
 * @param {function} callback Called when the node is retrieved.
 */
osmplayer.getNode = function(node, callback) {
  if (node && node.mediafiles && node.mediafiles.media) {
    var mediaFile = minplayer.getMediaFile(node.mediafiles.media.media);
    if (mediaFile) {
      var player = minplayer.players[mediaFile.player];
      if (player && (typeof player.getNode === 'function')) {
        player.getNode(mediaFile, function(node) {
          callback(node);
        });
      }
    }
  }
};

/**
 * Returns an image provided image array.
 *
 * @param {object} mediafiles The mediafiles to search within.
 * @param {string} type The type of image to look for.
 * @param {function} callback Called when the image is retrieved.
 */
osmplayer.getImage = function(mediafiles, type, callback) {

  var image = '';
  var images = mediafiles.image;
  if (images) {

    // If the image type exists, then just use that one...
    if (images[type]) {
      image = images[type];
    }
    // Or try the original image...
    else if (images.image) {
      image = images.image;
    }
    // Otherwise, just try ANY image...
    else {

      // Or, just pick the first one available.
      for (type in images) {
        if (images.hasOwnProperty(type)) {
          image = images[type];
          break;
        }
      }
    }
  }

  // If the image exists, then callback with that image.
  if (image) {
    callback(new minplayer.file(image));
  }
  else {
    // Get the image from the media player...
    var mediaFile = minplayer.getMediaFile(mediafiles.media.media);
    if (mediaFile) {
      var player = minplayer.players[mediaFile.player];
      if (player && (typeof player.getImage === 'function')) {
        player.getImage(mediaFile, type, function(src) {
          callback(new minplayer.file(src));
        });
      }
    }
  }
};
;
/** The osmplayer namespace. */
var osmplayer = osmplayer || {};

/** The parser object. */
osmplayer.parser = osmplayer.parser || {};

/**
 * The default parser object.
 *
 * @return {object} The default parser.
 **/
osmplayer.parser['default'] = {

  // The priority for this parser.
  priority: 1,

  // This parser is always valid.
  valid: function(feed) {
    return true;
  },

  // Returns the type of request to make.
  getType: function(feed) {
    return 'json';
  },

  // Returns the feed provided the start and numItems.
  getFeed: function(feed, start, numItems) {
    feed = feed.replace(/(.*)\??(.*)/i, '$1');
    feed += '?start-index=' + start;
    feed += '&max-results=' + numItems;
    return feed;
  },

  // Parse the feed.
  parse: function(data) {
    return data;
  }
};
;
/** The osmplayer namespace. */
var osmplayer = osmplayer || {};

/** The parser object. */
osmplayer.parser = osmplayer.parser || {};

/**
 * The youtube parser object.
 *
 * @return {object} The youtube parser.
 **/
osmplayer.parser.youtube = {

  // The priority for this parser.
  priority: 10,

  // Return if this is a valid youtube feed.
  valid: function(feed) {
    return (feed.search(/^http(s)?\:\/\/gdata\.youtube\.com/i) === 0);
  },

  // Returns the type of request to make.
  getType: function(feed) {
    return 'jsonp';
  },

  // Returns the feed provided the start and numItems.
  getFeed: function(feed, start, numItems) {
    feed = feed.replace(/(.*)\??(.*)/i, '$1');
    feed += '?start-index=' + (start + 1);
    feed += '&max-results=' + (numItems);
    feed += '&v=2&alt=jsonc';
    return feed;
  },

  // Parse the feed.
  parse: function(data) {
    data = data.data;
    var playlist = {
      total_rows: data.totalItems,
      nodes: []
    };

    // Iterate through the items and parse it.
    var node = null;
    for (var index in data.items) {
      if (data.items.hasOwnProperty(index)) {
        node = minplayer.players.youtube.parseNode(data.items[index]);
        playlist.nodes.push(node);
      }
    }

    return playlist;
  }
};
;
/** The osmplayer namespace. */
var osmplayer = osmplayer || {};

/** The parser object. */
osmplayer.parser = osmplayer.parser || {};

/**
 * The rss parser object.
 *
 * @return {object} The rss parser.
 **/
osmplayer.parser.rss = {

  // The priority for this parser.
  priority: 8,

  // Return if this is a valid youtube feed.
  valid: function(feed) {
    feed = feed.replace(/(.*)\??(.*)/i, '$1');
    return feed.match(/\.rss$/i) !== null;
  },

  // Returns the type of request to make.
  getType: function(feed) {
    return 'xml';
  },

  // Returns the feed provided the start and numItems.
  getFeed: function(feed, start, numItems) {
    return feed;
  },

  // Parse the feed.
  parse: function(data) {
    var playlist = {
      total_rows: 0,
      nodes: []
    };
    jQuery('rss channel', data).find('item').each(function(index) {
      osmplayer.parser.rss.addRSSItem(playlist, jQuery(this));
    });
    return playlist;
  },

  // Parse an RSS item.
  addRSSItem: function(playlist, item) {
    playlist.total_rows++;
    var node = {}, title = '', desc = '', img = '', media = '';

    // Get the title.
    title = item.find('title');
    if (title.length) {
      node.title = title.text();
    }

    // Get the description.
    desc = item.find('annotation');
    if (desc.length) {
      node.description = desc.text();
    }

    // Add the media files.
    node.mediafiles = {};

    // Get the image.
    img = item.find('image');
    if (img.length) {
      node.mediafiles.image = {
        image: {
          path: img.text()
        }
      };
    }

    // Get the media.
    media = item.find('location');
    if (media.length) {
      node.mediafiles.media = {
        media: {
          path: media.text()
        }
      };
    }

    // Add this node to the playlist.
    playlist.nodes.push(node);
  }
};
;
/** The osmplayer namespace. */
var osmplayer = osmplayer || {};

/** The parser object. */
osmplayer.parser = osmplayer.parser || {};

/**
 * The asx parser object.
 *
 * @return {object} The asx parser.
 **/
osmplayer.parser.asx = {

  // The priority for this parser.
  priority: 8,

  // Return if this is a valid youtube feed.
  valid: function(feed) {
    feed = feed.replace(/(.*)\??(.*)/i, '$1');
    return feed.match(/\.asx$/i) !== null;
  },

  // Returns the type of request to make.
  getType: function(feed) {
    return 'xml';
  },

  // Returns the feed provided the start and numItems.
  getFeed: function(feed, start, numItems) {
    return feed;
  },

  // Parse the feed.
  parse: function(data) {
    var playlist = {
      total_rows: 0,
      nodes: []
    };
    jQuery('asx entry', data).each(function(index) {
      osmplayer.parser.rss.addRSSItem(playlist, jQuery(this));
    });
    return playlist;
  }
};
;
/** The osmplayer namespace. */
var osmplayer = osmplayer || {};

/** The parser object. */
osmplayer.parser = osmplayer.parser || {};

/**
 * The xsfp parser object.
 *
 * @return {object} The xsfp parser.
 **/
osmplayer.parser.xsfp = {

  // The priority for this parser.
  priority: 8,

  // Return if this is a valid youtube feed.
  valid: function(feed) {
    feed = feed.replace(/(.*)\??(.*)/i, '$1');
    return feed.match(/\.xml$/i) !== null;
  },

  // Returns the type of request to make.
  getType: function(feed) {
    return 'xml';
  },

  // Returns the feed provided the start and numItems.
  getFeed: function(feed, start, numItems) {
    return feed;
  },

  // Parse the feed.
  parse: function(data) {
    var playlist = {
      total_rows: 0,
      nodes: []
    };
    jQuery('playlist trackList track', data).each(function(index) {
      osmplayer.parser.rss.addRSSItem(playlist, jQuery(this));
    });
    return playlist;
  }
};
;
/*!
 * iScroll v4.2.5 ~ Copyright (c) 2012 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
(function(window, doc){
var m = Math,
	dummyStyle = doc.createElement('div').style,
	vendor = (function () {
		var vendors = 't,webkitT,MozT,msT,OT'.split(','),
			t,
			i = 0,
			l = vendors.length;

		for ( ; i < l; i++ ) {
			t = vendors[i] + 'ransform';
			if ( t in dummyStyle ) {
				return vendors[i].substr(0, vendors[i].length - 1);
			}
		}

		return false;
	})(),
	cssVendor = vendor ? '-' + vendor.toLowerCase() + '-' : '',

	// Style properties
	transform = prefixStyle('transform'),
	transitionProperty = prefixStyle('transitionProperty'),
	transitionDuration = prefixStyle('transitionDuration'),
	transformOrigin = prefixStyle('transformOrigin'),
	transitionTimingFunction = prefixStyle('transitionTimingFunction'),
	transitionDelay = prefixStyle('transitionDelay'),

    // Browser capabilities
	isAndroid = (/android/gi).test(navigator.appVersion),
	isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
	isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),

    has3d = prefixStyle('perspective') in dummyStyle,
    hasTouch = 'ontouchstart' in window && !isTouchPad,
    hasTransform = vendor !== false,
    hasTransitionEnd = prefixStyle('transition') in dummyStyle,

	RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
	START_EV = hasTouch ? 'touchstart' : 'mousedown',
	MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
	END_EV = hasTouch ? 'touchend' : 'mouseup',
	CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',
	TRNEND_EV = (function () {
		if ( vendor === false ) return false;

		var transitionEnd = {
				''			: 'transitionend',
				'webkit'	: 'webkitTransitionEnd',
				'Moz'		: 'transitionend',
				'O'			: 'otransitionend',
				'ms'		: 'MSTransitionEnd'
			};

		return transitionEnd[vendor];
	})(),

	nextFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback) { return setTimeout(callback, 1); };
	})(),
	cancelFrame = (function () {
		return window.cancelRequestAnimationFrame ||
			window.webkitCancelAnimationFrame ||
			window.webkitCancelRequestAnimationFrame ||
			window.mozCancelRequestAnimationFrame ||
			window.oCancelRequestAnimationFrame ||
			window.msCancelRequestAnimationFrame ||
			clearTimeout;
	})(),

	// Helpers
	translateZ = has3d ? ' translateZ(0)' : '',

	// Constructor
	iScroll = function (el, options) {
		var that = this,
			i;

		that.wrapper = typeof el == 'object' ? el : doc.getElementById(el);
		that.wrapper.style.overflow = 'hidden';
		that.scroller = that.wrapper.children[0];

		// Default options
		that.options = {
			hScroll: true,
			vScroll: true,
			x: 0,
			y: 0,
			bounce: true,
			bounceLock: false,
			momentum: true,
			lockDirection: true,
			useTransform: true,
			useTransition: false,
			topOffset: 0,
			checkDOMChanges: false,		// Experimental
			handleClick: true,

			// Scrollbar
			hScrollbar: true,
			vScrollbar: true,
			fixedScrollbar: isAndroid,
			hideScrollbar: isIDevice,
			fadeScrollbar: isIDevice && has3d,
			scrollbarClass: '',

			// Zoom
			zoom: false,
			zoomMin: 1,
			zoomMax: 4,
			doubleTapZoom: 2,
			wheelAction: 'scroll',

			// Snap
			snap: false,
			snapThreshold: 1,

			// Events
			onRefresh: null,
			onBeforeScrollStart: function (e) { e.preventDefault(); },
			onScrollStart: null,
			onBeforeScrollMove: null,
			onScrollMove: null,
			onBeforeScrollEnd: null,
			onScrollEnd: null,
			onTouchEnd: null,
			onDestroy: null,
			onZoomStart: null,
			onZoom: null,
			onZoomEnd: null
		};

		// User defined options
		for (i in options) that.options[i] = options[i];
		
		// Set starting position
		that.x = that.options.x;
		that.y = that.options.y;

		// Normalize options
		that.options.useTransform = hasTransform && that.options.useTransform;
		that.options.hScrollbar = that.options.hScroll && that.options.hScrollbar;
		that.options.vScrollbar = that.options.vScroll && that.options.vScrollbar;
		that.options.zoom = that.options.useTransform && that.options.zoom;
		that.options.useTransition = hasTransitionEnd && that.options.useTransition;

		// Helpers FIX ANDROID BUG!
		// translate3d and scale doesn't work together!
		// Ignoring 3d ONLY WHEN YOU SET that.options.zoom
		if ( that.options.zoom && isAndroid ){
			translateZ = '';
		}
		
		// Set some default styles
		that.scroller.style[transitionProperty] = that.options.useTransform ? cssVendor + 'transform' : 'top left';
		that.scroller.style[transitionDuration] = '0';
		that.scroller.style[transformOrigin] = '0 0';
		if (that.options.useTransition) that.scroller.style[transitionTimingFunction] = 'cubic-bezier(0.33,0.66,0.66,1)';
		
		if (that.options.useTransform) that.scroller.style[transform] = 'translate(' + that.x + 'px,' + that.y + 'px)' + translateZ;
		else that.scroller.style.cssText += ';position:absolute;top:' + that.y + 'px;left:' + that.x + 'px';

		if (that.options.useTransition) that.options.fixedScrollbar = true;

		that.refresh();

		that._bind(RESIZE_EV, window);
		that._bind(START_EV);
		if (!hasTouch) {
			if (that.options.wheelAction != 'none') {
				that._bind('DOMMouseScroll');
				that._bind('mousewheel');
			}
		}

		if (that.options.checkDOMChanges) that.checkDOMTime = setInterval(function () {
			that._checkDOMChanges();
		}, 500);
	};

// Prototype
iScroll.prototype = {
	enabled: true,
	x: 0,
	y: 0,
	steps: [],
	scale: 1,
	currPageX: 0, currPageY: 0,
	pagesX: [], pagesY: [],
	aniTime: null,
	wheelZoomCount: 0,
	
	handleEvent: function (e) {
		var that = this;
		switch(e.type) {
			case START_EV:
				if (!hasTouch && e.button !== 0) return;
				that._start(e);
				break;
			case MOVE_EV: that._move(e); break;
			case END_EV:
			case CANCEL_EV: that._end(e); break;
			case RESIZE_EV: that._resize(); break;
			case 'DOMMouseScroll': case 'mousewheel': that._wheel(e); break;
			case TRNEND_EV: that._transitionEnd(e); break;
		}
	},
	
	_checkDOMChanges: function () {
		if (this.moved || this.zoomed || this.animating ||
			(this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) return;

		this.refresh();
	},
	
	_scrollbar: function (dir) {
		var that = this,
			bar;

		if (!that[dir + 'Scrollbar']) {
			if (that[dir + 'ScrollbarWrapper']) {
				if (hasTransform) that[dir + 'ScrollbarIndicator'].style[transform] = '';
				that[dir + 'ScrollbarWrapper'].parentNode.removeChild(that[dir + 'ScrollbarWrapper']);
				that[dir + 'ScrollbarWrapper'] = null;
				that[dir + 'ScrollbarIndicator'] = null;
			}

			return;
		}

		if (!that[dir + 'ScrollbarWrapper']) {
			// Create the scrollbar wrapper
			bar = doc.createElement('div');

			if (that.options.scrollbarClass) bar.className = that.options.scrollbarClass + dir.toUpperCase();
			else bar.style.cssText = 'position:absolute;z-index:100;' + (dir == 'h' ? 'height:7px;bottom:1px;left:2px;right:' + (that.vScrollbar ? '7' : '2') + 'px' : 'width:7px;bottom:' + (that.hScrollbar ? '7' : '2') + 'px;top:2px;right:1px');

			bar.style.cssText += ';pointer-events:none;' + cssVendor + 'transition-property:opacity;' + cssVendor + 'transition-duration:' + (that.options.fadeScrollbar ? '350ms' : '0') + ';overflow:hidden;opacity:' + (that.options.hideScrollbar ? '0' : '1');

			that.wrapper.appendChild(bar);
			that[dir + 'ScrollbarWrapper'] = bar;

			// Create the scrollbar indicator
			bar = doc.createElement('div');
			if (!that.options.scrollbarClass) {
				bar.style.cssText = 'position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);' + cssVendor + 'background-clip:padding-box;' + cssVendor + 'box-sizing:border-box;' + (dir == 'h' ? 'height:100%' : 'width:100%') + ';' + cssVendor + 'border-radius:3px;border-radius:3px';
			}
			bar.style.cssText += ';pointer-events:none;' + cssVendor + 'transition-property:' + cssVendor + 'transform;' + cssVendor + 'transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);' + cssVendor + 'transition-duration:0;' + cssVendor + 'transform: translate(0,0)' + translateZ;
			if (that.options.useTransition) bar.style.cssText += ';' + cssVendor + 'transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)';

			that[dir + 'ScrollbarWrapper'].appendChild(bar);
			that[dir + 'ScrollbarIndicator'] = bar;
		}

		if (dir == 'h') {
			that.hScrollbarSize = that.hScrollbarWrapper.clientWidth;
			that.hScrollbarIndicatorSize = m.max(m.round(that.hScrollbarSize * that.hScrollbarSize / that.scrollerW), 8);
			that.hScrollbarIndicator.style.width = that.hScrollbarIndicatorSize + 'px';
			that.hScrollbarMaxScroll = that.hScrollbarSize - that.hScrollbarIndicatorSize;
			that.hScrollbarProp = that.hScrollbarMaxScroll / that.maxScrollX;
		} else {
			that.vScrollbarSize = that.vScrollbarWrapper.clientHeight;
			that.vScrollbarIndicatorSize = m.max(m.round(that.vScrollbarSize * that.vScrollbarSize / that.scrollerH), 8);
			that.vScrollbarIndicator.style.height = that.vScrollbarIndicatorSize + 'px';
			that.vScrollbarMaxScroll = that.vScrollbarSize - that.vScrollbarIndicatorSize;
			that.vScrollbarProp = that.vScrollbarMaxScroll / that.maxScrollY;
		}

		// Reset position
		that._scrollbarPos(dir, true);
	},
	
	_resize: function () {
		var that = this;
		setTimeout(function () { that.refresh(); }, isAndroid ? 200 : 0);
	},
	
	_pos: function (x, y) {
		if (this.zoomed) return;

		x = this.hScroll ? x : 0;
		y = this.vScroll ? y : 0;

		if (this.options.useTransform) {
			this.scroller.style[transform] = 'translate(' + x + 'px,' + y + 'px) scale(' + this.scale + ')' + translateZ;
		} else {
			x = m.round(x);
			y = m.round(y);
			this.scroller.style.left = x + 'px';
			this.scroller.style.top = y + 'px';
		}

		this.x = x;
		this.y = y;

		this._scrollbarPos('h');
		this._scrollbarPos('v');
	},

	_scrollbarPos: function (dir, hidden) {
		var that = this,
			pos = dir == 'h' ? that.x : that.y,
			size;

		if (!that[dir + 'Scrollbar']) return;

		pos = that[dir + 'ScrollbarProp'] * pos;

		if (pos < 0) {
			if (!that.options.fixedScrollbar) {
				size = that[dir + 'ScrollbarIndicatorSize'] + m.round(pos * 3);
				if (size < 8) size = 8;
				that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
			}
			pos = 0;
		} else if (pos > that[dir + 'ScrollbarMaxScroll']) {
			if (!that.options.fixedScrollbar) {
				size = that[dir + 'ScrollbarIndicatorSize'] - m.round((pos - that[dir + 'ScrollbarMaxScroll']) * 3);
				if (size < 8) size = 8;
				that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
				pos = that[dir + 'ScrollbarMaxScroll'] + (that[dir + 'ScrollbarIndicatorSize'] - size);
			} else {
				pos = that[dir + 'ScrollbarMaxScroll'];
			}
		}

		that[dir + 'ScrollbarWrapper'].style[transitionDelay] = '0';
		that[dir + 'ScrollbarWrapper'].style.opacity = hidden && that.options.hideScrollbar ? '0' : '1';
		that[dir + 'ScrollbarIndicator'].style[transform] = 'translate(' + (dir == 'h' ? pos + 'px,0)' : '0,' + pos + 'px)') + translateZ;
	},
	
	_start: function (e) {
		var that = this,
			point = hasTouch ? e.touches[0] : e,
			matrix, x, y,
			c1, c2;

		if (!that.enabled) return;

		if (that.options.onBeforeScrollStart) that.options.onBeforeScrollStart.call(that, e);

		if (that.options.useTransition || that.options.zoom) that._transitionTime(0);

		that.moved = false;
		that.animating = false;
		that.zoomed = false;
		that.distX = 0;
		that.distY = 0;
		that.absDistX = 0;
		that.absDistY = 0;
		that.dirX = 0;
		that.dirY = 0;

		// Gesture start
		if (that.options.zoom && hasTouch && e.touches.length > 1) {
			c1 = m.abs(e.touches[0].pageX-e.touches[1].pageX);
			c2 = m.abs(e.touches[0].pageY-e.touches[1].pageY);
			that.touchesDistStart = m.sqrt(c1 * c1 + c2 * c2);

			that.originX = m.abs(e.touches[0].pageX + e.touches[1].pageX - that.wrapperOffsetLeft * 2) / 2 - that.x;
			that.originY = m.abs(e.touches[0].pageY + e.touches[1].pageY - that.wrapperOffsetTop * 2) / 2 - that.y;

			if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
		}

		if (that.options.momentum) {
			if (that.options.useTransform) {
				// Very lame general purpose alternative to CSSMatrix
				matrix = getComputedStyle(that.scroller, null)[transform].replace(/[^0-9\-.,]/g, '').split(',');
				x = +(matrix[12] || matrix[4]);
				y = +(matrix[13] || matrix[5]);
			} else {
				x = +getComputedStyle(that.scroller, null).left.replace(/[^0-9-]/g, '');
				y = +getComputedStyle(that.scroller, null).top.replace(/[^0-9-]/g, '');
			}
			
			if (x != that.x || y != that.y) {
				if (that.options.useTransition) that._unbind(TRNEND_EV);
				else cancelFrame(that.aniTime);
				that.steps = [];
				that._pos(x, y);
				if (that.options.onScrollEnd) that.options.onScrollEnd.call(that);
			}
		}

		that.absStartX = that.x;	// Needed by snap threshold
		that.absStartY = that.y;

		that.startX = that.x;
		that.startY = that.y;
		that.pointX = point.pageX;
		that.pointY = point.pageY;

		that.startTime = e.timeStamp || Date.now();

		if (that.options.onScrollStart) that.options.onScrollStart.call(that, e);

		that._bind(MOVE_EV, window);
		that._bind(END_EV, window);
		that._bind(CANCEL_EV, window);
	},
	
	_move: function (e) {
		var that = this,
			point = hasTouch ? e.touches[0] : e,
			deltaX = point.pageX - that.pointX,
			deltaY = point.pageY - that.pointY,
			newX = that.x + deltaX,
			newY = that.y + deltaY,
			c1, c2, scale,
			timestamp = e.timeStamp || Date.now();

		if (that.options.onBeforeScrollMove) that.options.onBeforeScrollMove.call(that, e);

		// Zoom
		if (that.options.zoom && hasTouch && e.touches.length > 1) {
			c1 = m.abs(e.touches[0].pageX - e.touches[1].pageX);
			c2 = m.abs(e.touches[0].pageY - e.touches[1].pageY);
			that.touchesDist = m.sqrt(c1*c1+c2*c2);

			that.zoomed = true;

			scale = 1 / that.touchesDistStart * that.touchesDist * this.scale;

			if (scale < that.options.zoomMin) scale = 0.5 * that.options.zoomMin * Math.pow(2.0, scale / that.options.zoomMin);
			else if (scale > that.options.zoomMax) scale = 2.0 * that.options.zoomMax * Math.pow(0.5, that.options.zoomMax / scale);

			that.lastScale = scale / this.scale;

			newX = this.originX - this.originX * that.lastScale + this.x,
			newY = this.originY - this.originY * that.lastScale + this.y;

			this.scroller.style[transform] = 'translate(' + newX + 'px,' + newY + 'px) scale(' + scale + ')' + translateZ;

			if (that.options.onZoom) that.options.onZoom.call(that, e);
			return;
		}

		that.pointX = point.pageX;
		that.pointY = point.pageY;

		// Slow down if outside of the boundaries
		if (newX > 0 || newX < that.maxScrollX) {
			newX = that.options.bounce ? that.x + (deltaX / 2) : newX >= 0 || that.maxScrollX >= 0 ? 0 : that.maxScrollX;
		}
		if (newY > that.minScrollY || newY < that.maxScrollY) {
			newY = that.options.bounce ? that.y + (deltaY / 2) : newY >= that.minScrollY || that.maxScrollY >= 0 ? that.minScrollY : that.maxScrollY;
		}

		that.distX += deltaX;
		that.distY += deltaY;
		that.absDistX = m.abs(that.distX);
		that.absDistY = m.abs(that.distY);

		if (that.absDistX < 6 && that.absDistY < 6) {
			return;
		}

		// Lock direction
		if (that.options.lockDirection) {
			if (that.absDistX > that.absDistY + 5) {
				newY = that.y;
				deltaY = 0;
			} else if (that.absDistY > that.absDistX + 5) {
				newX = that.x;
				deltaX = 0;
			}
		}

		that.moved = true;
		that._pos(newX, newY);
		that.dirX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
		that.dirY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

		if (timestamp - that.startTime > 300) {
			that.startTime = timestamp;
			that.startX = that.x;
			that.startY = that.y;
		}
		
		if (that.options.onScrollMove) that.options.onScrollMove.call(that, e);
	},
	
	_end: function (e) {
		if (hasTouch && e.touches.length !== 0) return;

		var that = this,
			point = hasTouch ? e.changedTouches[0] : e,
			target, ev,
			momentumX = { dist:0, time:0 },
			momentumY = { dist:0, time:0 },
			duration = (e.timeStamp || Date.now()) - that.startTime,
			newPosX = that.x,
			newPosY = that.y,
			distX, distY,
			newDuration,
			snap,
			scale;

		that._unbind(MOVE_EV, window);
		that._unbind(END_EV, window);
		that._unbind(CANCEL_EV, window);

		if (that.options.onBeforeScrollEnd) that.options.onBeforeScrollEnd.call(that, e);

		if (that.zoomed) {
			scale = that.scale * that.lastScale;
			scale = Math.max(that.options.zoomMin, scale);
			scale = Math.min(that.options.zoomMax, scale);
			that.lastScale = scale / that.scale;
			that.scale = scale;

			that.x = that.originX - that.originX * that.lastScale + that.x;
			that.y = that.originY - that.originY * that.lastScale + that.y;
			
			that.scroller.style[transitionDuration] = '200ms';
			that.scroller.style[transform] = 'translate(' + that.x + 'px,' + that.y + 'px) scale(' + that.scale + ')' + translateZ;
			
			that.zoomed = false;
			that.refresh();

			if (that.options.onZoomEnd) that.options.onZoomEnd.call(that, e);
			return;
		}

		if (!that.moved) {
			if (hasTouch) {
				if (that.doubleTapTimer && that.options.zoom) {
					// Double tapped
					clearTimeout(that.doubleTapTimer);
					that.doubleTapTimer = null;
					if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
					that.zoom(that.pointX, that.pointY, that.scale == 1 ? that.options.doubleTapZoom : 1);
					if (that.options.onZoomEnd) {
						setTimeout(function() {
							that.options.onZoomEnd.call(that, e);
						}, 200); // 200 is default zoom duration
					}
				} else if (this.options.handleClick) {
					that.doubleTapTimer = setTimeout(function () {
						that.doubleTapTimer = null;

						// Find the last touched element
						target = point.target;
						while (target.nodeType != 1) target = target.parentNode;

						if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
							ev = doc.createEvent('MouseEvents');
							ev.initMouseEvent('click', true, true, e.view, 1,
								point.screenX, point.screenY, point.clientX, point.clientY,
								e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
								0, null);
							ev._fake = true;
							target.dispatchEvent(ev);
						}
					}, that.options.zoom ? 250 : 0);
				}
			}

			that._resetPos(400);

			if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
			return;
		}

		if (duration < 300 && that.options.momentum) {
			momentumX = newPosX ? that._momentum(newPosX - that.startX, duration, -that.x, that.scrollerW - that.wrapperW + that.x, that.options.bounce ? that.wrapperW : 0) : momentumX;
			momentumY = newPosY ? that._momentum(newPosY - that.startY, duration, -that.y, (that.maxScrollY < 0 ? that.scrollerH - that.wrapperH + that.y - that.minScrollY : 0), that.options.bounce ? that.wrapperH : 0) : momentumY;

			newPosX = that.x + momentumX.dist;
			newPosY = that.y + momentumY.dist;

			if ((that.x > 0 && newPosX > 0) || (that.x < that.maxScrollX && newPosX < that.maxScrollX)) momentumX = { dist:0, time:0 };
			if ((that.y > that.minScrollY && newPosY > that.minScrollY) || (that.y < that.maxScrollY && newPosY < that.maxScrollY)) momentumY = { dist:0, time:0 };
		}

		if (momentumX.dist || momentumY.dist) {
			newDuration = m.max(m.max(momentumX.time, momentumY.time), 10);

			// Do we need to snap?
			if (that.options.snap) {
				distX = newPosX - that.absStartX;
				distY = newPosY - that.absStartY;
				if (m.abs(distX) < that.options.snapThreshold && m.abs(distY) < that.options.snapThreshold) { that.scrollTo(that.absStartX, that.absStartY, 200); }
				else {
					snap = that._snap(newPosX, newPosY);
					newPosX = snap.x;
					newPosY = snap.y;
					newDuration = m.max(snap.time, newDuration);
				}
			}

			that.scrollTo(m.round(newPosX), m.round(newPosY), newDuration);

			if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
			return;
		}

		// Do we need to snap?
		if (that.options.snap) {
			distX = newPosX - that.absStartX;
			distY = newPosY - that.absStartY;
			if (m.abs(distX) < that.options.snapThreshold && m.abs(distY) < that.options.snapThreshold) that.scrollTo(that.absStartX, that.absStartY, 200);
			else {
				snap = that._snap(that.x, that.y);
				if (snap.x != that.x || snap.y != that.y) that.scrollTo(snap.x, snap.y, snap.time);
			}

			if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
			return;
		}

		that._resetPos(200);
		if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
	},
	
	_resetPos: function (time) {
		var that = this,
			resetX = that.x >= 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x,
			resetY = that.y >= that.minScrollY || that.maxScrollY > 0 ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;

		if (resetX == that.x && resetY == that.y) {
			if (that.moved) {
				that.moved = false;
				if (that.options.onScrollEnd) that.options.onScrollEnd.call(that);		// Execute custom code on scroll end
			}

			if (that.hScrollbar && that.options.hideScrollbar) {
				if (vendor == 'webkit') that.hScrollbarWrapper.style[transitionDelay] = '300ms';
				that.hScrollbarWrapper.style.opacity = '0';
			}
			if (that.vScrollbar && that.options.hideScrollbar) {
				if (vendor == 'webkit') that.vScrollbarWrapper.style[transitionDelay] = '300ms';
				that.vScrollbarWrapper.style.opacity = '0';
			}

			return;
		}

		that.scrollTo(resetX, resetY, time || 0);
	},

	_wheel: function (e) {
		var that = this,
			wheelDeltaX, wheelDeltaY,
			deltaX, deltaY,
			deltaScale;

		if ('wheelDeltaX' in e) {
			wheelDeltaX = e.wheelDeltaX / 12;
			wheelDeltaY = e.wheelDeltaY / 12;
		} else if('wheelDelta' in e) {
			wheelDeltaX = wheelDeltaY = e.wheelDelta / 12;
		} else if ('detail' in e) {
			wheelDeltaX = wheelDeltaY = -e.detail * 3;
		} else {
			return;
		}
		
		if (that.options.wheelAction == 'zoom') {
			deltaScale = that.scale * Math.pow(2, 1/3 * (wheelDeltaY ? wheelDeltaY / Math.abs(wheelDeltaY) : 0));
			if (deltaScale < that.options.zoomMin) deltaScale = that.options.zoomMin;
			if (deltaScale > that.options.zoomMax) deltaScale = that.options.zoomMax;
			
			if (deltaScale != that.scale) {
				if (!that.wheelZoomCount && that.options.onZoomStart) that.options.onZoomStart.call(that, e);
				that.wheelZoomCount++;
				
				that.zoom(e.pageX, e.pageY, deltaScale, 400);
				
				setTimeout(function() {
					that.wheelZoomCount--;
					if (!that.wheelZoomCount && that.options.onZoomEnd) that.options.onZoomEnd.call(that, e);
				}, 400);
			}
			
			return;
		}
		
		deltaX = that.x + wheelDeltaX;
		deltaY = that.y + wheelDeltaY;

		if (deltaX > 0) deltaX = 0;
		else if (deltaX < that.maxScrollX) deltaX = that.maxScrollX;

		if (deltaY > that.minScrollY) deltaY = that.minScrollY;
		else if (deltaY < that.maxScrollY) deltaY = that.maxScrollY;
    
		if (that.maxScrollY < 0) {
			that.scrollTo(deltaX, deltaY, 0);
		}
	},
	
	_transitionEnd: function (e) {
		var that = this;

		if (e.target != that.scroller) return;

		that._unbind(TRNEND_EV);
		
		that._startAni();
	},


	/**
	*
	* Utilities
	*
	*/
	_startAni: function () {
		var that = this,
			startX = that.x, startY = that.y,
			startTime = Date.now(),
			step, easeOut,
			animate;

		if (that.animating) return;
		
		if (!that.steps.length) {
			that._resetPos(400);
			return;
		}
		
		step = that.steps.shift();
		
		if (step.x == startX && step.y == startY) step.time = 0;

		that.animating = true;
		that.moved = true;
		
		if (that.options.useTransition) {
			that._transitionTime(step.time);
			that._pos(step.x, step.y);
			that.animating = false;
			if (step.time) that._bind(TRNEND_EV);
			else that._resetPos(0);
			return;
		}

		animate = function () {
			var now = Date.now(),
				newX, newY;

			if (now >= startTime + step.time) {
				that._pos(step.x, step.y);
				that.animating = false;
				if (that.options.onAnimationEnd) that.options.onAnimationEnd.call(that);			// Execute custom code on animation end
				that._startAni();
				return;
			}

			now = (now - startTime) / step.time - 1;
			easeOut = m.sqrt(1 - now * now);
			newX = (step.x - startX) * easeOut + startX;
			newY = (step.y - startY) * easeOut + startY;
			that._pos(newX, newY);
			if (that.animating) that.aniTime = nextFrame(animate);
		};

		animate();
	},

	_transitionTime: function (time) {
		time += 'ms';
		this.scroller.style[transitionDuration] = time;
		if (this.hScrollbar) this.hScrollbarIndicator.style[transitionDuration] = time;
		if (this.vScrollbar) this.vScrollbarIndicator.style[transitionDuration] = time;
	},

	_momentum: function (dist, time, maxDistUpper, maxDistLower, size) {
		var deceleration = 0.0006,
			speed = m.abs(dist) / time,
			newDist = (speed * speed) / (2 * deceleration),
			newTime = 0, outsideDist = 0;

		// Proportinally reduce speed if we are outside of the boundaries
		if (dist > 0 && newDist > maxDistUpper) {
			outsideDist = size / (6 / (newDist / speed * deceleration));
			maxDistUpper = maxDistUpper + outsideDist;
			speed = speed * maxDistUpper / newDist;
			newDist = maxDistUpper;
		} else if (dist < 0 && newDist > maxDistLower) {
			outsideDist = size / (6 / (newDist / speed * deceleration));
			maxDistLower = maxDistLower + outsideDist;
			speed = speed * maxDistLower / newDist;
			newDist = maxDistLower;
		}

		newDist = newDist * (dist < 0 ? -1 : 1);
		newTime = speed / deceleration;

		return { dist: newDist, time: m.round(newTime) };
	},

	_offset: function (el) {
		var left = -el.offsetLeft,
			top = -el.offsetTop;
			
		while (el = el.offsetParent) {
			left -= el.offsetLeft;
			top -= el.offsetTop;
		}
		
		if (el != this.wrapper) {
			left *= this.scale;
			top *= this.scale;
		}

		return { left: left, top: top };
	},

	_snap: function (x, y) {
		var that = this,
			i, l,
			page, time,
			sizeX, sizeY;

		// Check page X
		page = that.pagesX.length - 1;
		for (i=0, l=that.pagesX.length; i<l; i++) {
			if (x >= that.pagesX[i]) {
				page = i;
				break;
			}
		}
		if (page == that.currPageX && page > 0 && that.dirX < 0) page--;
		x = that.pagesX[page];
		sizeX = m.abs(x - that.pagesX[that.currPageX]);
		sizeX = sizeX ? m.abs(that.x - x) / sizeX * 500 : 0;
		that.currPageX = page;

		// Check page Y
		page = that.pagesY.length-1;
		for (i=0; i<page; i++) {
			if (y >= that.pagesY[i]) {
				page = i;
				break;
			}
		}
		if (page == that.currPageY && page > 0 && that.dirY < 0) page--;
		y = that.pagesY[page];
		sizeY = m.abs(y - that.pagesY[that.currPageY]);
		sizeY = sizeY ? m.abs(that.y - y) / sizeY * 500 : 0;
		that.currPageY = page;

		// Snap with constant speed (proportional duration)
		time = m.round(m.max(sizeX, sizeY)) || 200;

		return { x: x, y: y, time: time };
	},

	_bind: function (type, el, bubble) {
		(el || this.scroller).addEventListener(type, this, !!bubble);
	},

	_unbind: function (type, el, bubble) {
		(el || this.scroller).removeEventListener(type, this, !!bubble);
	},


	/**
	*
	* Public methods
	*
	*/
	destroy: function () {
		var that = this;

		that.scroller.style[transform] = '';

		// Remove the scrollbars
		that.hScrollbar = false;
		that.vScrollbar = false;
		that._scrollbar('h');
		that._scrollbar('v');

		// Remove the event listeners
		that._unbind(RESIZE_EV, window);
		that._unbind(START_EV);
		that._unbind(MOVE_EV, window);
		that._unbind(END_EV, window);
		that._unbind(CANCEL_EV, window);
		
		if (!that.options.hasTouch) {
			that._unbind('DOMMouseScroll');
			that._unbind('mousewheel');
		}
		
		if (that.options.useTransition) that._unbind(TRNEND_EV);
		
		if (that.options.checkDOMChanges) clearInterval(that.checkDOMTime);
		
		if (that.options.onDestroy) that.options.onDestroy.call(that);
	},

	refresh: function () {
		var that = this,
			offset,
			i, l,
			els,
			pos = 0,
			page = 0;

		if (that.scale < that.options.zoomMin) that.scale = that.options.zoomMin;
		that.wrapperW = that.wrapper.clientWidth || 1;
		that.wrapperH = that.wrapper.clientHeight || 1;

		that.minScrollY = -that.options.topOffset || 0;
		that.scrollerW = m.round(that.scroller.offsetWidth * that.scale);
		that.scrollerH = m.round((that.scroller.offsetHeight + that.minScrollY) * that.scale);
		that.maxScrollX = that.wrapperW - that.scrollerW;
		that.maxScrollY = that.wrapperH - that.scrollerH + that.minScrollY;
		that.dirX = 0;
		that.dirY = 0;

		if (that.options.onRefresh) that.options.onRefresh.call(that);

		that.hScroll = that.options.hScroll && that.maxScrollX < 0;
		that.vScroll = that.options.vScroll && (!that.options.bounceLock && !that.hScroll || that.scrollerH > that.wrapperH);

		that.hScrollbar = that.hScroll && that.options.hScrollbar;
		that.vScrollbar = that.vScroll && that.options.vScrollbar && that.scrollerH > that.wrapperH;

		offset = that._offset(that.wrapper);
		that.wrapperOffsetLeft = -offset.left;
		that.wrapperOffsetTop = -offset.top;

		// Prepare snap
		if (typeof that.options.snap == 'string') {
			that.pagesX = [];
			that.pagesY = [];
			els = that.scroller.querySelectorAll(that.options.snap);
			for (i=0, l=els.length; i<l; i++) {
				pos = that._offset(els[i]);
				pos.left += that.wrapperOffsetLeft;
				pos.top += that.wrapperOffsetTop;
				that.pagesX[i] = pos.left < that.maxScrollX ? that.maxScrollX : pos.left * that.scale;
				that.pagesY[i] = pos.top < that.maxScrollY ? that.maxScrollY : pos.top * that.scale;
			}
		} else if (that.options.snap) {
			that.pagesX = [];
			while (pos >= that.maxScrollX) {
				that.pagesX[page] = pos;
				pos = pos - that.wrapperW;
				page++;
			}
			if (that.maxScrollX%that.wrapperW) that.pagesX[that.pagesX.length] = that.maxScrollX - that.pagesX[that.pagesX.length-1] + that.pagesX[that.pagesX.length-1];

			pos = 0;
			page = 0;
			that.pagesY = [];
			while (pos >= that.maxScrollY) {
				that.pagesY[page] = pos;
				pos = pos - that.wrapperH;
				page++;
			}
			if (that.maxScrollY%that.wrapperH) that.pagesY[that.pagesY.length] = that.maxScrollY - that.pagesY[that.pagesY.length-1] + that.pagesY[that.pagesY.length-1];
		}

		// Prepare the scrollbars
		that._scrollbar('h');
		that._scrollbar('v');

		if (!that.zoomed) {
			that.scroller.style[transitionDuration] = '0';
			that._resetPos(400);
		}
	},

	scrollTo: function (x, y, time, relative) {
		var that = this,
			step = x,
			i, l;

		that.stop();

		if (!step.length) step = [{ x: x, y: y, time: time, relative: relative }];
		
		for (i=0, l=step.length; i<l; i++) {
			if (step[i].relative) { step[i].x = that.x - step[i].x; step[i].y = that.y - step[i].y; }
			that.steps.push({ x: step[i].x, y: step[i].y, time: step[i].time || 0 });
		}

		that._startAni();
	},

	scrollToElement: function (el, time) {
		var that = this, pos;
		el = el.nodeType ? el : that.scroller.querySelector(el);
		if (!el) return;

		pos = that._offset(el);
		pos.left += that.wrapperOffsetLeft;
		pos.top += that.wrapperOffsetTop;

		pos.left = pos.left > 0 ? 0 : pos.left < that.maxScrollX ? that.maxScrollX : pos.left;
		pos.top = pos.top > that.minScrollY ? that.minScrollY : pos.top < that.maxScrollY ? that.maxScrollY : pos.top;
		time = time === undefined ? m.max(m.abs(pos.left)*2, m.abs(pos.top)*2) : time;

		that.scrollTo(pos.left, pos.top, time);
	},

	scrollToPage: function (pageX, pageY, time) {
		var that = this, x, y;
		
		time = time === undefined ? 400 : time;

		if (that.options.onScrollStart) that.options.onScrollStart.call(that);

		if (that.options.snap) {
			pageX = pageX == 'next' ? that.currPageX+1 : pageX == 'prev' ? that.currPageX-1 : pageX;
			pageY = pageY == 'next' ? that.currPageY+1 : pageY == 'prev' ? that.currPageY-1 : pageY;

			pageX = pageX < 0 ? 0 : pageX > that.pagesX.length-1 ? that.pagesX.length-1 : pageX;
			pageY = pageY < 0 ? 0 : pageY > that.pagesY.length-1 ? that.pagesY.length-1 : pageY;

			that.currPageX = pageX;
			that.currPageY = pageY;
			x = that.pagesX[pageX];
			y = that.pagesY[pageY];
		} else {
			x = -that.wrapperW * pageX;
			y = -that.wrapperH * pageY;
			if (x < that.maxScrollX) x = that.maxScrollX;
			if (y < that.maxScrollY) y = that.maxScrollY;
		}

		that.scrollTo(x, y, time);
	},

	disable: function () {
		this.stop();
		this._resetPos(0);
		this.enabled = false;

		// If disabled after touchstart we make sure that there are no left over events
		this._unbind(MOVE_EV, window);
		this._unbind(END_EV, window);
		this._unbind(CANCEL_EV, window);
	},
	
	enable: function () {
		this.enabled = true;
	},
	
	stop: function () {
		if (this.options.useTransition) this._unbind(TRNEND_EV);
		else cancelFrame(this.aniTime);
		this.steps = [];
		this.moved = false;
		this.animating = false;
	},
	
	zoom: function (x, y, scale, time) {
		var that = this,
			relScale = scale / that.scale;

		if (!that.options.useTransform) return;

		that.zoomed = true;
		time = time === undefined ? 200 : time;
		x = x - that.wrapperOffsetLeft - that.x;
		y = y - that.wrapperOffsetTop - that.y;
		that.x = x - x * relScale + that.x;
		that.y = y - y * relScale + that.y;

		that.scale = scale;
		that.refresh();

		that.x = that.x > 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x;
		that.y = that.y > that.minScrollY ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;

		that.scroller.style[transitionDuration] = time + 'ms';
		that.scroller.style[transform] = 'translate(' + that.x + 'px,' + that.y + 'px) scale(' + scale + ')' + translateZ;
		that.zoomed = false;
	},
	
	isReady: function () {
		return !this.moved && !this.zoomed && !this.animating;
	}
};

function prefixStyle (style) {
	if ( vendor === '' ) return style;

	style = style.charAt(0).toUpperCase() + style.substr(1);
	return vendor + style;
}

dummyStyle = null;	// for the sake of it

if (typeof exports !== 'undefined') exports.iScroll = iScroll;
else window.iScroll = iScroll;

})(window, document);
;
/** The osmplayer namespace. */
var osmplayer = osmplayer || {};

/**
 * @constructor
 * @extends minplayer.display
 * @class This class creates the playlist functionality for the minplayer.
 *
 * @param {object} context The jQuery context.
 * @param {object} options This components options.
 */
osmplayer.playlist = function(context, options) {

  // Derive from display
  minplayer.display.call(this, 'playlist', context, options);
};

/** Derive from minplayer.display. */
osmplayer.playlist.prototype = new minplayer.display();

/** Reset the constructor. */
osmplayer.playlist.prototype.constructor = osmplayer.playlist;

/**
 * Returns the default options for this plugin.
 *
 * @param {object} options The default options for this plugin.
 */
osmplayer.playlist.prototype.defaultOptions = function(options) {
  options.vertical = true;
  options.playlist = '';
  options.pageLimit = 10;
  options.autoNext = true;
  options.shuffle = false;
  options.loop = false;
  options.hysteresis = 40;
  options.scrollSpeed = 20;
  options.scrollMode = 'auto';
  minplayer.display.prototype.defaultOptions.call(this, options);
};

/**
 * @see minplayer.plugin#construct
 */
osmplayer.playlist.prototype.construct = function() {

  /** The nodes within this playlist. */
  this.nodes = [];

  // Current page.
  this.page = -1;

  // The total amount of nodes.
  this.totalItems = 0;

  // The current loaded item index.
  this.currentItem = -1;

  // The play playqueue.
  this.playqueue = [];

  // The playqueue position.
  this.playqueuepos = 0;

  // The current playlist.
  this.playlist = this.options.playlist;

  // Create the scroll bar.
  this.scroll = null;

  // Create our orientation variable.
  this.orient = {
    pos: this.options.vertical ? 'y' : 'x',
    pagePos: this.options.vertical ? 'pageY' : 'pageX',
    offset: this.options.vertical ? 'top' : 'left',
    wrapperSize: this.options.vertical ? 'wrapperH' : 'wrapperW',
    minScroll: this.options.vertical ? 'minScrollY' : 'minScrollX',
    maxScroll: this.options.vertical ? 'maxScrollY' : 'maxScrollX',
    size: this.options.vertical ? 'height' : 'width'
  };

  // Create the pager.
  this.pager = this.create('pager', 'osmplayer');
  this.pager.ubind(this.uuid + ':nextPage', (function(playlist) {
    return function(event) {
      playlist.nextPage();
    };
  })(this));
  this.pager.ubind(this.uuid + ':prevPage', (function(playlist) {
    return function(event) {
      playlist.prevPage();
    };
  })(this));

  // Call the minplayer plugin constructor.
  minplayer.display.prototype.construct.call(this);

  // Load the "next" item.
  this.hasPlaylist = this.next();

  // Say that we are ready.
  this.ready();
};

/**
 * @see minplayer.plugin.onAdded
 */
osmplayer.playlist.prototype.onAdded = function(plugin) {

  // Get the media.
  if (this.options.autoNext) {

    // Get the player from this plugin.
    plugin.get('player', (function(playlist) {
      return function(player) {
        player.ubind(playlist.uuid + ':player_ended', function(event) {
          if (playlist.hasPlaylist) {
            player.options.autoplay = true;
            playlist.next();
          }
        });
      };
    })(this));
  }
};

/**
 * Wrapper around the scroll scrollTo method.
 *
 * @param {number} pos The position you would like to set the list.
 * @param {boolean} relative If this is a relative position change.
 */
osmplayer.playlist.prototype.scrollTo = function(pos, relative) {
  if (this.scroll) {
    this.scroll.options.hideScrollbar = false;
    if (this.options.vertical) {
      this.scroll.scrollTo(0, pos, 0, relative);
    }
    else {
      this.scroll.scrollTo(pos, 0, 0, relative);
    }
    this.scroll.options.hideScrollbar = true;
  }
};

/**
 * Refresh the scrollbar.
 */
osmplayer.playlist.prototype.refreshScroll = function() {

  // Make sure that our window has the addEventListener to keep IE happy.
  if (!window.addEventListener) {
    setTimeout((function(playlist) {
      return function() {
        playlist.refreshScroll.call(playlist);
      };
    })(this), 200);
    return;
  }

  // Check the size of the playlist.
  var list = this.elements.list;
  var scroll = this.elements.scroll;

  // Destroy the scroll bar first.
  if (this.scroll) {
    this.scroll.scrollTo(0, 0);
    this.scroll.destroy();
    this.scroll = null;
    this.elements.list
        .unbind('mousemove')
        .unbind('mouseenter')
        .unbind('mouseleave');
  }

  // Need to force the width of the list.
  if (!this.options.vertical) {
    var listSize = 0;
    jQuery.each(this.elements.list.children(), function() {
      listSize += jQuery(this).outerWidth();
    });
    this.elements.list.width(listSize);
  }

  // Check to see if we should add a scroll bar functionality.
  if ((list.length > 0) &&
      (scroll.length > 0) &&
      (list[this.orient.size]() > scroll[this.orient.size]())) {

    // Setup the iScroll component.
    this.scroll = new iScroll(this.elements.scroll.eq(0)[0], {
      hScroll: !this.options.vertical,
      hScrollbar: !this.options.vertical,
      vScroll: this.options.vertical,
      vScrollbar: this.options.vertical,
      hideScrollbar: (this.options.scrollMode !== 'none')
    });

    // Use autoScroll for non-touch devices.
    if ((this.options.scrollMode == 'auto') && !minplayer.hasTouch) {

      // Bind to the mouse events for autoscrolling.
      this.elements.list.bind('mousemove', (function(playlist) {
        return function(event) {
          event.preventDefault();
          var offset = playlist.display.offset()[playlist.orient.offset];
          playlist.mousePos = event[playlist.orient.pagePos];
          playlist.mousePos -= offset;
        };
      })(this)).bind('mouseenter', (function(playlist) {
        return function(event) {
          event.preventDefault();
          playlist.scrolling = true;
          var setScroll = function() {
            if (playlist.scrolling) {
              var scrollSize = playlist.scroll[playlist.orient.wrapperSize];
              var scrollMid = (scrollSize / 2);
              var delta = playlist.mousePos - scrollMid;
              if (Math.abs(delta) > playlist.options.hysteresis) {
                var hyst = playlist.options.hysteresis;
                hyst *= (delta > 0) ? -1 : 0;
                delta = (playlist.options.scrollSpeed * (delta + hyst));
                delta /= scrollMid;
                var pos = playlist.scroll[playlist.orient.pos] - delta;
                var min = playlist.scroll[playlist.orient.minScroll] || 0;
                var max = playlist.scroll[playlist.orient.maxScroll];
                if (pos >= min) {
                  playlist.scrollTo(min);
                }
                else if (pos <= max) {
                  playlist.scrollTo(max);
                }
                else {
                  playlist.scrollTo(delta, true);
                }
              }

              // Set timeout to try again.
              setTimeout(setScroll, 30);
            }
          };
          setScroll();
        };
      })(this)).bind('mouseleave', (function(playlist) {
        return function(event) {
          event.preventDefault();
          playlist.scrolling = false;
        };
      })(this));
    }

    this.scroll.refresh();
    this.scroll.scrollTo(0, 0, 200);
  }
};

/**
 * Adds a new node to the playlist.
 *
 * @param {object} node The node that you would like to add to the playlist.
 */
osmplayer.playlist.prototype.addNode = function(node) {

  // Get the current index for this node.
  var index = this.nodes.length;

  // Create the teaser object.
  var teaser = this.create('teaser', 'osmplayer', this.elements.list);

  // Set the node for this teaser.
  teaser.setNode(node);

  // Bind to when it loads.
  teaser.ubind(this.uuid + ':nodeLoad', (function(playlist) {
    return function(event, data) {
      playlist.loadItem(index);
    };
  })(this));

  // Add this to our nodes array.
  this.nodes.push(teaser);
};

/**
 * Sets the playlist.
 *
 * @param {object} playlist The playlist object.
 * @param {integer} loadIndex The index of the item to load.
 */
osmplayer.playlist.prototype.set = function(playlist, loadIndex) {

  // Check to make sure the playlist is an object.
  if (typeof playlist !== 'object') {
    this.trigger('error', 'Playlist must be an object to set');
    return;
  }

  // Check to make sure the playlist has correct format.
  if (!playlist.hasOwnProperty('total_rows')) {
    this.trigger('error', 'Unknown playlist format.');
    return;
  }

  // Make sure the playlist has some rows.
  if (playlist.total_rows && playlist.nodes.length) {

    // Set the total rows.
    this.totalItems = playlist.total_rows;
    this.currentItem = 0;

    // Show or hide the next page if there is or is not a next page.
    if ((((this.page + 1) * this.options.pageLimit) >= this.totalItems) ||
        (this.totalItems == playlist.nodes.length)) {
      this.pager.nextPage.hide();
    }
    else {
      this.pager.nextPage.show();
    }

    var teaser = null;
    var numNodes = playlist.nodes.length;
    this.elements.list.empty();
    this.nodes = [];

    // Iterate through all the nodes.
    for (var index = 0; index < numNodes; index++) {

      // Add this node to the playlist.
      this.addNode(playlist.nodes[index]);

      // If the index is equal to the loadIndex.
      if (loadIndex === index) {
        this.loadItem(index);
      }
    }

    // Refresh the sizes.
    this.refreshScroll();

    // Trigger that the playlist has loaded.
    this.trigger('playlistLoad', playlist);
  }

  // Show that we are no longer busy.
  if (this.elements.playlist_busy) {
    this.elements.playlist_busy.hide();
  }
};

/**
 * Stores the current playlist state in the playqueue.
 */
osmplayer.playlist.prototype.setQueue = function() {

  // Add this item to the playqueue.
  this.playqueue.push({
    page: this.page,
    item: this.currentItem
  });

  // Store the current playqueue position.
  this.playqueuepos = this.playqueue.length;
};

/**
 * Loads the next item.
 *
 * @return {boolean} TRUE if loaded, FALSE if not.
 */
osmplayer.playlist.prototype.next = function() {
  var item = 0, page = this.page;

  // See if we are at the front of the playqueue.
  if (this.playqueuepos >= this.playqueue.length) {

    // If this is shuffle, then load a random item.
    if (this.options.shuffle) {
      item = Math.floor(Math.random() * this.totalItems);
      page = Math.floor(item / this.options.pageLimit);
      item = item % this.options.pageLimit;
      return this.load(page, item);
    }
    else {

      // Otherwise, increment the current item by one.
      item = (this.currentItem + 1);
      if (item >= this.nodes.length) {
        return this.load(page + 1, 0);
      }
      else {
        return this.loadItem(item);
      }
    }
  }
  else {

    // Load the next item in the playqueue.
    this.playqueuepos = this.playqueuepos + 1;
    var currentQueue = this.playqueue[this.playqueuepos];
    return this.load(currentQueue.page, currentQueue.item);
  }
};

/**
 * Loads the previous item.
 *
 * @return {boolean} TRUE if loaded, FALSE if not.
 */
osmplayer.playlist.prototype.prev = function() {

  // Move back into the playqueue.
  this.playqueuepos = this.playqueuepos - 1;
  this.playqueuepos = (this.playqueuepos < 0) ? 0 : this.playqueuepos;
  var currentQueue = this.playqueue[this.playqueuepos];
  if (currentQueue) {
    return this.load(currentQueue.page, currentQueue.item);
  }
  return false;
};

/**
 * Loads a playlist node.
 *
 * @param {number} index The index of the item you would like to load.
 * @return {boolean} TRUE if loaded, FALSE if not.
 */
osmplayer.playlist.prototype.loadItem = function(index) {
  if (index < this.nodes.length) {
    this.setQueue();

    // Get the teaser at the current index and deselect it.
    var teaser = this.nodes[this.currentItem];
    teaser.select(false);
    this.currentItem = index;

    // Get the new teaser and select it.
    teaser = this.nodes[index];
    teaser.select(true);
    this.trigger('nodeLoad', teaser.node);
    return true;
  }

  return false;
};

/**
 * Loads the next page.
 *
 * @param {integer} loadIndex The index of the item to load.
 * @return {boolean} TRUE if loaded, FALSE if not.
 */
osmplayer.playlist.prototype.nextPage = function(loadIndex) {
  return this.load(this.page + 1, loadIndex);
};

/**
 * Loads the previous page.
 *
 * @param {integer} loadIndex The index of the item to load.
 * @return {boolean} TRUE if loaded, FALSE if not.
 */
osmplayer.playlist.prototype.prevPage = function(loadIndex) {
  return this.load(this.page - 1, loadIndex);
};

/**
 * Loads a playlist.
 *
 * @param {integer} page The page to load.
 * @param {integer} loadIndex The index of the item to load.
 * @return {boolean} TRUE if loaded, FALSE if not.
 */
osmplayer.playlist.prototype.load = function(page, loadIndex) {

  // If the playlist and pages are the same, then no need to load.
  if ((this.playlist == this.options.playlist) && (page == this.page)) {
    return this.loadItem(loadIndex);
  }

  // Set the new playlist.
  this.playlist = this.options.playlist;

  // Return if there aren't any playlists to play.
  if (!this.playlist) {
    return false;
  }

  // Determine if we need to loop.
  var maxPages = Math.floor(this.totalItems / this.options.pageLimit);
  if (page > maxPages) {
    if (this.options.loop) {
      page = 0;
      loadIndex = 0;
    }
    else {
      return false;
    }
  }

  // Say that we are busy.
  if (this.elements.playlist_busy) {
    this.elements.playlist_busy.show();
  }

  // Normalize the page.
  page = page || 0;
  page = (page < 0) ? 0 : page;

  // Set the queue.
  this.setQueue();

  // Set the new page.
  this.page = page;

  // Hide or show the page based on if we are on the first page.
  if (this.page === 0) {
    this.pager.prevPage.hide();
  }
  else {
    this.pager.prevPage.show();
  }

  // If the playlist is an object, then go ahead and set it.
  if (typeof this.playlist == 'object') {
    this.set(this.playlist, loadIndex);
    if (this.playlist.endpoint) {
      this.playlist = this.options.playlist = this.playlist.endpoint;
    }
    return true;
  }

  // Get the highest priority parser.
  var parser = osmplayer.parser['default'];
  for (var name in osmplayer.parser) {
    if (osmplayer.parser.hasOwnProperty(name)) {
      if (osmplayer.parser[name].valid(this.playlist)) {
        if (osmplayer.parser[name].priority > parser.priority) {
          parser = osmplayer.parser[name];
        }
      }
    }
  }

  // The start index.
  var start = this.page * this.options.pageLimit;

  // Get the feed from the parser.
  var feed = parser.getFeed(
    this.playlist,
    start,
    this.options.pageLimit
  );

  // Build our request.
  var request = {
    type: 'GET',
    url: feed,
    success: (function(playlist) {
      return function(data) {
        playlist.set(parser.parse(data), loadIndex);
      };
    })(this),
    error: (function(playlist) {
      return function(XMLHttpRequest, textStatus, errorThrown) {
        if (playlist.elements.playlist_busy) {
          playlist.elements.playlist_busy.hide();
        }
        playlist.trigger('error', textStatus);
      };
    })(this)
  };

  // Set the data if applicable.
  var dataType = parser.getType();
  if (dataType) {
    request.dataType = dataType;
  }

  // Perform an ajax callback.
  jQuery.ajax(request);

  // Return that we did something.
  return true;
};
;
/** The osmplayer namespace. */
var osmplayer = osmplayer || {};

/**
 * @constructor
 * @extends minplayer.display
 * @class This class provides pager functionality.
 *
 * @param {object} context The jQuery context.
 * @param {object} options This components options.
 */
osmplayer.pager = function(context, options) {

  // Derive from display
  minplayer.display.call(this, 'pager', context, options);
};

/** Derive from minplayer.display. */
osmplayer.pager.prototype = new minplayer.display();

/** Reset the constructor. */
osmplayer.pager.prototype.constructor = osmplayer.pager;

/**
 * @see minplayer.plugin#construct
 */
osmplayer.pager.prototype.construct = function() {

  // Call the minplayer plugin constructor.
  minplayer.display.prototype.construct.call(this);

  // Setup the prev button.
  if (this.elements.prevPage) {
    this.prevPage = this.elements.prevPage.click((function(pager) {
      return function(event) {
        event.preventDefault();
        pager.trigger('prevPage');
      };
    })(this));
  }

  // Setup the next button.
  if (this.elements.nextPage) {
    this.nextPage = this.elements.nextPage.click((function(pager) {
      return function(event) {
        event.preventDefault();
        pager.trigger('nextPage');
      };
    })(this));
  }
};
;
/** The osmplayer namespace. */
var osmplayer = osmplayer || {};

/**
 * @constructor
 * @extends minplayer.display
 * @class This class provides teaser functionality.
 *
 * @param {object} context The jQuery context.
 * @param {object} options This components options.
 */
osmplayer.teaser = function(context, options) {

  /** The preview image. */
  this.preview = null;

  // Derive from display
  minplayer.display.call(this, 'teaser', context, options);
};

/** Derive from minplayer.display. */
osmplayer.teaser.prototype = new minplayer.display();

/** Reset the constructor. */
osmplayer.teaser.prototype.constructor = osmplayer.teaser;

/**
 * Selects the teaser.
 *
 * @param {boolean} selected TRUE if selected, FALSE otherwise.
 */
osmplayer.teaser.prototype.select = function(selected) {
};

/**
 * Sets the node.
 *
 * @param {object} node The node object to set.
 */
osmplayer.teaser.prototype.setNode = function(node) {

  // Add this to the node info for this teaser.
  this.node = node;

  // Set the title of the teaser.
  if (this.elements.title) {
    if (node.title) {
      this.elements.title.text(node.title);
    }
    else {
      osmplayer.getNode(node, (function(teaser) {
        return function(node) {
          teaser.elements.title.text(node.title);
        };
      })(this));
    }
  }

  // Load the thumbnail image if it exists.
  if (node.mediafiles) {
    osmplayer.getImage(node.mediafiles, 'thumbnail', (function(teaser) {
      return function(image) {
        if (image && teaser.elements.image) {
          teaser.preview = new minplayer.image(teaser.elements.image);
          teaser.preview.load(image.path);
        }
      };
    })(this));
  }

  // Bind when they click on this teaser.
  this.display.unbind('click').click((function(teaser) {
    return function(event) {
      event.preventDefault();
      teaser.trigger('nodeLoad', teaser.node);
    };
  })(this));
};
;
(function(template, osmplayer) {

  /** The osmplayer namespace. */
  var osmplayer = osmplayer || {};

  // Define the controller object.
  osmplayer.controller = osmplayer.controller || {};

  /**
   * Constructor for the minplayer.controller
   */
  osmplayer.controller[template] = function(context, options) {

    // Derive from default controller
    minplayer.controller.call(this, context, options);
  };

  /** Derive from controller. */
  osmplayer.controller[template].prototype = new minplayer.controller();
  osmplayer.controller[template].prototype.constructor = osmplayer.controller[template];

  /**
   * @see minplayer.plugin#construct
   */
  osmplayer.controller[template].prototype.construct = function() {

    // Make sure we provide default options...
    this.options = jQuery.extend({
      volumeVertical: true
    }, this.options);

    minplayer.controller.prototype.construct.call(this);

    if (!this.options.volumeVertical || this.options.controllerOnly) {
      this.display.addClass('minplayer-controls-volume-horizontal');
      this.display.removeClass('minplayer-controls-volume-vertical');
      this.volumeBar.slider("option", "orientation", "horizontal");
    }
    else {
      this.display.addClass('minplayer-controls-volume-vertical');
      this.display.removeClass('minplayer-controls-volume-horizontal');
    }

    this.get('player', function(player) {
      if (!this.options.controllerOnly) {
        this.get('media', function(media) {
          if (!media.hasController()) {
            this.showThenHide(5000, function(shown) {
              var op = shown ? 'addClass' : 'removeClass';
              player.display[op]('with-controller');
            });
          }
          else {
            player.display.addClass('with-controller');
          }
        });
      }
      else {

        // Make sure the player shows overflow for controller only.
        player.display.css('overflow', 'visible');
      }
    });
  }

  /**
   * Return the display for this plugin.
   */
  osmplayer.controller[template].prototype.getDisplay = function() {

    // See if we need to build out the controller.
    if (this.options.build) {

      // Prepend the control template.
      jQuery('.minplayer-' + template, this.context).prepend('\
      <div class="minplayer-' + template + '-controls ui-widget-header">\
        <div class="minplayer-' + template + '-controls-left">\
          <a class="minplayer-' + template + '-play minplayer-' + template + '-button ui-state-default ui-corner-all" title="Play">\
            <span class="ui-icon ui-icon-play"></span>\
          </a>\
          <a class="minplayer-' + template + '-pause minplayer-' + template + '-button ui-state-default ui-corner-all" title="Pause">\
            <span class="ui-icon ui-icon-pause"></span>\
          </a>\
        </div>\
        <div class="minplayer-' + template + '-controls-right">\
          <div class="minplayer-' + template + '-timer">00:00</div>\
          <div class="minplayer-' + template + '-fullscreen ui-widget-content">\
            <div class="minplayer-' + template + '-fullscreen-inner ui-state-default"></div>\
          </div>\
          <div class="minplayer-' + template + '-volume">\
            <div class="minplayer-' + template + '-volume-slider"></div>\
            <a class="minplayer-' + template + '-volume-mute minplayer-' + template + '-button ui-state-default ui-corner-all" title="Mute">\
              <span class="ui-icon ui-icon-volume-on"></span>\
            </a>\
            <a class="minplayer-' + template + '-volume-unmute minplayer-' + template + '-button ui-state-default ui-corner-all" title="Unmute">\
              <span class="ui-icon ui-icon-volume-off"></span>\
            </a>\
          </div>\
        </div>\
        <div class="minplayer-' + template + '-controls-mid">\
          <div class="minplayer-' + template + '-seek">\
            <div class="minplayer-' + template + '-progress ui-state-default"></div>\
          </div>\
        </div>\
      </div>');
    }

    // Let our template know we have a controller.
    this.context.addClass('with-controller');

    return jQuery('.minplayer-' + template + '-controls', this.context);
  }

  // Return the elements
  osmplayer.controller[template].prototype.getElements = function() {
    var elements = minplayer.controller.prototype.getElements.call(this);
    var timer = jQuery('.minplayer-' + template + '-timer', this.display);
    return jQuery.extend(elements, {
      play: jQuery('.minplayer-' + template + '-play', this.display),
      pause: jQuery('.minplayer-' + template + '-pause', this.display),
      fullscreen: jQuery('.minplayer-' + template + '-fullscreen', this.display),
      seek: jQuery('.minplayer-' + template + '-seek', this.display),
      progress: jQuery('.minplayer-' + template + '-progress', this.display),
      volume: jQuery('.minplayer-' + template + '-volume-slider', this.display),
      mute: jQuery('.minplayer-' + template + '-volume-mute', this.display),
      timer:timer,
      duration:timer
    });
  };
})('stretchy', osmplayer);
;
(function(template, osmplayer) {

  /** The osmplayer namespace. */
  var osmplayer = osmplayer || {};

  // Define the busy object.
  osmplayer.pager = osmplayer.pager || {};

  // constructor.
  osmplayer.pager[template] = function(context, options) {

    // Derive from pager
    osmplayer.pager.call(this, context, options);
  };

  // Define the prototype for all controllers.
  osmplayer.pager[template].prototype = new osmplayer.pager();
  osmplayer.pager[template].prototype.constructor = osmplayer.pager[template];

  /**
   * Return the display for this plugin.
   */
  osmplayer.pager[template].prototype.getDisplay = function() {

    if (this.options.build) {

      // append the pager.
      this.context.append('\
      <div class="osmplayer-' + template + '-playlist-pager ui-widget-header">\
        <div class="osmplayer-' + template + '-playlist-pager-left">\
          <a href="#" class="osmplayer-' + template + '-playlist-pager-link osmplayer-' + template + '-playlist-pager-prevpage minplayer-' + template + '-button ui-state-default ui-corner-all">\
            <span class="ui-icon ui-icon-circle-triangle-w"></span>\
          </a>\
        </div>\
        <div class="osmplayer-' + template + '-playlist-pager-right">\
          <a href="#" class="osmplayer-' + template + '-playlist-pager-link osmplayer-' + template + '-playlist-pager-nextpage minplayer-' + template + '-button ui-state-default ui-corner-all">\
            <span class="ui-icon ui-icon-circle-triangle-e"></span>\
          </a>\
        </div>\
      </div>');
    }

    return jQuery('.osmplayer-' + template + '-playlist-pager', this.context);
  }

  // Return the elements
  osmplayer.pager[template].prototype.getElements = function() {
    var elements = osmplayer.pager.prototype.getElements.call(this);
    return jQuery.extend(elements, {
      prevPage:jQuery('.osmplayer-' + template + '-playlist-pager-prevpage', this.display),
      nextPage:jQuery('.osmplayer-' + template + '-playlist-pager-nextpage', this.display)
    });
  };
})('stretchy', osmplayer);

;
(function(template, osmplayer) {

  /** The osmplayer namespace. */
  var osmplayer = osmplayer || {};

  // Define the busy object.
  osmplayer.playLoader = osmplayer.playLoader || {};

  // constructor.
  osmplayer.playLoader[template] = function(context, options) {

    // Derive from playLoader
    minplayer.playLoader.call(this, context, options);
  };

  // Define the prototype for all controllers.
  osmplayer.playLoader[template].prototype = new minplayer.playLoader();
  osmplayer.playLoader[template].prototype.constructor = osmplayer.playLoader[template];

  /**
   * Return the display for this plugin.
   */
  osmplayer.playLoader[template].prototype.getDisplay = function() {

    // See if we need to build out the controller.
    if (this.options.build) {

      // Prepend the playloader template.
      jQuery('.minplayer-' + template + '', this.context).prepend('\
      <div class="minplayer-' + template + '-loader-wrapper">\
        <div class="minplayer-' + template + '-big-play ui-state-default"><span></span></div>\
        <div class="minplayer-' + template + '-loader">&nbsp;</div>\
        <div class="minplayer-' + template + '-preview ui-widget-content"></div>\
      </div>');
    }

    return jQuery('.minplayer-' + template + ' .minplayer-' + template + '-loader-wrapper', this.context);
  }

  // Return the elements
  osmplayer.playLoader[template].prototype.getElements = function() {
    var elements = minplayer.playLoader.prototype.getElements.call(this);
    return jQuery.extend(elements, {
      busy:jQuery('.minplayer-' + template + '-loader', this.display),
      bigPlay:jQuery('.minplayer-' + template + '-big-play', this.display),
      preview:jQuery('.minplayer-' + template + '-preview', this.display)
    });
  };
})('stretchy', osmplayer);

;
(function(template, osmplayer) {

  /** The osmplayer namespace. */
  var osmplayer = osmplayer || {};

  // Define the busy object.
  osmplayer.playlist = osmplayer.playlist || {};

  // constructor.
  osmplayer.playlist[template] = function(context, options) {

    // Derive from playlist
    osmplayer.playlist.call(this, context, options);
  };

  // Define the prototype for all controllers.
  osmplayer.playlist[template].prototype = new osmplayer.playlist();
  osmplayer.playlist[template].prototype.constructor = osmplayer.playlist[template];

  /**
   * @see minplayer.plugin#construct
   */
  osmplayer.playlist[template].prototype.construct = function() {

    this.options = jQuery.extend({
      showPlaylist: true
    }, this.options);

    osmplayer.playlist.prototype.construct.call(this);

    // Show then hide the element.
    this.showThenHide(this.elements.hideShow);

    // Make the main minplayer have the same width as the playlist.
    this.get('player', function(player) {

      // Set the size.
      var size = this.options.vertical ? 'width' : 'height';
      var position = this.options.vertical ? 'right' : 'bottom';
      var margin = this.options.vertical ? 'marginRight' : 'marginBottom';

      // Hide and show the playlist.
      this.hideShow = function(show, animate) {
        var playerPos = {}, displayPos = {};
        var displaySize = this.display[size]();
        var e = this.options.vertical ? 'e' : 's';
        var w = this.options.vertical ? 'w' : 'n';
        var from = show ? 'ui-icon-triangle-1-' + w : 'ui-icon-triangle-1-' + e;
        var to = show ? 'ui-icon-triangle-1-' + e : 'ui-icon-triangle-1-' + w;
        jQuery('span', this.elements.hideShow).removeClass(from).addClass(to);
        playerPos[position] = show ? displaySize : 0;
        if (player.elements.minplayer) {
          if (animate) {
            player.elements.minplayer.animate(playerPos, 'fast');
          }
          else {
            player.elements.minplayer.css(playerPos);
          }
        }
        displayPos[margin] = show ? 0 : -displaySize;
        if (animate) {
          this.display.animate(displayPos, 'fast', function() {
            player.resize();
          });
        }
        else {
          this.display.css(displayPos);
        }
      };

      // Show then hide the playlist.
      this.display.showMe = false;
      this.display.hideMe = (function(playlist) {
        return function(callback) {
          playlist.hideShow(false, true);
        };
      })(this);

      // Show then hide the display.
      this.showThenHide();

      // Bind when the playlist loads.
      this.ubind(this.uuid + ':playlistLoad', (function(playlist) {
        return function(event, data) {
          if (data.nodes.length === 1) {
            playlist.hideShow(false, true);
          }
          else {
            playlist.hideShow(true, true);
          }
        };
      })(this));

      // Perform the show hide functionality of the playlist.
      if (this.elements.hideShow) {
        this.elements.hideShow.bind('click', (function(playlist) {
          return function(event) {
            event.preventDefault();
            var button = jQuery('span', playlist.elements.hideShow);
            var e = playlist.options.vertical ? 'e' : 's';
            var w = playlist.options.vertical ? 'w' : 'n';
            var show = button.hasClass('ui-icon-triangle-1-' + w);
            playlist.hideShow(show, true);
          };
        })(this));
      }

      // If they wish to show the playlist.
      if (player.elements.minplayer) {
        if (this.options.showPlaylist) {

          // Set the player to have the correct margin if the playlist is present.
          if (this.options.vertical) {
            player.elements.minplayer.css('right', this.display.width() + 'px');
          }
          else {
            player.elements.minplayer.css('bottom', this.display.height() + 'px');
          }
        }
        else {

          // Hide the playlist.
          this.hideShow(false);
        }
      }
    });
  };

  /**
   * Return the display for this plugin.
   */
  osmplayer.playlist[template].prototype.getDisplay = function() {
    if (this.options.build) {
      this.context.append('\
      <div class="osmplayer-' + template + '-playlist">\
        <div class="osmplayer-' + template + '-hide-show-playlist ui-state-default">\
          <span class="ui-icon"></span>\
        </div>\
        <div class="minplayer-' + template + '-loader-wrapper">\
          <div class="minplayer-' + template + '-loader"></div>\
        </div>\
        <div class="osmplayer-' + template + '-playlist-scroll ui-widget-content">\
          <div class="osmplayer-' + template + '-playlist-list"></div>\
      </div>\
      </div>');
    }
    return jQuery('.osmplayer-' + template + '-playlist', this.context);
  };

  // Return the elements
  osmplayer.playlist[template].prototype.getElements = function() {
    var elements = osmplayer.playlist.prototype.getElements.call(this);

    // Setup the dynamic settings.
    var cName = this.options.vertical ? 'playlist-vertical' : 'playlist-horizontal';
    cName += this.options.playlistOnly ? ' playlist-only' : '';
    var show = this.options.showPlaylist;
    var icon = this.options.vertical ? (show ? 'e' : 'w') : (show ? 's' : 'n');
    var corner = this.options.vertical ? 'ui-corner-left' : 'ui-corner-top';

    // Remove the playlist if we need to.
    if (this.options.disablePlaylist || !this.options.playlist) {
      this.display.remove();
    }

    this.display.addClass(cName);
    var hideShow = jQuery('.osmplayer-' + template + '-hide-show-playlist', this.display);
    hideShow.addClass(corner);
    if (this.options.playlistOnly) {
      hideShow.hide();
      hideShow = null;
    }
    jQuery('span', hideShow).addClass('ui-icon-triangle-1-' + icon);

    return jQuery.extend(elements, {
      playlist_busy:jQuery('.minplayer-' + template + '-loader-wrapper', this.display),
      list:jQuery('.osmplayer-' + template + '-playlist-list', this.display),
      scroll:jQuery('.osmplayer-' + template + '-playlist-scroll', this.display),
      hideShow: hideShow
    });
  };
})('stretchy', osmplayer);

;
(function(template, osmplayer) {

  /** The osmplayer namespace. */
  var osmplayer = osmplayer || {};

  // templated player.
  osmplayer[template] = function(context, options) {

    // Derive from osmplayer.
    osmplayer.call(this, context, options);
  };

  /**
   * Define this template prototype.
   */
  osmplayer[template].prototype = new osmplayer();
  osmplayer[template].prototype.constructor = osmplayer[template];

  /**
   * The player constructor.
   */
  osmplayer[template].prototype.construct = function() {

    // Make sure we provide default options...
    this.options = jQuery.extend({
      controllerOnly: false
    }, this.options);

    osmplayer.prototype.construct.call(this);
    if (this.options.controllerOnly) {
      this.display.addClass('controller-only');
    }
  };

  /**
   * Return the display for this plugin.
   */
  osmplayer[template].prototype.getDisplay = function() {

    // If this is the bottom element, then we need to build.
    if (this.context.children().length == 0) {

      // Build out the player provided the base tag.
      this.context = this.context.attr({
        'id': this.options.id + '-player',
        'class': 'minplayer-' + template + '-media'
      })
      .wrap(jQuery(document.createElement('div')).attr({
        'class': 'minplayer-' + template + '-display ui-widget-content'
      })).parent('.minplayer-' + template + '-display')
      .wrap(jQuery(document.createElement('div')).attr({
        'class': 'minplayer-' + template
      })).parent('.minplayer-' + template)
      .prepend('\
        <div class="minplayer-' + template + '-logo"></div>\
        <div class="minplayer-' + template + '-error"></div>'
      )
      .wrap(jQuery(document.createElement('div')).attr({
        'id': this.options.id,
        'class': 'osmplayer-' + template + ' player-ui'
      })).parent('.osmplayer-' + template);

      // Mark a flag that says this display needs to be built.
      this.options.build = true;
    }

    return this.context;
  }

  // Get the elements for this player.
  osmplayer[template].prototype.getElements = function() {
    var elements = osmplayer.prototype.getElements.call(this);

    // Set the width and height of this element.
    this.display.width(this.options.width);
    this.display.height(this.options.height);

    // Get the minplayer component.
    var minplayer = jQuery('.minplayer-' + template, this.display);
    if (this.options.playlistOnly) {
      minplayer.remove();
      minplayer = null;
    }

    return jQuery.extend(elements, {
      player:this.display,
      minplayer: minplayer,
      display:jQuery('.minplayer-' + template + '-display', this.display),
      media:jQuery('.minplayer-' + template + '-media', this.display),
      error:jQuery('.minplayer-' + template + '-error', this.display),
      logo:jQuery('.minplayer-' + template + '-logo', this.display)
    });
  };
})('stretchy', osmplayer);
;
(function(template, osmplayer) {

  /** The osmplayer namespace. */
  var osmplayer = osmplayer || {};

  // Define the teaser object.
  osmplayer.teaser = osmplayer.teaser || {};

  // constructor.
  osmplayer.teaser[template] = function(context, options) {

    // Derive from teaser
    osmplayer.teaser.call(this, context, options);
  };

  // Define the prototype for all controllers.
  osmplayer.teaser[template].prototype = new osmplayer.teaser();
  osmplayer.teaser[template].prototype.constructor = osmplayer.teaser[template];

  /**
   * @see minplayer.plugin#construct
   */
  osmplayer.teaser[template].prototype.construct = function() {

    minplayer.display.prototype.construct.call(this);

    // Add some hover events.
    this.display.bind('mouseenter', (function(info) {
      return function() {
        info.addClass('ui-state-hover');
      };
    })(this.elements.info)).bind('mouseleave', (function(info) {
      return function() {
        info.removeClass('ui-state-hover');
      };
    })(this.elements.info));
  };

  /**
   * Return the display for this plugin.
   */
  osmplayer.teaser[template].prototype.getDisplay = function() {

    // Append this to the list.
    this.context.append('\
    <div class="osmplayer-' + template + '-teaser ui-widget-content">\
      <div class="osmplayer-' + template + '-teaser-image"></div>\
      <div class="osmplayer-' + template + '-teaser-info ui-state-default">\
        <div class="osmplayer-' + template + '-teaser-title"></div>\
      </div>\
    </div>');

    var teasers = jQuery('.osmplayer-' + template + '-teaser', this.context);
    return teasers.eq(teasers.length - 1);
  }

  /**
   * Selects the teaser.
   */
  osmplayer.teaser[template].prototype.select = function(selected) {
    if (selected) {
      this.elements.info.addClass('ui-state-active');
    }
    else {
      this.elements.info.removeClass('ui-state-active');
    }
  }


  // Return the elements
  osmplayer.teaser[template].prototype.getElements = function() {
    var elements = osmplayer.teaser.prototype.getElements.call(this);
    return jQuery.extend(elements, {
      info: jQuery('.osmplayer-' + template + '-teaser-info', this.display),
      title:jQuery('.osmplayer-' + template + '-teaser-title', this.display),
      image:jQuery('.osmplayer-' + template + '-teaser-image', this.display)
    });
  };
})('stretchy', osmplayer);

;

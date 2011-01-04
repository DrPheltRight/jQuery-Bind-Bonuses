/**
 * jQuery Bind Bonuses
 *
 * This jQuery plugin (if you can call it that) adds two methods
 * to your toolkit. The first bindStop, is like bind apart from
 * it waits until the event has stopped before calling it's 
 * callback. Example uses include form validation. The second is
 * bindThrottle that throttles events.
 *
 * Both methods unlike bind accept a third parameter, "delay",
 * which is the amount of time they wait until they call your
 * callback.
 *
 * I found them useful, I hope you do too
 *
 * @author   Luke Morton, 2011
 * @license  MIT
 */ 

(function ($) {

    // Get jQuery duration
    var calcDuration = function (duration) {
        return $.fx.off ? 0 : typeof duration === "number" ? duration :
            duration in $.fx.speeds ? $.fx.speeds[duration] : $.fx.speeds._default;
    };

    /**
     * Bind on event stop
     *
     * This method waits until delay time after the last
     * occurance of event, then calls the callback.
     *
     * @param   string    jQuery event, e.g. 'click', 'keydown'
     * @param   callback  Callback function
     * @param   mixed     jQuery duration, e.g. 'slow', 'fast'
     *                    or an integer (milliseconds)
     * @return  this
     */
    $.fn.bindStop = function (event, callback, delay) {

        var delay = calcDuration(delay);
        
        return this.each(function () {
            var self = this;
            var timer;
            $(self).bind(event, function (e) {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(function () {
                    callback.call(self, e);
                }, delay);
            });
        });
        
    };

    /**
     * Throttle bound events
     *
     * This method only calls a callback if the event hasn't
     * been called in the last delay. If it has been called
     * it waits until after the throttle time to call it.
     *
     * @param   string    jQuery event, e.g. 'click', 'keydown'
     * @param   callback  Callback function
     * @param   mixed     jQuery duration, e.g. 'slow', 'fast'
     *                    or an integer (milliseconds)
     * @return  this
     */
    $.fn.bindThrottle = function (event, callback, delay) {

        var delay = calcDuration(delay);
        
        return this.each(function () {
            var self = this;
            var timer;
            $(self).bind(event, function (e) {
                if ( ! timer) {
                    callback.call(self, e);
                } else {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        timer = null;
                        callback.call(self, e);
                    }, delay);
                }
            });
        });

    };
    
}(this.jQuery));

Here is a nice Queue class you can use without the use of timeouts:

var Queue = (function () {

    Queue.prototype.autorun = true;
    Queue.prototype.running = false;
    Queue.prototype.queue = [];

    function Queue(autorun) {
        if (typeof autorun !== "undefined") {
            this.autorun = autorun;
        }
        this.queue = []; //initialize the queue
    };

    Queue.prototype.add = function (callback) {
        var _this = this;
        //add callback to the queue
        this.queue.push(function () {
            var finished = callback();
            if (typeof finished === "undefined" || finished) {
                //  if callback returns `false`, then you have to 
                //  call `next` somewhere in the callback
                _this.dequeue();
            }
        });

        if (this.autorun && !this.running) {
            // if nothing is running, then start the engines!
            this.dequeue();
        }

        return this; // for chaining fun!
    };

    Queue.prototype.dequeue = function () {
        this.running = false;
        //get the first element off the queue
        var shift = this.queue.shift();
        if (shift) {
            this.running = true;
            shift();
        }
        return shift;
    };

    Queue.prototype.next = Queue.prototype.dequeue;

    return Queue;

})();

// Testing queue

// passing false into the constructor makes it so 
// the queue does not start till we tell it to
var q = new Queue(false).add(function () {
    //start running something
}).add(function () {
    //start running something 2
}).add(function () {
    //start running something 3
});

setTimeout(function () {
    // start the queue
    q.next();
}, 2000);
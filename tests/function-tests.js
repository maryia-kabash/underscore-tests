/*
*
* Functions
 + bind
 + bindAll
 + partial
    - memoize
 + delay
 + defer
 + throttle
    - debounce
 + once
 + after
 + before
 + wrap
 + negate
 + compose

 */

describe("_.bind(function, object, *arguments)", function() {
    it("Bind a function to an object, meaning that whenever the function is called, the value of this will be the object.", function(){
        var f;
        for(var i = 1; i < 4; i++){
            f = _.bind(getPage, data['n'+ i]);
            assert.equal(f(), 'p_' + i);
        }
    });
    it("Optionally, pass arguments to the function to pre-fill them, also known as partial application.", function(){
        var fn;
        for(var i = 1; i < 4; i++){
            fn = _.bind(getPage, data['n'+ i], 'abc');
            assert.equal(fn(), 'p_' + i + 'abc');
        }
    });
});
describe("_.bindAll(object, *methodNames)", function() {
    it("Binds a number of methods on the object, specified by methodNames, to be run in the context of that object whenever they are invoked.", function(){
        var bindObj = {
            number: 12,
            click: function(){
                return this.number + 1
            },
            hover: function(){
                return this.number - 1
            },
            object: {
                name: "Alice",
                age: 32
            }
        };
        var fn = bindObj.click;
        var fn2 = bindObj.hover;

        assert(isNaN(fn()));
        assert(isNaN(fn2()));

        _.bindAll(bindObj, 'click', 'hover');

        fn = bindObj.click;
        fn2 = bindObj.hover;
        assert.equal(fn(), 13);
        assert.equal(fn2(), 11);
    });
});
describe("_.partial(function, *arguments) ", function() {
    it("Partially apply a function by filling in any number of its arguments, without changing its dynamic this value.", function(){
        var subTest;
        for(var i = 1; i < 4; i++){
            subTest = _.partial(sub, i);
            assert.equal(subTest(2), i - 2);
        }
    });
    it("You may pass _ in your list of arguments to specify an argument that should not be pre-filled, but left open to supply at call-time.", function(){
        var subTest2;
        for(var i = 1; i < 4; i++){
            subTest2 = _.partial(sub, _, i);
            assert.equal(subTest2(2), 2 - i);
        }
    });
});
describe("_.memoize(function, [hashFunction]) ", function() {

    var fn = function (obj){
       return(obj);
    };
    var memoizedFn = _.memoize(fn);



    it("Memoizes a given function by caching the computed result.", function(){
        var m1 = memoizedFn(1); // we will get result, and result is cahced now
        var m2 = memoizedFn(2); // we will get cached result which is wrong

        assert.equal(m1, 1);
        assert.equal(m2, 1);
    });
    it(" If passed an optional hashFunction, it will be used to compute the hash key for storing the result, based on the arguments to the original function. The default hashFunction just uses the first argument to the memoized function as the key.", function(){

    });
    it("", function(){});
});
describe("_.delay(function, wait, *arguments) ", function() {
    var a = 0, b = 0;
    _.delay(function(){a = 3}, 1000);
    _.delay(function(a){return b = a}, 1000, 5);

    it("Doesn't invoke function at once", function(){
        assert.notEqual(a, 3);
        assert.notEqual(b, 5);
    });

    it("Invokes function after wait", function(done) {
        setTimeout(function(){
            assert.equal(a, 3);
            done();
        }, 1000);
    });

    it("If you pass the optional arguments, they will be forwarded on to the function when it is invoked", function(done){
        setTimeout(function(){
            assert.equal(b, 5);
            done();
        }, 1000);
    });
});
describe("_.defer(function, *arguments) ", function() {

    var a = 0, b = 0;
    _.defer(function(){a = 3});
    _.defer(function(a){return b = a}, 5);


    it("Defers invoking the function until the current call stack has cleared, similar to using setTimeout with a delay of 0.", function(done){
        setTimeout(function(){
            assert.equal(a, 3);
            done();
        }, 0);
    });
    it("If you pass the optional arguments, they will be forwarded on to the function when it is invoked", function(done){
        setTimeout(function(){
            assert.equal(b, 5);
            done();
        }, 0);
    });
});
describe("_.throttle(function, wait, [options])", function() {
    it("Creates and returns a new, throttled version of the passed function, that, when invoked repeatedly, will only actually call the original function at most once per every wait milliseconds. ", function(done){
        var c = 0;
        var incr = function(){ c++; };
        var throttled = _.throttle(incr, 32);
        throttled();
        throttled();

        assert.equal(c, 1);
        _.delay(function(){
            assert.equal(c, 2);
            done();
        }, 64);
    });
});
describe("_.debounce(function, wait, [immediate]) ", function() {

    it("Creates and returns a new debounced version of the passed function which will postpone its execution until after wait milliseconds have elapsed since the last time it was invoked.", function(done){
        var c = 0;
        var recalc = function(){
            c++;
        };

        var deb = _.debounce(recalc, 10);
        deb();deb();
        setTimeout(function(){
            deb();
            assert.equal(c, 1);
            done();
        }, 20);
    });
    it("At the end of the wait interval, the function will be called with the arguments that were passed most recently to the debounced function.", function(done){
        var n = "";
        var recalc1 = function(name){
            n = name;
        };

        var deb1 = _.debounce(recalc1, 10);
        deb1('Alice');
        deb1("Pete");
        deb1("Bob");

        setTimeout(function(){
            assert.equal(n, 'Bob');
            deb1("Ron");
            assert.equal(n, 'Ron');
            done();
        }, 20);
    });
    it("Pass true for the immediate argument to cause debounce to trigger the function on the leading instead of the trailing edge of the wait interval. Useful in circumstances like preventing accidental double-clicks on a submit button from firing a second time.", function(){

    });
});
describe("_.once(function) ", function() {

    var spy = chai.spy();

    function once(a, b){
        spy();
        return a+b;
    }

    var sumOnce = _.once(once);

    var res1 = sumOnce(2,1);
    var res2 = sumOnce(5,1);

    it("Creates a version of the function that can only be called one time.", function(){
        expect(spy).to.have.been.called.once;
    });
    it("Repeated calls return the value from the original call.", function(){
        assert.equal(res1, 3);
        assert.equal(res2, 3);
    });
});
describe("_.after(count, function) ", function() {
    var spy = chai.spy();

    function after(a, b){
        spy();
        return a+b;
    }

    var sumOnce = _.after(3, after);

    var res1 = sumOnce(2,1);
    var res2 = sumOnce(5,1);
    var res3 = sumOnce(1,1);
    it("Creates a version of the function that will only be run after first being called count times.", function(){
        expect(spy).to.have.been.called.once;
        assert.isUndefined(res1);
        assert.isUndefined(res2);

    });
});
describe("_.before(count, function)", function() {
    it("Creates a version of the function that can be called no more than count times. ", function(){
        var c = 0;
        function max3(){
            c++;
        }
        var before = _.before(3, max3);
        before();
        before();
        before();
        before();

        assert.equal(c, 2);
    });
});
describe("_.wrap(function, wrapper) ", function() {
    it("Wraps the first function inside of the wrapper function, passing it as the first argument. This allows the wrapper to execute code before and after the function runs, adjust the arguments, and execute it conditionally.", function(){
        var hello = function(name) { return "hello: " + name; };
        hello = _.wrap(hello, function(func) {
            return "before, " + func("moe") + ", after";
        });
        var res = hello();
        assert.equal(res, "before, hello: moe, after");
    });
});
describe("_.negate(predicate) ", function() {
    it("Returns a new negated version of the predicate function.", function(){
        var toNegative = function(num){
            return num * -1;
        };

        var toPositive = _.negate(toNegative);

        assert.equal(toPositive(0), true);
        assert.equal(toPositive(false), true);
        assert.equal(toPositive(""), true);
        assert.equal(toPositive(true), false);
    });
});
describe("_.compose(*functions)", function() {
    it("Returns the composition of a list of functions, where each function consumes the return value of the function that follows.", function(){
        var hello = function (name){
            return "Hello, " + name;
        };
        var  whatsup = function (greeting) {
            return greeting + "! What's up?";
        };
        var dialogue = _.compose(hello, whatsup);

        assert.equal(dialogue('World'), "Hello, World! What's up?");
        assert.equal(dialogue('Jessi'), "Hello, Jessi! What's up?");
    });
});

//Helpers

function getPage(info){
    if( !info ){info = ''}
   return this.page + info;
}

function sub(a, b) {
    return a - b;
}

var data = {
    "n1": {
        "page": "p_1",
        "img": "mc_header.jpg",
        "position": "left",
        "ribbonTitle": "One thing you can count on:",
        "ribbonText": "123"
    },
    "n2": {
        "page": "p_2",
        "img": "../mc_header.jpg",
        "position": "right",
        "ribbonTitle": "And just like you, our focus is family",
        "ribbonText": "That's why"
    },
    "n3": {
        "page": "p_3",
        "img": "../images/mc_header.jpg",
        "position": "left",
        "ribbonTitle": "And just like you",
        "ribbonText": "50 years ago"
    },
    "n4": {
        "page": "p_4",
        "img": "../header.jpg",
        "position": "right",
        "ribbonTitle": "And just like you, our focus is family",
        "ribbonText": "We started"
    }
};
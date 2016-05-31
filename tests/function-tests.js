/*
*
* Functions
 + bind
 - bindAll
 + partial
 - memoize
 + delay
 + defer
 - throttle
 - debounce
 + once
 - after
 - before
 - wrap
 - negate
 - compose

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
describe.skip("_.bindAll(object, *methodNames)", function() {
    it("Binds a number of methods on the object, specified by methodNames, to be run in the context of that object whenever they are invoked.", function(){

    });
    it("", function(){});
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
    it("", function(){});
    it("", function(){});
});
describe.skip("_.delay(function, wait, *arguments) ", function() {
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
    it("", function(){});
    it("", function(){});
});
describe("_.debounce(function, wait, [immediate]) ", function() {
    it("", function(){});
    it("", function(){});
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
    it("", function(){});
    it("", function(){});
});
describe("_.before(count, function)", function() {
    it("", function(){});
    it("", function(){});
});
describe("_.wrap(function, wrapper) ", function() {
    it("", function(){});
    it("", function(){});
});
describe("_.negate(predicate) ", function() {
    it("", function(){});
    it("", function(){});
});
describe("_.compose(*functions)", function() {
    it("", function(){});
    it("", function(){});
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
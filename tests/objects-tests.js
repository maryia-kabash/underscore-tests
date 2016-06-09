/*
* Objects
 + keys
 + allKeys
 + values
 + mapObject
 + pairs
 + invert
 + create
 + functions
 + findKey
 + extend
 + extendOwn
 + pick
 + omit
 + defaults
 + clone
 + tap
 + has
 + matcher
 + property
 + propertyOf
 + isEqual
 + isMatch
 + isEmpty
 + isElement
 + isArray
 + isObject
 + isArguments
 + isFunction
 + isString
 + isNumber
 + isFinite
 + isBoolean
 + isDate
 + isRegExp
 + isError
 + isNaN
 + isNull
 + isUndefined

* */

describe("_.keys", function() {
    it("Retrieve all the names of the object's own enumerable properties.", function(){
        var ob = function(a, b){return a +b; };
        assert.lengthOf(_.keys(ob), 0);

        expect(_.keys(data)).to.include.members(['n1', 'n2', 'n3', 'n4']);
        assert.lengthOf(_.keys(data), 4);

    });
});
describe("_.allKeys", function() {
    it("Retrieve all the names of object's own and inherited properties.", function(){
        expect(_.allKeys(new Animal('Rabbit'))).to.include.members(['name', 'jump', 'run']);
        assert.lengthOf(_.allKeys(new Animal('Rabbit')), 3);
    });
});
describe("_.values", function() {
    it("Return all of the values of the object's own properties.", function(){
        expect(_.values(data.n1)).to.include.members(["p_1","mc_header.jpg","left","One thing you can count on:","123"]);
        assert.lengthOf(_.values(data.n1), 5);
    });
});
describe("_.mapObject", function() {
    it("Like map, but for objects. Transform the value of each property in turn.", function(){
        var map = _.mapObject(data.n1, function(val){return val.slice(0,1); });
        assert.equal(map.page, 'p');
        assert.equal(map.img, 'm');
        assert.equal(map.position, 'l');
        assert.equal(map.ribbonTitle, 'O');
        assert.equal(map.ribbonText, '1');
    });
});
describe("_.pairs", function() {
    it("Convert an object into a list of [key, value] pairs.", function(){
        var pairs = _.pairs(data.n1);
        assert.lengthOf(pairs, 5);
        expect(pairs[0]).to.include.members(['page', 'p_1']);
        expect(pairs[1]).to.include.members(['img', 'mc_header.jpg']);
        expect(pairs[2]).to.include.members(['position', 'left']);
        expect(pairs[3]).to.include.members(['ribbonTitle', 'One thing you can count on:']);
        expect(pairs[4]).to.include.members(['ribbonText', '123']);
    });
});
describe("_.invert", function() {
    it("Returns a copy of the object where the keys have become the values and the values the keys. ", function(){
        var invert = _.invert(data.n1);
        assert.equal(invert['p_1'], 'page');
        assert.equal(invert['mc_header.jpg'], 'img');
        assert.equal(invert.left, 'position');
        assert.equal(invert['One thing you can count on:'], 'ribbonTitle');
        assert.equal(invert['123'], 'ribbonText');
    });
});
describe("_.create", function() {
    it("Creates a new object with the given prototype, optionally attaching props as own properties.", function(){
        var Pony = _.create(Animal.prototype, {detail: "tail"});
        expect(_.keys(Pony)).to.include.members(['detail']);
        expect(_.allKeys(Pony)).to.include.members(['jump', 'run', 'detail']);
        assert.lengthOf(_.allKeys(Pony), 3);
        assert.lengthOf(_.keys(Pony), 1);
    });
});
describe("_.functions", function() {
    it("Returns a sorted list of the names of every method in an object", function(){
        var methods = _.functions(dataMethods);
        expect(methods).to.include.members(['click', 'hover']);
        assert.lengthOf(methods, 2);
    });
});
describe("_.findKey", function() {
    it("Returns the first key where the predicate truth test passes or undefined.", function(){
        assert.equal(_.findKey(dataMethods, _.isFunction), 'click');
        assert.equal(_.findKey(dataMethods, _.isNumber), 'number');
        assert.equal(_.findKey(dataMethods, _.isString), 'a');
        assert.equal(_.findKey(dataMethods, _.isNaN), undefined);
    });
});
describe("extend", function(){
    var srcObj1 = {
            job: "Vet"
        },
        srcObj2 = {
            age: 25
        },
        srcObj3 = {
            age: 30
        },
        Cat = new Animal('Alice');

    describe("_.extend(destination, *sources) ", function() {

        Cat = _.extend(Cat, srcObj1, srcObj2);
        var oldCat = _.extend(Cat, srcObj1, srcObj2, srcObj3);

        it("Copy all of the properties in the source objects over to the destination object, and return the destination object.", function(){
            expect(_.keys(Cat)).to.include.members(['name', 'job', 'age']);
            assert.lengthOf(_.keys(Cat), 3);

            expect(_.allKeys(Cat)).to.include.members(['name', 'jump', 'run', 'job', 'age']);
            assert.lengthOf(_.allKeys(Cat), 5);
        });
        it("The last source will override properties of the same name in previous arguments.", function(){
            assert.equal(oldCat.age, 30);
        });
    });
    describe("_.extendOwn", function() {

        var CatOwn = _.extendOwn(Cat, srcObj1, srcObj2);
        var oldCatOwn = _.extendOwn(Cat, srcObj1, srcObj2, srcObj3);

        it("Like extend, but only copies own properties over to the destination object.", function(){
            expect(_.keys(CatOwn)).to.include.members(['name', 'job', 'age']);
            assert.lengthOf(_.keys(CatOwn), 3);

            expect(_.allKeys(CatOwn)).to.include.members(['name', 'jump', 'run', 'job', 'age']);
            assert.lengthOf(_.allKeys(CatOwn), 5);

            assert.equal(oldCatOwn.age, 30);
        });
    });
});
describe("_.pick", function() {
    var fullData = {
        "page": "p_1",
        "img": "mc_header.jpg",
        "position": "left",
        "ribbonTitle": "One thing you can count on:",
        "ribbonText": 123
        };

    it("Return a copy of the object, filtered to only have values for the whitelisted keys", function(){
        expect(_.keys( _.pick(fullData, 'page', 'img', 'position'))).to.include.members(['page', 'img', 'position']);
        expect(_.keys( _.pick(fullData, 'page', 'img', 'position'))).to.not.include.members(['ribbonTitle', 'ribbonText']);
    });
    it("(or array of valid keys).", function(){
        expect(_.keys( _.pick(fullData, ['page', 'img', 'position']))).to.include.members(['page', 'img', 'position']);
        expect(_.keys( _.pick(fullData, ['page', 'img', 'position']))).to.not.include.members(['ribbonTitle', 'ribbonText']);
    });
    it("Alternatively accepts a predicate indicating which keys to pick.", function(){
        expect(_.keys( _.pick(fullData, function(prop){return _.isNumber(prop)}))).to.include.members(['ribbonText']);
        expect(_.keys( _.pick(fullData, function(prop){return _.isNumber(prop)}))).to.not.include.members(['ribbonTitle', 'page', 'img', 'position']);
    });
});
describe("_.omit", function() {
    var fullData = {
        "page": "p_1",
        "img": "mc_header.jpg",
        "position": "left",
        "ribbonTitle": "One thing you can count on:",
        "ribbonText": 123
    };

    it("Return a copy of the object, filtered to omit the blacklisted keys", function(){
        expect(_.keys( _.omit(fullData, 'page', 'img', 'position'))).to.not.include.members(['page', 'img', 'position']);
        expect(_.keys( _.omit(fullData, 'page', 'img', 'position'))).to.include.members(['ribbonTitle', 'ribbonText']);
    });
    it("(or array of valid keys).", function(){
        expect(_.keys( _.omit(fullData, ['page', 'img', 'position']))).to.not.include.members(['page', 'img', 'position']);
        expect(_.keys( _.omit(fullData, ['page', 'img', 'position']))).to.include.members(['ribbonTitle', 'ribbonText']);
    });
    it("Alternatively accepts a predicate indicating which keys to pick.", function(){
        expect(_.keys( _.omit(fullData, function(prop){return _.isNumber(prop)}))).to.not.include.members(['ribbonText']);
        expect(_.keys( _.omit(fullData, function(prop){return _.isNumber(prop)}))).to.include.members(['ribbonTitle', 'page', 'img', 'position']);
    });
});
describe("_.defaults(object, *defaults) ", function() {
    it("Fill in undefined properties in object with the first value present in the following list of defaults objects.", function(){
        var smartCat = _.defaults(new Animal("Napoleon"), {iq: 120, name: 'Mr.Cat', job: 'Doctor'});
        expect(_.keys(smartCat)).to.include.members(['name', 'job', 'iq']);
        assert.lengthOf(_.keys(smartCat), 3);
        assert.equal(smartCat.name, "Napoleon");
        assert.equal(smartCat.iq, 120);
        assert.equal(smartCat.job, "Doctor");
    });
});
describe("_.clone", function() {
    it("Create a shallow-copied clone of the provided plain object. Any nested objects or arrays will be copied by reference, not duplicated.", function(){
        var srcObj = {
            a: 'some data',
            number: 123,
            object: {
                name: "Alice",
                age: 32
                }
            },
            clone = _.clone(srcObj);

        clone.object.age = 10;
        clone.a = "new data";

        assert.equal( clone.a, "new data");
        assert.equal( srcObj.a, "some data");

        assert.equal( clone.object.age, 10);
        assert.equal( srcObj.object.age, 10);
    });
});
describe("_.tap", function() {
    it("Invokes interceptor with the object, and then returns object", function(){
        var res = _.tap({age:20}, function(obj){ obj.age = 25; return obj})
        assert.isObject(res);
        assert.equal(res.age, 25);
    });
});
describe("_.has", function() {
    it("Does the object contain the given key?", function(){
        assert.isTrue(_.has(data, 'n1'));
        assert.isFalse(_.has(data, 'n10'));
    });
});
describe("_.matcher(attrs)", function() {
    it("Returns a predicate function that will tell you if a passed in object contains all of the key/value properties present in attrs.", function(){
        var fn = _.matcher({"position": "left"});

        assert.isFunction(fn);

        assert.isTrue(fn(data.n1));
        assert.isTrue(fn(data.n3));
        assert.isFalse(fn(data.n2));
        assert.isFalse(fn(data.n4));

    });
});
describe("_.property", function() {
    it("Returns a function that will itself return the key property of any passed-in object.", function(){
        var fn = _.property('name');
        assert.equal(fn(new Animal("Joe")), "Joe");
        assert.isUndefined(fn(data));
    });
});
describe("_.propertyOf", function() {
    it("Inverse of _.property. Takes an object and returns a function which will return the value of a provided property.", function(){
        var fn = _.propertyOf(data.n1);
        assert.equal(fn('position'), "left");
        assert.equal(fn('page'), "p_1");
        assert.equal(fn('img'), "mc_header.jpg");
    });
});
describe("_.isEqual", function() {
    it("Performs an optimized deep comparison between the two objects, to determine if they should be considered equal.", function(){
        var srcObj = {
                a: 'some data',
                number: 123,
                object: {
                    name: "Alice",
                    age: 32
                }
            },
            clone = _.clone(srcObj),
            a = {name: "Alice"},
            b = {name: 'Alice'};

        assert.isTrue(_.isEqual(clone, srcObj));
        assert.isTrue(_.isEqual(a, b));
        assert.isTrue(_.isEqual(clone.object, srcObj.object));
    });
});
describe("_.isMatch(object, properties)", function() {
    it("Tells you if the keys and values in properties are contained in object.", function(){
        assert.isTrue(_.isMatch(data.n1, {"page": "p_1"}));
        assert.isTrue(_.isMatch(data.n3, {"img": "../images/mc_header.jpg"}));
        assert.isFalse(_.isMatch(data.n2, {"page": "p_3"}));
        assert.isFalse(_.isMatch(data.n4, {"position": "left"}));
    });
});
describe("_.isEmpty", function() {
    it("Returns true if an enumerable object contains no values (no enumerable own-properties).", function(){
        assert.isTrue(_.isEmpty({}));
        assert.isTrue(_.isEmpty(new Object));
    });
    it("For strings and array-like objects _.isEmpty checks if the length property is 0.", function(){
        assert.isTrue(_.isEmpty([]));
        assert.isTrue(_.isEmpty(""));
        assert.isFalse(_.isEmpty(" "));
    });
});
describe("_.isElement", function() {
    it("Returns true if object is a DOM element.", function(){
        assert.isTrue(_.isElement(document.getElementById('mocha')));
        assert.isFalse(_.isElement(dataMethods));
    });
});
describe("_.isArray", function() {
    it("Returns true if object is an Array.", function(){
        assert.isTrue(_.isArray([]));
        assert.isTrue(_.isArray([1,false,"string"]));
        assert.isFalse(_.isArray({}));
    });
});
describe("_.isObject", function() {
    it("Returns true if value is an Object. Note that JavaScript arrays and functions are objects, while (normal) strings and numbers are not.", function(){
        assert.isTrue(_.isObject([]));
        assert.isTrue(_.isObject({}));
        assert.isTrue(_.isObject(function(){}));
        assert.isFalse(_.isObject('abc'));
    });
});
describe("_.isArguments", function() {
    it("Returns true if object is an Arguments object.", function(){
        assert.isTrue((function(){ return _.isArguments(arguments); })(1, 2, 3));
        assert.isFalse(_.isArguments(['a', 2, false]));
    });
});
describe("_.isFunction", function() {
    it("Returns true if object is a Function.", function(){
        assert.isTrue(_.isFunction(function(){}));
        assert.isFalse(_.isFunction({}));
    });
});
describe("_.isString", function() {
    it("Returns true if object is a String.", function(){
        assert.isTrue(_.isString(""));
        assert.isFalse(_.isString(123));
    });
});
describe("_.isNumber", function() {
    it("Returns true if object is a Number (including NaN).", function(){
        assert.isTrue(_.isNumber(1));
        assert.isTrue(_.isNumber(NaN));
        assert.isTrue(_.isNumber(Infinity));
        assert.isFalse(_.isNumber('1'));
    });
});
describe("_.isFinite", function() {
    it("Returns true if object is a finite Number.", function(){
        assert.isTrue(_.isFinite(12));
        assert.isFalse(_.isFinite(-Infinity));
    });
});
describe("_.isBoolean", function() {
    it("Returns true if object is either true or false.", function(){
        assert.isTrue(_.isBoolean(false));
        assert.isTrue(_.isBoolean(true));
        assert.isFalse(_.isBoolean(0));
    });
});
describe("_.isDate", function() {
    it("Returns true if object is a Date.", function(){
        assert.isTrue(_.isDate(new Date));
        assert.isFalse(_.isDate("Thu Jun 02 2016 12:36:49 GMT+0300 (Belarus Standard Time)"));
    });
});
describe("_.isRegExp", function() {
    it("Returns true if object is a RegExp.", function(){
        assert.isTrue(_.isRegExp(new RegExp()));
        assert.isFalse(_.isRegExp(['A-Za-z']));
    });
});
describe("_.isError", function() {
    it("Returns true if object inherits from an Error.", function(){
        try {
            throw new TypeError("Example");
        } catch (e) {
            assert.isTrue(_.isError(e))
        }
        assert.isTrue(_.isError(new TypeError("Example")));
        assert.isFalse(_.isError("Error"));
    });
});
describe("_.isNaN", function() {
    it("Returns true if object is NaN. Note: this is not the same as the native isNaN function, which will also return true for many other not-number values, such as undefined.", function(){
        assert.isTrue(_.isNaN(NaN));
        assert.isTrue(_.isNaN(Math.cos("abc")));
        assert.isFalse(_.isNaN({}));
    });
});
describe("_.isNull", function() {
    it("Returns true if the value of object is null.", function(){
        assert.isTrue(_.isNull(null));
        assert.isFalse(_.isNull(undefined));
    });
});
describe("_.isUndefined", function() {
    it("Returns true if value is undefined.", function(){
        var abc;
        assert.isTrue(_.isUndefined(abc));
        assert.isFalse(_.isUndefined(null));
    });
});

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
var dataMethods = {
    a: 'some data',
    click: function(){
        console.log(123)
    },
    hover: function(q){
          return q;
    },
    number: 123,
    object: {
        name: "Alice",
        age: 32
    }
};


function Animal(name) {
    this.name = name;
}
Animal.prototype.jump = true;
Animal.prototype.run = '100km/h';

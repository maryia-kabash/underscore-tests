/*
* Objects
 + keys
 + allKeys
 + values
 + mapObject
 + pairs
 + invert
 - create
 - functions
 - findKey
 - extend
 - extendOwn
 - pick
 - omit
 - defaults
 - clone
 - tap
 - has
 - matcher
 - property
 - propertyOf
 - isEqual
 - isMatch
 - isEmpty
 - isElement
 - isArray
 - isObject
 - isArguments
 - isFunction
 - isString
 - isNumber
 - isFinite
 - isBoolean
 - isDate
 - isRegExp
 - isError
 - isNaN
 - isNull
 - isUndefined

* */

describe("_.keys", function() {
    it("Retrieve all the names of the object's own enumerable properties.", function(){
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
    });
});
describe("_.functions", function() {
    it("", function(){});
});
describe("_.findKey", function() {
    it("", function(){});
});
describe("_.extend", function() {
    it("", function(){});
});
describe("_.extendOwn", function() {
    it("", function(){});
});
describe("_.pick", function() {
    it("", function(){});
});
describe("_.omit", function() {
    it("", function(){});
});
describe("_.defaults", function() {
    it("", function(){});
});
describe("_.clone", function() {
    it("", function(){});
});
describe("_.tap", function() {
    it("", function(){});
});
describe("_.has", function() {
    it("", function(){});
});
describe("_.matcher", function() {
    it("", function(){});
});
describe("_.property", function() {
    it("", function(){});
});
describe("_.propertyOf", function() {
    it("", function(){});
});
describe("_.isEqual", function() {
    it("", function(){});
});
describe("_.isMatch", function() {
    it("", function(){});
});
describe("_.isEmpty", function() {
    it("", function(){});
});
describe("_.isElement", function() {
    it("", function(){});
});
describe("_.isArray", function() {
    it("", function(){});
});
describe("_.isObject", function() {
    it("", function(){});
});
describe("_.isArguments", function() {
    it("", function(){});
});
describe("_.isFunction", function() {
    it("", function(){});
});
describe("_.isString", function() {
    it("", function(){});
});
describe("_.isNumber", function() {
    it("", function(){});
});
describe("_.isFinite", function() {
    it("", function(){});
});
describe("_.isBoolean", function() {
    it("", function(){});
});
describe("_.isDate", function() {
    it("", function(){});
});
describe("_.isRegExp", function() {
    it("", function(){});
});
describe("_.isError", function() {
    it("", function(){});
});
describe("_.isNaN", function() {
    it("", function(){});
});
describe("_.isNull", function() {
    it("", function(){});
});
describe("_.isUndefined", function() {
    it("", function(){});
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
function Animal(name) {
    this.name = name;
}
Animal.prototype.jump = true;
Animal.prototype.run = '100km/h';
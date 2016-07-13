/*
*
 Utility

 + noConflict
 + identity
 + constant
 + noop
 + times
 + random
 + mixin
 + iteratee
 + uniqueId
 + escape
 + unescape
 + result
 + now
 + template

 Chaining

 + chain
 + value
* */

describe.skip("_.noConflict", function() {
    it("Returns a reference to the Underscore object.", function(){
        assert.isObject(_.noConflict());
        assert.equal(_.noConflict().constructor.name, "_");
    })
});
describe("_.identity", function() {
    it("Returns the same value that is used as the argument.", function(){
        var person = {name: 'Jake'};
        assert.equal(person, _.identity(person));
    })
});
describe("_.constant", function() {
    it("Creates a function that returns the same value that is used as the argument of _.constant.", function(){
        var person = {name: 'Jake'};
        assert.isFunction(_.constant(person));
        assert.equal(person, _.constant(person)());
    })
});
describe("_.noop", function() {
    it("Returns undefined irrespective of the arguments passed to it. Useful as the default for optional callback arguments.", function(){
        assert.isUndefined(_.noop("a"));
        assert.isUndefined(_.noop(1));
        assert.isUndefined(_.noop());
        assert.isUndefined(_.noop(1, false));
        assert.isUndefined(_.noop({a: 'asd'}));
    })
});
describe("_.times(n, iteratee, [context])", function() {

    var spy = chai.spy();

    function time(a){
        spy(a);
        return a;
    }

    it("Invokes the given iteratee function n times. ", function(){
        _.times(2, time);
        expect(spy).to.have.been.called.twice;
    });
    it(" Each invocation of iteratee is called with an index argument.", function(){
        expect(spy).to.have.been.called.with(0);
        expect(spy).to.have.been.called.with(1);
    });
    it("Produces an array of the returned values. ", function(){
        var res = _.times(3, time);
        assert.includeMembers(res, [0,1,2])
    })
});
describe("_.random", function() {
    it("Returns a random integer between min and max, inclusive. If you only pass one argument, it will return a number between 0 and that number.", function(){
       var r = _.random(0, 100);
       var r1 = _.random(0, 100);

        expect(r).to.be.above(0);
        expect(r1).to.be.above(0);

        expect(r).to.be.below(100);
        expect(r1).to.be.below(100);
    })
});
describe("_.mixin", function() {
    it("Allows you to extend Underscore with your own utility functions. ", function(){
        _.mixin({
            addOne: function(number){
                return number + 1;
            }
        });
        assert.equal(_.addOne(2), 3);
        assert.equal(_(2).addOne(), 3);
    })
});
describe("_.iteratee", function() {
    describe("Generates a callback that can be applied to each element in a collection. Depending upon value's type, _.iteratee will return:", function(){
        it("Always returns a function", function(){
            assert.isFunction(_.iteratee());
            assert.isFunction(_.iteratee(function(n) { return n * 2; }));
            assert.isFunction(_.iteratee({firstName: 'Chelsea'}));
            assert.isFunction(_.iteratee('firstName'));
        });
        it("No value -> value", function(){
            var value = _.iteratee();
            assert.equal(value("Abc"), "Abc")
        });
        it("Function -> function", function(){
            var fn = _.iteratee(function(n) { return n * 2; });
            assert.equal(fn(2), 4);
        });
        it("Object -> _.matcher", function(){
            var match = _.iteratee({firstName: 'Chelsea'});
            assert.isTrue(match({firstName: 'Chelsea', lastname: 'Robbins'}))
        });
        it("Anything else -> _.property", function(){
            var prop = _.iteratee('firstName');
            assert.equal(prop({firstName: 'Chelsea', lastname: 'Robbins'}), 'Chelsea');
        });
    });

});
describe("_.uniqueId", function() {
    it("Generate a globally-unique id for client-side models or DOM elements that need one. If prefix is passed, the id will be appended to it.", function(){
        var ids = [];
        for(var i =0; i < 50; i++){
            ids.push(_.uniqueId());
        }

        assert.lengthOf(ids, 50);

        for(var n =0; n < 50; n++){
            expect(ids).to.not.include(ids.pop());
        }
    })
});
describe("_.escape", function() {
    it("Escapes a string for insertion into HTML, replacing &, <, >, \", `, and ' characters.", function(){
        assert.equal(_.escape("&<>\"`'"),"&amp;&lt;&gt;&quot;&#x60;&#x27;");
    })
});
describe("_.unescape", function() {
    it("The opposite of escape, replaces &amp;, &lt;, &gt;, &quot;, &#96; and &#x27; with their unescaped counterparts.", function(){
        assert.equal(_.unescape("&amp;&lt;&gt;&quot;&#x60;&#x27;"),"&<>\"`'");
    })
});
describe("_.result(object, property, [defaultValue]) ", function() {
    var obj = {
        name: 'Chelsea',
        job: function(){
            return 'Doctor'
        }
    };

    it("If the value of the named property is a function then invoke it with the object as context; ", function(){
        assert.equal(_.result(obj, 'job'), 'Doctor');
    });
    it("otherwise, return it.", function(){
        assert.equal(_.result(obj, 'name'), 'Chelsea');
    });
    it("If a default value is provided and the property doesn't exist or is undefined then the default will be returned.", function(){
        assert.equal(_.result(obj, 'hobby', 'Football'), 'Football');
    });
    it("If defaultValue is a function its result will be returned.", function(){
        var sport = function(){return 'Football'};
        assert.equal(_.result(obj, sport, 'Football'), 'Football');
    });
});
describe("_.now", function() {
    it("Returns an integer timestamp for the current time, using the fastest method available in the runtime.", function(){
        var diff = _.now() - new Date().getTime();
        assert.equal(diff, 0);
    })
});
describe("_.template", function() {
    describe("Compiles JavaScript templates into functions that can be evaluated for rendering. ", function(){
        it("using <%= … %>", function(){
            var tpl = _.template("Hello <%= name %>");
            assert.equal(tpl({name: 'Chelsea'}), 'Hello Chelsea');
        });
        it("execute arbitrary JavaScript code, with <% … %>", function(){
            var tpl = _.template('<% ' +
            "  if(foo == 'bar'){ " +
            "%>Statement quotes.<% } %>");

            assert.equal(tpl({foo: 'bar'}), 'Statement quotes.');
        });
        it("If you wish to interpolate a value, and have it be HTML-escaped, use <%- … %>", function(){
            var tpl = _.template("Age is <%- age %>");
            assert.equal(tpl({age: '24 & 22'}), 'Age is 24 &amp; 22');
        });
        it("You can also use print from within JavaScript code.", function(){
            var compiled = _.template("<% print('Hello ' + epithet); %>");
            assert.equal(compiled({epithet: "stooge"}), "Hello stooge");
        });
    })
});
describe("_.chain and _.value", function() {
    it("Returns a wrapped object. Calling methods on this object will continue to return wrapped objects until value is called.", function(){
        var stooges = [{name: 'curly', age: 25}, {name: 'moe', age: 21}, {name: 'larry', age: 23}];
        var youngest = _.chain(stooges)
            .sortBy(function(stooge){ return stooge.age; })
            .map(function(stooge){ return stooge.name + ' is ' + stooge.age; })
            .first()
            .value();
        assert.equal(youngest, "moe is 21");

        var str = _.chain("5 < 6")
            .escape()
            .unescape()
            .value();
        assert.equal(str, "5 < 6");
    })
});

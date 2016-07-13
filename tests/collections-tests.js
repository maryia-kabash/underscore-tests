/* Underscore Collection Functions (Arrays or Objects)

 + each
 + map
 + reduce
 + reduceRight
 + find
 + filter
 + where
 + findWhere
 + reject
 + every
 + some
 + contains
 + invoke
 + pluck
 + max
 + min
 + sortBy
 + groupBy
 + indexBy
 + countBy
 + shuffle
 + sample
 + toArray
 + size
 + partition

 */

describe("_.each", function() {

    describe("Iterates over a list of elements, yielding each in turn to an iteratee function", function(){

        describe("Array", function(){
            var spy = chai.spy();

            _.each([1,2,3], sum);

            function sum(a){
                spy(a);
            }
            it("The function is called Array.length times", function(){
                expect(spy).to.have.been.called.exactly(3);
            });

            it("The value passed to the function matches the one from the list", function(){
                expect(spy).to.have.been.called.with(1);
                expect(spy).to.have.been.called.with(2);
                expect(spy).to.have.been.called.with(3);
            })

        });

        describe("Object", function(){
            var spy = chai.spy();

            _.each({"one": 1, "another": "abc"}, sum);

            function sum(a){
                spy(a);
            }
            it("The function is called Object keys length times", function(){
                expect(spy).to.have.been.called.twice;
            });

            it("The value passed to the function matches the one from the list", function(){
                expect(spy).to.have.been.called.with(1);
                expect(spy).to.have.been.called.with("abc");
            })

        });

        it("If passed a string, iteratee is called according to char number", function(){
            var spy = chai.spy();

            _.each("abcd", sum);

            function sum(){
                spy();
            }

            expect(spy).to.have.been.called.exactly(4);
        })
    });

});
describe("_.map", function() {
    describe("Produces a new array of values by mapping each value in list through a transformation function", function(){

        var spy = chai.spy();

        function addOne(a){
            spy(a);
            return a + 1;
        }
        it("Returns a new array with the same length", function(){
            assert.lengthOf(_.map([1,2,3,4,5], addOne), 5);
        });

        it("Calls a transform function Array.length times", function(){
            expect(spy).to.have.been.called.exactly(5);
        });

        it("The value passed to the function matches the one from the list", function(){
            expect(spy).to.have.been.called.with(1);
            expect(spy).to.have.been.called.with(2);
            expect(spy).to.have.been.called.with(3);
            expect(spy).to.have.been.called.with(4);
            expect(spy).to.have.been.called.with(5);
        });

        it("Transforms each value according to the transform function", function(){
            expect(_.map([1,2,3,4,5], addOne)).to.include(2);
            expect(_.map([1,2,3,4,5], addOne)).to.include(3);
            expect(_.map([1,2,3,4,5], addOne)).to.include(4);
            expect(_.map([1,2,3,4,5], addOne)).to.include(5);
            expect(_.map([1,2,3,4,5], addOne)).to.include(6);
        })
    })
});
describe("_.reduce(list, iteratee, [memo], [context])", function() {
    it("Boils down a list of values into a single value. The iteratee is passed 4 arguments: the memo, the value, index (or key) of the iteration, and a reference to the entire list.", function(){
        var StringArr = ['a', 'b', 'c', 'd', 'e', 'f'];
        var word = _.reduce(StringArr, function(memo, value){return memo + value}, 'Word:');
        assert.equal(word, 'Word:abcdef');
    });
    it("If no memo is passed to the initial invocation of reduce, the iteratee is not invoked on the first element of the list. " +
    "The first element is instead passed as the memo in the invocation of the iteratee on the next element in the list.", function(){
        var NumberArr = [1, 2, 3, 4, 5, 6, 7, 8, 9 , 10];
        var number = _.reduce(NumberArr, function(memo, value){return memo + value});
        assert.equal(number, 55)
    });
});
describe("_.reduceRight", function() {
    it("The right-associative version of reduce", function(){
        var StringArr = ['a', 'b', 'c', 'd', 'e', 'f'];
        var word = _.reduceRight(StringArr, function(memo, value){return memo + value}, 'Word:');
        assert.equal(word, 'Word:fedcba');

        var NumberArr = [1, 2, 3, 4, 5, 6, 7, 8, 9 , 10];
        var number = _.reduceRight(NumberArr, function(memo, value){return memo - value});
        assert.equal(number, -35)
    })
});
describe("_.find", function() {
    describe("Returns the first value on the list that passes a truth test", function(){
        it("Returns the first even value", function(){
            assert.equal(_.find([1,2,3,4,5,6], function(n){
                return n % 2 == 0;
            }), 2);
        });

        it("Returns the substring", function(){
            assert.equal(_.find("hello!world", function(w){
                return w.match(/[^\w]/g);
            }), "!");
        });
    })
});
describe("_.filter", function() {
    describe("Returns all values on the list that passes a truth test", function(){
        it("Returns all even values", function(){
            assert.lengthOf(_.filter([1,2,3,4,5,6], function(n){
                return n % 2 == 0;
            }), 3);
            assert.include(_.filter([1,2,3,4,5,6], function(n){
                return n % 2 == 0;
            }), 2);
            assert.include(_.filter([1,2,3,4,5,6], function(n){
                return n % 2 == 0;
            }), 4);
            assert.include(_.filter([1,2,3,4,5,6], function(n){
                return n % 2 == 0;
            }), 6);
        })
    })
});
describe("_.where", function() {
    describe("Returns an array of all the values that contain all of the key-value pairs listed in properties", function(){
        it("...in an object", function(){
            assert.include(_.where(data, {"position": "right", "ribbonTitle": "And just like you, our focus is family"}), data.n2);
            assert.include(_.where(data, {"position": "right", "ribbonTitle": "And just like you, our focus is family"}), data.n4);
        });
    })
});
describe("_.findWhere", function() {
    describe("Returns the first value that contain all of the key-value pairs listed in properties", function(){
        it("...in an object", function(){
            assert.include(_.findWhere(data, {"position": "right", "ribbonTitle": "And just like you, our focus is family"}), data.n2);
            assert.notInclude(_.findWhere(data, {"position": "right", "ribbonTitle": "And just like you, our focus is family"}), data.n4);
        });
    })
});
describe("_.reject", function() {
    describe("Returns the values in list without the elements that the truth test passes. The opposite of filter", function(){
        it("Returns all odd values", function(){
            assert.lengthOf(_.reject([1,2,3,4,5,6], function(n){
                return n % 2 == 0;
            }), 3);
            assert.include(_.reject([1,2,3,4,5,6], function(n){
                return n % 2 == 0;
            }), 1);
            assert.include(_.reject([1,2,3,4,5,6], function(n){
                return n % 2 == 0;
            }), 3);
            assert.include(_.reject([1,2,3,4,5,6], function(n){
                return n % 2 == 0;
            }), 5);
        })
    })
});
describe("_.every", function() {

    it("Returns true if all of the values in the list pass the predicate truth test", function(){
        assert.isTrue(_.every([2,4,6,8], function(n){
            return n % 2 == 0;
        }));
    });
    it("Returns false if one element doesn't match", function(){
        assert.isFalse(_.every([1,2,3,4,5,6], function(n){
            return n % 2 == 0;
        }), 3);
    });
});
describe("_.some", function() {
    describe("Returns true if any of the values in the list pass the predicate truth test", function(){
        it("If the predicate is set", function(){
            assert.isTrue(_.some([null, 0, 'yes', false], function(p){
                return typeof p === 'number'
            }))
        });
        it("If there is no predicate, returns true values", function(){
            assert.isFalse(_.some([undefined, false, "", false]))
        })
    });
});
describe("_.contains", function() {

    var object = { '0': 'a', '1': 'b', '2': 'c'},
        array = [1, 2, 5, 8, 15, 'avc', {}, false];

    describe("Returns true if value is present in...", function(){

        it("...an array", function(){
            assert.isTrue(_.contains(array, 1));
        });

        it("...object values", function(){
            assert.isTrue(_.contains(object, 'a'));
        });

        it("...a string", function(){
            assert.isTrue(_.contains('abc', 'a'));
        });

    });

    describe("Returns false if value is NOT present in...", function(){

        it("...array", function(){
            assert.isFalse(_.contains(array, 55));
        });

        it('...object keys', function(){
            assert.isFalse(_.contains(object, '1'));
        });

        it("...a string", function(){
            assert.isFalse(_.contains('abc', 'd'));
        });

    })

});
describe("_.invoke", function() {
    describe("Calls the method passed on each value in the list", function(){
        it("Calls String methods", function(){
            expect(_.invoke(["Banana", "Orange", "Apple", "Mango"], 'toUpperCase')).to.include.members(["BANANA", "ORANGE", "APPLE", "MANGO"]);
            expect(_.invoke("Mango", 'slice')).to.include.members(['M', 'a', 'n', 'g', 'o']);
        });
        it("Calls Array methods", function(){
            assert.lengthOf(_.invoke([['M', 'a', 'n', 'g', 'o']], 'join'), 1);
            assert.equal(_.invoke([['M', 'a', 'n', 'g', 'o']], 'join')[0], 'M,a,n,g,o');
        });
    });

    it("Any extra arguments passed will be forwarded on to the method invocation", function(){
        expect(_.invoke([["Banana", "Orange", "Apple", "Mango"], ['a', 'v']], 'push', 'Pear')).to.include.members([5, 3]);
        expect(_.invoke(["Mango"], 'slice', 1, 3)).to.include.members(['an']);
    });
});
describe("_.pluck", function() {
    it("Extracts a list of property values", function(){
        assert.lengthOf(_.pluck(people, 'name'), 3);
        assert.include(_.pluck(people, 'name'), 'moe');
        assert.include(_.pluck(people, 'name'), 'larry');
        assert.include(_.pluck(people, 'name'), 'curly');
    })
});
describe("_.max", function() {

    // Positive tests
    describe("Return the msximum element", function() {

        function listOfThree(x, y, z) {
            it("If the list is: " + x + ", " + x - y +", "+ x - z + " expected result is: " + x, function() {
                assert.equal(_.max([x, x - y, x - z ]), x);
            });
        }

        function sameNumber(x){
            it("If the list contains " + x + " several times, expected result is: " + x, function() {
                assert.equal(_.max([x, x, x]), x);
            });
        }

        for (var x = 1; x <= 2; x++) {
            listOfThree(getRandomInt(100, x), getRandomInt(100, 2), getRandomInt(100, 5));
        }

        for (var i = 1; i <= 2; i++) {
            sameNumber(getRandomInt(100, i));
        }

    });

    // Negative tests
    describe("Negative tests", function() {

        it("If the list contains only non-numeric symbols, expected result is: Infinity", function() {
            assert.isNumber(_.max(['a', 'd', 'c']), "value isn't a number");
        });

        it("If the list contains a number and a list of text values, expected result is the number", function() {
            assert.isNumber(_.max(['a', 'qwe', 10]));
        });

    });

    // Testing callback
    describe("Return the element-based computation", function() {

        var people = [{'name': 'Kate', 'age': 7}, {'name': 'Sean', 'age': 45}, {'name': 'Tim', 'age': 21}, {'name': 'Sam', 'age': 100}];
        it("Returns object with the lowest 'age' property", function() {
            assert.propertyVal(_.max(people, function(person){ return person.age; }), 'age', 100);
        });
    });
});
describe("_.min", function() {

    // Positive tests
    describe("Return the minimum element", function() {

        function listOfThree(x, y, z) {
            it("If the list is: " + x + ", " + x + y +", "+ x + z + " expected result is: " + x, function() {
                assert.equal(_.min([x, x + y, x + z ]), x);
            });
        }

        function sameNumber(x){
            it("If the list contains " + x + " several times, expected result is: " + x, function() {
                assert.equal(_.min([x, x, x]), x);
            });
        }

        for (var x = 1; x <= 2; x++) {
            listOfThree(getRandomInt(100, x), getRandomInt(100, 2), getRandomInt(100, 5));
        }

        for (var i = 1; i <= 2; i++) {
            sameNumber(getRandomInt(100, i));
        }

    });

    // Negative tests
    describe("Negative tests", function() {

        it("If the list contains only non-numeric symbols, expected result is: Infinity", function() {
            assert.isNumber(_.min(['a', 'd', 'c']), "value isn't a number");
        });

        it("If the list contains a number and a list of text values, expected result is the number", function() {
            assert.isNumber(_.min(['a', 'qwe', 1]));
        });

    });

    // Testing callback
    describe("Return the element-based computation", function() {

        var people = [{'name': 'Kate', 'age': 7}, {'name': 'Sean', 'age': 45}, {'name': 'Tim', 'age': 21}, {'name': 'Sam', 'age': 100}];
        it("Returns object with the lowest 'age' property", function() {
            assert.propertyVal(_.min(people, function(person){ return person.age; }), 'age', 7);
        });
    });
});
describe("_.sortBy", function() {
    it("Returns a list in ascending order by the results of running each value through iteratee function", function(){
        var ar = [3.6, 4.7, 1.01, 5.5, 2.54, 6.4];
        var fnsort = function(n){return Math.floor(n)};
        assert.equal(_.sortBy(ar, fnsort)[0], 1.01);
        assert.equal(_.sortBy(ar, fnsort)[1], 2.54);
        assert.equal(_.sortBy(ar, fnsort)[2], 3.6);
        assert.equal(_.sortBy(ar, fnsort)[3], 4.7);
        assert.equal(_.sortBy(ar, fnsort)[4], 5.5);
        assert.equal(_.sortBy(ar, fnsort)[5], 6.4);
    });
    it("Iteratee may also be the string name of the property to sort by", function(){
        var a = ['abc', 'asfs', 'a', 'qwerty'];
        assert.equal(_.sortBy(a, 'length')[0], 'a');
        assert.equal(_.sortBy(a, 'length')[1], 'abc');
        assert.equal(_.sortBy(a, 'length')[2], 'asfs');
        assert.equal(_.sortBy(a, 'length')[3], 'qwerty');
    });
    it("Doesn't change the list length and list items", function(){
        assert.lengthOf(_.sortBy([1,2.5,3,4,5,6], function(n){return n % 2 == 0;}), 6);
        assert.include(_.sortBy([1,2.5,3,4,5,6], function(n){return n % 2 == 0;}), 1);
        assert.include(_.sortBy([1,2.5,3,4,5,6], function(n){return n % 2 == 0;}), 2.5);
        assert.include(_.sortBy([1,2.5,3,4,5,6], function(n){return n % 2 == 0;}), 3);
        assert.include(_.sortBy([1,2.5,3,4,5,6], function(n){return n % 2 == 0;}), 4);
        assert.include(_.sortBy([1,2.5,3,4,5,6], function(n){return n % 2 == 0;}), 5);
        assert.include(_.sortBy([1,2.5,3,4,5,6], function(n){return n % 2 == 0;}), 6);
    });
});
describe("_.groupBy", function() {

    describe("Splits a collection into sets, grouped by the result of running each value through iteratee", function(){
        var res = _.groupBy([1.8, 1.3, 2.1, 2.4], function(n){ return Math.floor(n);}),
            num1 = 1, num2 = 2;

        it("Returns an object with 2 properties", function(){
            assert.isObject(res);
            assert.equal(Object.keys(res).length, 2);
        });

        it("Each property contains an array with the results", function(){
            assert.isArray(res[num1]);
            assert.isArray(res[num2]);
        });

        it("Each result array contains proper values", function(){
            assert.include(res[num1], 1.3);
            assert.include(res[num1], 1.8);
            assert.include(res[num2], 2.1);
            assert.include(res[num2], 2.4);
        });
    });

    it("If iteratee is a string, groups by the property named", function(){
        assert.isObject(_.groupBy(data.n1, 'length'));
        assert.include(_.groupBy(data.n1, 'length')[3][0], 'p_1');
        assert.include(_.groupBy(data.n1, 'length')[3][1], '123');
        assert.include(_.groupBy(data.n1, 'length')[4][0], 'left');
        assert.include(_.groupBy(data.n1, 'length')[13][0], 'mc_header.jpg');
        assert.include(_.groupBy(data.n1, 'length')[27][0], 'One thing you can count on:');
    });
});
describe("_.indexBy", function() {
    describe("Given a list, and an iteratee function that returns a key for each element in the list (or a property name), returns an object with an index of each item", function(){
        var res = _.indexBy([{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}], 'name');

        it("Returns an object with 3 properties (acc. to this test case)", function(){
            assert.isObject(res);
            assert.equal(Object.keys(res).length, 3);
        });

        it("Each property contains an object with an index of each item", function(){
            assert.isObject(res['moe']);
            assert.isObject(res['larry']);
            assert.isObject(res['curly']);
        });

        it("Each result array contains proper values", function(){
            assert.equal(res['moe'].name, 'moe');
            assert.equal(res['larry'].name, 'larry');
            assert.equal(res['curly'].name, 'curly');

            assert.equal(res['moe'].age, 40);
            assert.equal(res['larry'].age, 50);
            assert.equal(res['curly'].age, 60);
        });
    });
});
describe("_.countBy", function() {
    describe("Sorts a list into groups and returns a count for the number of objects in each group", function(){
        var res = _.countBy([1.8, 1.3, 2.1, 2.4], function(n){ return Math.floor(n);}),
            num1 = 1, num2 = 2;

        it("Returns an object with 2 properties", function(){
            assert.isObject(res);
            assert.equal(Object.keys(res).length, 2);
        });

        it("Each property contains an array with the results", function(){
            assert.isNumber(res[num1]);
            assert.isNumber(res[num2]);
        });

        it("Each result array contains proper values count", function(){
            assert.equal(res[num1], 2);
            assert.equal(res[num2], 2);
        });

        it("If iteratee is a string, groups by the property named", function(){
            assert.isObject(_.countBy(data.n1, 'length'));
            assert.equal(_.countBy(data.n1, 'length')[3], 2);
            assert.equal(_.countBy(data.n1, 'length')[4], 1);
            assert.equal(_.countBy(data.n1, 'length')[13], 1);
            assert.equal(_.countBy(data.n1, 'length')[27], 1);
        });
    });
});
describe("_.shuffle", function() {
    describe("Returns a shuffled copy of the list", function(){
        it("Doesn't change the length of an array", function(){
            assert.lengthOf(_.shuffle([1,2,3,4,5,6]), 6);
            assert.lengthOf(_.shuffle('abcdefg'), 7);
        });
        it("A shuffled array consists of the same items as the original one", function(){
            assert.include(_.shuffle([1,2,3,4,5,6]), 1);
            assert.include(_.shuffle([1,2,3,4,5,6]), 2);
            assert.include(_.shuffle([1,2,3,4,5,6]), 3);
            assert.include(_.shuffle([1,2,3,4,5,6]), 4);
            assert.include(_.shuffle([1,2,3,4,5,6]), 5);
            assert.include(_.shuffle([1,2,3,4,5,6]), 6);
        });
    });
});
describe("_.sample", function() {
    describe("Produce a random sample from the list", function(){

        var object = { '0': 'a', '1': 'b', '2': 'c'};
        var array = [1, 2, 3, 4, 5, 6, 7, 8];

        it("The sample value is from the array passed to the function", function(){
            assert.includeMembers(array, [_.sample(array)]);
            assert.includeMembers(array, _.sample(array, 2));
        })

    })
});
describe("_.toArray", function() {

    describe("Converts given element to Array", function(){

        var object = { '0': 'a', '1': 'b', '2': 'c'};

        it("Chai proves that object became an array", function(){
            assert.isArray(_.toArray(object));
        })

    })

});
describe("_.size", function() {

    describe("Counts size of...", function(){

        var array = ["abc", 23, 10],
            object = {'name': 'Kate', 'age': 7};

        it("...an array", function(){
           assert.equal(_.size(array), 3)
        });

        it("...an object", function(){
            assert.equal(_.size(object), 2)
        });

        it("...string characters", function(){
            assert.equal(_.size('boom!'), 5)
        });

        it("...nothing as 0 (zero)", function(){
            assert.equal(_.size(), 0)
        });

        it("...number as 0 (zero)", function(){
            assert.equal(_.size(7), 0)
        });

        it("...boolean as 0 (zero)", function(){
            assert.equal(_.size(true), 0)
        });

        it("...undefined as 0 (zero)", function(){
            assert.equal(_.size(undefined), 0)
        })
    })
});
describe("_.partition", function() {

    describe("Divides array...", function(){
        it("...into 2 arrays", function(){
            assert.lengthOf(_.partition(menWomenArray, partitionRule), 2 )
        });

        it("...each having 3 items", function(){
            assert.lengthOf(_.partition(menWomenArray, partitionRule)[0], 3 );
            assert.lengthOf(_.partition(menWomenArray, partitionRule)[1], 3 );
        });

        for (var i = 0; i <= 2; i++) {
            manorwoman(i);
        }

        function manorwoman(i){
            it("...with the " + i + " object of the 1-st array having 'M' gender", function(){
                assert.propertyVal(_.partition(menWomenArray, partitionRule)[0][i], 'gender', 'M');
            });
            it("...with the " + i + " object of the 2-nd array having 'F' gender", function(){
                assert.propertyVal(_.partition(menWomenArray, partitionRule)[1][i], 'gender', 'F');
            });
        }
    });

    var menWomenArray = [
        { name: 'John', gender: 'M' },
        { name: 'Kate', gender: 'F' },
        { name: 'Linda', gender: 'F' },
        { name: 'Wilson', gender: 'M' },
        { name: 'Julia', gender: 'F' },
        { name: 'James', gender: 'M' }
    ];

    function partitionRule(arr){
        if(arr.gender === 'M'){
            return arr;
        }
    }
});

// Helpers
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

var people = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}],
    NumberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9 , 10],
    StringArray = ['a', 'b', 'c', 'd', 'e', 'f'];
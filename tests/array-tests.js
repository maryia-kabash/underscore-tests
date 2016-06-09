/*

 Arrays

 + first
 + initial
 + last
 + rest
 + compact
 + flatten
 + without
 + union
 + intersection
 + difference
 + uniq
 + zip
 + unzip
 + object
 + indexOf
 + lastIndexOf
 + sortedIndex
 + findIndex
 + findLastIndex
 + range

 */

describe("_.first", function() {

    describe("Returns the first element of an array", function() {

        function getfirst(i){
            it("Array #" + i, function () {
                assert.equal(_.first(ListArrays[i]), ListArrays[i][0]);
            });
        }

        for (var i = 0; i <= 3; i++) {
            getfirst(i);
        }

        it("Object returns undefined", function () {
            assert.isUndefined(_.first({'a': 'c'}));
        });

        it("String returns first letter (case matters)", function () {
            assert.equal(_.first('Hello!'), 'H');
        });

    });

    describe("Passing n will return the first n elements of the array", function() {

        for (var i = 0; i <= 3; i++) {
            getfirstN(i);
        }

        function getfirstN(i){
            it("Array #" + i, function () {
                assert.equal(_.first(ListArrays[i]), ListArrays[i][0]);
            });
        }

        it("Array of numbers", function () {
            assert.include(_.first(NumberArray, 2), NumberArray[0]);
            assert.include(_.first(NumberArray, 2), NumberArray[1]);
            assert.lengthOf(_.first(NumberArray, 2), 2);
        });

    });
});
describe("_.initial", function() {
    describe("Returns everything but the last entry of the array", function(){
        it("Reduces array length by 1", function(){
            assert.lengthOf(_.initial(NumberArray), NumberArray.length - 1);
            assert.lengthOf(_.initial(StringArray), StringArray.length - 1);
            assert.lengthOf(_.initial(MixedArray), MixedArray.length - 1);
            assert.lengthOf(_.initial(ListArrays), ListArrays.length - 1);
        });

        it("Doesn't change other items", function(){

            for(var i=0; i < NumberArray.length -1; i++) {
                assert.equal(_.initial(NumberArray)[i], i + 1);
            }
        })

    });

    describe("Pass n to exclude the last n elements from the result.", function(){
        it("Reduces array length by given number", function(){
            assert.lengthOf(_.initial(NumberArray, 2), NumberArray.length - 2);
            assert.lengthOf(_.initial(StringArray, 3), StringArray.length - 3);
            assert.lengthOf(_.initial(MixedArray, 0), MixedArray.length);
            assert.lengthOf(_.initial(ListArrays, -1), ListArrays.length);
        });
    })
});
describe("_.last", function() {
    it("Returns the last element of an array", function(){
        assert.equal(_.last(NumberArray), 10);
        assert.equal(_.last(StringArray), 'f');
        assert.equal(_.last(MixedArray), 'Array');

        assert.equal(_.last(ObjectArray).name, 'James');
        assert.equal(_.last(ObjectArray).gender, 'M');

        assert.equal(_.last(ListArrays)[0], 1);
        assert.equal(_.last(ListArrays)[1], false);
        assert.equal(_.last(ListArrays)[2].name, 'John');
        assert.equal(_.last(ListArrays)[2].gender, 'M');
        assert.equal(_.last(ListArrays)[3], 'Array');
    });

    it("Passing n will return the last n elements of the array", function(){
        expect(_.last(NumberArray, 2)).to.include.members([9, 10]);
    })
});
describe("_.rest", function() {
    it("Returns the rest of the elements in an array", function(){
        assert.notInclude(_.rest(NumberArray), 1);
        assert.notInclude(_.rest(StringArray), 'a');
        assert.notInclude(_.rest(ObjectArray).name, 'John');
        assert.notInclude(_.rest(MixedArray), 1);
    });
    it("Pass an index to return the values of the array from that index onward", function(){
        assert.notInclude(_.rest(NumberArray, 2), 1);
        assert.notInclude(_.rest(NumberArray, 2), 2);
        assert.notInclude(_.rest(NumberArray, 3), 1);
        assert.notInclude(_.rest(NumberArray, 3), 2);
        assert.notInclude(_.rest(NumberArray, 3), 3);

    })
});
describe("_.compact", function() {
    it("Returns a copy of the array with all falsy values removed", function(){
        var f = [0, false, NaN, null, "", undefined];
        expect(_.compact(f)).to.be.empty;
    })
});
describe("_.flatten", function() {
    var nestedArr = [1, [2,3], [4, [5, [6, 7]]]];
    it("Flattens a nested array (the nesting can be to any depth)", function(){
        for(var i=1; i< 8; i++) {
            assert.include(_.flatten(nestedArr), i);
        }
    });

    it("If you pass true the second param, the array will only be flattened a single level.", function(){
        assert.equal(_.flatten(nestedArr, true)[0], 1);
        assert.equal(_.flatten(nestedArr, true)[1], 2);
        assert.equal(_.flatten(nestedArr, true)[2], 3);
        assert.equal(_.flatten(nestedArr, true)[3], 4);
        assert.isArray(_.flatten(nestedArr, true)[4]);
    })
});
describe("_.without", function() {
    it("Returns a copy of the array with all instances of the values removed", function(){
       assert.lengthOf(_.without(NumberArray, 1, 7, 3, 4, 10), 5);
        assert.equal(_.without(NumberArray, 1, 7, 3, 4, 10)[0], 2);
        assert.equal(_.without(NumberArray, 1, 7, 3, 4, 10)[1], 5);
        assert.equal(_.without(NumberArray, 1, 7, 3, 4, 10)[2], 6);
        assert.equal(_.without(NumberArray, 1, 7, 3, 4, 10)[3], 8);
        assert.equal(_.without(NumberArray, 1, 7, 3, 4, 10)[4], 9);
    });
});
describe("_.union", function() {
    it("Computes the union of the passed-in arrays: the list of unique items, in order, that are present in one or more of the arrays", function(){
        var a1 = [1, 2, 3],
            a2 = ["a", 2, true],
            a3 = [{a: 8}, false, 4, null];

        assert.lengthOf(_.union(a1,a2,a3), 9);
        expect(_.union(a1,a2,a3)).to.deep.include.members([1, 2, 3, "a", true, {a:8}, false, 4, null]);
    });
});
describe("_.intersection", function() {
    it("Computes the list of values that are the intersection of all the arrays. Each value in the result is present in each of the arrays.", function(){
        var a1 = [1, 2, 3],
            a2 = ["a", 2, true, 3],
            a3 = [{a: 8}, false, 2, null, 3];

        assert.lengthOf(_.intersection(a1,a2,a3), 2);
        expect(_.intersection(a1,a2,a3)).to.include.members([2,3]);
    })
});
describe("_.difference", function() {
    it("Similar to without, but returns the values from array that are not present in the other arrays.", function(){
        expect(_.difference([1, 2, 3, 4, 5,6,7], [5, 2, 10, 7])).to.include.members([1, 3, 4, 6]);
    })
});
describe("_.uniq", function() {
    var a = [1, 2, 3, 5, 3, 1, '1', 7, 12, 2, 4];

    describe("Produces a duplicate-free version of the array", function(){
        it("Uses === to test object equality", function(){
            expect(_.uniq(a)).to.include.members([1, 2, 3, 4, 5, '1', 7, 12]);
            assert.lengthOf(_.uniq(a), 8);
        });
        it("Only the first occurence of each value is kept", function(){
            assert.equal(_.uniq(a)[0], 1);
            assert.equal(_.uniq(a)[1], 2);
            assert.equal(_.uniq(a)[2], 3);
            assert.equal(_.uniq(a)[3], 5);
            assert.equal(_.uniq(a)[4], '1');
            assert.equal(_.uniq(a)[5], 7);
            assert.equal(_.uniq(a)[6], 12);
            assert.equal(_.uniq(a)[7], 4);
        })
    });

    it("If you know in advance that the array is sorted, passing true for isSorted will run a much faster algorithm.", function(){
        var sorted = [1, 2, 3, 5, 3, 1, '1', 7, 12, 2, 4].sort();
        expect(_.uniq(sorted, true)).to.include.members([1, 2, 3, 4, 5, '1', 7, 12]);
        assert.lengthOf(_.uniq(sorted, true), 8);
    });

    it("If you want to compute unique items based on a transformation, pass an iteratee function", function(){
        expect(_.uniq(a, transform)).to.include.members([1, 2]);
        assert.lengthOf(_.uniq(a, transform), 2);

        function transform(n){
           if( typeof n != "number") return false;
            return n % 2 == 0;
        }
    });
});
describe("_.zip", function() {
    it("Merges together the values of each of the arrays with the values at the corresponding position", function(){

        for(var i=0; i < 10; i++){
            assert.lengthOf(_.zip(NumberArray, StringArray, ObjectArray)[i], 3);

            expect(_.zip(NumberArray, StringArray, ObjectArray)[i]).to.deep.include.members([NumberArray[i], StringArray[i], ObjectArray[i]]);
        }
    })
});
describe("_.unzip", function() {
    it("The opposite of zip. Given an array of arrays, returns new arrays, the 1st contains all of the first elements in the input arrays, and so on", function(){
        var zipped = _.zip(NumberArray, StringArray, ObjectArray);

        assert.lengthOf(_.unzip(zipped), 3);

        for(var i=0; i < 3; i++) {
            assert.lengthOf(_.unzip(zipped)[i], 10);
        }
        expect(_.unzip(zipped)[0]).to.deep.include.members(NumberArray);
        expect(_.unzip(zipped)[1]).to.deep.include.members(StringArray, undefined);
        expect(_.unzip(zipped)[2]).to.deep.include.members(ObjectArray, undefined);
    })
});
describe("_.object", function() {
    var NamesArray = ['Alice', 'Tim', 'Jimmy', 'Carl'],
        SurnamesArray = ['In Chains', 'Burton', 'Morrison', '12'],
        obj = _.object(NamesArray, SurnamesArray),
        obj2 = _.object([['Alice', 'In Chains'], ['Tim', 'Burton'], ['Jimmy', 'Morrison'], ['Carl', '12']]);

    it("Converts arrays into objects.", function(){
         assert.isObject(obj);
         assert.isObject(obj2);
    });

    it("Pass either a single list of [key, value] pairs...", function(){
        assert.equal(obj2['Alice'], 'In Chains');
        assert.equal(obj2['Tim'], 'Burton');
        assert.equal(obj2['Jimmy'], 'Morrison');
        assert.equal(obj2['Carl'], '12');
    });

    it("or a list of keys, and a list of values", function(){
        assert.equal(obj['Alice'], 'In Chains');
        assert.equal(obj['Tim'], 'Burton');
        assert.equal(obj['Jimmy'], 'Morrison');
        assert.equal(obj['Carl'], '12');
    });

    it("If duplicate keys exist, the last value wins.", function(){
        NamesArray.push('Carl');
        SurnamesArray.push('The Great');
        assert.equal(_.object(NamesArray, SurnamesArray)['Carl'], 'The Great');
    });

    it("Also works with only one array passed", function(){
        assert.equal(_.object(NamesArray)['A'], 'l');
        assert.equal(_.object(NamesArray)['T'], 'i');
        assert.equal(_.object(NamesArray)['J'], 'i');
        assert.equal(_.object(NamesArray)['C'], 'a');
    });
});
describe("_.indexOf", function() {
    var a = [1, 2, 2, 3, 4, 4];
    it("Returns the index at which value can be found in the array,", function(){
        assert.equal(_.indexOf(a, 1), 0);
        assert.equal(_.indexOf(a, 2), 1);
        assert.equal(_.indexOf(a, 3), 3);
        assert.equal(_.indexOf(a, 4), 4);
    });
    it("or -1 if value is not present in the array.", function(){
        assert.equal(_.indexOf(a,5), -1);
    });
    it("If you're working with a large array, and you know that the array is already sorted, pass true for isSorted to use a faster binary search", function(){
        assert.equal(_.indexOf(a, 1, true), 0);
    });
    it("... or, pass a number as the third argument in order to look for the first matching value in the array after the given index.", function(){
        assert.equal(_.indexOf(a, 1, 2), -1);
        assert.equal(_.indexOf(a, 2, 2), 2);
        assert.equal(_.indexOf(a, 3, 2), 3);
        assert.equal(_.indexOf(a, 4, 2), 4);
    });
});
describe("_.lastIndexOf", function() {
    var a = [1, 2, 2, 3, 4, 4];

    it("Returns the index of the last occurrence of value in the array,  ", function(){
        assert.equal(_.lastIndexOf(a, 1), 0);
        assert.equal(_.lastIndexOf(a, 2), 2);
        assert.equal(_.lastIndexOf(a, 3), 3);
        assert.equal(_.lastIndexOf(a, 4), 5);
    });
    it("or -1 if value is not present.", function(){
        assert.equal(_.lastIndexOf(a,5), -1);
    });
    it("Pass fromIndex to start your search at a given index.", function(){
        assert.equal(_.lastIndexOf(a, 1, 2), 0);
        assert.equal(_.lastIndexOf(a, 2, 2), 2);
        assert.equal(_.lastIndexOf(a, 3, 2), -1);
        assert.equal(_.lastIndexOf(a, 4, 2), -1);
    });
});
describe("_.sortedIndex", function() {
    it("Uses a binary search to determine the index at which the value should be inserted into the list in order to maintain the list's sorted order.", function(){
        assert.equal(_.sortedIndex(NumberArray, 2.5), 2);
        assert.equal(_.sortedIndex(NumberArray, 11), 10);
    });
    it("The iteratee is the string name of the property to sort by (eg. length).", function(){
        assert.equal(_.sortedIndex(ObjectArray, {name: 'Alice', gender: 'F'}, 'name'), 0)
    });
});
describe("_.findIndex", function() {
    it("returns the first index where the predicate truth test passes", function(){
        assert.equal(_.findIndex(MixedArray, _.isNumber), 0);
        assert.equal(_.findIndex(MixedArray, _.isBoolean), 1);
        assert.equal(_.findIndex(MixedArray, _.isObject), 2);
        assert.equal(_.findIndex(MixedArray, _.isString), 3);
    });
    it("otherwise returns -1.", function(){
        assert.equal(_.findIndex(MixedArray, _.isArray), -1);
    });
});
describe("_.findLastIndex", function() {
    it("Like _.findIndex but iterates the array in reverse, returning the index closest to the end where the predicate truth test passes.", function(){
        NumberArray.push(5);
        assert.equal(_.findLastIndex(NumberArray, function(n){return n === 5}), 10);
    });
    it("otherwise returns -1.", function(){
        assert.equal(_.findLastIndex(MixedArray, _.isArray), -1);
    });
});
describe("_.range([start], stop, [step]) ", function() {

    it("A function to create flexibly-numbered lists of integers. start, if omitted, defaults to 0; step defaults to 1.", function(){
        expect(_.range(3)).to.include.members([0, 1, 2]);
        expect(_.range(0, 3, 1)).to.include.members([0, 1, 2]);
    });
    it("Returns a list of integers from start (inclusive) to stop (exclusive), incremented (or decremented) by step, exclusive. ", function(){
        expect(_.range(1, 3)).to.include.members([1]);
        expect(_.range(0 ,3, 5)).to.not.include.members([5]);
    });
    it("Note that ranges that stop before they start are considered to be zero-length instead of negative", function(){
        assert.lengthOf(_.range(4, 2), 0);
    });
    it("— if you'd like a negative range, use a negative step.", function(){
        expect(_.range(-1, -4, -1)).to.include.members([-1, -2, -3]);
    });
});


// Helpers
var NumberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9 , 10],
    StringArray = ['a', 'b', 'c', 'd', 'e', 'f'],
    ObjectArray = [
        { name: 'John', gender: 'M' },
        { name: 'Kate', gender: 'F' },
        { name: 'Linda', gender: 'F' },
        { name: 'Wilson', gender: 'M' },
        { name: 'Julia', gender: 'F' },
        { name: 'James', gender: 'M' }
    ],
    MixedArray = [1, false, { name: 'John', gender: 'M' }, 'Array'],
    ListArrays = [NumberArray, StringArray, ObjectArray, MixedArray];

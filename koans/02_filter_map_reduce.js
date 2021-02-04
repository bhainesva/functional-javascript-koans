function curry(fn) {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}

const eq = curry((a, b) => a === b);

const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];



describe("Filter", () => {
  describe("Implement a predicate function to select even numbers", () => {

    /********************* YOUR IMPLEMENTATION *********************/

    // predicate :: Number → Boolean
    const mod = curry((a, b) => b%a)
    const predicate = compose(eq(0), mod(2))

    /***************************************************************/

    test("selects only even numbers", () => {
      expect([1, 2, 3, 4, 5, 6].filter(predicate)).toEqual([2, 4, 6]);
      expect([10, 12, 13, 14, 15, 16].filter(predicate)).toEqual([10, 12, 14, 16]);
    });
  });

  describe("Implement a predicate function to drop palindromes", () => {

    // palindrome - word which reads the same backward as forward

    /********************* YOUR IMPLEMENTATION *********************/

    // predicate :: String → Boolean
    const predicate = x => x.toLowerCase() !== x.toLowerCase().split('').reverse().join('');

    /***************************************************************/

    test("selects only non-palindromes", () => {
      expect(["Hannah", "car", "kayak", "John"].filter(predicate)).toEqual(["car", "John"]);
      expect(["steps", "level", "madam", "example"].filter(predicate)).toEqual(["steps", "example"]);
    });
  });

  describe("Implement your own filter function using a for loop", () => {
    /********************* YOUR IMPLEMENTATION *********************/

    // filter :: ((a → Boolean), [a]) → [a]
    const filter = (f, arr) => {
      const res = [];
      for (const el of arr) {
        if (f(el)) {
          res.push(el);
        }
      }

      return res;
    }

    /***************************************************************/

    test("accepts predicate and returns new array", () => {
      expect(filter(i => i < 5, [1, 6, 2, 5])).toEqual([1, 2]);
      expect(filter(i => i.length >= 5, ["car", "cryon", "laptop"])).toEqual(["cryon", "laptop"]);
    });
  });
});

// Now you can switch to 01_closures.js and come back when you are done with unique function

describe("Map", () => {
  describe("Implement iterative (with loop) fibonacci function to map n-th element to its value", () => {
    /********************* YOUR IMPLEMENTATION *********************/

    // fibonacci :: Number → Number
    const fibonacci = (x) => {
      let prev = 1;
      let cur = 0;
      for (let i = 0; i < x; i++) {
        const tmp = cur;
        cur = cur + prev;
        prev = tmp;
      }

      return cur;
    }

    /***************************************************************/

    test("maps n-th element to it's value", () => {
      expect([0, 1, 2, 3].map(fibonacci)).toEqual([0, 1, 1, 2]);
      expect([15, 20, 25, 30].map(fibonacci)).toEqual([610, 6765, 75025, 832040]);
    });
  });

  describe("Implement your own map function using a for loop", () => {
    /********************* YOUR IMPLEMENTATION *********************/

    // map :: ((a → b), [a]) → [b]
    const map = (f, arr) => {
      const res = [];
      for (const el of arr) {
        res.push(f(el));
      }

      return res;
    }

    /***************************************************************/

    test("accepts project function and returns new array", () => {
      expect(map(i => i * 5, [1, 6, 2, 5])).toEqual([5, 30, 10, 25]);
      expect(map(i => i.length, ["car", "cryon", "laptop"])).toEqual([3, 5, 6]);
    });
  });

  describe("Implement a range function", () => {
    /********************* YOUR IMPLEMENTATION *********************/

    // HINT: You can do it in one line using Array.from (or spread operator), array constructor and built-in map function

    // range :: (Number, Number) → [Number]
    const range = (a, b) => [...Array(b-(a-1))].map((el, i) => a + i)

    /***************************************************************/

    test("renders range from natural numbers", () => {
      expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
      expect(range(0, 5)).toEqual([0, 1, 2, 3, 4, 5]);
    });

    test("renders range from whole numbers", () => {
      expect(range(-3, 3)).toEqual([-3, -2, -1, 0, 1, 2, 3]);
    });
  });
});

describe("Reduce", () => {
  describe("Implement fromPairs (https://lodash.com/docs#fromPairs) function using reduce", () => {
    /********************* YOUR IMPLEMENTATION *********************/

    // fromPairs :: ({ [a]: b }) → [{a, b}]
    const fromPairs = (pairs) => pairs.reduce((acc, cur) => {acc[cur[0]] = cur[1]; return acc}, {});

    /***************************************************************/

    test("transforms array of 2-element arrays with a key and a value to an object", () => {
      expect(fromPairs([["foo", "bar"], ["foz", 1]])).toEqual({ foo: "bar", foz: 1 });
    });
  });

  describe("Implement your own map function using Array.prototype.reduce", () => {
    /********************* YOUR IMPLEMENTATION *********************/

    // map :: ((a → b), [a]) → [b]
    const map = (f, arr) => arr.reduce((acc, cur) => {
      acc.push(f(cur));
      return acc;
    }, []);

    /***************************************************************/

    test("accepts project function and returns new array", () => {
      expect(map(i => i * 5, [1, 6, 2, 5])).toEqual([5, 30, 10, 25]);
      expect(map(i => i.length, ["car", "cryon", "laptop"])).toEqual([3, 5, 6]);
    });
  });

  describe("Implement your own filter function using Array.prototype.reduce", () => {
    /********************* YOUR IMPLEMENTATION *********************/

    // filter :: ((a → Boolean), [a]) → [a]
    const filter = (p, arr) => arr.reduce((acc, cur) => {
      if (p(cur)) {
        acc.push(cur);
      }
      return acc;
    }, []);

    /***************************************************************/

    test("accepts predicate and returns new array", () => {
      expect(filter(i => i < 5, [1, 6, 2, 5])).toEqual([1, 2]);
      expect(filter(i => i.length >= 5, ["car", "cryon", "laptop"])).toEqual(["cryon", "laptop"]);
    });
  });
});

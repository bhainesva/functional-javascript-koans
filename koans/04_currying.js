describe("Currying", () => {
  describe("Implement curry function", () => {
    /********************* YOUR IMPLEMENTATION *********************/

    // HINT: Function.prototype.length specifies function arity

    // curry :: (* → a) → (* → a)
    const curry = (fn) => {
      const arity = fn.length;
      if (arity === 1) return fn;

      return (...args) => {
        if (args.length == arity) {
          return fn(...args);
        }
        return curry(fn.bind(this, ...args));
      };
    };

    /***************************************************************/

    test("curried function returns a function after applying a first argument", () => {
      const sum = (a, b) => a + b;
      const curriedSum = curry(sum);
      expect(typeof curriedSum(sum)).toEqual("function");
    });

    test("curried function returns correct result after applying all arguments", () => {
      const sum = (a, b) => a + b;
      const curriedSum = curry(sum);
      expect(curriedSum(2)(3)).toEqual(5);
    });

    test("curried function's arguments can be applied within a first call", () => {
      const sum = (a, b) => a + b;
      const curriedSum = curry(sum);
      expect(curriedSum(2, 3)).toEqual(5);
    });
  });
});

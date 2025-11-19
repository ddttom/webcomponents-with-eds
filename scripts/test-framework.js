/**
 * EDS Test Framework
 * A simple, zero-dependency testing utility for EDS components.
 */

export class EDSTestFramework {
  constructor() {
    this.tests = [];
    this.results = [];
  }

  /**
   * Register a test case
   * @param {string} name - Description of the test
   * @param {Function} testFunction - Async function containing test logic
   */
  test(name, testFunction) {
    this.tests.push({ name, testFunction });
  }

  /**
   * Run all registered tests
   */
  async runAll() {
    console.log('🚀 Starting EDS Component Tests...');
    const startTime = performance.now();

    for (const test of this.tests) {
      try {
        await test.testFunction();
        this.results.push({ name: test.name, status: 'PASS' });
        console.log(`✅ ${test.name}`);
      } catch (error) {
        this.results.push({ name: test.name, status: 'FAIL', error });
        console.error(`❌ ${test.name}`);
        console.error(`   ${error.message}`);
      }
    }

    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);
    this.printSummary(duration);
  }

  /**
   * Print test summary to console
   * @param {number} duration - Total execution time in ms
   */
  printSummary(duration) {
    const passed = this.results.filter(r => r.status === 'PASS').length;
    const failed = this.results.filter(r => r.status === 'FAIL').length;
    const total = this.results.length;

    console.log('\n📊 Test Summary');
    console.log('================');
    console.log(`Total:  ${total}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Time:   ${duration}ms`);

    if (failed > 0) {
      console.log('\n❌ Some tests failed.');
    } else {
      console.log('\n✅ All tests passed!');
    }
  }
}

/**
 * Assertion helper
 * @param {boolean} condition - Condition to check
 * @param {string} message - Error message if condition is false
 */
export function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

/**
 * Expect helper for BDD-style assertions
 * @param {any} actual - Actual value
 * @returns {object} Matchers
 */
export function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`Expected ${expected} but got ${actual}`);
      }
    },
    toBeTruthy() {
      if (!actual) {
        throw new Error(`Expected ${actual} to be truthy`);
      }
    },
    toBeFalsy() {
      if (actual) {
        throw new Error(`Expected ${actual} to be falsy`);
      }
    },
    toContain(item) {
      if (!actual.includes(item)) {
        throw new Error(`Expected ${actual} to contain ${item}`);
      }
    },
    not: {
      toBe(expected) {
        if (actual === expected) {
          throw new Error(`Expected ${actual} not to be ${expected}`);
        }
      }
    }
  };
}

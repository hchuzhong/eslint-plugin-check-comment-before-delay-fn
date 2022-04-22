const { RuleTester } = require('eslint');
const rule = require('../../../lib/processors/delay-fn-comment');
const ruleTester = new RuleTester();
ruleTester.run('delay-fn-comment', rule, {
    valid: [{
        code: `
        // this is comment
        setTimeout();
        `
    }, {
        code: `
        // testFn for option
        testFn();
        `,
        options: [
            ['testFn']
        ]
    }],
    invalid: [{
        code: `setTimeout();`,
        errors: [{ message: 'error: should add comment before async function' }]
    }]
})
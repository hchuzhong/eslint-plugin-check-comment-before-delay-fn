module.exports = {
    meta: {
        type: 'problem',
        schema: [{
            type: 'array',
            items: { type: 'string' }
        }]
    },
    create: function(context) {
        const asyncToken = ['nextTick', 'setTimeout', 'setInterval'];
        const sourceCode = context.getSourceCode();
        return {
            'CallExpression': (node) => {
                const options = context.options[0];
                const allAsyncToken = Array.isArray(options) ? asyncToken.concat(options) : asyncToken;
                const name = node.callee.name;
                if (!name) return;
                if (!allAsyncToken.includes(name)) return;
                if (sourceCode.getCommentsBefore(node).length === 0) {
                    context.report({ node, message: 'error: should add comment before async function' });
                }
            }
        };
    }
}
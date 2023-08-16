import {AST_NODE_TYPES, TSESLint} from '@typescript-eslint/utils';

type MessageIds = 'messageIdForOption'

const myOptionRule: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: 'suggestion',
    messages: {
      messageIdForOption: 'An option was received',
    },
    schema: [],
    // schema: [{
    //   type: 'object',
    //   properties: {
    //     allow: {
    //       type: 'array',
    //       contains: ['beforeAll', 'beforeEach', 'afterAll', 'afterEach']
    //     }
    //   },
    //   additionalProperties: false
    // }],
  },
  create: context => ({
    CallExpression: node => {
      if (node.callee.type !== AST_NODE_TYPES.Identifier) {
        return;
      }

      if (node.callee.name === 'foo') {
        return context.report({
          node: node.callee,
          messageId: 'messageIdForOption',
        });
      }
      return;
    },
  }),
};

export default myOptionRule;

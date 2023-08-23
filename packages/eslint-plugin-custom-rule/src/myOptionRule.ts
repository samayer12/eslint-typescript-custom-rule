import {AST_NODE_TYPES, TSESLint} from '@typescript-eslint/utils';

type MessageIds = 'messageIdForOption';
type Options = [{ max: number }]

const myOptionRule: TSESLint.RuleModule<MessageIds, Options> = {
  defaultOptions: [{max: 1}],
  meta: {
    type: 'suggestion',
    messages: {
      messageIdForOption: 'Error message for too short',
    },
    schema: [
      {
        type: 'object',
        properties: {
          max: {
            type: 'number'
          }
        },
        additionalProperties: false
      }
    ],
  },
  create: context => ({
    CallExpression: node => {
      const myOptions = context.options;
      if (myOptions) {
        console.log("Let's goooo")
      }
      if (node.callee.type !== AST_NODE_TYPES.Identifier) {
        return;
      }

      if (node.callee.name.length < 5) {
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
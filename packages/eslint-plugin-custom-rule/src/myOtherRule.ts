import {AST_NODE_TYPES, TSESLint} from '@typescript-eslint/utils';

type MessageIds = 'messageIdForTooShort';

const myOtherRule: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: 'suggestion',
    messages: {
      messageIdForTooShort: 'Error message for too short',
    },
    schema: [], // no options
  },
  create: context => ({
    CallExpression: node => {
      if (node.callee.type !== AST_NODE_TYPES.Identifier) {
        return;
      }

      if (node.callee.name.length < 5) {
        return context.report({
          node: node.callee,
          messageId: 'messageIdForTooShort',
        });
      }
      return;
    },
  }),
};

export default myOtherRule;

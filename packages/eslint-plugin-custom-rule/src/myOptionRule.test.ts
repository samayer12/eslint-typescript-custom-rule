import {ruleTester} from "./util/test";

import myOptionRule from './myOptionRule'

ruleTester.run('my-option-rule', myOptionRule, {
  valid: ['notFooBar()'],
  invalid: [
    {
      code: 'foo()',
      errors: [{messageId: 'messageIdForOption'}],
    },
  ],
});

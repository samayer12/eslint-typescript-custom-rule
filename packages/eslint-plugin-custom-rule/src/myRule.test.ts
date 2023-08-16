import {ruleTester} from "./util/test";

import myRule from './myRule'

ruleTester.run('my-rule', myRule, {
  valid: ['notFooBar()', 'aReallyLongToken()', 'shosho()',
  ],
  invalid: [
    {
      code: 'foo()',
      errors: [{messageId: 'messageIdForSomeFailure'}],
    },
    {
      code: 'bar()',
      errors: [{messageId: 'messageIdForSomeOtherFailure'}],
    },
  ],
});

import {ruleTester} from "./util/test";

import myOtherRule from './myOtherRule';


ruleTester.run('my-rule', myOtherRule, {
  valid: ['notFooBar()', 'aReallyLongToken()', 'shosho()'],
  invalid: [
    {
      code: 'a()',
      errors: [{messageId: 'messageIdForTooShort'}],
    },
    {
      code: 'foo()',
      errors: [{messageId: 'messageIdForTooShort'}],
    },
    {
      code: 'bar()',
      errors: [{messageId: 'messageIdForTooShort'}],
    },
  ],
});

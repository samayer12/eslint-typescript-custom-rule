import expectExpectRule from "./expect-expect";
import {ruleTester} from "./util/test";

ruleTester.run('expect-expect', expectExpectRule, {
  valid: [
    `test("shows error", () => {
          expect(true).toBe(false);
        });`,
    {
      code: 'test("shows success", () => {expectValue(true).toBe(false);});',
      options: [
        {'custom-expression': 'expectValue'}
      ]
    },
  ],
  invalid: [
    {
      code: 'test("shows error", () => {});',
      errors: [{messageId: 'expectedExpect'}],
    },
  ]
})
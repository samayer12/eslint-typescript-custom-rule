import expectExpectRule from "./expect-expect";
import {ruleTester} from "./util/test";

ruleTester.run('expect-expect', expectExpectRule, {
  valid: [
    `test("shows error", () => {
					expect(true).toBe(false);
				});`,
  ],
  invalid: [
    {
      code: 'test("shows error", () => {});',
      errors: [{messageId: 'expectedExpect'}]
    },
  ]
})
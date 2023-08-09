import {TSESLint} from '@typescript-eslint/utils';
import myRule from './myRule';
import myOtherRule from "./myOtherRule";
import expectExpectRule from "./expect-expect";

export const rules = {
  'my-rule': myRule,
  'my-other-rule': myOtherRule,
  'expect-expect': expectExpectRule,
} satisfies Record<string, TSESLint.RuleModule<string, Array<unknown>>>;

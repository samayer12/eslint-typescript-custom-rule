import {TSESLint} from '@typescript-eslint/utils';
import myRule from './myRule';
import myOtherRule from "./myOtherRule";

export const rules = {
  'my-rule': myRule,
  'my-other-rule': myOtherRule,
} satisfies Record<string, TSESLint.RuleModule<string, Array<unknown>>>;

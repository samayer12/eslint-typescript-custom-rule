import {AST_NODE_TYPES, TSESLint, TSESTree} from '@typescript-eslint/utils'
import {getTestCallExpressionsFromDeclaredVariables, isTypeOfVitestFnCall} from './util/parseVitestFnCall'
import {getNodeName, isSupportedAccessor} from './util'

export const RULE_NAME = 'expect-expect'
export type MessageIds = 'expectedExpect';


function matchesAssertFunctionName(
	nodeName: string,
	patterns: readonly string[]
): boolean {
	return patterns.some(p =>
		new RegExp(
			`^${p
				.split('.')
				.map(x => {
					if (x === '**') return '[a-z\\d\\.]*'

					return x.replace(/\*/gu, '[a-z\\d]*')
				})
				.join('\\.')}(\\.|$)`,
			'ui'
		).test(nodeName)
	)
}


function checkCallExpressionUsed(context: any, unchecked: TSESTree.CallExpression[], nodes: TSESTree.Node[]) {
	for (const node of nodes) {
		const index = node.type === AST_NODE_TYPES.CallExpression
			? unchecked.indexOf(node)
			: -1

		if (node.type === AST_NODE_TYPES.FunctionDeclaration) {
			const declaredVariables = context.getDeclaredVariables(node)
			const textCallExpression = getTestCallExpressionsFromDeclaredVariables(declaredVariables, context)
			checkCallExpressionUsed(context, unchecked, textCallExpression)
		}
		if (index !== -1) {
			unchecked.splice(index, 1)
			break
		}
	}
}


const expectExpectRule: TSESLint.RuleModule<MessageIds> = {
	defaultOptions: [],
	meta: {
		type: 'suggestion',
		messages: {
			expectedExpect: 'Use \'expect\' in test body'
		},
		schema: [],
	},
	create: (context) => {

		const unchecked: TSESTree.CallExpression[] = []

		return {
			CallExpression(node) {
				const name = getNodeName(node) ?? ''

				if (isTypeOfVitestFnCall(node, context, ['test'])) {
					if (node.callee.type === AST_NODE_TYPES.MemberExpression &&
						isSupportedAccessor(node.callee.property, 'todo')) return
					unchecked.push(node)
				} else if (matchesAssertFunctionName(name, ['expect'])) {
					checkCallExpressionUsed(context, unchecked, context.getAncestors())
				}
			},
			'Program:exit'() {
				unchecked.forEach(node => context.report({node, messageId: 'expectedExpect'}))
			}
		}
	},
}

export default expectExpectRule;

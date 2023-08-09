import {it} from 'vitest'

const foo = () => {
}

const bar = () => {
}

const fooBar = () => {
}


foo()
bar()
fooBar()

it('should fail', () => {
  console.log("I should fail due to vitest/expect-expect");
})
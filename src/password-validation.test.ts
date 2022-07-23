import { assert, describe, expect, test } from 'vitest'

function validatePassword(password: string): any {
  return password.length > 8
}

describe('A valid password should meet the following requirements:', () => { 
  test.each([
    ['password1234', true],
    ['password', false]
  ])('Have more than 8 characters. (Given "%s" returns %s)', (password, isValid) => {
    expect(validatePassword(password)).toBe(isValid)
  })
})



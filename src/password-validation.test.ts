import { assert, describe, expect, test } from 'vitest'


function validatePassword(password: string): any {

  if (password.length < 9) {
    throw 'Password should have more than 8 characters.'
  }

  if (!/[A-Z]/.test(password)) {
    throw 'Password should contain a capital letter.'
  }

  return true
}

describe('A valid password should meet the following requirements:', () => { 
  
  test('Fails when 8 characters or less.', () => {
    expect(() => validatePassword('password')).toThrow(/^Password should have more than 8 characters\.$/)
  })

  test('Fails when there is no capital letter.', () => {
    expect(() => validatePassword('password1234')).toThrow(/^Password should contain a capital letter\.$/)
  })

  test('Is valid if none of the above happens.', () => {
    expect(validatePassword('Passwrd1_')).toBe(true)
  })

})



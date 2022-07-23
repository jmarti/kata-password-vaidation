import { assert, describe, expect, test } from 'vitest'


function validatePassword(password: string): any {

  if (!/[A-Z]/.test(password)) {
    throw 'Password should contain a capital letter.'
  }

  if (password.length < 9) {
    throw 'Password should have more than 8 characters.'
  }

  if (!/[a-z]/.test(password)) {
    throw 'Password should contain a lowercase.'
  }

  if (!/_/.test(password)) {
    throw 'Password should contain an underscore.'
  }

  return true
}

describe('A valid password should meet the following requirements:', () => { 
  
  test('Fails when 8 characters or less.', () => {
    expect(() => validatePassword('Passwr1_')).toThrow(/^Password should have more than 8 characters\.$/)
  })

  test('Fails when there is no capital letter.', () => {
    expect(() => validatePassword('passwrd1_')).toThrow(/^Password should contain a capital letter\.$/)
  })
  
  test('Fails when there is no lower case.', () => {
    expect(() => validatePassword('PASSWRD1_')).toThrow(/^Password should contain a lowercase\.$/)
  })

  test('Fails when there is no underscore.', () => {
    expect(() => validatePassword('Password1')).toThrow(/^Password should contain an underscore\.$/)
  })

  test('Is valid if none of the above happens.', () => {
    expect(validatePassword('Passwrd1_')).toBe(true)
  })


})



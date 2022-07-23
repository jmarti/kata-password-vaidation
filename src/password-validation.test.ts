import { assert, describe, expect, test } from 'vitest'

function validatePassword(password: string): any {
  return password.length > 8 && /[A-Z]/.test(password)
}

describe('A valid password should meet the following requirements:', () => { 
  
  test('Fails when 8 characters or less.', () => {
    expect(validatePassword('password')).toBe(false)
  })

  test('Fails when there is no capital letter.', () => {
    expect(validatePassword('password1234')).toBe(false)
  })

  test('Is valid if none of the above happens.', () => {
    expect(validatePassword('Passwrd1_')).toBe(true)
  })

})



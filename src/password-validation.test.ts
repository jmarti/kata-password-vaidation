import { describe, expect, test } from 'vitest'

interface Rule {
  check(password: string): boolean
}

class Validation {
  constructor(private readonly rules: Array<Rule>) {
  }

  public validate(password: string): boolean
  {
    this.rules.forEach(function (rule: Rule) {
      rule.check(password)
    })
    return true
  }
}

class ContainsUpperCaseRule implements Rule {
  check(password: string): boolean {
    if (!/[A-Z]/.test(password)) {
      throw 'Password should contain a capital letter.'
    }
    return true
  }
}

class HasMinLengthRule implements Rule
{
  constructor(private readonly length: number) {
  }

  check(password: string): boolean {
    if (password.length < this.length) {
      throw `Password should have more than ${this.length - 1} characters.`
    }
    return true;
  }
}

class ContainsLowerCaseRule implements Rule
{
  check(password: string): boolean {
    if (!/[a-z]/.test(password)) {
      throw 'Password should contain a lowercase.'
    }
    return true;
  }
}

class ContainsUnderscoreRule implements Rule {
  check(password: string): boolean {
    if (!/_/.test(password)) {
      throw 'Password should contain an underscore.'
    }
    return true;
  }
}

class ContainsNumberRule implements Rule
{
  check(password: string): boolean {
    if (!/[0-9]/.test(password)) {
      throw 'Password should contain a number.'
    }
    return true;
  }
}

function validatePassword(password: string): any {

  const validation = new Validation([
      new ContainsUpperCaseRule(),
      new HasMinLengthRule(9),
      new ContainsLowerCaseRule(),
      new ContainsUnderscoreRule(),
      new ContainsNumberRule()
  ])

  return validation.validate(password)
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

  test('Fails when there is no number.', () => {
    expect(() => validatePassword('Password_')).toThrow(/^Password should contain a number\.$/)
  });

  test('Is valid if none of the above happens.', () => {
    expect(validatePassword('Passwrd1_')).toBe(true)
  })
})



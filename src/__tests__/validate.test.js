import { describe, it, expect } from 'vitest';
import { validate } from '../pages/SignIn/SignIn';

describe('validate', () => {
  it('returns an error for empty email', () => {
    const errors = validate('', 'password123');
    expect(errors.email).toBeDefined();
  });

  it('returns an error for an invalid email format', () => {
    const errors = validate('not-an-email', 'password123');
    expect(errors.email).toBeDefined();
  });

  it('returns an error when password is empty', () => {
    const errors = validate('test@dal.ca', '');
    expect(errors.password).toBeDefined();
  });

  it('returns no errors for valid email and password', () => {
    const errors = validate('test@dal.ca', 'password123');
    expect(Object.keys(errors).length).toBe(0);
  });
});

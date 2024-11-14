import { UppercasePipe } from './uppercase.pipe';

describe('UppercasePipe', () => {
  let pipe: UppercasePipe;

  beforeEach(() => {
    pipe = new UppercasePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "test" to "TEST"', () => {
    expect(pipe.transform('test')).toBe('TEST');
  });

  it('should return empty string if value is an empty string', () => {
    expect(pipe.transform('')).toBe('');
  });
});

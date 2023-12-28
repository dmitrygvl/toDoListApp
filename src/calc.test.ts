import { sum } from './calc';

describe('sum', () => {
  it('sum 2 and 3 = 5', () => {
    expect(sum(2, 3)).toEqual(5);
  });
});

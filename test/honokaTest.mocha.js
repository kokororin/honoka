import { expect } from 'chai';
import honoka from '../index';

describe('node', () => {
  it('should work in node', async () => {
    const data = await honoka.get('https://httpbin.org/get');
    expect(data).to.have.own.property('origin');
  });
});

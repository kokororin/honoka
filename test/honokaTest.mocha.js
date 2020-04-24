import { expect } from 'chai';
import honoka from '../index';

describe('node', () => {
  it('should work in node', async () => {
    const response = await honoka.get('https://httpbin.org/get');
    expect(response.data).to.have.own.property('origin');
  });
});

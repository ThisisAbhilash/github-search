import { baseURL } from '../../cypress';

describe('Health API Testing with Cypress', () => {
  beforeEach(() => {
    cy.request(`${baseURL}/api/ping`).as('ping');
    cy.request(`${baseURL}/api/health`).as('health');
  });

  it('ping returns a 200 status code', () => {
    cy.get('@ping').its('status').should('equal', 200);
  });

  it('ping response returns message `pong`', () => {
    cy.get('@ping')
      .its('body')
      .should((data) => {
        expect(data).to.deep.equal({ message: 'pong' });
      });
  });

  it('health api call returns 200 status code', () => {
    cy.get('@health').its('status').should('equal', 200);
  });

  it('health api response returns server and redis status', () => {
    cy.get('@health')
      .its('body')
      .should((data) => {
        expect(data).to.have.keys('status', 'redis');
      });
  });
});

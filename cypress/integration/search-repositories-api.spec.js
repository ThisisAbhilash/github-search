import { baseURL } from '../../cypress';

describe('Repositories search API Testing with Cypress', () => {
  beforeEach(() => {
    cy.request(
      `${baseURL}/api/v1/search?search_type=repositories&search_text=abhilash&page=1&per_page=5`,
    ).as('repositories_paginated');

    cy.request(
      `${baseURL}/api/v1/search?search_type=repositories&search_text=abhilash&fields[]=full_name&fields[]=owner`,
    ).as('repositories_limited_fields');
  });

  it('fetch paginated repositories search should return 200 status', () => {
    cy.get('@repositories_paginated').its('status').should('equal', 200);
  });

  it('fetch paginated repositories search should return max 5 items', () => {
    cy.get('@repositories_paginated')
      .its('body')
      .should((data) => {
        expect(data.items).to.have.length(5);
      });
  });

  it('fetch repositories search with given fields should return 200 status', () => {
    cy.get('@repositories_limited_fields').its('status').should('equal', 200);
  });

  it('fetch repositories search with fields = [`full_name`, `owner`] should return fields `full_name` & `owner`', () => {
    cy.get('@repositories_limited_fields')
      .its('body')
      .should((data) => {
        expect(data.items[0]).to.have.keys('full_name', 'owner');
      });
  });

  it('fetch repositories search with given fields = [`full_name`, `owner`] should not return fields `stargazers_count` & `watchers_count`', () => {
    cy.get('@repositories_limited_fields')
      .its('body')
      .should((data) => {
        expect(data.items[0]).to.not.have.keys(
          'stargazers_count',
          'watchers_count',
        );
      });
  });
});

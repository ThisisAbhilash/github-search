import { baseURL } from '../../cypress';

describe('User search API Testing with Cypress', () => {
  beforeEach(() => {
    cy.request(
      `${baseURL}/api/v1/search?search_type=users&search_text=abhilash&page=1&per_page=20`,
    ).as('users_paginated');

    cy.request(
      `${baseURL}/api/v1/search?search_type=users&search_text=abhilash&fields[]=login&fields[]=avatar_url`,
    ).as('users_limited_fields');
  });

  it('fetch paginated users search should return 200 status', () => {
    cy.get('@users_paginated').its('status').should('equal', 200);
  });

  it('fetch paginated users search should return max 20 items', () => {
    cy.get('@users_paginated')
      .its('body')
      .should((data) => {
        expect(data.items).to.have.length(20);
      });
  });

  it('fetch users search with given fields should return 200 status', () => {
    cy.get('@users_limited_fields').its('status').should('equal', 200);
  });

  it('fetch users search with fields = [`login`, `avatar_url`] should return fields `login` & `avatar_url`', () => {
    cy.get('@users_limited_fields')
      .its('body')
      .should((data) => {
        expect(data.items[0]).to.have.keys('login', 'avatar_url');
      });
  });

  it('fetch users search with given fields = [`login`, `avatar_url`] should not return fields `url` & `followers_url`', () => {
    cy.get('@users_limited_fields')
      .its('body')
      .should((data) => {
        expect(data.items[0]).to.not.have.keys('url', 'followers_url');
      });
  });
});

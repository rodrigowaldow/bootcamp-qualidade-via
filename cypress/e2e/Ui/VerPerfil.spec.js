/// <reference types="cypress" />

import profiles from "../../fixtures/profiles.json"

describe('Funcionalidade Visualização dos Perfis', () => {
  beforeEach(() => {
    cy.visit('perfis')

    cy.intercept({
      method: 'GET',
      url: 'api/profile'
    },{
      statusCode: 200,
      fixture: 'profiles'
    })

    cy.reload()
  });

  it('Validar o primeiro item da lista', () => {
    cy.get('[data-test="profile-name"]').first().should('contain', 'Pedro Guerra')
  });

  it.only('Validar lista vazia', () => {
    cy.intercept('api/profile', { statusCode: 404 })
    cy.reload()

    cy.get('[data-test="profiles-noProfiles"]').should('contain', 'Nenhum perfil encontrado')
  });

  it('Validar o ultimo item da lista', () => {
    cy.get('[data-test="profile-name"]').last().should('contain', 'Roberto dos Santos')
  });

  it('Validar o terceiro item da lista', () => {
    cy.get('[data-test="profile-name"]').eq(2).should('contain', 'Pa Sun')
  });
});
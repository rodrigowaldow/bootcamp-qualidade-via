/// <reference types="cypress" />
const faker = require('faker-br')

// Aula 16/08/2022
describe('US0002 - Funcionalidade: Cadastro', () => {
  beforeEach(() => {
    cy.visit('cadastrar')
  });

  it('Deve fazer cadastro com sucesso', () => {
    cy.cadastrar('Rodrigo Waldow', faker.internet.email(), 'Teste@123')

    //Resultado esperado
    cy.get('.large').should('contain', 'Dashboard')
    cy.get('[data-test="dashboard-createProfile"]').should('exist')
  });
});
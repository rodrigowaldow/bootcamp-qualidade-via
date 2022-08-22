/// <reference types="cypress" />
const faker = require('faker-br')

// Aula 16/08/2022
describe('US0003 - Funcionalidade: Criar perfil', () => {
  beforeEach(() => {
    cy.visit('cadastrar')
  });

  it('Deve criar meu perfil com sucesso', () => {
      const name = 'Rodrigo Waldow'
      const email = faker.internet.email()
      const senha = 'Teste@123'
      cy.cadastrar(name, email, senha)

      cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
      cy.get('[data-test="dashboard-createProfile"]').click()

      cy.get('#mui-component-select-status').click()
      //Seleção de status random
      cy.get('.MuiMenu-list li')
      .then(($li) => {
          const items = $li.toArray()
          return Cypress._.sample(items)
      }).click()

      cy.get('[data-test="profile-company"] > .MuiInputBase-root > .MuiInputBase-input')
      .type('Via')
      cy.get('[data-test="profile-webSite"] > .MuiInputBase-root > .MuiInputBase-input')
      .type('https://casasbahia.com.br')
      cy.get('[data-test="profile-location"] > .MuiInputBase-root > .MuiInputBase-input')
      .type('São Paulo - SP')
      cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input')
      .type('Testes de Integração, Automação de Testes, Cypress, Testes Manuais')
      cy.get('[data-test="profile-gitHub"] > .MuiInputBase-root > .MuiInputBase-input')
      .type('https://github.com/rodrigowaldow')
      cy.get('[data-test="profile-bio"]')
      .type('Em constante evolução!')
      cy.get('[data-test="profile-submit"]').click()

      //Resultado esperado
      cy.get('.large').should('contain', 'Dashboard')
      cy.get('[data-test="alert"]').should('contain', 'Perfil Criado')
  });

  
});
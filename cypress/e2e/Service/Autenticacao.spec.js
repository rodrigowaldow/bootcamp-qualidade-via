/// <reference types="cypress" />
import auth from '../../fixtures/auth.json'


it('[POST] Teste de autenticação', () => {
  cy.request({
    method: 'POST',
    url: '/api/auth',
    body: auth
  }).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body).to.not.be.empty
    expect(response.body).to.have.property('jwt')
    cy.getCookies('conexaoqa.herokuapp.com').should('exist')
  })
});

it('[POST] Teste de autenticação inválido', () => {
  cy.request({
    method: 'POST',
    url: '/api/auth',
    failOnStatusCode: false,
    body: {
      "email": "rodrigo.waldow@viavarejo.com.br",
      "password": "Stefanini"
    }
  }).then((response) => {
    expect(response.status).to.eq(401)
  })
});
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/// <reference types="Cypress" />
import auth from '../fixtures/auth.json'

Cypress.Commands.add('navigate', (route) => {
    cy.intercept(route).as('loadpage')
    cy.visit(route, { timeout: 30000 })
    cy.wait('@loadpage')
})

Cypress.Commands.add('login', (email, senha) => {
    cy.visit('login')
    cy.get('[data-test="login-email"]').type(email)
    cy.get('[data-test="login-password"]').type(senha)
    cy.get('[data-test="login-submit"]').click()
})

Cypress.Commands.add('loginApp', () => {
    cy.request({
        method: 'POST',
        url: 'api/auth',
        body: {
            email: auth.email,
            password: auth.password
        }
    }).then((response) => {
        cy.setCookie('region', 'BR-RS')
        window.localStorage.setItem('token', response.body.jwt)
    })
})

Cypress.Commands.add('cadastrar', (name, email, senha) => {
    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input')
    .type(name)
    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input')
    .type(email)
    cy.get('[data-test="register-password"]')
    .type(senha)
    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input')
    .type(senha)
    cy.get('[data-test="register-submit"]').click()
})

Cypress.Commands.add('tokenJwt', () => {
    cy.request({
        method: 'POST',
        url: '/api/auth',
        body: auth
      }).then((response) => {
        return response.body.jwt
      })
})

Cypress.Commands.add('criarPostagem', (token, value) => {
    cy.request({
        method: 'POST',
        url: '/api/posts',
        headers: { 
            Cookie: token
        },
        body: {
            text: value
        }
    })
})
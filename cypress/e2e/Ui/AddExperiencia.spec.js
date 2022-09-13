/// <reference types="cypress" />
import usuarios from "../../fixtures/usuarios.json"
const perfilPage = require('../../support/Perfil/PerfilPage')

// Aula 30/08/2022
describe('Funcionalidade Adicionar experiência', () => {
    beforeEach(() => {
      // cy.fixture("usuarios").then((user) => {
      //   cy.login(user[0].email, user[0].senha)
      // })
      cy.loginApp()
      cy.visit('adicionar-experiencia')
    });

    it.only('Acessar experiencia', () => {
      cy.log('acessar-experiencia')
    });

    it('Deve adicionar uma experiência com sucesso', () => {
      perfilPage.addExperiencia('QA', 'Via', 'SP', '01/01/2020','01/01/2022', 'Topzera');
      cy.get('[data-test="experience-delete"]').should('exist');
    });

    it('Deve adicionar uma experiência atual com sucesso', () => {
      perfilPage.addExperienciaAtual('QA', 'Via', 'SP', '01/01/2020', 'Topzera');
      cy.get('[data-test="experience-delete"]').should('exist');
    });

    it('Deve excluir uma experiência com sucesso', () => {
      perfilPage.addExperiencia('QA', 'Via', 'SP', '01/01/2020','01/01/2022', 'Topzera');
      cy.get('[data-test="experience-delete"]').first().click();
      cy.contains('Experiência Removida').should('be.visible');
    });

});
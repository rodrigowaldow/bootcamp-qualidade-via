/// <reference types="cypress" />
import usuarios from "../../fixtures/usuarios.json"

// Aula 16/08/2022
describe('US0001 - Funcionalidade Login', () => {
    beforeEach(() => {
        cy.visit('login')
    });

    it('Deve fazer login com sucesso', () => {
        cy.login('rodrigo.waldow-ext@viavarejo.com.br', 'Stefanini@1984')
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    });

    it('Validar mensagem de erro quando inserir usuário e senha inválidos', () => {
        cy.login('fefeafeaf@viavarejo.com.br', 'Stefanini@1984')
        cy.get('[data-test="alert"]').should('contain', 'Credenciais inválidas')
    });

    it('Deve fazer login com sucesso - Usando importação de dados', () => {
        cy.login(usuarios[0].email, usuarios[0].senha)
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    });

    it('Deve fazer login com sucesso - Usando fixture', () => {
        cy.fixture('usuarios').then((user) => {
            cy.login(user[0].email, user[0].senha)
        })
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    });
});

// Funcionalidade Login
// Eu como usuário das Conexão QA
// Quero fazer o login
// Para editar meu perfil

// Cenário: Login com sucesso
// Arrange - Dado - pré requisito -> Dado que esteja na tela de login
// Action - Quando - ação do usuário -> Quando eu inserir usuário e senha
// Assert - Então - resultado esperado -> Então deve me direcionar para o Dashboard

// Cenário: Validar mensagem de erro
// Cenário: Recuperar senha


// import CommonPage from '../../support/Common/CommonPage'
// import LoginPage from '../../support/Login/LoginPage'

// describe('Validar login', { tags: '@demo' }, () => {
//     before(() => {
//         cy.navigate('/')
//         CommonPage.clickInMenuLogin()
//     })

//     context('Dado que acesso a tela de login', () => {
//         it('Então devo visualizar a tela login', () => {
//             LoginPage.validateLogin()
//         })
//     })

//     context('Dado que realizo o login', () => {
//         it('Então insiro o CPF ou CNPJ', () => {
//             cy.fixture("user").then((data) => {
//                 LoginPage.fillFieldUsername(data.cpf)
//             })
//         })

//         it('E clico no botão "Continuar"', () => {
//             LoginPage.clickInButtonContinueLogin()
//         })

//         it('E insiro a senha de acesso', () => {
//             LoginPage.fillFieldPassword(Cypress.env('password'))
//         })

//         it('E clico no botão "Entrar"', () => {
//             LoginPage.clickInButtonLogin()
//         })
//     })
// })
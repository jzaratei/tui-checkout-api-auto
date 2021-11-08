/// <reference types="Cypress" />

import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";


And('I request the createOder service', () =>{
    cy.intercept('POST', '/checkout/commands', (req) =>{
        const jsonRequest =  JSON.stringify(req);
        cy.writeFile('cypress/fixtures/createOrder-req.json', jsonRequest)
        cy.log(jsonRequest)
    }).as('paymentReq')
    cy.get("[data-qa='summary_widget_button_reserve_room']").click()
})

When('I select one offer', () =>{
    cy.get("[data-qa='offer_tile']", {timeout: 10000}).first().find("[class='offer-tile__wrapper']").invoke('removeAttr', 'target').click()

})

When('I check the offer availability', () =>{
    cy.get("[data-qa='offers_found_offer_check_availability']").first().click()
    cy.get("[data-qa='offers_found_offer_select_room']", {timeout: 10000}).click()
})


/// <reference types="Cypress" />

import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import DetailPage from "../PageObjects/detailPage";

Given('I access to tui home page', ()=>{
    cy.visit('https://staging.stay.tui.com/es'
    , {
        auth: {
            username: 'tui-lte',
            password: 'tuiLTE!'
          }
    })
})


Then('I check the offer availability and request', () =>{
    cy.intercept('POST', '/checkout/check-offer', (req) =>{
        req.body = {
            offer: {
                uid:'123456'
            },
            params: {
                from:'2020-01-13'
            }
        }
    }).as('check-offer-mod1')
    cy.get("[data-qa='offers_found_offer_check_availability']").first().click()
    cy.wait('@check-offer-mod1').then(({request}) => {
        const jsonRequest =  JSON.stringify(request);
        const body =  JSON.stringify(request.body);
        cy.writeFile('cypress/fixtures/checkOffer.json', body)
        cy.log(jsonRequest)
        //expect(request.headers.authorization).to.eq(`Bearer ${Cypress.env('TOKEN')}`)
      })

})

When('I request the get-offer service', () =>{
    cy.intercept('POST', '/checkout/check-offer', (req) =>{
    }).as('check-offer-mod2')
    cy.get("[data-qa='offers_found_offer_check_availability']").first().click()
    cy.wait('@check-offer-mod2').then(({request}) => {
        const jsonRequest =  JSON.stringify(request);
        const body =  JSON.stringify(request.body);
        cy.writeFile('cypress/fixtures/checkOffer.json', body)
        cy.log(jsonRequest)
        //expect(request.headers.authorization).to.eq(`Bearer ${Cypress.env('TOKEN')}`)
      })
})

When('I get a 201 response', () =>{
    cy.wait('@check-offer-required').then(({request, response}) => {
        const body =  JSON.stringify(request.body);
        cy.writeFile('cypress/fixtures/checkOffer-val-req.json', body)
        cy.log(body)
        //expect(response.statusCode).to.eq(201)
        //expect(response.body.name).to.eq('')
    })

})

When('I get a 404 response', () =>{
    cy.wait('@check-offer-modified').then(({response}) => {
    expect(response.statusCode).to.eq(404)
    })

})

When('I get a 500 response', () =>{
    cy.wait('@check-offer-modified-invalid').then(({request, response}) => {
        const body =  JSON.stringify(request.body);
        cy.writeFile('cypress/fixtures/checkOffer-inv-req.json', body)
        cy.log(body)
        expect(response.statusCode).to.eq(500)
    })

})

Given('I request a hotel in {} from {} for {} days', (city, startDate, duration) =>{
    cy.visit('https://staging.stay.tui.com/es/buscar/hoteles/?adults=1&from=2022-01-13&duration=1&city=321401&%24sort=price'
    , {
        auth: {
            username: 'tui-lte',
            password: 'tuiLTE!'
          }
    })
})

When('I request the get-offer service with required parameter', () =>{
    cy.intercept('POST', '/checkout/check-offer', (req) => {
      }).as('check-offer-required')
    DetailPage.checkAvailabilty()
})


When('I request the get-offer service with an empty signature', () =>{
    cy.intercept('POST', '/checkout/check-offer', (req) => {
        req.body = {
            offer: {
                signature: '{}'
            }    
        }
      }).as('check-offer-modified-invalid')
    DetailPage.checkAvailabilty()
})



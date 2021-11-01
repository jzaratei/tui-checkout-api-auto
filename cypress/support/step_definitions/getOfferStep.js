import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";

Given('I access to tui home page', ()=>{
    cy.visit('https://staging.stay.tui.com/es')
})

And('I search a hotel in {} from {} to {}', (city, dateInit, dateEnd)=>{
    cy.get("[for='search-text-input-field1']").click()
    cy.get("#search-text-input-field1").type("lisboa")
    //cy.get("[data-qa='destination_search_dialog_cities'] li").first().click()
    cy.get("[data-qa='destination_search_dialog_cities'] li").each(($el, index, $list) => {
        const actualCity = $el.text();
        if(actualCity.includes(city)) {
            cy.wrap($el).click()
            cy.log("City " + actualCity + " found!")
        }
    })
    cy.get("#search-text-input-field1").invoke('val').should('not.be.empty')
    cy.get("#search-text-input-field1").invoke('val').should('include', city)
    cy.get("[data-qa='date_selection_button']").first().click()

    let date = new Date()
    date.setDate(date.getDate())
    const year = dateInit.split("-")[0]
    const month = dateInit.split("-")[1]
    const initDay = dateInit.split("-")[2]
    const endDay = dateEnd.split("-")[2]
    const monthLocator = 'calendar_month_' + year + '-' + month
    cy.get("[class='calendar-month date-selection-calendar__month'][data-qa=" + monthLocator).find(".calendar-month__day-label").each(($day, index, $list) => {
        let actualDay = $day.text()
        if (parseInt(actualDay) === parseInt(initDay)){
            cy.log('Selecting init day ' + actualDay)
            cy.wrap($day).click()
        }
        if (parseInt(actualDay) === parseInt(endDay)){
            cy.log('Selecting end day ' + actualDay)
            cy.wrap($day).click()
            return false
        }
    })
})
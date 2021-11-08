const CHECK_AVAILABILITY_BTN = "[data-qa='offers_found_offer_check_availability']"


class DetailPage {

    static checkAvailabilty(){
        cy.get(CHECK_AVAILABILITY_BTN).first().click()
    }
    

}


export default DetailPage

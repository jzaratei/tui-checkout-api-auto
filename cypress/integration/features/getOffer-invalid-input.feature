Feature: Checkout service validation with 

Scenario: Get offer info with invalid orderId
    Given I request a hotel in <city> from <start-date> for <duration> days
    |   city   |start-date|duration|
    |   lisboa |2022-01-15|1|
    Then I select one offer
    When I request the get-offer service with an empty signature
    Then I get a 500 response
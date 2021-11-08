Feature: Checkout service validation

# Scenario: Get offer info starting from home page
#     Given I access to tui home page
#     And I search a hotel in Lisboa from 2022-02-15 to 2022-02-16
#     Then I check the offer availability
#     When I request the get-offer service
#     Then I get a OK response

@focus
Scenario: Get offer info - Valid required parameters
    Given I request a hotel in <city> from <start-date> for <duration> days
    |   city   |start-date|duration|
    |   lisboa |2022-01-15|1|
    Then I select one offer
    And I request the get-offer service with required parameter
    Then I get a 201 response
    #And I verify response headers
    #And I verify response payload

Scenario: Get offer info - Valid required and optional parameters
    Given I search a hotel in Lisboa from 2022-01-15 for 1 day
    When I check the offer availability
    And I request the get-offer service with required and optional parameters
    Then I get a 201 response
    #And I verify response headers
    #And I verify response payload
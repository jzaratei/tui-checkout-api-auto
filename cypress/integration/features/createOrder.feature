Feature: Checkout service validation

Scenario: Get offer info - Valid required parameters
    Given I request a hotel in <city> from <start-date> for <duration> days
    |   city   |start-date|duration|
    |   lisboa |2022-01-15|1|
    When I select one offer
    When I check the offer availability
    And I request the createOder service
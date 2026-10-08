@checkout
Feature: Checkout form validation

  Scenario Outline: Full Name length rules
    Given the user opens the checkout page
    When the user enters the full name "<name>"
    And the user enters the postal code "123456"
    And the user clicks Place Order
    Then the checkout shows the message "<message>"

    Examples:
      | name                  | message                                            |
      |                       | Full Name must contain at least 5 characters.      |
      | Anna                  | Full Name must contain at least 5 characters.      |
      | Annie                 | Order placed successfully.                         |
      | Alexander Fitzgerald  | Order placed successfully.                         |
      | Alexander Fitzgeralds | Full Name must contain no more than 20 characters. |

  Scenario Outline: Postal Code rules
    Given the user opens the checkout page
    When the user enters the full name "Alice Jones"
    And the user enters the postal code "<postcode>"
    And the user clicks Place Order
    Then the checkout shows the message "<message>"

    Examples:
      | postcode | message                                    |
      |          | Postal Code must contain exactly 6 digits. |
      | 12345    | Postal Code must contain exactly 6 digits. |
      | 123456   | Order placed successfully.                 |
      | 1234567  | Postal Code must contain exactly 6 digits. |
      | 12345A   | Postal Code must contain exactly 6 digits. |

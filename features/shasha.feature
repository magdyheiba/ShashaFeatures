Feature: Create Camagain

  Scenario: create campagin
    Given navigate to shasha URL
    When selecting date and time of the campagin
    Then I should see the campagin created

  Scenario: Approve From Admin
    Given navigate to shasha Admin URL
    When approve the campagin by the admin
    Then I should see the campagin approved

  Scenario: Approve From StoreOwner
    Given navigate to shasha store owner URL
    When approve the campagin by the store owner
    Then I should see the campagin approved by the owner

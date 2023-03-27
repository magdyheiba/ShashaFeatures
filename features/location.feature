Feature: Location Step Camagain
  Scenario:Check the region checkbox validation.
    Given An authenticated advertiser is in the first step of campaign creation.
    When From "Filter by city" he ticked the region checkbox.
    Then All checkboxes for the cites inside the region will be ticked.

  Scenario:Check the region checkbox validation.
    Given An authenticated advertiser is in the first step of campaign creation.
    When He unticks the region checkbox.
    Then All checkboxes for the cites inside the region will be unticked.

  Scenario:Validate closing the side filter.
    Given An authenticated advertiser is in the first step of campaign creation.
    And He clicks on "Filter by City".
    When He clicks outside the filter.
    Then The side filter will be closed.
    When He clicks on the side-arrow on the main filter.
    Then The side filter will be closed

  Scenario:Check the ranking of the regions.
    Given Advertiser is on the location selection step.
    When He clicks on "Filter by city".
    Then the regions should be arranged in descending order based on population density.

  Scenario:Check the ranking of the cities.
    Given Advertiser is on the location selection step.
    And He clicks on "Filter by city".
    When He clicks on a region.
    Then In this subset menu, the cities will be arranged in descending order based on population density.

  Scenario:Check clicking on the empty space on a region field.
    Given Advertiser is in the location selection step.
    And He clicks on "Filter by city".
    When He clicks on the empty space on a region field. from the filter.
    Then A subset menu will be displayed containing the list of the cities that are part of this region.
    And In this subset menu, the cities will be arranged in descending order based on population density.
    And The advertiser should be able to see search bar

  Scenario:Advertiser has selected a value from "Filter by city".
    Given Advertiser is on the location selection step.
    When He selects a value from the filter.
    Then The locations listed should be changed based on the advertiser selection.

  Scenario:Check selecting a value from "Filter by type".
    Given Advertiser is on the first step of campaign creation.
    When He clicks on "Filter by type".
    Then A dropdown menu will appear representing the locations type.
    And The filter will contain the following values:
    And He should see an icon visually expressing the type of each location on the map, location card and the filter.

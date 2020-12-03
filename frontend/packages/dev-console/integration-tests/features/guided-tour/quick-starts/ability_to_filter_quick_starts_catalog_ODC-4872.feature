Feature: Add ability to filter quick starts catalog
	As a user, i want to be able to filter quick starts in the catalog by status of the quick start and search quick starts catalog by name, description, tags and pre-reqs.

Background:
    Given user is at developer perspective
    And user has created cr for sample-application-quickstart quick start
    And user has created cr for install-associate-pipeline-quickstart quick start
    And user has created cr for explore-pipeline-quickstart quick start
    And user has created cr for add-healthchecks-quickstart quick start


@regression
Scenario: Quick Starts Catalog Page
   Given user is in Add view
   When user clicks "See all Quick Starts" on quick start card
   Then user can see Quick Starts catalog page 
   And user can see filter toolbar
   And user can see filter by keyword search bar
   And user can see Status filter dropdown


@regression
Scenario: Flter by keyword
   Given user is at Quick Start catalog page 
   When user clicks on filter by keyword search bar
   And user enters "pipeline"
   Then user can see two pipleline cards
 

@regression
Scenario: Fliter based on status
   Given user is at Quick Start catalog page 
   When user clicks on Status filter menu
   Then user can see completed, In progress and Not started with number of cards available in each categories
   And user can see multiple option can be selected
 

@regression
Scenario: No result condition for filter
   Given user is at Quick Start catalog page 
   When user clicks on filter by keyword search bar
   And user enters "asdf"
   Then user can see No results found
   And user can see Clear all filters option 

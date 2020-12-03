Feature: Quick start card in developer console
	As a user, I want to quick start card in Add page

Background:
    Given user is at developer perspective
    And user has created cr for sample-application-quickstart quick start
    And user has created cr for install-associate-pipeline-quickstart quick start
    And user has created cr for explore-serverless-quickstart quick start
    And user has created cr for explore-pipeline-quickstart quick start


@regression
Scenario: Quick start card on +Add page
   Given user is in developer perspective
   When user goes to +Add page 
   Then user can see quick start card 
   And user can see three Quick Start link present on it
   And user can see the "See all Quick Starts" on the card
   And user can see the kebab menu on top right of the card


@regression
Scenario: Quick start page when no tour has started
   Given user is in developer perspective
   When user goes to +Add page 
   And user clicks on the "See all Quick Starts" 
   Then user can see four Quick Starts
   And user can see time taken to complete the tour on the card
   And user can see Start the tour link


@regression
Scenario: Quick start page when tour has completed
   Given user is in developer perspective
   When user goes to +Add page 
   And user sees quick tour card 
   And user clicks on the "See all Quick Starts" 
   Then user can see four Quick Starts
   And user can see time taken to complete the tour on the card
   And user can see Complete label
   And user can see Review the tour link


@regression
Scenario: Quick tour page when tour is not completed
   Given user is in developer perspective
   When user goes to +Add page 
   And user clicks on the "See all Quick Starts"
   Then user can see four Quick Starts
   And user can see time taken to complete the tour on the card
   And user can see In Progress label
   And user can see Resume the tour and Restart the tour link


@regression
Scenario: Remove quick tour card from +Add view
   Given user is in developer perspective
   When user goes to +Add page 
   And user sees quick tour card 
   And user clicks on the kebab menu in the card
   And user clicks on Remove quick starts
   Then quick start card will be removed from +Add page


@regression
Scenario: Quick start card links with status as in progress 
   Given user is at +Add page 
   When user clicks on first quick start link on the quick start card 
   And user clicks on the Start tour
   And user clicks on close button
   And user clicks on leave on leave the tour modal box
   Then user can see "In Progress" status below the first quick start link

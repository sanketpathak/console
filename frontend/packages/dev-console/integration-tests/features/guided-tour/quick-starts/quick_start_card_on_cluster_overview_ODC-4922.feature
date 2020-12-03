Feature: Add quick starts card on cluster overview
	As a user, I want to easily be able to access and discover Quick Starts from the Cluster Overview in administrator view.

Background:
    Given user is at administrator perspective
    And user has created cr for sample-application-quickstart quick start
    And user has created cr for install-associate-pipeline-quickstart quick start
    And user has created cr for explore-pipeline-quickstart quick start
    And user has created cr for add-healthchecks-quickstart quick start

@regression
Scenario: Quick Start card on Cluster Overview 
   Given user is in administrator perspective
   When user goes to Cluster Overview page
   Then user can see quick tour card 
   And user can see three Quick Start link present on it
   And user can see the "See all Quick Starts" 
   And user can see the kebab menu on top right of the card

@regression
Scenario: Quick start links with status as in progress 
   Given user is at Cluster Overview page
   When user clicks on first quick start link on the quick start card 
   And user clicks on the Start tour
   And user clicks on close button
   And user clicks on leave on leave the tour modal box
   Then user can see "In Progress" status below the first quick start link
 
@regression
Scenario: Quick start card when one quick start has completed
   Given user is at Cluster Overview page
   When user completes first quick start from the card
   Then user can see completed quick start link is removed from the card
 
@regression
Scenario: Quick start card when all quick start has completed
   Given user is at Cluster Overview page
   When user completes all four quick starts present
   Then user can see quick start card is removed from the Cluster Overview page

@regression
Scenario: Remove quick tour card from Cluster Overview page
   Given user is at Cluster Overview page
   When user clicks on the kebab menu at the quick start card
   And user clicks on Remove quick starts card from the view
   Then quick start card will be removed from Cluster Overview page

@regression
Scenario: Removeed quick tour card from Cluster Overview page can be seen in Add page
   Given user removed quick start card from Cluster Overview page
   When user goes to developer perspective
   And user goes to Add page
   Then quick start card will be displayed in Add page

Feature: Enable quickstart hints in quickstart sidepanel
	As a user, i want to be able to click on a hint link in the quick start content and see the hint being highlighted in the UI.


Background:
    Given user is at developer perspective
    And user has created cr for sample-application-quickstart quick start
    And user has created cr for install-associate-pipeline-quickstart quick start
    And user has created cr for explore-serverless-quickstart quick start
    And user has created cr for add-healthchecks-quickstart quick start


@regression @manual
Scenario: Quick Starts hints
   Given user is in Quick Start catalog page
   When user clicks on sample-application quick start card
   And user starts the tour 
   And user clicks on the link perspective switcher in step 1
   Then user can see perspective switcher with developer as value has been highlighted


@regression @manual
Scenario: Quick Starts hint is out of frame
   Given user is in Quick Start catalog page
   When user clicks on Setting up Serverless quick start card
   And user starts the tour 
   And user switches to administrator perspective
   And user expands workloads tab in navigation menu
   And user scrolls down till last of navigation menu
   And user click on Administrator link in step 1
   Then user can see window scrolls up to highlight Administrator perspective switcher 

 
@regression @manual
Scenario: Hint when vertical navigation is collapsed
   Given user is in Quick Start catalog page
   When user clicks on sample-application quick start card
   And user starts the tour
   And user clicks on toggle button to disable vertical navigation menu
   And user clicks on the link perspective switcher in step 1
   Then user can see navigation menu appear with developer perspective switcher highlighted
 
@regression @manual
Scenario: user is in the wrong perspective
   Given user is in administrator view
   And  user is on step one of sample-application quick start
   When user clicks on +Add in the step 1
   Then user can see pop over message regarding element not present

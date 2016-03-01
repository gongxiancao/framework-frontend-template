Feature: Campaign-Push
    As a device user
    I can get accessToken

	Scenario: Pulse with beacons can receive campaigns
        Given I have the environment "initial"
        When I setup mockup
        And I create app with name "test app"
        And I request access token with credential of app "test app"
        Then I should see success response
        And I should get access token
        When I upload data file "data.log.zip"
        Then I should see success response



# smak-hitchhiking
Småk is a hitchhiking application for use mainly in Sweden


<details>
  <summary>User stories</summary>


## 1. Scenario: User Registration
**Given** a visitor is on the signup page  
**When** they enter a valid email, password, and confirm their details  
**Then** their account should be created successfully  
**And** they should be redirected to their personal dashboard  

---

## 2. Scenario: Adding a Car
**Given** a registered user is logged in  
**When** they open the “My Cars” section and add a car with brand, model, and number of seats  
**Then** the car should be saved to their profile  
**And** they should be able to select it when creating new rides  

---

## 3. Scenario: Creating a Ride Offer
**Given** a registered user has at least one car added  
**When** they create a ride by specifying origin, destination, date, and available seats  
**Then** the ride should appear in the public ride listings  
**And** it should display their driver name, available seats, and car info  

---

## 4. Scenario: Searching for Available Rides
**Given** a logged-in user wants to join a ride  
**When** they search for rides by destination or date  
**Then** the system should show matching rides  
**And** allow them to view ride details and available seats  

---

## 5. Scenario: Joining a Ride
**Given** a user has found a ride with available seats  
**When** they click “Join Ride”  
**Then** their name should be added to the list of passengers  
**And** the number of available seats should decrease by one  

---

## 6. Scenario: Cancelling a Ride Participation
**Given** a user has already joined a ride  
**When** they choose to cancel their participation  
**Then** they should be removed from the passenger list  
**And** the number of available seats should increase by one  

---

## 7. Scenario: Driver Cancels a Ride
**Given** a driver has created a ride  
**When** they decide to cancel it  
**Then** the ride should be marked as cancelled  
**And** all passengers should receive a notification about the cancellation  

---

## 8. Scenario: Setting Ride Preferences
**Given** a registered user is logged in  
**When** they set preferences such as “No Smoking” or “No Pets”  
**Then** these preferences should be stored in their profile  
**And** rides they create or join should display these preferences  

---

## 9. Scenario: Viewing Ride Details
**Given** a user finds a ride they’re interested in  
**When** they open the ride details page  
**Then** they should see driver information, available seats, and preferences  
**And** be able to join the ride if seats are still available  

---

## 10. Scenario: Rating a Completed Ride
**Given** a user has participated in a completed ride  
**When** they visit their ride history and rate the ride  
**Then** the driver’s rating should be updated based on their input  
**And** the passenger should see a confirmation that their rating was submitted  






</details>






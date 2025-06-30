# LetzGo API Documentation

This document describes the API endpoints for the LetzGo application.

## 1. User Authentication

This section covers the API endpoints related to user authentication.

### 1.1. getSignup

- **Endpoint:** `GET api/user/signup`
- **Description:** Retrieves the signup HTML page.
- **Request:**
  - Method: `GET`
  - Headers: None
  - Body: None
- **Response:**
  - (HTML Page)

### 1.2. postSignup

- **Endpoint:** `POST api/user/signup`
- **Description:** Registers a new user with email, password, and name.
- **Request:**
  - Method: `POST`
  - Headers: None
  - Body:
    ```json
    {
      "email": "example@example.com",
      "password": "Password123!",
      "confirmPassword": "Password123",
      "username": "John doe"
    }
    ```
    - **Request Body:**
      - `email`: User's email address (required, must be unique).
      - `password`: User's password (required, min: 8 characters, max: 20 characters, must include at least one number and one special character).
      - `confirmPassword`: Should be the same as password.
      - `name`: User's name (required, min: 2 characters, max: 50 characters).
- **Response:**
  - **postSignupExample:**
    - Code: 200
    - Body:
      ```json
      [
        {
          "message": "User registered successfully",
          "user": {
            "userId": "1",
            "email": "abc@gmail.com",
            "username": "John doe"
          }
        }
      ]
      ```

### 1.3. getLogin

- **Endpoint:** `GET api/user/Login`
- **Description:** Retrieves the login HTML page.
- **Request:**
  - Method: `GET`
  - Headers: None
  - Body: None
- **Response:**
  - (HTML Page)

### 1.4. postLogin

- **Endpoint:** `POST api/user/login`
- **Description:** Authenticates a user with email and password.
- **Request:**
  - Method: `POST`
  - Headers: None
  - Body:
    ```json
    {
      "email": "example@example.com",
      "password": "Password123!"
    }
    ```
    - **Request Body:**
      - `email`: User's email address (required).
      - `password`: User's password (required).
- **Response:**
  - **postLogin:**
    - Code: 200
    - Body:
      ```json
      {
        "email": "example@example.com",
        "password": "Password123!"
      }
      ```

### 1.5. Forget Password

- **Endpoint:** `GET /api/user/forgot-password`
- **Description:** Retrieves the HTML page for entering the email address for password reset.
- **Request:**
  - Method: `GET`
  - Headers: None
  - Body: None
- **Response:**
  - (HTML Page)

### 1.6. forgetPassword

- **Endpoint:** `POST /api/user/forgot-password`
- **Description:** Initiates a password reset process for the user.
- **Request:**
  - Method: `POST`
  - Headers: None
  - Body:
    ```json
    {
      "email": "example@example.com"
    }
    ```
    - **Request Body:**
      - `email`: User's email address (required)
- **Response:**
  - **forgetPasswordExample:**
    - Status: OK
    - Code: 200
    - Body:
      ```json
      {
        "message": "Password reset link sent to email"
      }
      ```

### 1.7. getOtp

- **Endpoint:** `GET /api/user/verify-otp`
- **Description:** Retrieves or renders the OTP page.
- **Request:**
  - Method: `GET`
  - Headers: None
  - Body: None
- **Response:**
  - (HTML Page)

### 1.8. postOtp

- **Endpoint:** `POST /api/user/verify-otp`
- **Description:** Verifies the OTP sent to the user's email.
- **Request:**
  - Method: `POST`
  - Headers: None
  - Body:
    ```form-data
    phone: 9999999999
    otp: 234332
    ```
    - **Request Body:**
      - `phone`: User's phone number.
      - `otp`: OTP code sent to the user's phone number.
- **Response:**
  - **postOtpExample:**
    - Code: 200
    - Body:
      ```json
      {
        "message": "OTP verified"
      }
      ```

### 1.9. getChangePassword

- **Endpoint:** `GET /api/user/change-password`
- **Description:** Renders the page for entering the new password.
- **Request:**
  - Method: `GET`
  - Headers: None
  - Body: None
- **Response:**
  - (HTML Page)

### 1.10. postChangePassword

- **Endpoint:** `POST /api/user/change-password`
- **Description:** Changes the user's password after OTP verification.
- **Request:**
  - Method: `POST`
  - Headers: None
  - Body:
    ```json
    {
      "email": "example@example.com",
      "newPassword": "NewPassword123!"
    }
    ```
    - **Request Body:**
      - `email`: User's email address (required).
      - `newPassword`: User's new password (required, min: 8 characters, max: 20 characters, must include at least one number and one special character).
- **Response:**
  - **postChangePasswordExample:**
    - Status: OK
    - Code: 200
    - Body:
      ```json
      {
        "message": "Password changed successfully"
      }
      ```

## 2. Captain Authentication

This section covers API endpoints specific to Captain authentication. The endpoints are very similar to User Authentication, but with `captain` replacing `user` in the URL paths.

### 2.1. getSignup (Captain)

- **Endpoint:** `GET api/captain/signup`
- **Description:** Retrieves the captain signup HTML page.

### 2.2. postSignup (Captain)

- **Endpoint:** `POST api/captain/signup`
- **Description:** Registers a new captain.
- **Request Body:** (Similar to user signup but includes first-name and last-name)

### 2.3. getLogin (Captain)

- **Endpoint:** `GET api/captain/login`
- **Description:** Retrieves the captain login HTML page.

### 2.4. postLogin (Captain)

- **Endpoint:** `POST api/captain/login`
- **Description:** Authenticates a captain.

### 2.5. Forget Password (Captain)

- **Endpoint:** `GET /api/captain/forgot-password`
- **Description:** Retrieves the forgot password HTML page for captains.

### 2.6. forgetPassword (Captain)

- **Endpoint:** `POST /api/captain/forgot-password`
- **Description:** Initiates a password reset for a captain.
- **Query Parameter:** `email`

### 2.7. getOtp (Captain)

- **Endpoint:** `GET /api/captain/verify-otp`
- **Description:** Retrieves or renders the OTP page for captains.

### 2.8. postOtp (Captain)

- **Endpoint:** `POST /api/captain/verify-otp`
- **Description:** Verifies the OTP for captains.
- **Request Body:** `phone`, `otp`

### 2.9. getChangePassword (Captain)

- **Endpoint:** `GET /api/captain/change-password`
- **Description:** Retrieves change password page for captains.

### 2.10. postChangePassword (Captain)

- **Endpoint:** `POST /api/captain/change-password`
- **Description:** Changes the password for a captain.
- **Request Body:** `email`, `newPassword`

## 3. User Profile

This section describes endpoints to manage user profile information.

### 3.1. Edit Profile

#### 3.1.1. patchProfile

- **Endpoint:** `PATCH /api/user/profile`
- **Description:** Updates user's profile information.
- **Request:**
  - Method: `PATCH`
  - Body:
    ```form-data
    name: John Smith
    ```
- **Response:**
  - Body:
    ```json
    {
      "message": "Profile updated successfully",
      "user": {
        "userId": "1",
        "email": "example@example.com",
        "name": "John Smith"
      }
    }
    ```

#### 3.1.2. getProfileEdit

- **Endpoint:** `GET /api/user/profile`
- **Description:** Renders the user's profile page for editing.
- **Request:**
  - Method: `GET`
- **Response:**
  - Body:
    ```json
    {
      "first-name": "John",
      "Last-name": "Doe",
      "email": "a@gmail.com"
    }
    ```

### 3.2. Coupon

#### 3.2.1. getCoupon

- **Endpoint:** `GET /api/user/coupons`
- **Description:** Retrieves a list of coupons available to the user.

### 3.3. Address

#### 3.3.1. getAdresss

- **Endpoint:** `GET /api/user/addresses`
- **Description:** Retrieves a list of addresses associated with the user's profile.

#### 3.3.2. postAddress

- **Endpoint:** `POST /api/user/addresses`
- **Description:** Add a new address to the user's profile.
- **Request Body:**
  ```json
  {
    "firstName": "Raihan",
    "lastName": "Raihgan",
    "phoneNumber": "12345678",
    "email": "a@gmail.com",
    "address": "123 Main St, Anytown, USA",
    "apartment": "Newyok",
    "city": "Delhi",
    "state": "Kerala",
    "pincode": "890534",
    "date": "35235235"
  }
  ```

### 3.4. Recent Order

#### 3.4.1. getRecentOrder

- **Endpoint:** `GET /api/user/recent-orders`
- **Description:** Retrieves a list of the user's recent orders.

## 4. Admin Authentication

### 4.1. getLogin (Admin)

- **Endpoint:** `GET /api/admin/login`
- **Description:** Retrieves the admin login HTML page.

### 4.2. postLogin (Admin)

- **Endpoint:** `POST /api/admin/login`
- **Description:** Authenticates an administrator.

## 5. Admin Management

### 5.1. Dashboard

#### 5.1.1. getdashboard

- **Endpoint:** `GET /api/admin/dashboard`
- **Description:** Retrieves admin dashboard data.
- **Response:**
  ```json
  {
    "totalUsers": 1045,
    "totalCaptains": 234,
    "totalRides": 5670,
    "revenue": 145000
  }
  ```

### 5.2. User List

#### 5.2.1. getUsers (Admin)

- **Endpoint:** `GET /api/admin/users`
- **Description:** Retrieves a list of all users for the admin panel.

### 5.3. Captain List

#### 5.3.1. getUsers (Captain List - Admin)

- **Endpoint:** `GET /api/admin/users` (This might be a typo. It's likely supposed to be a different endpoint, but it's listed as the same as User List)
- **Description:** Retrieves a list of all captains for the admin panel.

### 5.4. Coupon (Admin)

#### 5.4.1. getCoupons (Admin)

- **Endpoint:** `GET` (Implied - retrieves admin coupon page)
- **Description:** Retrieves the admin page containing the editing page and also coupon manager page.

#### 5.4.2. postCoupon (Admin)

- **Endpoint:** `POST /api/admin/coupon`
- **Description:** Creates a new coupon.
- **Request Body:**
  ```json
  {
    "title": "Summer Sale",
    "discount": 20,
    "expiryDate": "2024-12-31"
  }
  ```

#### 5.4.3. putCoupon (Admin)

- **Endpoint:** `PUT /api/users/coupon` (Likely intended to be `/api/admin/coupons/:couponId` or similar)
- **Description:** Updates a coupon.
- **Request Body:**
  ```json
  {
    "id": "2322",
    "title": "Updated Summer Sale",
    "discount": 25,
    "expiryDate": "2024-12-31"
  }
  ```

### 5.5. Access (Admin)

#### 5.5.1. block (User Block)

- **Endpoint:** `PUT /api/admin/users/block/:userId`
- **Description:** Blocks/unblocks a user.
- **Request Body:**
  ```json
  {
    "block": true
  }
  ```

#### 5.5.2. delete (User Delete)

- **Endpoint:** `DELETE /api/admin/users/:userId`
- **Description:** Deletes a user.

#### 5.5.3. approvel (Captain Approval)

- **Endpoint:** `PUT /api/admin/captains/verify/:captainId`
- **Description:** Approves or rejects a captain's application.
- **Request Body:**
  ```json
  {
    "status": "approved" // or "rejected"
  }
  ```

#### 5.5.4. block-captain (Captain Block)

- **Endpoint:** `PUT /api/admin/captains/block/:captainId`
- **Description:** Blocks/unblocks a captain.
- **Request Body:**
  ```json
  {
    "block": true
  }
  ```

#### 5.5.5. delete captain

- **Endpoint:** `DELETE /api/admin/captains/:captainId`
- **Description:** Deletes a captain.

### 5.6. Rides (Admin)

#### 5.6.1. get-rides (Admin)

- **Endpoint:** `GET /api/admin/rides`
- **Description:** Retrieves a list of all rides.

#### 5.6.2. ride-satus (Admin)

- **Endpoint:** `PUT /api/admin/rides/status/:rideId`
- **Description:** Updates the status of a ride.
- **Request Body:**
  ```json
  {
    "status": "cancelled" // or "reassigned", "completed"
  }
  ```

#### 5.6.3. delete-ride (Admin)

- **Endpoint:** `DELETE /api/admin/rides/:rideId`
- **Description:** Deletes a ride.

### 5.7. Report (Admin)

#### 5.7.1. get-reports (Admin)

- **Endpoint:** `GET /api/admin/reports/revenue?startDate=2025-01-01&endDate=2025-04-30`
- **Description:** Retrieves revenue reports.
- **Query Parameters:**
  - `startDate`: Start date for the report.
  - `endDate`: End date for the report.

#### 5.7.2. download (Admin)

- **Endpoint:** `GET /api/admin/reports/download?format=pdf`
- **Description:** Downloads a report.
- **Query Parameters:**
  - `format`: Report format (e.g., `pdf`).

## 6. Ride Booking

### 6.1. ride-create

- **Endpoint:** `POST /api/ride/create`
- **Description:** Creates a new ride request.
- **Request Body:**
  ```json
  {
    "pickup": "Connaught Place, Delhi",
    "destination": "Cyber Hub, Gurgaon",
    "vehicleType": "car"
  }
  ```

### 6.2. ride-confirm

- **Endpoint:** `POST /api/ride/confirm-ride`
- **Description:** Confirms a ride.
- **Request Body:**
  ```json
  {
    "rideId": "6652ae3c450ad2fbd8701b22"
  }
  ```

### 6.3. end-ride

- **Endpoint:** `POST /api/ride/end-ride`
- **Description:** Ends a ride.
- **Request Body:**
  ```json
  {
    "rideId": "6652ae3c450ad2fbd8701b22"
  }
  ```

### 6.4. start-ride

- **Endpoint:** `GET /api/ride/start-ride`
- **Description:** Starts a ride.

### 6.5. get-fare

- **Endpoint:** `GET /api/ride/get-fare`
- **Description:** Retrieves the fare for a ride.

## 7. Maps Module

### 7.1. get-coordinates

- **Endpoint:** `GET /api/maps/get-coordinates`
- **Description:** Retrieves coordinates for an address.

### 7.2. get-distance

- **Endpoint:** `GET api/maps/get-distance-time`
- **Description:** Retrieves distance and time between two locations.

### 7.3. get-suggestions

- **Endpoint:** `GET /api/maps/get-suggestions`
- **Description:** Retrieves address suggestions.

---
Okay, I can provide you with an overview of the API routes, including their methods, paths, and expected request bodies. I'll cover the User, Admin, and Host functionalities that have been implemented.

Here's the API documentation:

## API Endpoints Overview

### 1. User Authentication & Profile (`/user/auth`, `/user/profile`)

These routes handle user registration, login, OTP verification, password reset, OAuth, and profile management.

| Method | Path                | Description                                         | Request Body Example                       | Middleware          |
| :----- | :------------------ | :-------------------------------------------------- | :----------------------------------------- | :------------------ |
| `POST` | `/user/auth/signup` | Registers a new user.                               | `{"name": "...", "email": "...", "password": "..."}` | Rate Limiter        |
| `POST` | `/user/auth/signin` | Initiates user sign-in and sends an OTP.            | `{"email": "...", "password": "..."}`        | Rate Limiter        |
| `POST` | `/user/auth/verify-otp` | Verifies the OTP sent to the user's email.          | `{"email": "...", "otp": "..."}`             | None                |
| `POST` | `/user/auth/resend-otp` | Resends a new OTP to the user's email.              | `{"email": "..."}`                           | Rate Limiter        |
| `POST` | `/user/auth/forgot-password` | Sends a password reset link to the user's email.    | `{"email": "..."}`                           | Rate Limiter        |
| `POST` | `/user/auth/reset-password` | Resets the user's password using the reset link.    | `{"email": "...", "otp": "...", "password": "..."}` | None                |
| `POST` | `/user/auth/refresh` | Refreshes the user's access token.                  | (Via refresh token cookie)                 | Rate Limiter        |
| `POST` | `/user/auth/oauth-2` | Handles OAuth login/signup for users.               | `{"name": "...", "email": "...", "accessToken": "...", "profile": "..."}` | None                |
| `DELETE` | `/user/auth/logout` | Logs out the user and clears the refresh token.     | None                                       | None                |
| `GET`  | `/user/profile`     | Retrieves the authenticated user's profile.         | None                                       | UserAuthMiddleware  |
| `PUT`  | `/user/profile`     | Updates the authenticated user's profile.           | `{"name": "...", "profile": "..."}`        | UserAuthMiddleware  |
| `PUT`  | `/user/profile/change-password` | Changes the authenticated user's password.        | `{"oldPassword": "...", "newPassword": "..."}` | UserAuthMiddleware  |

### 2. Admin Authentication & Management (`/admin/auth`, `/admin`)

These routes handle admin login and potential future admin-specific functionalities.

| Method | Path                | Description                                         | Request Body Example                       | Middleware          |
| :----- | :------------------ | :-------------------------------------------------- | :----------------------------------------- | :------------------ |
| `POST` | `/admin/auth/signin` | Admin login.                                        | `{"email": "...", "password": "..."}`        | None                |
| `POST` | `/admin/auth/refresh` | Refreshes the admin's access token.                 | (Via refresh token cookie)                 | None                |
| `POST` | `/admin/auth/logout` | Logs out the admin.                                 | None                                       | None                |
| `GET`  | `/admin/users`      | Retrieves a list of all users (for admin panel).    | None                                       | AdminAuthMiddleware |
| `PUT`  | `/admin/users/:id/block` | Blocks a specific user.                            | None                                       | AdminAuthMiddleware |
| `PUT`  | `/admin/users/:id/unblock` | Unblocks a specific user.                          | None                                       | AdminAuthMiddleware |

### 3. Host Authentication & Property Listings (`/host/auth`, `/host`)

These routes handle host registration, login, OTP verification, password reset, OAuth, and property listing management.

| Method | Path                | Description                                         | Request Body Example                       | Middleware          |
| :----- | :------------------ | :-------------------------------------------------- | :----------------------------------------- | :------------------ |
| `POST` | `/host/auth/signup` | Registers a new host.                               | `{"name": "...", "email": "...", "password": "..."}` | Rate Limiter        |
| `POST` | `/host/auth/signin` | Initiates host sign-in and sends an OTP.            | `{"email": "...", "password": "..."}`        | Rate Limiter        |
| `POST` | `/host/auth/verify-otp` | Verifies the OTP sent to the host's email.          | `{"email": "...", "otp": "..."}`             | None                |
| `POST` | `/host/auth/resend-otp` | Resends a new OTP to the host's email.              | `{"email": "..."}`                           | Rate Limiter        |
| `POST` | `/host/auth/forgot-password` | Sends a password reset link to the host's email.    | `{"email": "..."}`                           | Rate Limiter        |
| `POST` | `/host/auth/reset-password` | Resets the host's password using the reset link.    | `{"email": "...", "otp": "...", "password": "..."}` | None                |
| `POST` | `/host/auth/refresh` | Refreshes the host's access token.                  | (Via refresh token cookie)                 | Rate Limiter        |
| `POST` | `/host/auth/oauth-2` | Handles OAuth login/signup for hosts.               | `{"name": "...", "email": "...", "accessToken": "...", "profile": "..."}` | None                |
| `DELETE` | `/host/auth/logout` | Logs out the host and clears the refresh token.     | None                                       | None                |
| `POST` | `/host/listings`    | Creates a new property listing.                     | `{"title": "...", "description": "...", "price": 100, "location": "...", "images": ["...", "..."], "amenities": ["...", "..."], "guests": 4, "bedrooms": 2, "beds": 2, "bathrooms": 1}` | UserAuthMiddleware  |
| `GET`  | `/host/listings`    | Retrieves all property listings for the authenticated host. | None                                       | UserAuthMiddleware  |
| `PUT`  | `/host/listings/:listingId` | Updates a specific property listing.               | `{"title": "Updated Title", "price": 120}` (partial updates) | UserAuthMiddleware  |
| `DELETE` | `/host/listings/:listingId` | Deletes a specific property listing.               | None                                       | UserAuthMiddleware  |

---

**Important Notes:**

*   **Middleware:** `UserAuthMiddleware` ensures that the user is authenticated and has a valid token. `AdminAuthMiddleware` is for admin-specific authentication. `Rate Limiter` prevents abuse of certain endpoints.
*   **Cookies:** Refresh tokens are typically stored as `httpOnly` cookies for security.
*   **OAuth:** OAuth flows involve a frontend interaction with an OAuth provider (e.g., Firebase, Google, Facebook) to obtain an `accessToken`, which is then sent to the backend for verification and user/host creation/login.
*   **Error Handling:** The API uses custom error classes (e.g., `NotFoundError`, `UnauthorizedError`, `ForbiddenError`) to provide structured error responses.
*   **Status Codes:** Standard HTTP status codes are used (e.g., `200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`).

This documentation should help you verify and test the implemented functionalities. Let me know if you need more details on any specific endpoint!
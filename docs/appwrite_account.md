

The Account service allows you to authenticate and manage a user account. You can use the account service to update user information, retrieve the user sessions across different devices, and fetch the user security logs with his or her recent activity.

Register new user accounts with the Create Account, Create Magic URL session, or Create Phone session endpoint. You can authenticate the user account by using multiple sign-in methods available. Once the user is authenticated, a new session object will be created to allow the user to access his or her private data and settings.

This service also exposes an endpoint to save and read the user preferences as a key-value object. This feature is handy if you want to allow extra customization in your app. Common usage for this feature may include saving the user's preferred locale, timezone, or custom app theme.

https://<REGION>.cloud.appwrite.io/v1

 

Use this endpoint to allow a new user to register a new account in your project. After the user registration completes successfully, you can use the /account/verfication route to start verifying the user email address. To allow the new user to login to their new account, you need to create a new account session.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

POST /account

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.create(

    '<USER_ID>', // userId

    'email@example.com', // email

    '', // password

    '<NAME>' // name (optional)

);

console.log(result);

Get the currently logged in user.

    Response

 

GET /account

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.get();

console.log(result);

Get the preferences as a key-value object for the currently logged in user.

    Response

 

GET /account/prefs

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.getPrefs();

console.log(result);

Update currently logged in user account email address. After changing user address, the user confirmation status will get reset. A new confirmation email is not sent automatically however you can use the send confirmation email endpoint again to send the confirmation email. For security measures, user password is required to complete this request.
This endpoint can also be used to convert an anonymous account to a normal one, by passing an email address and a new password.

    Request

    Response

 

PATCH /account/email

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.updateEmail(

    'email@example.com', // email

    'password' // password

);

console.log(result);

Update currently logged in user account name.

    Request

    Response

 

PATCH /account/name

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.updateName(

    '<NAME>' // name

);

console.log(result);

Update currently logged in user password. For validation, user is required to pass in the new password, and the old password. For users created with OAuth, Team Invites and Magic URL, oldPassword is optional.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

PATCH /account/password

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.updatePassword(

    '', // password

    'password' // oldPassword (optional)

);

console.log(result);

Update the currently logged in user's phone number. After updating the phone number, the phone verification status will be reset. A confirmation SMS is not sent automatically, however you can use the POST /account/verification/phone endpoint to send a confirmation SMS.

    Request

    Response

 

PATCH /account/phone

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.updatePhone(

    '+12065550100', // phone

    'password' // password

);

console.log(result);

Update currently logged in user account preferences. The object you pass is stored as is, and replaces any previous value. The maximum allowed prefs size is 64kB and throws error if exceeded.

    Request

    Response

 

PATCH /account/prefs

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.updatePrefs(

    {} // prefs

);

console.log(result);

Block the currently logged in user account. Behind the scene, the user record is not deleted but permanently blocked from any access. To completely delete a user, use the Users API instead.

    Response

 

PATCH /account/status

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.updateStatus();

console.log(result);

Use this endpoint to allow a new user to register an anonymous account in your project. This route will also create a new session for the user. To allow the new user to convert an anonymous account to a normal account, you need to update its email and password or create an OAuth2 session.

    Response
     
    Rate limits

     	

     	

      	 	

 

POST /account/sessions/anonymous

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.createAnonymousSession();

console.log(result);

Allow the user to login into their account by providing a valid email and password combination. This route will create a new session for the user.

A user is limited to 10 active sessions at a time by default. Learn more about session limits.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

POST /account/sessions/email

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.createEmailPasswordSession(

    'email@example.com', // email

    'password' // password

);

console.log(result);

Allow the user to login to their account using the OAuth2 provider of their choice. Each OAuth2 provider should be enabled from the Appwrite console first. Use the success and failure arguments to provide a redirect URL's back to your app when login is completed.

If there is already an active session, the new session will be attached to the logged-in account. If there are no active sessions, the server will attempt to look for a user with the same email address as the email received from the OAuth2 provider and attach the new session to the existing user. If no matching user is found - the server will create a new user.

A user is limited to 10 active sessions at a time by default. Learn more about session limits.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

GET /account/sessions/oauth2/{provider}

 

import { Client, Account, OAuthProvider } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

account.createOAuth2Session(

    OAuthProvider.Amazon, // provider

    'https://example.com', // success (optional)

    'https://example.com', // failure (optional)

    [] // scopes (optional)

);

Use this endpoint to create a session from token. Provide the userId and secret parameters from the successful response of authentication flows initiated by token creation. For example, magic URL and phone login.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

POST /account/sessions/token

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.createSession(

    '<USER_ID>', // userId

    '<SECRET>' // secret

);

console.log(result);

Use this endpoint to get a logged in user's session using a Session ID. Inputting 'current' will return the current session being used.

    Request

    Response

 

GET /account/sessions/{sessionId}

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.getSession(

    '<SESSION_ID>' // sessionId

);

console.log(result);

Get the list of active sessions across different devices for the currently logged in user.

    Response

 

GET /account/sessions

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.listSessions();

console.log(result);

Use this endpoint to create a session from token. Provide the userId and secret parameters from the successful response of authentication flows initiated by token creation. For example, magic URL and phone login.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

PUT /account/sessions/magic-url

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.updateMagicURLSession(

    '<USER_ID>', // userId

    '<SECRET>' // secret

);

console.log(result);

Use this endpoint to create a session from token. Provide the userId and secret parameters from the successful response of authentication flows initiated by token creation. For example, magic URL and phone login.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

PUT /account/sessions/phone

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.updatePhoneSession(

    '<USER_ID>', // userId

    '<SECRET>' // secret

);

console.log(result);

Use this endpoint to extend a session's length. Extending a session is useful when session expiry is short. If the session was created using an OAuth provider, this endpoint refreshes the access token from the provider.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

PATCH /account/sessions/{sessionId}

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.updateSession(

    '<SESSION_ID>' // sessionId

);

console.log(result);

Logout the user. Use 'current' as the session ID to logout on this device, use a session ID to logout on another device. If you're looking to logout the user on all devices, use Delete Sessions instead.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

DELETE /account/sessions/{sessionId}

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.deleteSession(

    '<SESSION_ID>' // sessionId

);

console.log(result);

    Response
     
    Rate limits

     	

     	

      	 	

 

DELETE /account/sessions

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.deleteSessions();

console.log(result);

Sends the user an email with a secret key for creating a session. If the provided user ID has not be registered, a new user will be created. Use the returned user ID and secret and submit a request to the POST /v1/account/sessions/token endpoint to complete the login process. The secret sent to the user's email is valid for 15 minutes.

A user is limited to 10 active sessions at a time by default. Learn more about session limits.

    Request

    Response
     
    Rate limits

     	

     	

      	 	
      	 	

 

POST /account/tokens/email

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.createEmailToken(

    '<USER_ID>', // userId

    'email@example.com', // email

    false // phrase (optional)

);

console.log(result);

Use this endpoint to create a JSON Web Token. You can use the resulting JWT to authenticate on behalf of the current user when working with the Appwrite server-side API and SDKs. The JWT secret is valid for 15 minutes from its creation and will be invalid if the user will logout in that time frame.

    Response
     
    Rate limits

     	

     	

      	 	

 

POST /account/jwts

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.createJWT();

console.log(result);

Sends the user an email with a secret key for creating a session. If the provided user ID has not been registered, a new user will be created. When the user clicks the link in the email, the user is redirected back to the URL you provided with the secret key and userId values attached to the URL query string. Use the query string parameters to submit a request to the POST /v1/account/sessions/token endpoint to complete the login process. The link sent to the user's email address is valid for 1 hour.

A user is limited to 10 active sessions at a time by default. Learn more about session limits.

    Request

    Response
     
    Rate limits

     	

     	

      	 	
      	 	

 

POST /account/tokens/magic-url

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.createMagicURLToken(

    '<USER_ID>', // userId

    'email@example.com', // email

    'https://example.com', // url (optional)

    false // phrase (optional)

);

console.log(result);

Allow the user to login to their account using the OAuth2 provider of their choice. Each OAuth2 provider should be enabled from the Appwrite console first. Use the success and failure arguments to provide a redirect URL's back to your app when login is completed.

If authentication succeeds, userId and secret of a token will be appended to the success URL as query parameters. These can be used to create a new session using the Create session endpoint.

A user is limited to 10 active sessions at a time by default. Learn more about session limits.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

GET /account/tokens/oauth2/{provider}

 

import { Client, Account, OAuthProvider } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

account.createOAuth2Token(

    OAuthProvider.Amazon, // provider

    'https://example.com', // success (optional)

    'https://example.com', // failure (optional)

    [] // scopes (optional)

);

Sends the user an SMS with a secret key for creating a session. If the provided user ID has not be registered, a new user will be created. Use the returned user ID and secret and submit a request to the POST /v1/account/sessions/token endpoint to complete the login process. The secret sent to the user's phone is valid for 15 minutes.

A user is limited to 10 active sessions at a time by default. Learn more about session limits.

    Request

    Response
     
    Rate limits

     	

     	

      	 	
      	 	

 

POST /account/tokens/phone

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.createPhoneToken(

    '<USER_ID>', // userId

    '+12065550100' // phone

);

console.log(result);

Get the list of latest security activity logs for the currently logged in user. Each log returns user IP address, location and date and time of log.

    Request

     
    Response

 

GET /account/logs

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.listLogs(

    [] // queries (optional)

);

console.log(result);

Sends the user an email with a temporary secret key for password reset. When the user clicks the confirmation link he is redirected back to your app password reset URL with the secret key and email address values attached to the URL query string. Use the query string params to submit a request to the PUT /account/recovery endpoint to complete the process. The verification link sent to the user's email address is valid for 1 hour.

    Request

    Response
     
    Rate limits

     	

     	

      	 	
      	 	

 

POST /account/recovery

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.createRecovery(

    'email@example.com', // email

    'https://example.com' // url

);

console.log(result);

Use this endpoint to complete the user account password reset. Both the userId and secret arguments will be passed as query parameters to the redirect URL you have provided when sending your request to the POST /account/recovery endpoint.

Please note that in order to avoid a Redirect Attack the only valid redirect URLs are the ones from domains you have set when adding your platforms in the console interface.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

PUT /account/recovery

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.updateRecovery(

    '<USER_ID>', // userId

    '<SECRET>', // secret

    '' // password

);

console.log(result);

Use this endpoint to send a verification message to your user email address to confirm they are the valid owners of that address. Both the userId and secret arguments will be passed as query parameters to the URL you have provided to be attached to the verification email. The provided URL should redirect the user back to your app and allow you to complete the verification process by verifying both the userId and secret parameters. Learn more about how to complete the verification process. The verification link sent to the user's email address is valid for 7 days.

Please note that in order to avoid a Redirect Attack, the only valid redirect URLs are the ones from domains you have set when adding your platforms in the console interface.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

POST /account/verification

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.createVerification(

    'https://example.com' // url

);

console.log(result);

Use this endpoint to send a verification SMS to the currently logged in user. This endpoint is meant for use after updating a user's phone number using the accountUpdatePhone endpoint. Learn more about how to complete the verification process. The verification code sent to the user's phone number is valid for 15 minutes.

    Response
     
    Rate limits

     	

     	

      	 	
      	 	

 

POST /account/verification/phone

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.createPhoneVerification();

console.log(result);

Use this endpoint to complete the user email verification process. Use both the userId and secret parameters that were attached to your app URL to verify the user email ownership. If confirmed this route will return a 200 status code.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

PUT /account/verification

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.updateVerification(

    '<USER_ID>', // userId

    '<SECRET>' // secret

);

console.log(result);

Use this endpoint to complete the user phone verification process. Use the userId and secret that were sent to your user's phone number to verify the user email ownership. If confirmed this route will return a 200 status code.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

PUT /account/verification/phone

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.updatePhoneVerification(

    '<USER_ID>', // userId

    '<SECRET>' // secret

);

console.log(result);

Add an authenticator app to be used as an MFA factor. Verify the authenticator using the verify authenticator method.

    Request

     
    Response

 

POST /account/mfa/authenticators/{type}

 

import { Client, Account, AuthenticatorType } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.createMfaAuthenticator(

    AuthenticatorType.Totp // type

);

console.log(result);

Begin the process of MFA verification after sign-in. Finish the flow with updateMfaChallenge method.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

POST /account/mfa/challenge

 

import { Client, Account, AuthenticationFactor } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.createMfaChallenge(

    AuthenticationFactor.Email // factor

);

console.log(result);

Generate recovery codes as backup for MFA flow. It's recommended to generate and show then immediately after user successfully adds their authehticator. Recovery codes can be used as a MFA verification type in createMfaChallenge method.

    Response

 

POST /account/mfa/recovery-codes

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.createMfaRecoveryCodes();

console.log(result);

List the factors available on the account to be used as a MFA challange.

    Response

 

GET /account/mfa/factors

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.listMfaFactors();

console.log(result);

Get recovery codes that can be used as backup for MFA flow. Before getting codes, they must be generated using createMfaRecoveryCodes method. An OTP challenge is required to read recovery codes.

    Response

 

GET /account/mfa/recovery-codes

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.getMfaRecoveryCodes();

console.log(result);

Verify an authenticator app after adding it using the add authenticator method.

    Request

    Response

 

PUT /account/mfa/authenticators/{type}

 

import { Client, Account, AuthenticatorType } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.updateMfaAuthenticator(

    AuthenticatorType.Totp, // type

    '<OTP>' // otp

);

console.log(result);

Enable or disable MFA on an account.

    Request

    Response

 

PATCH /account/mfa

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.updateMFA(

    false // mfa

);

console.log(result);

Complete the MFA challenge by providing the one-time password. Finish the process of MFA verification by providing the one-time password. To begin the flow, use createMfaChallenge method.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

PUT /account/mfa/challenge

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.updateMfaChallenge(

    '<CHALLENGE_ID>', // challengeId

    '<OTP>' // otp

);

console.log(result);

Regenerate recovery codes that can be used as backup for MFA flow. Before regenerating codes, they must be first generated using createMfaRecoveryCodes method. An OTP challenge is required to regenreate recovery codes.

    Response

 

PATCH /account/mfa/recovery-codes

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.updateMfaRecoveryCodes();

console.log(result);

Delete an authenticator for a user by ID.

    Request

    Response

 

DELETE /account/mfa/authenticators/{type}

 

import { Client, Account, AuthenticatorType } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.deleteMfaAuthenticator(

    AuthenticatorType.Totp // type

);

console.log(result);

Use this endpoint to register a device for push notifications. Provide a target ID (custom or generated using ID.unique()), a device identifier (usually a device token), and optionally specify which provider should send notifications to this target. The target is automatically linked to the current session and includes device information like brand and model.

    Request

    Response

 

POST /account/targets/push

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.createPushTarget(

    '<TARGET_ID>', // targetId

    '<IDENTIFIER>', // identifier

    '<PROVIDER_ID>' // providerId (optional)

);

console.log(result);

Update the currently logged in user's push notification target. You can modify the target's identifier (device token) and provider ID (token, email, phone etc.). The target must exist and belong to the current user. If you change the provider ID, notifications will be sent through the new messaging provider instead.

    Request

     
    Response

 

PUT /account/targets/{targetId}/push

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.updatePushTarget(

    '<TARGET_ID>', // targetId

    '<IDENTIFIER>' // identifier

);

console.log(result);

Delete a push notification target for the currently logged in user. After deletion, the device will no longer receive push notifications. The target must exist and belong to the current user.

    Request

    Response

 

DELETE /account/targets/{targetId}/push

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.deletePushTarget(

    '<TARGET_ID>' // targetId

);

console.log(result);

Get the list of identities for the currently logged in user.

    Request

     
    Response

 

GET /account/identities

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.listIdentities(

    [] // queries (optional)

);

console.log(result);

Delete an identity by its unique ID.

    Request

    Response

 

DELETE /account/identities/{identityId}

 

import { Client, Account } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const account = new Account(client);

const result = await account.deleteIdentity(

    '<IDENTITY_ID>' // identityId

);

console.log(result);


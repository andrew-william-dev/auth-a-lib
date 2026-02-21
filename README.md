# auth-a-lib

> The official JavaScript SDK for integrating [Auth-A](https://auth-a.vercel.app) — a DevPortal-powered Identity Provider — into your web applications.

Auth-A handles user authentication so you don't have to. Your users log in through Auth-A and get redirected back to your app with a verified access token that tells you who they are and what role they hold in your application.

---

## Installation

```bash
npm install auth-a-lib
```

---

## Prerequisites

Before using this library:

1. **Register on Auth-A DevPortal** — [auth-a.vercel.app](https://auth-a.vercel.app)
2. **Create an application** — You'll receive a `clientId`
3. **Set your Redirect URI** — The callback URL in your app (e.g. `https://yourapp.com/callback`)

---

## Usage

```javascript
import { ClientApp } from 'auth-a-lib';

const auth = new ClientApp('your-client-id');

// Redirect user to Auth-A login
await auth.login('https://yourapp.com/callback');

// On your callback page — exchange the code for a token
const result = await auth.handleRedirect();
// result contains: access_token, user, role
```

---

## What It Does

- **`login(redirectURL)`** — Redirects the user to the Auth-A login page. Handles all PKCE security internally.
- **`handleRedirect()`** — Call this on your callback page. Reads the authorization code from the URL and exchanges it for a JWT access token.

The returned token includes the user's identity and their assigned role in your application.

> 📖 For in-depth integration guides, code samples, and framework-specific examples, visit the **[Auth-A Documentation Site](#)** *(coming soon)*.

---

## Links

- **DevPortal:** [auth-a.vercel.app](https://auth-a.vercel.app)
- **Backend API:** [auth-a-be.onrender.com](https://auth-a-be.onrender.com)

---

## License

ISC © Andrew William Staines

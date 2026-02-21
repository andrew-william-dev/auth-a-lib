# Auth-A Library

JavaScript library for integrating Auth-A authentication into your web applications. Provides a simple, secure OAuth 2.0 with PKCE flow implementation.

## Installation

```bash
npm install auth-a-lib
```

## Quick Start

```javascript
import { ClientApp } from 'auth-a-lib';

// Initialize the client with your Auth-A client ID
const authClient = new ClientApp('your-client-id');

// Initiate login (async method)
await authClient.login('https://your-app.com/callback');
```

## Usage

### 1. Initialize the Client

Create a new instance of `ClientApp` with your client ID from the [Auth-A Developer Portal](https://auth-a.vercel.app):

```javascript
const authClient = new ClientApp('your-client-id-here');
```

### 2. Initiate Login Flow

Call the `login()` method with your callback URL. The user will be redirected to Auth-A for authentication:

```javascript
// The login method is async
await authClient.login('https://your-app.com/callback');
```

**Note:** The `login()` method will:
- Generate a secure PKCE code verifier and challenge
- Store the verifier in `sessionStorage` for later token exchange
- Redirect the user to Auth-A login page

### 3. Handle the Callback

After successful authentication, Auth-A will redirect back to your specified URL with an authorization code. You'll need to exchange this code for tokens using your backend.

## API Reference

### `ClientApp`

#### Constructor

```javascript
new ClientApp(clientId: string)
```

- **clientId** (required): Your Auth-A application client ID

#### Methods

##### `login(redirectURL: string): Promise<void>`

Initiates the OAuth 2.0 authentication flow with PKCE.

- **redirectURL** (required): The URL to redirect to after authentication
- **Returns**: Promise that resolves when redirect is initiated
- **Throws**: Error if clientId is invalid or redirectURL is not provided

**Example:**
```javascript
try {
  await authClient.login('https://myapp.com/auth/callback');
} catch (error) {
  console.error('Login failed:', error.message);
}
```

## Browser Compatibility

This library uses the Web Crypto API and requires:
- Chrome 37+
- Firefox 34+
- Safari 11+
- Edge 79+

## Security

This library implements OAuth 2.0 with PKCE (Proof Key for Code Exchange) for enhanced security:
- Cryptographically secure random code verifier generation
- SHA-256 hashing for code challenge
- Code verifier stored securely in sessionStorage

## Development

### Local Testing with yalc

To test this library locally in another project:

1. Build the library:
```bash
npm run build
```

2. Publish to yalc:
```bash
yalc publish
```

3. In your test project:
```bash
yalc add auth-a-lib
npm install
```

4. After making changes to the library:
```bash
npm run build
yalc push
```

### Build Commands

- `npm run build` - Build production bundles
- `npm run dev` - Build in watch mode for development

## License

ISC

## Author

Andrew William Staines

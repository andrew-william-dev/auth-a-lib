export class ClientApp {
    clientId = null;
    redirectUrl = null;

    constructor(clientId) {
        this.clientId = clientId;
    }

    #validateId() {
        return !!this.clientId;
    }

    async #generateCodeVerifier() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return this.#base64UrlEncode(array);
    }

    async #generateCodeChallenge(verifier) {
        const encoder = new TextEncoder();
        const data = encoder.encode(verifier);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return this.#base64UrlEncode(new Uint8Array(hash));
    }

    #base64UrlEncode(buffer) {
        const base64 = btoa(String.fromCharCode(...buffer));
        return base64
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    #getUrl(challenge) {
        return "https://auth-a.vercel.app/oauth/login" +
            "?clientId=" + this.clientId +
            "&redirectUrl=" + this.redirectUrl +
            "&code_challenge=" + challenge +
            "&code_challenge_method=s256";
    }

    async login(redirectURL) {
        if (!this.#validateId()) {
            throw new Error("Invalid clientId");
        }

        if (!redirectURL) {
            throw new Error('No valid redirectURL provided.');
        }

        this.redirectUrl = redirectURL;

        const verifier = await this.#generateCodeVerifier();
        const challenge = await this.#generateCodeChallenge(verifier);

        sessionStorage.setItem('auth_a_code_verifier', verifier);

        location.href = this.#getUrl(challenge);
    }

    async handleRedirect() {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        window.history.replaceState({}, "", window.location.pathname)
        const verifier = sessionStorage.getItem('auth_a_code_verifier');
        if (!code) {
            return null;
        }
        return await fetch("https://auth-a-be.onrender.com/api/oauth/token",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: code,
                code_verifier: verifier,
                clientId: this.clientId
            })
        }).then(response => response.json());
    }
}


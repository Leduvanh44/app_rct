import paths from "./paths"

const oidcConfig = {
    authority: import.meta.env.VITE_AUTHORITY_SERVER,
    clientId: import.meta.env.VITE_CLIENT_ID,
    scope: "openid profile native-client-scope IdentityServerApi",
    responseType: "id_token token",
    redirectUri: window.location.origin + paths.signInOidc,
    autoSignIn: false,
}

export { oidcConfig }

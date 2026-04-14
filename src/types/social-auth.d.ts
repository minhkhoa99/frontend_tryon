type GoogleOAuthTokenClient = {
  requestAccessToken: (overrideConfig?: { prompt?: string }) => void
}

type GoogleOAuthTokenResponse = {
  access_token?: string
}

type FacebookLoginResponse = {
  authResponse?: {
    accessToken?: string
  }
}

declare global {
  interface Window {
    __tryOnGoogleTokenClient?: GoogleOAuthTokenClient
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string
            scope: string
            callback: (response: GoogleOAuthTokenResponse) => void
            error_callback?: () => void
          }) => GoogleOAuthTokenClient
        }
      }
    }
    FB?: {
      init: (config: {
        appId: string
        cookie: boolean
        xfbml: boolean
        version: string
      }) => void
      login: (
        callback: (response: FacebookLoginResponse) => void,
        options?: { scope?: string },
      ) => void
    }
  }
}

export {}

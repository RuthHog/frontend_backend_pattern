import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "a8809b2b-5892-43c1-99f1-d0edd804fc96", // Client ID
    authority:
      "https://login.microsoftonline.com/e8434d34-dd4c-4f58-b0a6-6ef6f8e18ffa", // Tenant ID of the React.JS App Registration
    redirectUri: "http://localhost:3000/",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: any, message: string, containsPii: any) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

// Can be found in the API Permissions of the ASP.NET Web API
export const loginApiRequest = {
  scopes: ["api://04362933-a5c2-4876-b3be-5b744fb12dba/user_impersonation"],
};

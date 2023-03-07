import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig, loginApiRequest } from "./authConfig";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import reportWebVitals from "./reportWebVitals";
import "bulma/css/bulma.min.css";

/**
 * Initialize a PublicClientApplication instance which is provided to the MsalProvider component
 * We recommend initializing this outside of your root component to ensure it is not re-initialized on re-renders
 */
const msalInstance = new PublicClientApplication(msalConfig);

axios.defaults.baseURL = "https://localhost:7089/api/";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.interceptors.request.use(
  async (response) => {
    const account = msalInstance.getAllAccounts()[0];
    const msalResponse = await msalInstance.acquireTokenSilent({
      ...loginApiRequest,
      account: account,
    });
    console.log(msalResponse.accessToken)
    response.headers.Authorization = `Bearer ${msalResponse.accessToken}`;
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);
/**
 * We recommend wrapping most or all of your components in the MsalProvider component. It's best to render the MsalProvider as close to the root as possible.
 * Comment
 */
ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

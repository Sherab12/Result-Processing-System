import { ContextProvider } from "./Contexts/ContextProvider";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { registerLicense } from "@syncfusion/ej2-base";

import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// Registering Syncfusion license key
registerLicense(
  "MjgwMzg0NkAzMjMxMmUzMTJlMzQzMWIxcXFIT2QxUmdNNGE1RTBuZzNYaGFrNUFhRVh3WUwydjBmVThSb25SRUE9;MjgwMzg0N0AzMjMxMmUzMTJlMzQzMUZsRmZwNzk2VlA3dHZYcERxUHlIaU9ieGJLSVRtSmx5M0E0blVkR25CeWM9;Mgo+DSMBaFt+QHFqUUdrXVNbdV5dVGpAd0N3RGlcdlR1fUUmHVdTRHRcQ1xjQX9SdEBiUX5cd3I=;Mgo+DSMBPh8sVXJ1S0d+WFBPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSH9TfkRiW3pfeHVXQWY=;ORg4AjUWIQA/Gnt2VFhhQlVFfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn9Sdk1iWH1bcXxUQmNe;NRAiBiAaIQQuGjN/V0d+XU9Ad1RDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31Sd0VrWH5cdXVdR2ZcUQ==;MjgwMzg1MkAzMjMxMmUzMTJlMzQzMVEvbUV3T0FjR2VnaHgvUEwrbE41T2pPMy9Jd1JldTdFVVR6NmVHejJ5V2s9;MjgwMzg1M0AzMjMxMmUzMTJlMzQzMVRkL21IYUZQSm1hcXovaWtHbzZQY0xDU3ZiUms2K2hRZ3Ivbk94RmZJTzQ9;Mgo+DSMBMAY9C3t2VFhhQlVFfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn9Sdk1iWH1bcXxXRmZU;MjgwMzg1NUAzMjMxMmUzMTJlMzQzMUl6U0VRRitXbysyVWQ3Y1BFQlJRbWE2d20xQUI1Nlg1TDIyTjdCcFZnSUk9;MjgwMzg1NkAzMjMxMmUzMTJlMzQzMVB0dGk5NzRleHMrMUxkSDFDVnJjVE5paGdTRitCREhzaVI2Vzd5YXYxUnM9;MjgwMzg1N0AzMjMxMmUzMTJlMzQzMVEvbUV3T0FjR2VnaHgvUEwrbE41T2pPMy9Jd1JldTdFVVR6NmVHejJ5V2s9"
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextProvider>
    </Provider>
  </React.StrictMode>
);

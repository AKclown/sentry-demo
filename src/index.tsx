import React from 'react';
import ReactDOM from 'react-dom/client';
import { useLocation, useNavigationType, createRoutesFromChildren, matchRoutes } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://c6a5ae69a8604c75a084d12d06903efd@o4504015835168768.ingest.sentry.io/4505593191333888",
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      ),
    }),
    new Sentry.Replay()
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  release: "AKclown-demo@1.0.1",

});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


function FallbackComponent() {
  return <div>An error has occurred</div>;
}

const myFallback = <FallbackComponent />;


root.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={({ error, componentStack, resetError }) => {
      console.log('error, componentStack, resetError: ', error, componentStack, resetError);
      return myFallback
    }}>
      <App />
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

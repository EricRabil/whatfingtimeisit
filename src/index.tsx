import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { PersistentPeopleContextProvider } from './contexts/people-context';
import { CurrentTimeOneSecondTTLProvider } from './contexts/time';
import { LocalizedPeopleContextProvider } from './contexts/localized-time-context';
import { PersistentColorCodingContextProvider } from './contexts/color-coding-context';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PersistentPeopleContextProvider>
        <CurrentTimeOneSecondTTLProvider>
          <LocalizedPeopleContextProvider>
            <PersistentColorCodingContextProvider>
                <App />
            </PersistentColorCodingContextProvider>
          </LocalizedPeopleContextProvider>
        </CurrentTimeOneSecondTTLProvider>
      </PersistentPeopleContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

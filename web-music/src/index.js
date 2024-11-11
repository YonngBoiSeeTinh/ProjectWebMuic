import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './views/App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'; // Import Provider từ react-redux
import  store  from './Redux/store'; // Import store
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  <Provider store={store}> {/* Bọc toàn bộ ứng dụng trong Provider và truyền store */}
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
</Provider>
);


reportWebVitals();

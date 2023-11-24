import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import './index.css';

import store, { Provider } from './reducers/store'; // змінено шлях

const render = () =>
  ReactDOM.createRoot(root).render(
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ChakraProvider>
    </Provider>
  );

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./components/App', render);
}

render();
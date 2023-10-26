import { render } from 'preact';
import { Provider } from 'react-redux';
import { App } from './components/App.tsx';
import './index.css';
import { store } from './store.ts';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')!
);

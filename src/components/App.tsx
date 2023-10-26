import { Provider } from 'react-redux';
import { store } from '../state/store';
import './App.css';
import { GameControls } from './GameControls';
import { Grid } from './Grid';
import { UIControls } from './UIControls';

export function App() {
  return (
    <Provider store={store}>
      <Grid />
      <UIControls />
      <GameControls />
    </Provider>
  );
}

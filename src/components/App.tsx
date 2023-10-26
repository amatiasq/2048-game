import './App.css';
import { GameControls } from './GameControls';
import { Grid } from './Grid';
import { UIControls } from './UIControls';

export function App() {
  return (
    <>
      <Grid />
      <UIControls />
      <GameControls />
    </>
  );
}

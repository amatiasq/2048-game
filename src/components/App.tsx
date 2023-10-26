import './App.css';
import { UIControls } from './Controls';
import { GameControls } from './GameControls';
import { Grid } from './Grid';

export function App() {
  return (
    <>
      <Grid />
      <UIControls />
      <GameControls />
    </>
  );
}

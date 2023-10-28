import { useGameControls } from '../hooks/useGameControls';
import './App.css';
import { Grid } from './Grid';
import { UIControls } from './UIControls';

export function App() {
  useGameControls();

  return (
    <>
      <Grid />
      <UIControls />
    </>
  );
}

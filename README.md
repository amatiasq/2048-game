# 2048 Game

The 2048 game, playable with keyboard arrows and touch swipes.

See it live https://amatiasq.github.io/2048-game/

## Tech stack

- [Vite](https://vitejs.dev/)
- [Preact](https://preactjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [redux-toolkit](https://redux-toolkit.js.org/)

## How to run locally

Run the following commands at the root directory.

```sh
npm i
npm run dev
```

You can also use `npm run build` to generate static distributable web files.

## Configuration

The follwing values are configurable in `/src/config.ts`

- **`HAS_OBSTACLES`** Set it to false to disable obstacles, this will remove them from the UI and also make the obstacle value (-1) an invalid `CellValue` for typescript validation.
- **`COLUMNS` and `ROWS`** define the size of the playable grid
- **`INITIAL_CELL_VALUE`** is the value of the cell created at start
- **`SWIPE_CELL_VALUE`** is the value of the cell created on every swipe
- **`WIN_VALUE`** when this value has been reached the player has won

Also there is a CSS custom property at `#app` called `--scale`, use it to change the size of the whole application.
It can be changed live from the browser developer tools.

## Licensing

[MIT Licence](https://opensource.org/license/mit/)

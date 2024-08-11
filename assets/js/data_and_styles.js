const levels = {
  beginner: {
    width: 9,
    height: 9,
    mines_amount: 10,
  },
  intermediate: {
    width: 16,
    height: 16,
    mines_amount: 40,
  },
  expert: {
    width: 30,
    height: 16,
    mines_amount: 99,
  },
};

function chooseColor(number) {
  const DEFAULT_COLOR = '#000';
  const colors = ['#244afc', '#407f07', '#fe0000', '#0d2180', '#801e17', '#008284', '#840084', '#757575'];

  return colors[number - 1] ?? DEFAULT_COLOR;
}

function chooseSize(difficulty) {
  document.documentElement.style.setProperty('--grid-height', `calc(var(--cell-size) * ${levels[difficulty].height})`);
  document.documentElement.style.setProperty('--grid-width', `calc(var(--cell-size) * ${levels[difficulty].width})`);
}

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
  let color = '';
  switch (number) {
    case 1:
      color = '#244afc';
      break;
    case 2:
      color = '#407f07';
      break;
    case 3:
      color = '#fe0000';
      break;
    case 4:
      color = '#0d2180';
      break;
    case 5:
      color = '#801e17';
      break;
    case 6:
      color = '#008284';
      break;
    case 7:
      color = '#840084';
      break;
    case 8:
      color = '#757575';
      break;
    default:
      color = '#000000';
      break;
  }
  return color;
}

function chooseSize(difficulty) {
  document.documentElement.style.setProperty('--grid-height', `calc(var(--cell-size) * ${levels[difficulty].height})`);
  document.documentElement.style.setProperty('--grid-width', `calc(var(--cell-size) * ${levels[difficulty].width})`);
}

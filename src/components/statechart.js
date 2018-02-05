// represents main menu state
const state1 = {
  1: {
    on: {
      NEXT_CLICKED: '2',
      EXIT_CLICKED: '4',
    },
  },
};

// represents encryption method selection state
const state2 = {
  2: {
    on: {
      METHOD_SELECTED: '3',
    },
  },
};

// represents source string entry state
const state3 = {
  3: {
    on: {
      SOURCE_ENTERED: {
        1: {
          actions: ['runEncryption'],
        },
      },
    },
  },
};

// represents closed menu state
const state4 = {
  4: {
    on: {
      OPEN_MENU: '1',
    },
  },
};

const statechart = {
  initial: '1',
  states: {
    ...state1,
    ...state2,
    ...state3,
    ...state4,
  },
};

export default statechart;

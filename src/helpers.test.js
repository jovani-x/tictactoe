import { calculateBoardPosition, calculateWinner, getStatus } from "./helpers";

describe('calc current cell (0-8)', () => {
  test('should be position 0', () => {
    expect( calculateBoardPosition(0) ).toEqual({
      col: 1,
      row: 1,
    });
  });

  test('should be position 1', () => {
    expect( calculateBoardPosition(1) ).toEqual({
      col: 2,
      row: 1,
    });
  });

  test('should be position 2', () => {
    expect( calculateBoardPosition(2) ).toEqual({
      col: 3,
      row: 1,
    });
  });

  test('should be position 3', () => {
    expect( calculateBoardPosition(3) ).toEqual({
      col: 1,
      row: 2,
    });
  });

  test('should be position 4', () => {
    expect( calculateBoardPosition(4) ).toEqual({
      col: 2,
      row: 2,
    });
  });

  test('should be position 5', () => {
    expect( calculateBoardPosition(5) ).toEqual({
      col: 3,
      row: 2,
    });
  });

  test('should be position 6', () => {
    expect( calculateBoardPosition(6) ).toEqual({
      col: 1,
      row: 3,
    });
  });

  test('should be position 7', () => {
    expect( calculateBoardPosition(7) ).toEqual({
      col: 2,
      row: 3,
    });
  });

  test('should be position 8', () => {
    expect( calculateBoardPosition(8) ).toEqual({
      col: 3,
      row: 3,
    });
  });
});

describe('is winner', () => {
  test('first line winner X', () => {
    expect( calculateWinner(['X', 'X', 'X']) ).toEqual({
      winner: 'X',
      combination: [0, 1, 2],
    });
  });

  test('second line winner O', () => {
    expect( calculateWinner(['', '', '', 'O', 'O', 'O']) ).toEqual({
      winner: 'O',
      combination: [3, 4, 5],
    });
  });

  test('third line winner X', () => {
    expect( calculateWinner(['', '', '', '', '', '', 'X', 'X', 'X']) ).toEqual({
      winner: 'X',
      combination: [6, 7, 8],
    });
  });

  test('first column winner O', () => {
    expect( calculateWinner(['O', '', '', 'O', '', '', 'O', '', '']) ).toEqual({
      winner: 'O',
      combination: [0, 3, 6],
    });
  });

  test('second column winner X', () => {
    expect( calculateWinner(['', 'X', '', 'O', 'X', '', 'O', 'X', '']) ).toEqual({
      winner: 'X',
      combination: [1, 4, 7],
    });
  });

  test('third column winner O', () => {
    expect( calculateWinner(['', 'X', 'O', 'O', '', 'O', 'O', 'X', 'O']) ).toEqual({
      winner: 'O',
      combination: [2, 5, 8],
    });
  });

  test('first diagonal winner O', () => {
    expect( calculateWinner(['O', '', '', '', 'O', '', '', 'X', 'O']) ).toEqual({
      winner: 'O',
      combination: [0, 4, 8],
    });
  });

  test('second diagonal winner X', () => {
    expect( calculateWinner(['O', '', 'X', '', 'X', '', 'X', '', 'O']) ).toEqual({
      winner: 'X',
      combination: [2, 4, 6],
    });
  });

  test('no winner', () => {
    expect( calculateWinner(['O', 'X', 'O']) ).toEqual(null);
  });

  test('no winner', () => {
    expect( calculateWinner([]) ).toEqual(null);
  });
});

describe('get status', () => {
  it('Should be "Next player: X"', () => {
    const state = {
      history: [{
        squares: Array(10).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };

    expect( getStatus(state) ).toEqual("Next player: X");
  });

  it('Should be "Next player: O"', () => {
    const state = {
      history: [null, {
        squares: ['X', ...Array(9).fill(null)],
      }],
      stepNumber: 1,
      xIsNext: false,
    };

    expect( getStatus(state) ).toEqual("Next player: O");
  });

  it('Should be "The result being a draw"', () => {
    const state = {
      history: [...Array(9).fill(null), {
        squares: ['X', 'X', 'O', 'O', 'O', 'X', 'X', 'O', 'X'],
      }],
      stepNumber: 9,
      xIsNext: false,
    };

    expect( getStatus(state) ).toEqual("The result being a draw");
  });

  it('Should be "Winner: O"', () => {
    const state = {
      history: [...Array(6).fill(null), {
        squares: ['X', 'X', '', '', 'X', '', 'O', 'O', 'O'],
      }],
      stepNumber: 6,
      xIsNext: true,
    };

    expect( getStatus(state) ).toEqual("Winner: O");
  });
});

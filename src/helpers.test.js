import {calculateBoardPosition, calculateWinner} from "./helpers";

describe('calc board position', () => {
  test('calc board position 0', () => {
    expect( calculateBoardPosition(0) ).toEqual({
      col: 1,
      row: 1,
    });
  });

  test('calc board position 1', () => {
    expect( calculateBoardPosition(1) ).toEqual({
      col: 2,
      row: 1,
    });
  });

  test('calc board position 2', () => {
    expect( calculateBoardPosition(2) ).toEqual({
      col: 3,
      row: 1,
    });
  });

  test('calc board position 3', () => {
    expect( calculateBoardPosition(3) ).toEqual({
      col: 1,
      row: 2,
    });
  });

  test('calc board position 4', () => {
    expect( calculateBoardPosition(4) ).toEqual({
      col: 2,
      row: 2,
    });
  });

  test('calc board position 5', () => {
    expect( calculateBoardPosition(5) ).toEqual({
      col: 3,
      row: 2,
    });
  });

  test('calc board position 6', () => {
    expect( calculateBoardPosition(6) ).toEqual({
      col: 1,
      row: 3,
    });
  });

  test('calc board position 7', () => {
    expect( calculateBoardPosition(7) ).toEqual({
      col: 2,
      row: 3,
    });
  });

  test('calc board position 8', () => {
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

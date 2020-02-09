import React, { Component } from "react";
import { shallow } from 'enzyme';
import { Square, GameStatus, SortButton, ABC_SORT, CBA_SORT } from './App';

describe('Render Square', () => {
  it('should have win-classname onClick', () => {
    const onClick = jest.fn(),
      props = {
        isWin: true,
        value: 'X',
        onClick,
      },
      SquareComponent = shallow(<Square {...props} />);
    SquareComponent.find('button').simulate('click');
    expect(SquareComponent.find('button').hasClass('win-square')).toEqual(props.isWin);
    expect(SquareComponent.find('button').text()).toEqual(props.value);
  });

  it('shouldn\'t have win-classname onClick', () => {
    const onClick = jest.fn(),
      props = {
        isWin: false,
        value: 'O',
        onClick
      },
      SquareComponent = shallow(<Square {...props} />);
    SquareComponent.find('button').simulate('click');
    expect(SquareComponent.find('button').hasClass('win-square')).toEqual(props.isWin);
    expect(SquareComponent.find('button').text()).toEqual(props.value);
  });
});

describe('Render status', () => {
  it('Should show "Next player: X"', () => {
    const status = "Next player: X",
      StatusComponent = shallow(<GameStatus status={status} />);
    expect(StatusComponent.text()).toEqual(status);
  });
});

describe('sort button', () => {
  it('Render sort button', () => {
    const onClick = jest.fn(),
      props = {
        sortDirection: ABC_SORT,
        onClick,
      },
      resultText = 'Sort actions by ' + props.sortDirection,
      SortBtnComponent = shallow(<SortButton {...props} />);
    expect(SortBtnComponent.text()).toEqual(resultText);
  });
});

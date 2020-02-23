import React from "react";
import { shallow } from 'enzyme';
import { Square, Board } from './Board';

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

describe('Render Board', () => {
  it('Should be 9 Squares', () => {
    const onClick = jest.fn(),
      props = {
        squares: Array(10).fill(null),
        winners: false,
        onClick
      },
      BoardComponent = shallow(<Board {...props} />);
    expect(BoardComponent.find('Square').length).toEqual(9);
  });
});

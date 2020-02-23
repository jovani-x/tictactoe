import React from "react";
import { shallow } from 'enzyme';
import { GameStatus } from './App';

describe('Render status', () => {
  it('Should show "Next player: X"', () => {
    const status = "Next player: X",
      StatusComponent = shallow(<GameStatus status={status} />);
    expect(StatusComponent.text()).toEqual(status);
  });
});

import React from "react";
import { shallow } from 'enzyme';
import { MovesList, SortButton } from "./MovesList";
import { ABC_SORT, CBA_SORT } from "./helpers";

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
  it('Render sort button after click', () => {
    const onClick = jest.fn(),
      props = {
        sortDirection: CBA_SORT,
        onClick,
      },
      resultText = 'Sort actions by ' + props.sortDirection,
      SortBtnComponent = shallow(<SortButton {...props} />);
    SortBtnComponent.find('button').simulate('click');
    expect(SortBtnComponent.text()).toEqual(resultText);
  });
});

describe('History', () => {
  it('Render history on start', () => {
    const props = {
      history: [{
        squares: Array(10).fill(null),
        order: Array(10).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      sortDirection: ABC_SORT,
      desc: 'Go to game start',
    },
    MovesListComponent = shallow(<MovesList {...props}/>),
    elementLi = MovesListComponent.find('li');
    expect(MovesListComponent.text()).toEqual(props.desc);
    expect(elementLi.length).toEqual(1);
    expect(elementLi.hasClass('active')).toEqual(true);
  });
});

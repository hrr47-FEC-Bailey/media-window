import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../component/App.jsx';

describe('App', () => {
  it('should render correctly', () => {
    const component = shallow(<App/>);
    expect(component).toMatchSnapshot();
  })
})


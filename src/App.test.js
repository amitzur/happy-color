import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe("setColorInStorage", () => {
  it('saves the correct value and key', () => {
    const app = shallow(<App/>).instance();
    app.setColorInStorage("left", "blue");
    app.setColorInStorage("right", "red");

    expect(localStorage.getItem("color-left")).toBe("blue");
    expect(localStorage.getItem("color-right")).toBe("red");
  });
});

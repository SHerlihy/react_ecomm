import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, storeFactory } from "../testUtils";
import { Provider } from "react-redux";
import Footer from "./Footer.js";

const setup = () => {
  return shallow(<Footer />);
};

describe("renders", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  test("should ", () => {
    const footerText = findByTestAttr(wrapper, "copyright");
    expect(footerText.length).toBe(1);
  });
});

import React from "react";
import { mount } from "enzyme";
import { findByTestAttr, storeFactory } from "../../testUtils";
import { Provider } from "react-redux";
import HomeScreen from "./index.js";
import * as redux from "react-redux";

const useSelectorSpy = jest.spyOn(redux, "useSelector");
const useDispatchSpy = jest.spyOn(redux, "useDispatch");
const mockDispatchFn = jest.fn();

const setup = (match) => {
  return mount(<HomeScreen match={match} />);
};

describe("renders loading conditional content, no match.params ", () => {
  let wrapper;
  beforeEach(() => {
    useSelectorSpy.mockReturnValue({
      loading: true,
      error: false,
      products: [],
    });
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    wrapper = setup({ params: {} });
  });

  afterEach(() => {
    useDispatchSpy.mockClear();
    useSelectorSpy.mockClear();
  });

  test("should dispatch on render, props keyword and pageNumber updates", () => {
    expect(mockDispatchFn).toHaveBeenCalled();

    wrapper.setProps({ params: { keyword: "pc" } });

    expect(mockDispatchFn).toHaveBeenCalled();

    wrapper.setProps({ params: { pageNumber: 2 } });

    expect(mockDispatchFn).toHaveBeenCalled();
  });
});

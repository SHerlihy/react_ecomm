import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../testUtils";
import CartScreen from "./index.js";
import * as redux from "react-redux";

const useSelectorSpy = jest.spyOn(redux, "useSelector");
const useDispatchSpy = jest.spyOn(redux, "useDispatch");
const mockDispatchFn = jest.fn();

const setup = (match, location, history) => {
  return shallow(
    <CartScreen match={match} location={location} history={history} />
  );
};

describe("renders correct conditional data with empty cart", () => {
  let wrapper;
  beforeEach(() => {
    useSelectorSpy.mockReturnValue({
      cartItems: [],
    });
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    wrapper = setup({ params: {} }, { search: "" });
  });

  afterEach(() => {
    useDispatchSpy.mockClear();
    useSelectorSpy.mockClear();
  });

  test("should render empty Message component", () => {
    const emptyMessageComponent = findByTestAttr(
      wrapper,
      "empty-message-component"
    );
    expect(emptyMessageComponent.length).toBe(1);
  });

  test("should render 0 quantity and 0 price", () => {
    const totalQuantity = findByTestAttr(wrapper, "total-quantity");
    expect(totalQuantity.text()).toContain("(0) items");
    const subtotal = findByTestAttr(wrapper, "subtotal");
    expect(subtotal.text()).toContain("$0.00");
    const proceedButtonComponent = findByTestAttr(
      wrapper,
      "proceed-button-component"
    );
    expect(proceedButtonComponent.props()["disabled"]).toBe(true);
  });
});

describe("renders correct conditional data with empty cart", () => {
  let wrapper;
  beforeEach(() => {
    useSelectorSpy.mockReturnValue({
      cartItems: [
        { product: 1, qty: 1, price: 1.1 },
        { product: 2, qty: 2, price: 1.2 },
        { product: 3, qty: 3, price: 1.3 },
      ],
    });
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    wrapper = setup({ params: {} }, { search: "" });
  });

  afterEach(() => {
    useDispatchSpy.mockClear();
    useSelectorSpy.mockClear();
  });

  test("should render cart item component x3", () => {
    const cartItemComponent = findByTestAttr(wrapper, "cart-item-component");
    expect(cartItemComponent.at(0).key()).toBe("1");
    expect(cartItemComponent.at(2).key()).toBe("3");
  });

  test("should render 6 quantity and 7.40 price", () => {
    const totalQuantity = findByTestAttr(wrapper, "total-quantity");
    expect(totalQuantity.text()).toContain("(6) items");
    const subtotal = findByTestAttr(wrapper, "subtotal");
    expect(subtotal.text()).toContain("$7.40");
    const proceedButtonComponent = findByTestAttr(
      wrapper,
      "proceed-button-component"
    );
    expect(proceedButtonComponent.props()["disabled"]).toBe(false);
  });
});

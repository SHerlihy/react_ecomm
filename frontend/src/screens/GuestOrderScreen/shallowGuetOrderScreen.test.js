import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../testUtils";
import PlaceOrderScreen from "./index.js";
import * as redux from "react-redux";

const useSelectorSpy = jest.spyOn(redux, "useSelector");
const useDispatchSpy = jest.spyOn(redux, "useDispatch");
const generalMockFunction = jest.fn();

const setup = (history) => {
  return shallow(<PlaceOrderScreen history={history} />);
};

describe("renders correct conditional data with empty cart", () => {
  let wrapper;
  beforeEach(() => {
    useSelectorSpy.mockReturnValue({
      shippingAddress: {
        address: 10,
        city: "city",
        postalCode: "AA11 1AA",
        country: "england",
      },
      paymentMethod: "PayPal",
      cartItems: [],
      order: [],
      success: false,
      error: false,
    });
    useDispatchSpy.mockReturnValue(generalMockFunction);
    wrapper = setup({ push: generalMockFunction });
  });

  afterEach(() => {
    useDispatchSpy.mockClear();
    useSelectorSpy.mockClear();
  });

  test("should render shipping address", () => {
    const shippingAddress = findByTestAttr(wrapper, "shipping-address");
    expect(shippingAddress.text()).toContain(
      "10",
      "city",
      "AA11 1AA",
      "england"
    );
  });

  test("should render payment method", () => {
    const paymentMethod = findByTestAttr(wrapper, "payment-method");
    expect(paymentMethod.text()).toContain("PayPal");
  });

  test("should render empty cart message", () => {
    const emptyCartMessage = findByTestAttr(wrapper, "empty-cart-message");
    expect(emptyCartMessage.length).toBe(1);
  });

  test("should render 0 for totals", () => {
    const totalItems = findByTestAttr(wrapper, "total-items");
    expect(totalItems.text()).toContain("0.00");
    const totalShipping = findByTestAttr(wrapper, "total-shipping");
    expect(totalShipping.text()).toContain("0.00");
    const totalTax = findByTestAttr(wrapper, "total-tax");
    expect(totalTax.text()).toContain("0.00");
    const totalTotal = findByTestAttr(wrapper, "total-total");
    expect(totalTotal.text()).toContain("0.00");
  });

  test("should render disabled order button", () => {
    const buttonPlaceOrder = findByTestAttr(wrapper, "button-place-order");
    expect(buttonPlaceOrder.props()["disabled"]).toBe(true);
  });
});

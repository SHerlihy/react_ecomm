import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, storeFactory } from "../../testUtils";
import { Provider } from "react-redux";
import HomeScreen from "./index.js";
import * as redux from "react-redux";

const useSelectorSpy = jest.spyOn(redux, "useSelector");
const useDispatchSpy = jest.spyOn(redux, "useDispatch");
const mockDispatchFn = jest.fn();

const setup = (match) => {
  return shallow(<HomeScreen match={match} />);
};

// test("should dispatch on render", () => {
//   expect(mockDispatchFn).toHaveBeenCalled();
// });

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

  test("should render Loader component", () => {
    const loaderComponent = findByTestAttr(wrapper, "loader-component");
    expect(loaderComponent.length).toBe(1);
  });

  test("should render carousel", () => {
    const carouselComponent = findByTestAttr(wrapper, "carousel-component");
    expect(carouselComponent.length).toBe(1);
  });

  test("should render h1", () => {
    const homeTitle = findByTestAttr(wrapper, "title");
    expect(homeTitle.length).toBe(1);
  });
});

describe("renders error component", () => {
  let wrapper;
  beforeEach(() => {
    useSelectorSpy.mockReturnValue({
      loading: false,
      error: true,
      products: [],
    });
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    wrapper = setup({ params: {} });
  });

  afterEach(() => {
    useDispatchSpy.mockClear();
    useSelectorSpy.mockClear();
  });

  test("should render error component", () => {
    const errorComponent = findByTestAttr(wrapper, "error-component");
    expect(errorComponent.length).toBe(1);
  });
});

describe("renders conditional content for product search with multi page results", () => {
  let wrapper;
  beforeEach(() => {
    useSelectorSpy.mockReturnValue({
      loading: false,
      error: false,
      products: [{}, {}, {}],
      page: 1,
      pages: 1,
    });
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    wrapper = setup({ params: { keyword: "apple", pageNumber: 1 } });
  });

  afterEach(() => {
    useDispatchSpy.mockClear();
    useSelectorSpy.mockClear();
  });

  test("should render return Link", () => {
    const returnLinkComponent = findByTestAttr(
      wrapper,
      "return-link-component"
    );
    expect(returnLinkComponent.length).toBe(1);
  });

  test("should render product component x3", () => {
    const productComponent = findByTestAttr(wrapper, "product-component");
    expect(productComponent.length).toBe(3);
  });

  test("should render paginate component", () => {
    const paginateComponent = findByTestAttr(wrapper, "paginate-component");
    expect(paginateComponent.length).toBe(1);
  });
});

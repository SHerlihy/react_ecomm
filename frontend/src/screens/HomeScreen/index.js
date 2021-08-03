import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Product from "../../components/Product";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginate";
import ProductCarousel from "../../components/ProductCarousel";
import Meta from "../../components/Meta";
import { listProducts } from "../../actions/productActions";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {keyword && (
        <Link
          data-test="return-link-component"
          to="/"
          className="btn btn-light"
        >
          Go Back
        </Link>
      )}
      {keyword || <ProductCarousel data-test="carousel-component" />}
      <h1 data-test="title">Latest Products</h1>
      {loading && <Loader data-test="loader-component" />}
      {error && (
        <Message data-test="error-component" variant="danger">
          {error}
        </Message>
      )}
      {loading || error || (
        <>
          <Row>
            {products.map((product) => (
              <Col key={`Col${product._id}`} sm={12} md={6} lg={4} xl={3}>
                <Product
                  data-test="product-component"
                  key={product._id}
                  product={product}
                />
              </Col>
            ))}
          </Row>
          <Paginate
            data-test="paginate-component"
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;

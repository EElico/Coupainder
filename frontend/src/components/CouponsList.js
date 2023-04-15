import React, { useState, useEffect } from "react";
import CouponDataService from "../services/CouponService";
import { Link } from "react-router-dom";

const CouponsList = () => {
  const [coupons, setCoupons] = useState([]);
  const [currentCoupon, setCurrentCoupon] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveCoupons();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveCoupons = () => {
    CouponDataService.getAll()
      .then(response => {
        setCoupons(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveCoupons();
    setCurrentCoupon(null);
    setCurrentIndex(-1);
  };

  const setActiveCoupon = (coupon, index) => {
    setCurrentCoupon(coupon);
    setCurrentIndex(index);
  };

  const removeAllCoupons = () => {
    CouponDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    CouponDataService.findByTitle(searchTitle)
      .then(response => {
        setCoupons(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Coupons List</h4>

        <ul className="list-group">
          {coupons &&
            coupons.map((coupon, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCoupon(coupon, index)}
                key={index}
              >
                {coupon.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllCoupons}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentCoupon ? (
          <div>
            <h4>Coupon</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentCoupon.title}
            </div>
                  
            <div> 
              <label>
                <strong>Amount:</strong>
              </label>{" "}
              {currentCoupon.amount}{" "} <span className="ILS"> ₪</span>
            </div>

            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentCoupon.published ? "Valid" : "Expired"}
            </div>

            <div>
              <label>
                <strong>Note:</strong>
              </label>{" "}
              {currentCoupon.description} 
            </div> 

            <Link
              to={"/coupons/" + currentCoupon.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Coupon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponsList;

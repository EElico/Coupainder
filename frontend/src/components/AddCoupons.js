import React, { useState } from "react";
import CouponDataService from "../services/CouponService";

const AddCoupons = () => {
  const initialCouponState = {
    id: null,
    title: "",
    description: "",
    code: "",
    coupuser: localStorage.getItem("userID"),  
    amount: null,
    published: true
  };
  const [coupon, setCoupon] = useState(initialCouponState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCoupon({ ...coupon, [name]: value });
  };

  const saveCoupon = (event) => {
    event.preventDefault();
    var data = {
      title: coupon.title,
      description: coupon.description,
      code: coupon.code,
      coupuser: coupon.coupuser,
      amount: coupon.amount
    };

    CouponDataService.create(data)
      .then(response => {
        setCoupon({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          code: response.data.code,
          coupuser: response.data.coupuser,
          amount: response.data.amount,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newCoupon = () => {
    setCoupon(initialCouponState);
    setSubmitted(false);
  };

  return (
    <form onSubmit={saveCoupon} className="submit-form">
      {submitted ? (
        <div>
          <h4>Coupon submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCoupon}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={coupon.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Coupon Code</label>
            <input
              type="text"
              className="form-control"
              id="code"
              required
              value={coupon.code}
              onChange={handleInputChange}
              name="code"
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              // type="range"
              // min="0" max="50"
              type="number"
              className="form-control"
              id="amount"
              required
              Value={coupon.amount}
              onChange={handleInputChange}
              name="amount"
            />
          </div> 
          <div className="form-group">  
            <label htmlFor="description">Note</label>  
            <textarea  
              //  "Note" equal to "description"
              type="text"
              className="form-control"
              id="description"
              //required
              value={coupon.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </form>
  );
};

export default AddCoupons;

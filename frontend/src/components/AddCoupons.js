import React, { useState } from "react";
import CouponDataService from "../services/CouponService";

const AddCoupons = () => {
  const initialCouponState = {
    id: null,
    title: "",
    description: "",
    amount: null,// we can init it with null
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
      amount: coupon.amount
    };

    CouponDataService.create(data)
      .then(response => {
        setCoupon({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
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
          <h4>You submitted successfully!</h4>
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
            <label htmlFor="amount">Amount</label>
            <input
              // type="range"
              // min="0" max="50"
              type="float"
              className="form-control"
              id="amount"
              required
              defaultValue={coupon.amount}
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
              required
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

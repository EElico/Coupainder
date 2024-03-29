import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import CouponDataService from "../services/CouponService";
import Swal from 'sweetalert2';


const Coupon = props => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialCouponState = {
    id: null,
    title: "",
    description: "",
    code: "",
    coupuser: "", 
    amount: 0,
    published: true
  };
  const [currentCoupon, setCurrentCoupon] = useState(initialCouponState);
  const [message, setMessage] = useState("");

  const getCoupon = id => {
    CouponDataService.get(id)
      .then(response => {
        setCurrentCoupon(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getCoupon(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentCoupon({ ...currentCoupon, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentCoupon.id,
      title: currentCoupon.title,
      description: currentCoupon.description,
      code: currentCoupon.code,
      coupuser:currentCoupon.coupuser,
      amount: currentCoupon.amount,
      published: status
    };

    CouponDataService.update(currentCoupon.id, data)
      .then(response => {
        setCurrentCoupon({ ...currentCoupon, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateCoupon = () => {
    CouponDataService.update(currentCoupon.id, currentCoupon)
      .then(response => {
        console.log(response.data);
        setMessage("The coupon was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };


  function confirmAndRemoveCoupons() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCoupon();
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }


  const deleteCoupon = () => {
    CouponDataService.remove(currentCoupon.id)
      .then(response => {
        console.log(response.data);
        navigate("/coupons");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCoupon ? (
        <div className="edit-form">
          <h4>Coupon</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                name="title"
                value={currentCoupon.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Coupon Code</label>
              <input
                type="text"
                className="form-control"
                id="code"
                required
                name="code"
                value={currentCoupon.code}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                className="form-control"
                id="amount"
                required
                name="amount"
                value={currentCoupon.amount}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Note</label>
              <textarea
                  //  "Note" equal to "description"
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentCoupon.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentCoupon.published ? "Valid" : "Expired"}
            </div>
          </form>

          {currentCoupon.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              Valid
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={confirmAndRemoveCoupons}>
            Delete
          </button>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateCoupon}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Coupon...</p>
        </div>
      )}
    </div>
  );
};

export default Coupon;

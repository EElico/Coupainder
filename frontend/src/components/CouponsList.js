import React, { useState, useEffect } from "react";
import CouponDataService from "../services/CouponService";
import { Link } from "react-router-dom";
import Barcode from 'react-barcode';
import Swal from 'sweetalert2';


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
    CouponDataService.getAll({userid:localStorage.getItem("userID")})
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

  function confirmAndRemoveAllCoupons() {
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
        removeAllCoupons();
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

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
          className="m-3 btn btn-sm btn-danger "
          onClick={confirmAndRemoveAllCoupons}>
          Remove All Coupones
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
                <strong>Coupon Code:</strong>
              </label>{" "}
              {currentCoupon.code}
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

            <div className="Barcode"> 
            {/* https://www.npmjs.com/package/react-barcode */}

            <Barcode value={currentCoupon.code} lineColor={"#42438f"} background={"#e8ecec"} height={75} width={2} textMargin={10} />,
            </div>


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

import http from "../http-common";

const getAll = (data) => {
  return http.post("/coupons/getall",data);
};

const get = id => {
  return http.get(`/coupons/${id}`);
};

const create = data => {
  return http.post("/coupons", data);
};

const update = (id, data) => {
  return http.put(`/coupons/${id}`, data);
};

const remove = id => {
  return http.delete(`/coupons/${id}`);
};

const removeAll = () => {
  return http.delete(`/coupons`);
};

const findByTitle = title => {
  return http.post(`/coupons/getall?title=${title}`,{userid:localStorage.getItem("userID")});
};

const CouponService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default CouponService;

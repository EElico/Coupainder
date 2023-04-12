module.exports = (sequelize, Sequelize) => {
  const Coupon = sequelize.define("coupon", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Coupon;
};

module.exports = (sequelize, Sequelize) => {
  const Coupon = sequelize.define("coupon", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    code: {
      type: Sequelize.STRING
    },
    coupuser: {
      type: Sequelize.STRING
    },
    
    amount: {
      type: Sequelize.FLOAT
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Coupon;
};

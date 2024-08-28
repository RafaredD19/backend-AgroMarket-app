let user = {};

const setUser = (userData) => {
  user = { ...userData };
};

const getUser = () => {
  return user;
};

module.exports = { setUser, getUser };

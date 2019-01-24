module.exports = function asyncMiddleware(handler) {
  return async (res, req, next) => {
    try {
      await handler(res, req);
    } catch (error) {
      next(error);
    }
  };
};

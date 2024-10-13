export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    status: 404,
    messga: 'Route not found',
  });
};

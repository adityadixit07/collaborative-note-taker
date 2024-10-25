export const customErrror = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    res.status(400).json({
      success: false,
      error: message,
    });
  } else if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    res.status(404).json({
      success: false,
      error: message,
    });
  } else {
    res.status(500).json({
      success: false,
      error: `Server Error`,
    });
  }
};

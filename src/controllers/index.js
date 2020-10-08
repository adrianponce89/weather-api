module.exports = {
  location: (req, res, next) => {
    res.status(200).json({ status: "ok" });
  },
  current: (req, res, next) => {
    const { city } = req.params;
    res.status(200).json({ status: "ok", city });
  },
  forecast: (req, res, next) => {
    const { city } = req.params;
    res.status(200).json({ status: "ok", city });
  },
};

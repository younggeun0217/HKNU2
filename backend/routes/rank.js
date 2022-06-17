const express = require("express");
const router = express.Router();
const Record = require("../schema/record.js");
function delDays(days) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - days);
  return date;
}
router.get("/day", async function (req, res) {
  const ret = await Record.aggregate()
    .match({
      date: { $gte: delDays(0) },
    })
    .group({ _id: "$searchTitle", count: { $sum: "$count" } })
    .sort({ count: -1 });
  res.json(ret);
});
router.get("/week", async function (req, res) {
  const ret = await Record.aggregate()
    .match({
      date: { $gte: delDays(6) },
    })
    .group({ _id: "$searchTitle", count: { $sum: "$count" } })
    .sort({ count: -1 });
  res.json(ret);
});
router.get("/year", async function (req, res) {
  const ret = await Record.aggregate()
    .match({
      date: { $gte: delDays(364) },
    })
    .group({ _id: "$searchTitle", count: { $sum: "$count" } })
    .sort({ count: -1 });
  res.json(ret);
});
module.exports = router;

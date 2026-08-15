const db = require("../config/db");

// ==============================
// DONOR DASHBOARD
// ==============================

const getDonorDashboard = (req, res) => {
  const donorId = req.user.id;

  const dashboard = {};

  db.query(
    "SELECT COUNT(*) AS totalFoods FROM foods WHERE donor_id = ?",
    [donorId],
    (err, result1) => {
      if (err) return res.status(500).json(err);

      dashboard.totalFoods = result1[0].totalFoods;

      db.query(
        `SELECT COUNT(*) AS pendingRequests
         FROM food_requests fr
         JOIN foods f
         ON fr.food_id = f.id
         WHERE f.donor_id = ?
         AND fr.status='pending'`,
        [donorId],
        (err, result2) => {
          if (err) return res.status(500).json(err);

          dashboard.pendingRequests =
            result2[0].pendingRequests;

          db.query(
            `SELECT COUNT(*) AS collected
             FROM foods
             WHERE donor_id = ?
             AND status='collected'`,
            [donorId],
            (err, result3) => {
              if (err) return res.status(500).json(err);

              dashboard.collected =
                result3[0].collected;

              db.query(
                `SELECT id,name,quantity,status,area
                 FROM foods
                 WHERE donor_id=?
                 ORDER BY created_at DESC
                 LIMIT 5`,
                [donorId],
                (err, result4) => {
                  if (err)
                    return res.status(500).json(err);

                  dashboard.recentFoods = result4;

                  res.json(dashboard);
                }
              );
            }
          );
        }
      );
    }
  );
};

// ==============================
// NGO DASHBOARD
// ==============================

const getNGODashboard = (req, res) => {
  const ngoId = req.user.id;

  const dashboard = {};

  db.query(
    "SELECT COUNT(*) AS totalRequests FROM food_requests WHERE ngo_id=?",
    [ngoId],
    (err, result1) => {
      if (err) return res.status(500).json(err);

      dashboard.totalRequests = result1[0].totalRequests;

      db.query(
        "SELECT COUNT(*) AS accepted FROM food_requests WHERE ngo_id=? AND status='accepted'",
        [ngoId],
        (err, result2) => {
          if (err) return res.status(500).json(err);

          dashboard.accepted =
            result2[0].accepted;

          db.query(
            "SELECT COUNT(*) AS pending FROM food_requests WHERE ngo_id=? AND status='pending'",
            [ngoId],
            (err, result3) => {
              if (err) return res.status(500).json(err);

              dashboard.pending =
                result3[0].pending;

              db.query(
                "SELECT COUNT(*) AS rejected FROM food_requests WHERE ngo_id=? AND status='rejected'",
                [ngoId],
                (err, result4) => {
                  if (err)
                    return res.status(500).json(err);

                  dashboard.rejected =
                    result4[0].rejected;

                  db.query(
                    `SELECT
                      fr.id,
                      fr.status,
                      f.name,
                      f.area
                    FROM food_requests fr
                    JOIN foods f
                    ON fr.food_id=f.id
                    WHERE fr.ngo_id=?
                    ORDER BY fr.created_at DESC
                    LIMIT 5`,
                    [ngoId],
                    (err, result5) => {
                      if (err)
                        return res.status(500).json(err);

                      dashboard.recentRequests =
                        result5;

                      res.json(dashboard);
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
};

module.exports = {
  getDonorDashboard,
  getNGODashboard,
};
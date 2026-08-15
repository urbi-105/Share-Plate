const db = require("../config/db");

const getAdminDashboard = (req, res) => {

  const dashboard = {};

  db.query(
    "SELECT COUNT(*) AS totalUsers FROM users",
    (err, usersResult) => {

      if (err) return res.status(500).json(err);

      dashboard.totalUsers =
        usersResult[0].totalUsers;

      db.query(
        "SELECT COUNT(*) AS totalDonors FROM users WHERE role='donor'",
        (err, donorResult) => {

          if (err) return res.status(500).json(err);

          dashboard.totalDonors =
            donorResult[0].totalDonors;

          db.query(
            "SELECT COUNT(*) AS totalNGOs FROM users WHERE role='ngo'",
            (err, ngoResult) => {

              if (err) return res.status(500).json(err);

              dashboard.totalNGOs =
                ngoResult[0].totalNGOs;

              db.query(
                "SELECT COUNT(*) AS totalFoods FROM foods",
                (err, foodResult) => {

                  if (err) return res.status(500).json(err);

                  dashboard.totalFoods =
                    foodResult[0].totalFoods;

                  db.query(
                    "SELECT COUNT(*) AS totalRequests FROM food_requests",
                    (err, requestResult) => {

                      if (err)
                        return res.status(500).json(err);

                      dashboard.totalRequests =
                        requestResult[0].totalRequests;

                      db.query(
                        `
                        SELECT
                        id,
                        full_name,
                        email,
                        role,
                        created_at

                        FROM users

                        ORDER BY created_at DESC
                        `,
                        (err, userList) => {

                          if (err)
                            return res.status(500).json(err);

                          dashboard.users =
                            userList;

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

    }
  );

};

const deleteUser = (req, res) => {
  const userId = req.params.id;

  if (req.user.id == userId) {
    return res.status(400).json({
      success: false,
      message: "You cannot delete your own account.",
    });
  }

  db.query(
    "DELETE FROM users WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          message: "Failed to delete user.",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      res.json({
        success: true,
        message: "User deleted successfully.",
      });
    }
  );
};

module.exports = {
  getAdminDashboard,
  deleteUser,
};
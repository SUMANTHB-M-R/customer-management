
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    setShowLogoutDialog(false);
    navigate("/login", { replace: true });
  }

  return (
    <>
      <header>
        <h2>Customer Management</h2>

        <button onClick={() => setShowLogoutDialog(true)}>
          Logout
        </button>
      </header>

      {showLogoutDialog && (
        <div className="dialog-overlay">
          <div className="confirm-dialog">
            <h3>Confirm Logout</h3>

            <p>Are you sure you want to log out?</p>

            <div className="dialog-actions">
              <button
                className="delete-button"
                onClick={handleLogout}
              >
                Yes, Logout
              </button>

              <button
                className="cancel-button"
                onClick={() => setShowLogoutDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;

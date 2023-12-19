import React from "react";
import { Link } from "react-router-dom";

export default function DashboardUser() {
  return (
    <>
      <div>
        <div
          className="dashboard-box"
          style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link
            to={`/login/${1}`}
            style={{
              padding: "30px",
              background: "darkgreen",
              borderRadius: "12px",
              textDecoration: "none",
              color: "white",
              fontWeight: 600,
            }}
          >
            Room 1
          </Link>
          <Link
            to={`/login/${2}`}
            style={{
              padding: "30px",
              background: "darkgreen",
              borderRadius: "12px",
              textDecoration: "none",
              color: "white",
              fontWeight: 600,
            }}
          >
            Room 2
          </Link>
          <Link
            to={`/login/${3}`}
            style={{
              padding: "30px",
              background: "darkgreen",
              borderRadius: "12px",
              textDecoration: "none",
              color: "white",
              fontWeight: 600,
            }}
          >
            Room 3
          </Link>
          <Link
            to={`/login/${4}`}
            style={{
              padding: "30px",
              background: "darkgreen",
              borderRadius: "12px",
              textDecoration: "none",
              color: "white",
              fontWeight: 600,
            }}
          >
            Room 4
          </Link>
          <Link
            to={`/login/${5}`}
            style={{
              padding: "30px",
              background: "darkgreen",
              borderRadius: "12px",
              textDecoration: "none",
              color: "white",
              fontWeight: 600,
            }}
          >
            Room 5
          </Link>
          <Link
            to={`/login/${6}`}
            style={{
              padding: "30px",
              background: "darkgreen",
              borderRadius: "12px",
              textDecoration: "none",
              color: "white",
              fontWeight: 600,
            }}
          >
            Room 6
          </Link>
        </div>
      </div>
    </>
  );
}

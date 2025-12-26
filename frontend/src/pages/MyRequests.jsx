import { useEffect, useState } from "react";
import API from "../services/api";

const MyRequests = () => {
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);

  useEffect(() => {
    API.get("/exchanges/sent").then((res) => setSent(res.data));
    API.get("/exchanges/received").then((res) => setReceived(res.data));
  }, []);

  return (
    <div className="container">
      <h2>My Requests</h2>

      <div className="card">
        <h3>Requests I Sent</h3>
        {sent.length === 0 && <p>No sent requests</p>}

        {sent.map((r) => (
          <p key={r._id}>
            To <strong>{r.responder.name}</strong> — {r.status}
          </p>
        ))}
      </div>

      <div className="card">
        <h3>Requests I Received</h3>

        {received.length === 0 && <p>No received requests</p>}

        {received.map((r) => (
          <div key={r._id} style={{ marginBottom: 10 }}>
            <p>
              From <strong>{r.requester.name}</strong> —{" "}
             <span
                style={{
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: "bold",
                color: "white",
                background:
                  r.status === "Accepted"
                  ? "#16a34a"
                  : r.status === "Rejected"
                  ? "#dc2626"
                  : "#ca8a04",
                }}
                >
               {r.status}
             </span>

            </p>

            {r.status === "Requested" && (
              <div style={{ marginTop: 8 }}>
                <button
                   style={{ marginRight: 10 }}
                   onClick={async () => {
                   await API.put(`/exchanges/${r._id}/accept`);
                   window.location.reload();
                  }}
                >
                   Accept
                </button>

                <button
                  style={{ background: "#dc2626" }}
                  onClick={async () => {
                     await API.put(`/exchanges/${r._id}/reject`);
                     window.location.reload();
                   }}
                 >
                     Reject
                 </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRequests;

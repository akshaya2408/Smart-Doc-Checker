import React from "react";

export default function Report({ result }) {
  if (!result) {
    return null;
  }

  return (
    <div style={{marginTop:18}}>
      <h3>Conflicts Detected</h3>

      {result.conflicts.length === 0 ? (
        <div className="no-conflicts">No conflicts found — your documents look consistent 🎉</div>
      ) : (
        <ul className="conflict-list" style={{marginTop:10}}>
          {result.conflicts.map((c, idx) => (
            <li className="conflict" key={idx}>{c.message}</li>
          ))}
        </ul>
      )}

      <div className="external-update" style={{marginTop:12}}>
        <strong>External update:</strong> {result.external_update || "No external updates"}
      </div>

      <a className="download" href="http://localhost:8000/report.pdf" download="report.pdf">⬇ Download PDF Report</a>
    </div>
  );
}

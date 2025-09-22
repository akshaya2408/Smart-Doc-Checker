import React from "react";
import UploadForm from "./UploadForm";
import "./styles.css";
import "./index.css";

function App() {
  return (
    <div className="app-shell">
      <div className="header">
        <div className="logo">DC</div>
        <div>
          <div className="title">Smart Doc Checker Agent</div>
          <div className="subtitle">Upload docs, find contradictions, and get clear fixes</div>
        </div>
      </div>

      <div className="main-grid">
        <div className="card">
          <UploadForm />
        </div>

        <aside className="card stats">
          <div className="stat">
            <div>
              <div className="label">Docs Analyzed</div>
              <div className="value" id="stat-docs">0</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div className="label">Reports</div>
              <div className="value" id="stat-reports">0</div>
            </div>
          </div>

          <div className="stat">
            <div>
              <div className="label">Total Bill</div>
              <div className="value" id="stat-bill">$0</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div className="label">Last Update</div>
              <div className="value" id="stat-update">—</div>
            </div>
          </div>

          <div style={{marginTop:12}}>
            <div className="helper">Quick actions</div>
            <div style={{marginTop:8, display:"flex", gap:8}}>
              <button className="btn-ghost" onClick={() => window.location.reload()}>Reset</button>
              <a className="btn-ghost" href="http://localhost:8000/docs" target="_blank" rel="noreferrer">API Docs</a>
            </div>
          </div>
        </aside>
      </div>

      <div className="footer">Built for HackWithHyderabad · Smart Doc Checker</div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import Report from "./Report";
import { analyzeDocs } from "./api";

export default function UploadForm() {
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFilesChange = (e) => {
    const list = Array.from(e.target.files);
    setFiles(list);
  };

  const handleUpload = async () => {
    if (!files.length) {
      alert("Please select at least one file.");
      return;
    }
    setLoading(true);
    try {
      const res = await analyzeDocs(files);
      setResult(res);
      // update right-side stats via DOM (simple approach)
      document.getElementById("stat-docs").innerText = res.usage.docs_analyzed;
      document.getElementById("stat-reports").innerText = res.usage.reports_generated;
      document.getElementById("stat-bill").innerText = `$${res.usage.bill}`;
      document.getElementById("stat-update").innerText = new Date().toLocaleTimeString();
    } catch (err) {
      console.error(err);
      alert("Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
        <div>
          <h2 style={{fontSize:18, fontWeight:700}}>Upload Documents</h2>
          <div className="helper">Upload 2–3 files (PDF / DOCX / TXT) to scan for contradictions.</div>
        </div>
      </div>

      <div className="file-input">
        <input type="file" multiple onChange={onFilesChange} />
      </div>
      <div className="selected-files">
        {files.map((f, i) => <div className="file-pill" key={i}>{f.name}</div>)}
      </div>

      <div style={{marginTop:14, display:"flex", gap:10}}>
        <button className="btn" onClick={handleUpload} disabled={loading}>
          {loading ? "Analyzing…" : "Analyze Documents"}
        </button>
        <button className="btn-ghost" onClick={() => { setFiles([]); setResult(null); }}>
          Clear
        </button>
      </div>

      <div className="report">
        <Report result={result} />
      </div>
    </div>
  );
}

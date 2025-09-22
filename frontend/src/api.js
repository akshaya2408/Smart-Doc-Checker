export async function analyzeDocs(files) {
  const formData = new FormData();
  files.forEach(f => formData.append('files', f));
  const res = await fetch('http://localhost:8000/analyze/', {
    method: 'POST',
    body: formData
  });
  if (!res.ok) throw new Error("Server responded with " + res.status);
  return res.json();
}


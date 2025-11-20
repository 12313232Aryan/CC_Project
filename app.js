// ===============================
// API FUNCTIONS (FINAL VERSION)
// ===============================

// 1. BASE URL
export const API_BASE = "https://r4pv8cacw7.execute-api.us-east-1.amazonaws.com/gvjjhhj";


// --------------------------------------------------
// 1. GET Upload URL
// --------------------------------------------------
export async function getUploadUrl(ext, contentType) {
    console.log("Calling getUploadUrl...");

    const res = await fetch(`${API_BASE}/getUploadUrl`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ext, contentType })
    });

    const data = await res.json();
    console.log("getUploadUrl response:", data);

    if (!res.ok) throw new Error("Failed to get upload URL");
    return data;
}


// --------------------------------------------------
// 2. SUBMIT Report
// --------------------------------------------------
export async function submitReport(data) {
    console.log("Submitting report:", data);

    const res = await fetch(`${API_BASE}/submitReport`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const body = await res.json();
    console.log("submitReport response:", body);

    if (!res.ok) throw new Error("Failed to submit report");

    return body;
}


// --------------------------------------------------
// 3. GET Reports
// --------------------------------------------------
export async function getReports() {
    const res = await fetch(`${API_BASE}/getReports`);
    return res.json();
}


// --------------------------------------------------
// 4. CONTACT
// --------------------------------------------------
export async function submitContact(data) {
    const res = await fetch(`${API_BASE}/contactSubmit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    return res.json();
}


// --------------------------------------------------
// 5. VISIT Counter
// --------------------------------------------------
export async function visitCounter() {
    const res = await fetch(`${API_BASE}/visitCounter`);
    return res.json();
}

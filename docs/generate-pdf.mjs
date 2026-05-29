import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const dir = dirname(fileURLToPath(import.meta.url));
const md = readFileSync(join(dir, "CURRENT_STATE_REPORT.md"), "utf8");

function mdToHtml(text) {
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/^---$/gm, "<hr/>");

  html = html.replace(/^\|(.+)\|$/gm, (line) => {
    const cells = line.split("|").filter((c) => c.trim() !== "");
    if (cells.every((c) => /^[\s\-:]+$/.test(c))) return "";
    const tag = line.includes("---") ? null : "td";
    if (!tag) return "";
    return `<tr>${cells.map((c) => `<td>${c.trim()}</td>`).join("")}</tr>`;
  });

  const lines = html.split("\n");
  let out = [];
  let inTable = false;
  let inUl = false;

  for (const line of lines) {
    if (line.startsWith("<tr>")) {
      if (!inTable) {
        out.push("<table>");
        inTable = true;
      }
      out.push(line);
      continue;
    } else if (inTable) {
      out.push("</table>");
      inTable = false;
    }

    if (line.startsWith("- ")) {
      if (!inUl) {
        out.push("<ul>");
        inUl = true;
      }
      out.push(`<li>${line.slice(2)}</li>`);
      continue;
    } else if (inUl) {
      out.push("</ul>");
      inUl = false;
    }

    if (line.trim() === "") {
      out.push("");
    } else if (line.startsWith("<h") || line.startsWith("<hr")) {
      out.push(line);
    } else {
      out.push(`<p>${line}</p>`);
    }
  }
  if (inTable) out.push("</table>");
  if (inUl) out.push("</ul>");

  return out.join("\n");
}

const body = mdToHtml(md);

const full = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>GlamBook Mumbai - Buildathon Progress Report</title>
<style>
  @page { margin: 18mm 15mm; size: A4; }
  * { box-sizing: border-box; }
  body {
    font-family: "Segoe UI", system-ui, sans-serif;
    font-size: 10.5pt;
    line-height: 1.45;
    color: #292524;
    max-width: 210mm;
    margin: 0 auto;
    padding: 12mm;
  }
  h1 { color: #be185d; font-size: 20pt; border-bottom: 3px solid #f9a8d4; padding-bottom: 8px; margin-top: 0; }
  h2 { color: #9d174d; font-size: 14pt; margin-top: 22px; page-break-after: avoid; }
  h3 { color: #831843; font-size: 11pt; margin-top: 14px; }
  p { margin: 6px 0; }
  table { width: 100%; border-collapse: collapse; margin: 10px 0 16px; font-size: 9.5pt; }
  th, td { border: 1px solid #fecdd3; padding: 6px 8px; text-align: left; vertical-align: top; }
  tr:nth-child(even) { background: #fff1f2; }
  ul { margin: 8px 0; padding-left: 20px; }
  li { margin: 4px 0; }
  hr { border: none; border-top: 1px solid #fecdd3; margin: 20px 0; }
  .cover {
    text-align: center;
    padding: 40px 20px 30px;
    background: linear-gradient(135deg, #fb7185, #e879f9);
    color: white;
    border-radius: 12px;
    margin-bottom: 24px;
  }
  .cover h1 { color: white; border: none; font-size: 22pt; }
  .cover p { opacity: 0.95; font-size: 11pt; }
  .meta { font-size: 9pt; color: #78716c; margin-bottom: 20px; }
  @media print {
    body { padding: 0; }
    h2 { page-break-before: auto; }
    table { page-break-inside: avoid; }
  }
</style>
</head>
<body>
<div class="cover">
  <h1>SuperXgen AI Startup Buildathon 2026</h1>
  <p><strong>Beauty Salon Marketplace</strong><br/>GlamBook Mumbai — Current State &amp; Progress Report</p>
</div>
<div class="meta">
  <strong>Report Date:</strong> 29 May 2026 &nbsp;|&nbsp;
  <strong>Project:</strong> beauty-salon-marketplace &nbsp;|&nbsp;
  <strong>Status:</strong> Build passing — submission artifacts pending
</div>
${body}
</body>
</html>`;

const htmlPath = join(dir, "CURRENT_STATE_REPORT.html");
writeFileSync(htmlPath, full);
console.log("HTML written:", htmlPath);

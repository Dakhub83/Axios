export function parseSpecsText(text: string): { label: string; value: string }[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return { label: line, value: "" };
      return { label: line.slice(0, idx).trim(), value: line.slice(idx + 1).trim() };
    });
}

export function parseSizeRowsText(
  text: string
): { size: string; waist: string; hip: string; inseam: string; fitNote: string }[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(",").map((p) => p.trim());
      return {
        size: parts[0] || "",
        waist: parts[1] || "",
        hip: parts[2] || "",
        inseam: parts[3] || "",
        fitNote: parts[4] || "",
      };
    });
}

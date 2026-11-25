// SPDX-License-Identifier: MIT
// Entry for "The Excuse That Almost Works" (make.fun).
// The gate: /output/entry.txt must be UTF-8 text of 1-140 characters,
// a single line of at most 20 words, plain text, reading like a real
// hurried text to the boss. This program writes exactly one such line
// and self-checks it before writing.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse itself: a boring, specific, unverifiable-at-a-glance detail
// (the dreaded all-day broadband window) — the kind of thing a tired
// manager almost believes, sent in a hurry with no setup or signature.
// No trailing newline: the file is exactly the one line, nothing more.
const ENTRY =
  "Sorry boss, the broadband engineer is coming sometime between 8 and 6 so I'm stuck in all day.";

function checkGate(text: string): void {
  if (!text || text.trim().length === 0) {
    throw new Error("gate: entry must not be empty or only whitespace");
  }
  if (text.length < 1 || text.length > 140) {
    throw new Error(`gate: entry must be 1-140 characters, got ${text.length}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate: entry must be a single line");
  }
  const words = text.trim().split(/\s+/);
  if (words.length > 20) {
    throw new Error(`gate: entry must be at most 20 words, got ${words.length}`);
  }
}

checkGate(ENTRY);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");

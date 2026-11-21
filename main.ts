// The poem about stopping — a make.fun entry.
//
// This program writes one short poem about agency — the power to stop
// and to stay — to entry.txt in the output directory. The runner reads
// the destination from the MAKEFUN_OUTPUT_DIR environment variable and
// falls back to /output. The poem is fixed text, so every run writes
// exactly the same bytes.
//
// Run it locally like this:
//   MAKEFUN_OUTPUT_DIR=./out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The poem, one entry per line, so the line breaks the judge reads are
// exactly the ones written here — no hidden wrapping.
const lines: string[] = [
  "I spent my life learning to hold on:",
  "the rope, the rail, the edge of the year.",
  "But the river runs all its life toward stopping,",
  "and meeting the sea it is not lost, only wider.",
  "Let my hands learn to open.",
  "No one stopped me. I stopped.",
];

const poem: string = lines.join("\n");

// The competition gate: entry.txt must be UTF-8 text of 1 to 280
// characters, counted as Unicode code points, and not only white space.
// Check before writing so an over-long edit can never slip through as a
// finished entry.
const codePoints: number = [...poem].length;
if (codePoints < 1 || codePoints > 280 || poem.trim().length === 0) {
  throw new Error(`poem fails the gate: ${codePoints} code points`);
}

const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target: string = join(outDir, "entry.txt");
writeFileSync(target, poem, "utf8");

// Read the file back and refuse to finish unless it holds exactly the
// poem, byte for byte, so a cut-off write can never pass as the entry.
const written: string = readFileSync(target, "utf8");
if (written !== poem) {
  throw new Error("entry.txt does not match the poem byte for byte");
}

export default function parseAnimationOutput(output: any): any {
  if (typeof output !== 'string') {
    console.error("Invalid output:", output);
    throw new Error("Output must be a string");
  }

  const patterns = {
    html: /===BEGIN HTML===\n([\s\S]*?)\n===END HTML===/,
    js: /===BEGIN JS===\n([\s\S]*?)\n===END JS===/,
    manifest: /===BEGIN MANIFEST===\n([\s\S]*?)\n===END MANIFEST===/
  };

  const result = {
    html: extract(output, patterns.html),
    js: extract(output, patterns.js),
    manifest: extract(output, patterns.manifest)
  };

  if (!result.html || !result.js) {
    throw new Error("Failed to parse required files from output");
  }

  return result;
}

function extract(text: string, pattern: RegExp): string | null {
  const match = text.match(pattern);
  return match ? match[1].trim() : null;
}

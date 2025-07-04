interface ParsedOutput {
  html: string;
  js: string;
  manifest: string | null;
}

export default function parseAnimationOutput(output: string): ParsedOutput {
  if (typeof output !== 'string') {
    throw new Error("Output must be a string");
  }

  const patterns = {
    html: /(?:```html\n)?===BEGIN HTML===\n([\s\S]*?)\n===END HTML===(?:\n```)?/,
    js: /(?:```javascript\n)?===BEGIN JS===\n([\s\S]*?)\n===END JS===(?:\n```)?/,
    manifest: /(?:```json\n)?===BEGIN MANIFEST===\n([\s\S]*?)\n===END MANIFEST===(?:\n```)?/
  };

  const html = extract(output, patterns.html);
  const js = extract(output, patterns.js);
  const manifest = extract(output, patterns.manifest);

  if (!html || !js) {
    throw new Error("Failed to parse required files from output");
  }

  return {
    html: cleanContent(html),
    js: cleanContent(js),
    manifest: manifest ? cleanContent(manifest) : null
  };
}

function extract(text: string, pattern: RegExp): string | null {
  const match = text.match(pattern);
  return match ? match[1].trim() : null;
}

function cleanContent(content: string): string {
  return content
    .replace(/^```[a-z]*\n/, '')
    .replace(/\n```$/, '')
    .replace(/^\/\/.*$/gm, '')
    .trim();
}
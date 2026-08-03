/**
 * Extracts clean URL or data URL from raw text input, HTML strings, or image tags.
 */
export function extractMediaUrl(input: string): string {
  if (!input) return '';
  const trimmed = input.trim();

  // If it's HTML containing <img ... src="..." />
  const imgMatch = trimmed.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch && imgMatch[1]) {
    return imgMatch[1];
  }

  // If it's HTML containing <a ... href="..." /> or <iframe ... src="..." />
  const srcMatch = trimmed.match(/(?:src|href)=["']([^"']+)["']/i);
  if (srcMatch && srcMatch[1]) {
    return srcMatch[1];
  }

  // If it's a raw URL wrapped in quotes
  const quoteMatch = trimmed.match(/https?:\/\/[^\s"']+/i);
  if (quoteMatch && quoteMatch[0]) {
    return quoteMatch[0];
  }

  return trimmed;
}

/**
 * Reads a local File object and converts it into a Base64 Data URL.
 */
export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Falha ao ler o arquivo como imagem.'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// @ts-ignore - pdf-parse has no default types
import pdf from "pdf-parse";

export async function extractText(buffer: Buffer): Promise<string> {
  const data = await (pdf as any)(buffer);
  return data.text ?? "";
}

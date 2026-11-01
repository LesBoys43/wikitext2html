export function toLines(text: string): string[] {
	return text.split('\n');
}

export function fromLines(lines: string[]): string {
	return lines.join('\n');
}

export function escapeForRegExp(str: string): string {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function longestCommonPrefix(a: string, b: string): string {
	let i = 0;
	while (i < a.length && a[i] === b[i]) i++;
	return a.slice(0, i);
}

export function replaceLines(str: string, startLine: number, endLine: number, replacement: string):
string {
	const lines = str.split('\n');
	lines.splice(startLine, endLine - startLine + 1, replacement);
	return lines.join('\n');
}

import {longestCommonPrefix, replaceLines, toLines} from '../utils';

function isListLine(line: string): boolean {
	return line.startsWith('#') || line.startsWith('*');
}

type Marker = '*' | '#';

const EL_MAP = {'*': 'ul', '#': 'ol'};

function buildHtmlStart(markers: Marker[]): string {
	return markers.map((m) => `<${EL_MAP[m]}>`).join('');
}

function buildHtmlEnd(markers: Marker[]): string {
	return markers.toReversed().map((m) => `</${EL_MAP[m]}>`).join('');
}

enum MarkersDiffResult {
	SAME,
	DEEPER,
	OTHER
}

function diffMarkers(a: Marker[], b: Marker[]): MarkersDiffResult {
	if (a.join('') === b.join('')) return MarkersDiffResult.SAME;
	else if (b.length > a.length) return MarkersDiffResult.DEEPER;
	else return MarkersDiffResult.OTHER;
}

function whatClosed(root: Marker[], curr: Marker[]): Marker[] {
	return root.slice(longestCommonPrefix(root.join(''), curr.join('')).length);
}

function transformSingleList(doc: string[]): string {
	function transformInternal(lines: string[]): {html: string; lastTransformed: number} {
		let html = '';
		const rootLevel = lines[0].match(/^([#*]+)[^#*]+/)![1];
		const rootMarkers = rootLevel.split('') as Marker[];
		html += buildHtmlStart(rootLevel.split('') as Marker[]);
		let skip: number | false = false;
		for (const [i, line] of lines.entries()) {
			if (skip !== false)
				if (skip === i) skip = false;
				else continue;
			const m = line.match(/^([#*]+)([^#*].*$)/)!;
			const level = m[1];
			const markers = level.split('') as Marker[];
			const content = m[2];
			const diff = diffMarkers(rootMarkers, markers);
			if (diff === MarkersDiffResult.SAME) html += `<li>${content}</li>`;
			else if (diff === MarkersDiffResult.DEEPER) {
				const after = lines.slice(i);
				const earlyStopIndex = after.findIndex((l) => l.match(/^([#*]+)[^#*]+/)![1].length <= rootMarkers.length);
				const r = transformInternal(
					after.slice(0, earlyStopIndex === -1 ? Infinity : earlyStopIndex).map((l) =>
						l.slice(longestCommonPrefix(rootLevel, l.match(/^([#*]+)[^#*]+/)![1]).length)),
				);
				html = html.slice(0, -5) + `${r.html}</li>`;
				skip = i + r.lastTransformed;
			} else if (diff === MarkersDiffResult.OTHER) {
				html += buildHtmlEnd(whatClosed(rootMarkers, markers));
				return {html, lastTransformed: i};
			}
		}
		html += buildHtmlEnd(rootMarkers);
		return {html, lastTransformed: lines.length};
	}
	let transformed = 0;
	let finalHtml = '';
	while (transformed !== doc.length) {
		const r = transformInternal(doc.slice(transformed));
		finalHtml += r.html;
		transformed += r.lastTransformed;
	}
	return finalHtml;
}

export default {
	priority: 0,
	function: function transformList(current: string): string {
		const lines = toLines(current);
		const listStarters = lines
			.map((line, i) => [line, i] as const)
			.filter(([line, i]) =>
				isListLine(line) && (i === 0 || !isListLine(lines[i - 1])));
		const lists = listStarters.map(([_, i]) => {
			const after = lines.slice(i);
			const firstRelNonListLine = after.findIndex((line) => !isListLine(line));
			const relEnd = (firstRelNonListLine === -1 ? after.length : firstRelNonListLine)
			const end = i + relEnd
			return {lines: after.slice(0, relEnd), start: i, end};
		});
		let out = current;
		for (const list of lists)
			out = replaceLines(out, list.start, list.end, transformSingleList(list.lines));
		return out;
	},
};

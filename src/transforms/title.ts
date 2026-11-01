import {fromLines, toLines} from '../utils';

export default {
	priority: 1,
	function: function transformTitles(current: string): string {
		return fromLines(toLines(current).map((line) => {
			const titleStart = line.match(/^(={1,6})[^=]+.*/);
			if (!titleStart) return line;
			const titleLevel = titleStart[1].length;
			return line.replace(new RegExp(`^={${titleLevel}}\\s*(.+)\\s*={${titleLevel}}\\s*$`), `<h${titleLevel}>$1</h${titleLevel}>`);
		}));
	},
};

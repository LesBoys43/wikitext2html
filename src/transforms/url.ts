import {fromLines, toLines} from '../utils';

export default {
	priority: 500,
	function: function transformTitles(current: string): string {
		return fromLines(toLines(current).map((line) => line.replace(/\[(https?:\/\/([a-z0-9]+\.)+[a-z]{2,}(?::[0-9]{1,5})?\/[^ \t\r\n]*)(?: ([^\]\r\n]+))?\]/, (_, url, label) => `<a href="${url}">${label ?? url}</a>`)));
	},
};

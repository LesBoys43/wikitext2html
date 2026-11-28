import {Options} from '..';
import {fromLines, toLines} from '../utils';

// eslint-disable-next-line prefer-regex-literals
const URL_RE = new RegExp(String.raw`\[(https?://(?:(?:(?:[a-z0-9](?:(?:)|(?:[a-z0-9]*)|(?:[a-z0-9-]*[a-z0-9]))\.)+[a-z]{2,})|(?:[a-z0-9][a-z0-9-]*)|(?:(?:(?:(?:0)|(?:[1-9][0-9]?)|(?:1[0-9]{2})|(?:2[0-4][0-9])|(?:25[0-5]))\.){3}(?:(?:0)|(?:[1-9][0-9]?)|(?:1[0-9]{2})|(?:2[0-4][0-9])|(?:25[0-5]))))(?::(?:(?:0)|(?:[1-9][0-9]{0,3})|(?:[1-5][0-9]{4})|(?:6[0-4][0-9]{3})|(?:65[0-4][0-9]{2})|(?:655[0-2][0-9])|(?:6553[0-5])))?(?:/[^\] \t\r\n]*)?)(?: ([^\]\r\n]+))?\]`);

export default {
	priority: 500,
	function: function transformURLs(current: string, _: Required<Options>): string {
		return fromLines(toLines(current).map((line) => line.replace(URL_RE, (_2, url, label) => `<a href="${url}">${label ?? url}</a>`)));
	},
};

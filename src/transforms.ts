import inlineFormats from './transforms/inline-formats';
import list from './transforms/list';
import title from './transforms/title';
import url from './transforms/url';

type Transform = {
	priority: number;
	function: (current: string) => string;
};

const TRANSFORMS: Transform[] = [
	title,
	list,
	inlineFormats,
	url,
].sort(({priority: a}, {priority: b}) => b - a);

function runTransform(text: string, transform: Transform, strict: boolean = true): string {
	try {
		return transform.function(text);
	} catch (e) {
		if (strict) throw e;
		else return text;
	}
}

export function runAllTransforms(text: string, strict: boolean = true): string {
	let out = text;
	for (const transform of TRANSFORMS)
		out = runTransform(out, transform, strict);

	return out;
}

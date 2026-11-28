import QUnit from 'qunit';
import {type Test} from './types.ts';
import * as testTitle from './title.test.ts';
import * as testInlineFormats from './inline-formats.test.ts';
import * as testList from './list.test.ts';
import * as testURL from './url.test.ts';
import * as testLink from './link.test.ts';

const TESTS: Test[] = [
	testTitle,
	testInlineFormats,
	testList,
	testURL,
	testLink,
];

QUnit.module('wikitext2html tests', () => {
	for (const test of TESTS) test.execute();
});

import QUnit from 'qunit';
import {wikitextToHtml} from '../dist/index.js';
import {jqify} from './utils.ts';

function constructTitleWikitext(level: number, body: string): string {
	const fence = '='.repeat(level);
	return `${fence} ${body} ${fence}`;
}

export function execute(): void {
	QUnit.module('Title', (_hooks) => {
		QUnit.module('Basic functionality', (_hooks2) => {
			const levels = [
				1,
				2,
				3,
				4,
				5,
				6,
			];
			for (const level of levels)
				QUnit.test(`Level ${level}`, (assert) => {
					const result = wikitextToHtml(constructTitleWikitext(level, 'Test'));
					const $ = jqify(result);
					assert.equal($(`h${level}`).length, 1, `Result contains a <h${level}> element`);
					assert.equal($(`h${level}`).text().trim(), 'Test', `Text of the <h${level}> element matches wikitext`);
				});
		});

		QUnit.module('Integrate with other features', (_hooks2) => {
			QUnit.test('Has inline format', (assert) => {
				const result = wikitextToHtml(constructTitleWikitext(2, "'''bold'''"));
				const $ = jqify(result);
				assert.equal($('h2').length, 1, 'Result contains a <h2> element');
				assert.equal($('h2').find('strong').length, 1, 'Content of the <h2> element is a <strong> element');
				assert.equal($('h2').find('strong').text().trim(), 'bold', 'Text of the <strong> element matches wikitext');
			});
		});

		QUnit.module('Bad cases', (_hooks2) => {
			QUnit.module('Non-balanced equal sign', (_hooks3) => {
				QUnit.test('Too few closing equal signs', (assert) => {
					const result = wikitextToHtml('== Wrong =');
					const $ = jqify(result);
					assert.equal($('h2').length, 0, "Result doesn't contain a <h2> element");
				});

				QUnit.test('Too many closing equal signs', (assert) => {
					const result = wikitextToHtml('== Wrong ===');
					const $ = jqify(result);
					assert.equal($('h2').length, 0, "Result doesn't contain a <h2> element");
				});
			});

			QUnit.test('Inline usage', (assert) => {
				const result = wikitextToHtml('Inline == title ==');
				const $ = jqify(result);
				assert.equal($('h2').length, 0, "Result doesn't contain a <h2> element");
			});
		});
	});
}

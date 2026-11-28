import QUnit from 'qunit';
import {wikitextToHtml} from '../dist/index.js';
import {jqify} from './utils.ts';

export function execute(): void {
	QUnit.module('URL', (_hooks) => {
		QUnit.module('Basic functionality', (_hooks2) => {
			QUnit.test('Raw URL', (assert) => {
				const result = wikitextToHtml('[https://example.com]');
				const $ = jqify(result);
				assert.equal($('a').length, 1, 'Result contains an <a> element');
				assert.equal($('a').attr('href'), 'https://example.com', 'Href of the <a> element matches wikitext');
				assert.equal($('a').text().trim(), 'https://example.com', 'Text of the <a> element is same to href');
			});

			QUnit.test('Labeled URL', (assert) => {
				const result = wikitextToHtml('[https://example.com Example]');
				const $ = jqify(result);
				assert.equal($('a').length, 1, 'Result contains an <a> element');
				assert.equal($('a').attr('href'), 'https://example.com', 'Href of the <a> element matches wikitext');
				assert.equal($('a').text().trim(), 'Example', 'Text of the <a> element matches wikitext');
			});
		});

		QUnit.module('Integrate with other features', (_hooks2) => {
			QUnit.test('As title', (assert) => {
				const result = wikitextToHtml('== [https://example.com Example] ==');
				const $ = jqify(result);
				assert.equal($('h2').length, 1, 'Result contains a <h2> element');
				assert.equal($('h2').find('a').length, 1, 'The <h2> element contains an <a> element');
				assert.true(
					$('h2').find('a').attr('href') === 'https://example.com' && $('h2').find('a').text().trim() === 'Example',
					'The <a> element has correct href and text',
				);
			});

			QUnit.test('Label has inline format', (assert) => {
				const result = wikitextToHtml("[https://example.com '''Example''']");
				const $ = jqify(result);
				assert.equal($('a').length, 1, 'Result contains an <a> element');
				assert.equal($('a').attr('href'), 'https://example.com', 'Href of the <a> element matches wikitext');
				assert.equal($('a').find('strong').length, 1, 'The <a> element contains a <strong> element');
				assert.equal($('a').find('strong').text().trim(), 'Example', 'Text of the <strong> element matches wikitext');
			});
		});

		QUnit.module('Bad cases', (_hooks2) => {
			QUnit.test('Unsupported protocol', (assert) => {
				const result = wikitextToHtml('[unknown://example.com]');
				const $ = jqify(result);
				assert.equal($('a').length, 0, "Result doesn't contains an <a> element");
			});
		});
	});
}

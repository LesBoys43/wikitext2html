import QUnit from 'qunit';
import {wikitextToHtml} from '../dist/index.js';
import {jqify} from './utils.ts';

export function execute(): void {
	QUnit.module('Link', (_hooks) => {
		QUnit.module('Basic functionality', (_hooks2) => {
			QUnit.test('Raw link', (assert) => {
				const result = wikitextToHtml('[[Example]]');
				const $ = jqify(result);
				assert.equal($('a').length, 1, 'Result contains an <a> element');
				assert.equal($('a').attr('href'), '/index.php?title=Example', 'Href of the <a> element matches default template');
				assert.equal($('a').text(), 'Example', 'Text of the <a> element is the page name itself');
			});

			QUnit.test('Labeled link', (assert) => {
				const result = wikitextToHtml('[[Example|Label]]');
				const $ = jqify(result);
				assert.equal($('a').length, 1, 'Result contains an <a> element');
				assert.equal($('a').attr('href'), '/index.php?title=Example', 'Href of the <a> element matches default template');
				assert.equal($('a').text(), 'Label', 'Text of the <a> element matches wikitext');
			});
		});

		QUnit.module('Custom template', (_hooks2) => {
			QUnit.module('Basics', (_hooks3) => {
				QUnit.module('String template', (_hooks4) => {
					QUnit.test('Single placeholder instance', (assert) => {
						const result = wikitextToHtml('[[Example]]', {linkURLTemplate: '/wiki/$PAGE'});
						const $ = jqify(result);
						assert.equal($('a').length, 1, 'Result contains an <a> element');
						assert.equal($('a').attr('href'), '/wiki/Example', 'Href of the <a> element matches custom template');
						assert.equal($('a').text(), 'Example', 'Text of the <a> element is the page name itself');
					});

					QUnit.test('Multiple placeholder instance', (assert) => {
						const result = wikitextToHtml('[[Example]]', {linkURLTemplate: '/wiki.html?trace=$PAGE#$PAGE'});
						const $ = jqify(result);
						assert.equal($('a').length, 1, 'Result contains an <a> element');
						assert.equal($('a').attr('href'), '/wiki.html?trace=Example#Example', 'Href of the <a> element matches custom template');
						assert.equal($('a').text(), 'Example', 'Text of the <a> element is the page name itself');
					});
				});

				QUnit.test('Function template', (assert) => {
					const result = wikitextToHtml('[[Example]]', {
						linkURLTemplate(pageName) {
							return `/wiki/${pageName}`;
						},
					});
					const $ = jqify(result);
					assert.equal($('a').length, 1, 'Result contains an <a> element');
					assert.equal($('a').attr('href'), '/wiki/Example', 'Href of the <a> element matches custom template');
					assert.equal($('a').text(), 'Example', 'Text of the <a> element is the page name itself');
				});
			});

			QUnit.module('Escaping behavior', (_hooks3) => {
				QUnit.test('String template get escaped page name', (assert) => {
					const result = wikitextToHtml('[[Example with space]]', {linkURLTemplate: '/wiki/$PAGE'});
					const $ = jqify(result);
					assert.equal($('a').length, 1, 'Result contains an <a> element');
					assert.equal($('a').attr('href'), '/wiki/Example%20with%20space', 'Href of the <a> element matches custom template');
					assert.equal($('a').text(), 'Example with space', 'Text of the <a> element is the page name itself');
				});

				QUnit.test('Function template get unescaped page name', (assert) => {
					const result = wikitextToHtml('[[Example with space]]', {
						linkURLTemplate(pageName) {
							return `/wiki/${pageName}`;
						},
					});
					const $ = jqify(result);
					assert.equal($('a').length, 1, 'Result contains an <a> element');
					assert.equal($('a').attr('href'), '/wiki/Example with space', 'Href of the <a> element matches custom template');
					assert.equal($('a').text(), 'Example with space', 'Text of the <a> element is the page name itself');
				});
			});
		});
	});
}

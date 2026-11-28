import QUnit from 'qunit';
import {wikitextToHtml} from '../dist/index.js';
import {jqify} from './utils.ts';

export function execute(): void {
	QUnit.module('Inline formats', (_hooks) => {
		QUnit.module('Basic functionality', (_hooks2) => {
			type TestDef = {name: string; fence: string; el: string | string[]};

			const TEST_DEF: TestDef[] = [
				{name: 'Bold', fence: "'''", el: 'strong'},
				{name: 'Italic', fence: "''", el: 'em'},
				{name: 'Bold & Italic', fence: "'''''", el: ['strong', 'em']},
			];

			function check(def: TestDef, value: string): boolean {
				const $ = jqify(value);
				const elList = Array.isArray(def.el) ? def.el : [def.el];
				let curr = $('p');
				for (const next of elList) {
					if (!curr.find(next).length) return false;
					curr = curr.find(next);
				}
				return true;
			}

			for (const test of TEST_DEF)
				QUnit.test(test.name, (assert) => {
					const resultRaw = wikitextToHtml(`${test.fence}test${test.fence}`);
					const result = `<p>${resultRaw}</p>`;
					assert.true(check(test, result), 'Result has correct element structure');
					const $ = jqify(result);
					assert.equal($('p').text().trim(), 'test', 'Text of result matches wikitext');
				});
		});

		QUnit.module('Multiple inline formats in single line', (_hooks2) => {
			QUnit.test('Bold and bold', (assert) => {
				const resultRaw = wikitextToHtml("'''a''' '''b'''");
				const result = `<p>${resultRaw}</p>`;
				const $ = jqify(result);
				assert.equal($('p').find('strong').length, 2, 'Result contains 2 <strong> elements');
				assert.equal($('p').find('strong')[0].textContent.trim(), 'a', 'Text of first <strong> element matches wikitext');
				assert.equal($('p').find('strong')[1].textContent.trim(), 'b', 'Text of second <strong> element matches wikitext');
			});

			QUnit.test('Bold and italic', (assert) => {
				const resultRaw = wikitextToHtml("'''a'''  ''b''");
				const result = `<p>${resultRaw}</p>`;
				const $ = jqify(result);
				assert.true(
					$('p').find('strong').length === 1 && $('p').find('em').length === 1,
					'Result contains 1 <strong> element and 1 <em> element',
				);
				assert.equal($('p').find('strong').text().trim(), 'a', 'Text of the <strong> element matches wikitext');
				assert.equal($('p').find('em').text().trim(), 'b', 'Text of the <em> element matches wikitext');
			});
		});

		QUnit.module('Nested inline formats', (_hooks2) => {
			QUnit.test('Italic inside bold', (assert) => {
				const result = wikitextToHtml("'''bold ''italic'''''");
				const $ = jqify(result);
				assert.equal($('strong').length, 1, 'Result contains a <strong> element as parent');
				assert.equal($('strong').find('em').length, 1, 'Result contains a <em> element inside the <strong> element as child');
				assert.equal($('strong').find('em').text().trim(), 'italic', 'Text of the child <em> element matches wikitext');
			});
		});

		// QUnit.module('Bad cases', (_hooks2) => {...})
		// TODO: Implement bad cases:
		//         - Non-balanced fence
		//         - May more...
	});
}

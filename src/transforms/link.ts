import {LinkURLTemplateCallbackType, Options} from '..';

function buildA(link: string, display: string): string {
	return `<a href="${link}">${display}</a>`;
}

function applyTemplate(pageName: string, template: string | LinkURLTemplateCallbackType): string {
	if (typeof template === 'string') return template.replaceAll('$PAGE', encodeURIComponent(pageName));
	else return template(pageName);
}

export default {
	priority: 501,
	function: function transformLink(current: string, {linkURLTemplate}: Required<Options>):
	string {
		return current.replace(
			/\[\[([^|[\]]+)(?:\|([^[\]]+))?\]\]/g,
			(_, pageName: string, display: string | undefined) =>
				buildA(applyTemplate(pageName, linkURLTemplate), display ?? pageName),
		);
	},
};

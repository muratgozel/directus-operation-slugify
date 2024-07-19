import { defineOperationApp } from '@directus/extensions-sdk';

export default defineOperationApp({
	id: 'operation-slugify',
	name: 'Slugify',
	icon: 'box',
	description: 'Generates language aware slugs.',
	overview: ({ valueField, slugField, languageCodePath }) => [
		{
			label: 'Generates slugs based on',
			text: valueField,
		},
		{
			label: 'Name of the slug field',
			text: slugField,
		},
		{
			label: 'Language indicator',
			text: languageCodePath,
		},
	],
	options: [
		{
			field: 'valueField',
			name: 'Name of the field to generate the slug from',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'input',
			},
		},
		{
			field: 'languageCodePath',
			name: 'Path to the language code or 2 letter language code',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'input',
			},
		},
		{
			field: 'slugField',
			name: 'Name of the slug field',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'input',
			},
		},
	],
});

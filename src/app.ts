import { defineOperationApp } from '@directus/extensions-sdk';

export default defineOperationApp({
	id: 'operation-slugify',
	name: 'Slugify',
	icon: 'box',
	description: 'Generates a language aware slug from texts.',
	overview: ({ valueField }) => [
		{
			label: 'Value Field',
			text: valueField,
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

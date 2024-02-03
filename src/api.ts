import { defineOperationApi } from '@directus/extensions-sdk';
import getSlug from 'speakingurl';

type Options = {
	valueField: string;
	languageCodePath: string;
	slugField: string;
};
type Data = Record<string, any>

export default defineOperationApi<Options>({
	id: 'operation-slugify',
	handler: ({ valueField, languageCodePath, slugField }, { data, logger }: { data: Data }) => {
		const arr: string[] = languageCodePath.split('.')
		let lang = 'en'
		if (arr.length === 1 && (arr[0] as string).length === 2) lang = arr[0] as string
		else if (arr.length === 1) lang = data.$trigger.payload[arr[0] as string]
		else if (arr.length === 2) lang = data.$trigger.payload[arr[0] as string][arr[1] as string]
		else lang = 'en'

		const value = data.$trigger.payload[valueField]
		const slug = getSlug(value, {
			separator: '-',
			lang: lang.slice(0, 2)
		})

		logger.info('[operation-slugify] input: "' + value + '" slug: "' + slug + '"' + ' language: "' + lang.slice(0, 2) + '"')

		return Object.assign({}, data.$trigger.payload, {
			[slugField]: slug
		})
	},
});

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
	handler: async ({ valueField, languageCodePath, slugField }, { data, services, database, getSchema, logger }: { data: Data }) => {
		// generate a slug if it's empty on any update operation
		const isUpdate = data.$trigger.event.split('.').slice(-1) === 'update'
		if (isUpdate) {
			const collection = data.$trigger.event.split('.').slice(-2, -1)
			const schema = await getSchema({ database })
			const itemsService = new services.ItemsService(collection, {
				schema,
				accountability: data.accountability
			})
			const item = await itemsService.readOne(data.$trigger.keys[0])
			// cancel if it's already filled
			if (item.slug && item.slug.length > 0) {
				return data.$trigger.payload
			}
		}

		// find language
		const arr: string[] = languageCodePath.split('.')
		let lang = 'en'
		if (arr.length === 1 && (arr[0] as string).length === 2) lang = arr[0] as string
		else if (arr.length === 1) lang = data.$trigger.payload[arr[0] as string]
		else if (arr.length === 2) lang = data.$trigger.payload[arr[0] as string][arr[1] as string]
		else lang = 'en'

		// get value to generate the slug from
		const value = data.$trigger.payload[valueField]

		// generate slug
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

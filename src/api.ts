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
		const hasValueField = data.$trigger.payload.hasOwnProperty(valueField)
		const lang = verifyLanguage(languageCodePath, data.$trigger.payload)
		if (!hasValueField || !lang) {
			return data.$trigger.payload
		}

		// generate a slug if it's empty on any update operation
		const isUpdate = data.$trigger.event.split('.').slice(-1)[0] === 'update'
		if (isUpdate) {
			const collection = data.$trigger.event.split('.')[0]
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

		// get value to generate the slug from
		const value = data.$trigger.payload[valueField]

		// generate slug
		const slug = getSlug(value, {
			separator: '-',
			lang
		})

		logger.info('[operation-slugify] input: "' + value + '" slug: "' + slug + '"' + ' language: "' + lang + '"')

		return Object.assign({}, data.$trigger.payload, {
			[slugField]: slug
		})
	},
});

function verifyLanguage (input: string, payload: Record<string, any>): string | boolean {
	const arr: string[] = input.split('.')

	if (arr.length === 1 && (arr[0] as string).length === 2) {
		return arr[0] as string
	}
	else if (arr.length === 1) {
		return payload.hasOwnProperty(arr[0] as string) ? (payload[arr[0] as string]).slice(0, 2) : false
	}
	else if (arr.length === 2) {
		return payload.hasOwnProperty(arr[0] as string)
			? payload[arr[0] as string].hasOwnProperty(arr[1] as string)
				? (payload[arr[0] as string][arr[1] as string]).slice(0, 2)
				: false
			: false
	}
	else {
		return 'en'
	}
}

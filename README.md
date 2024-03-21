# directus-operation-slugify
Directus operation extension to generate language aware slugs.

## Install
This extension is a standard directus operation extension. Refer to the official docs if you don't know how to install extensions:

https://docs.directus.io/extensions/installing-extensions.html

The extension also available as an npm package:
```sh
npm i directus-extension-directus-operation-slugify
```

If you still not sure, check `npm run up` and `npm run up-dev` commands. Those are the ones I use for installing this extension.

After installing, verify it by checking Settings - Extensions screen. The extension should be there with correct version number.

![Directus Operation Slugify Verify Installation](media/verify.png?raw=true)

## Usage
1. **Create a Flow with Event Hook trigger.** The trigger should be configured as blocking, scoped to items.create and items.update, filtered to a collections of your choice and return Data of Last Operation.

![Directus Operation Slugify Setup](media/flow.png?raw=true)

2. **Add Slugify operation to the flow.** The options are:
   - Name of the field to generate the slug from: `title` for example if you have a collection with `title` field and want to generate slugs based on that field.
   - Path to the language code or 2 letter language code:
     - If you specify a dotted path such as `languages_code.code`, it will be transformed to a chain of property names as to be resolved in item's payload to find the language of the payload.
     - If you don't have a language code in your collection, you can just type a 2 letter language code here such as `en` but be aware that it might effect the generated slugs.
   - Name of the slug field: The name of the field in your collection to save the generated slug under. `slug` for example.

![Directus Operation Slugify Setup](media/options.png?raw=true)

That's all.

From now on, the extension will generate a slug:
1. on creating new items on relevant collections and
2. on updating items on relevant collections only if the slug field is empty.

---

Version management of this repository done by [releaser](https://github.com/muratgozel/node-releaser) 🚀

---

Thanks for watching 🐬

[![Support me on Patreon](https://cdn.muratgozel.com.tr/support-me-on-patreon.v1.png)](https://patreon.com/muratgozel?utm_medium=organic&utm_source=github_repo&utm_campaign=github&utm_content=join_link)

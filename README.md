# directus-operation-slugify
Directus operation extension that generates language aware slugs from texts.

## Install
Refer to docs:
https://docs.directus.io/extensions/installing-extensions.html

Also you might want to check `npm run up` and `npm run up-dev` commands.

Verify the installation by checking Settings - Extensions screen. The extension should be there with correct version number.

## Usage
1. Create a Flow with Event Hook trigger. The trigger should be configured as blocking, scoped to items.create, filtered to a relevant collection and return Data of Last Operation.

![Directus Operation Slugify Setup](media/flow.png?raw=true)

2. Add Slugify operation to the hook. The options are:
   - Name of the field to generate the slug from. `title` for example if you have pages collection with `title` field.
   - Path to the language code or 2 letter language code. If you specify a path such as `languages_code.code`, it will be transformed to a chain of property names as to be used in item's payload to find the language of the payload. If you don't have a language code in your item, you can just type a 2 letter language code here such as `en` but be aware that it might effect the generated slugs.
   - Name of the slug field. The name of the field in your item's payload to put the generated slug such as `slug`.

![Directus Operation Slugify Setup](media/options.png?raw=true)

3. Create a new item.

---

Version management of this repository done by [releaser](https://github.com/muratgozel/node-releaser) 🚀

---

Thanks for watching 🐬

Issue: https://github.com/dmonad/lib0/issues/74

**Describe the bug**

`lib0/webcrypto` has been broken for browser contexts since `lib@0.2.73` due to remapping exports ([2617ed3](https://github.com/dmonad/lib0/commit/2617ed3fa3dfb6b50c0e4c49bc8a769b6ac12ae9)).

**To Reproduce**
```shell
# cargo install deno

git clone https://github.com/spence/lib0-webcrypto.git
cd lib0-webcrypto
deno task start

# open http://localhost:8080 and show console
```

**Expected Behavior**

Via pinning `lib0/webcrypto@0.2.73`:

<img width="608" alt="image" src="https://user-images.githubusercontent.com/138762/270060959-5d31d237-3251-4318-8f6e-b44705c9ae15.png">

**Actual Behavior**

Without pinning:

<img width="608" alt="image" src="https://user-images.githubusercontent.com/138762/270060907-ac996289-ae32-42da-b64b-62deea2a7de5.png">

**Environment Information**
- Browser (e.g., Chrome 119.0.6024.0)

**Additional context**

You can see the published source of each version via source maps.

`0.2.72` (works)
```shell
curl -sS https://esm.sh/v132/lib0@0.2.72/es2022/webcrypto.js.map | jq
```
```json
{
  "mappings": ";AAEO,IAAMA,EAAS,OAAO,OAChBC,EAAkB,OAAO,gBAAgB,KAAK,MAAM",
  "names": [
    "subtle",
    "getRandomValues"
  ],
  "sourceRoot": "/",
  "sources": [
    "../esmd/npm/lib0@0.2.72/node_modules/.pnpm/lib0@0.2.72/node_modules/lib0/webcrypto.browser.js"
  ],
  "sourcesContent": [
    "/* eslint-env browser */\n\nexport const subtle = crypto.subtle\nexport const getRandomValues = crypto.getRandomValues.bind(crypto)\n"
  ],
  "version": 3
}
```

`0.2.73` (broken)
```shell
curl -sS https://esm.sh/v132/lib0@0.2.73/es2022/webcrypto.js.map | jq
```
```json
{
  "mappings": ";AACA,OAAS,aAAAA,MAAiB,8DAEnB,IAAMC,EAA6BD,EAAW,OACxCE,EAAsCF,EAAW,gBAAgB,KAAKA,CAAS",
  "names": [
    "webcrypto",
    "subtle",
    "getRandomValues"
  ],
  "sourceRoot": "/",
  "sources": [
    "../esmd/npm/lib0@0.2.73/node_modules/.pnpm/lib0@0.2.73/node_modules/lib0/webcrypto.node.js"
  ],
  "sourcesContent": [
    "\nimport { webcrypto } from 'node:crypto'\n\nexport const subtle = /** @type {any} */ (webcrypto).subtle\nexport const getRandomValues = /** @type {any} */ (webcrypto).getRandomValues.bind(webcrypto)\n"
  ],
  "version": 3
}
```

Related:
- https://github.com/dmonad/lib0/issues/69
- https://github.com/dmonad/lib0/issues/62
- https://github.com/dmonad/lib0/issues/71




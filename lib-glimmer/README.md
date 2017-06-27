# lib-glimmer

This is a UI Component Library written in Glimmer and compiled to Web Components.


## build

```
npm install
ember build
```

The output will be in `./dist/app.js`.


## test (manual)

```
npm install
ember s
```

Open file in browser: `./dist/index.html`

Note that live reloading will not work, but file watching and rebuilding will work.

We need to do this because you can't easily test your component in web-component mode
with `ember s`.


## deploy (to local apps)

```
ember build
cp dist/app.js ../app-ember/public/lib-glimmer.js
```

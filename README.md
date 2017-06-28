# web component interop

This project serves as a demonstration of both:

- authoring web components with different libraries
- consuming web components in different applications

It therefore serves two purposes:

- compare different web component authoring lirbraries
- demonstrate the technical possibility and an example method for deeply interoperating with web components from various host applications


## Example Web Component Interface

Each library implmenets the same web component, which is a `select-list`. It renders a list of items, each with a button that will raise a `select-item` event when clicked.

Each application consumes this web component in order to build a small todo manager. Items can be added and when items are selected, they are removed.

The web component should be invoked like so:

```html
<select-list-LIBNAME items='[{"label": "get some work done", "value": "work"}]' icon="X"></select-list-LIBNAME>
```

Where the `items` attribute is a JSON serialized string of an array of objects with the keys `label` and `value`. The `label` value is displayed as a line item and the `value` value is used to determine uniqueness.

The `icon` attribute is a string that is rendered inside the item's button.

The dom element will raise the `select-item` event when one of the buttons are clicked. The event's `detail` will be set to the original `value` value from the `items` collection that was passed in to the web component.

Consuming applications will use this value to remove that item from the `items` collection, causing a re-render without that item. They will also use an input and button to add new items to the `items` collection.


## To Do

General usefulness:

- ? package-ember-glimmer: create an ember addon that packages the glimmer-generated web-component so that it can be included in app-ember without stuffing the generated files in `./public`.
- ? etc.

More app examples!

- react
- rails (server rendered)

More lib examples!

- lib-react
- lib-vue


import Component, { tracked } from '@glimmer/component';

function tryJsonParse(string) {
  try {
    return JSON.parse(string);
  } catch (error) {
    const realError = new Error(`${error.message}\nTried to parse: ${string}`);
    throw realError;
  }
}

function parseAttribute(rawAttribute) {
  const firstChar = rawAttribute[0];
  if (firstChar === '[' || firstChar === '{') {
    return tryJsonParse(rawAttribute);
  }

  return rawAttribute;
}

function setAttributes(glimmerComponent, webComponent) {
  const attrs = Array.prototype.slice.call(webComponent.attributes);
  glimmerComponent.htmlAttrs = attrs.reduce((newAttrs, node) => {
    newAttrs[node.name] = parseAttribute(node.nodeValue);
    return newAttrs;
  }, {});
}

class AttrComponent extends Component {
  @tracked
  htmlAttrs: any;

  // to catch new dom elements
  didInsertElement() {
    const webComponent = this.element.parentNode.host;

    // glimmer's web component's attribute changed callback
    // will invoke this for us, if it exists
    webComponent.onAttributeChangedCallback = (attr, newValue) => {
      const attrs = Array.prototype.slice.call(webComponent.attributes);
      setAttributes(this, webComponent);
    };
    
    setAttributes(this, webComponent);
  }

  dispatchEvent(name, args) {
    const webComponent = this.element.parentNode.host;

    const event = new CustomEvent(name, { detail: args });
    webComponent.dispatchEvent(event);
  }
}


export default class SelectList extends AttrComponent {
  @tracked('htmlAttrs')
  get items() {
    if (this.htmlAttrs) {
      return this.htmlAttrs.items;
    }

    return [];
  }

  @tracked('htmlAttrs')
  get icon() {
    if (this.htmlAttrs) {
      return this.htmlAttrs.icon;
    }

    return '';
  }

  selectItem(itemValue) {
    this.dispatchEvent('select-item', itemValue);
  }
};

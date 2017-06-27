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

function parseAttributes(rawAttributes) {
  const attrs = Array.prototype.slice.call(rawAttributes);
  return attrs.reduce((newAttrs, node) => {
    newAttrs[node.name] = parseAttribute(node.nodeValue);
    return newAttrs;
  }, {});
}

class SelectList extends HTMLElement {
  static get is() { return 'select-list'; }

  constructor() {
    super();

    // properties
    this.items = [];
    this.icon = '';

    this.itemTemplate = `
      <div class="select-list__item">
        {{label}}
        <button type="button" class="select-list__select-button" data-value="{{value}}">{{icon}}</button>
      </div>
    `;

    // setup web component's shadow root
    this.attachShadow({mode: 'open'});

    this._handleSelectClick = this._handleSelectClick.bind(this);
  }
  
  // Monitor the 'name' attribute for changes.
  static get observedAttributes() { return ['items', 'icon']; }

  // Respond to attribute changes.
  attributeChangedCallback(attr, oldValue, newValue) {
    this[attr] = parseAttribute(newValue);
    this.render();
  }

  connectedCallback() {
    const attrs = parseAttributes(this.attributes);

    this.items = attrs.items;
    this.icon = attrs.icon;
    
    this.render();
  }

  render(){
    this._removeEventHandlers();
    this._removeChildren();
    this._interpolateAttributes(this.itemTemplate);
    this._setupEventHandlers();
  }

  _removeChildren() {
    while (this.shadowRoot.hasChildNodes()) {
      this.shadowRoot.removeChild(this.shadowRoot.lastChild);
    }
  }

  _interpolateAttributes() {
    const renderedItems = this.items.map((item) => {
      let fragment = this.itemTemplate;

      Object.keys(item).forEach((attr) => {
        const attrRegex = new RegExp(`{{${attr}}}`, 'g');
        fragment = fragment.replace(attrRegex, item[attr]);
      });

      const iconRegex = new RegExp(`{{icon}}`, 'g');
      fragment = fragment.replace(iconRegex, this.icon);

      return fragment;
    });
    
    this.shadowRoot.innerHTML = renderedItems.join('');
  }

  _removeEventHandlers() {
     this.shadowRoot.querySelectorAll('.select-list__select-button').forEach((button) => {
      button.removeEventListener("click", this._handleSelectClick, false);
    });
  }

  _setupEventHandlers() {
    this.shadowRoot.querySelectorAll('.select-list__select-button').forEach((button) => {
      button.addEventListener("click", this._handleSelectClick, false);
    });    
  }

  _handleSelectClick(clickEvent) {
    const itemValue = parseAttributes(clickEvent.target.attributes)['data-value'];
    const event = new CustomEvent('select-item', { detail: itemValue });
    this.dispatchEvent(event);
  }
}

customElements.define(SelectList.is, SelectList);

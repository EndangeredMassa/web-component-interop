import Ember from 'ember';
let {computed} = Ember;

export default Ember.Component.extend({
  items: null,
  icon: '',

  init() {
    this._super(...arguments);
    this._onSelectItem = this._onSelectItem.bind(this);
  },

  jsonItems: computed('items', function(){
    return JSON.stringify(this.get('items'));
  }),

  webComponentElement: computed({
    get() {
      return this.$('select-list-glimmer')[0];
    }
  }),

  didInsertElement() {
    this.get('webComponentElement').addEventListener('select-item', this._onSelectItem, false);
  },

  willDestroyElement() {
    this.get('webComponentElement').removeEventListener('select-item', this._onSelectItem, false);
  },

  _onSelectItem(event) {
    this.get('onSelectItem')(event.detail);
  }
});

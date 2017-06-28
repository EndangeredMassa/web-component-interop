import Ember from 'ember';
let {computed} = Ember;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default Ember.Controller.extend({
  items: computed('model', function(){
    return this.get('model').items;
  }),

  newTodo: '',

  actions: {
    removeItem(itemValue) {
      const items = this.get('items');
      this.set('items', items.reject(item => item.value === itemValue));
    },

    addItem() {
      const newTodo = this.get('newTodo');
      const items = this.get('items').slice(0);
      items.push({
        label: newTodo,
        value: getRandomInt(1, 99999).toString()
      });
      this.set('items', items);
    }
  }
});

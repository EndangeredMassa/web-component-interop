import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      items: [
        {"label": "Write Tests", "value": "write-tests"}
      ]
    };
  }
});

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('select-list-glimmer', 'Integration | Component | select list glimmer', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{select-list-glimmer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#select-list-glimmer}}
      template block text
    {{/select-list-glimmer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

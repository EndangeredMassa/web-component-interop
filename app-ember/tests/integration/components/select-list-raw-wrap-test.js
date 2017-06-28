import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('select-list-raw-wrap', 'Integration | Component | select list raw wrap', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{select-list-raw-wrap}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#select-list-raw-wrap}}
      template block text
    {{/select-list-raw-wrap}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

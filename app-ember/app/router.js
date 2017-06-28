import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('lib', {path: '/'}, function() {
    this.route('glimmer', {path: '/glimmer'});
    this.route('raw', {path: '/raw'});
  });
});

export default Router;

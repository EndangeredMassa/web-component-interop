import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', {path: '/'});

  this.route('lib', {path: '/lib'}, function() {
    this.route('glimmer', {path: '/glimmer'});
  });
});

export default Router;

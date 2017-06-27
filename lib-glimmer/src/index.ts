import App from './main';
import { ComponentManager, setPropertyDidChange } from '@glimmer/component';
import initializeCustomElements from 'temp-glimmer-component-endangeredmassa';

const app = new App();

setPropertyDidChange(() => {
  app.scheduleRerender();
});

app.registerInitializer({
  initialize(registry) {
    registry.register(`component-manager:/${app.rootName}/component-managers/main`, ComponentManager);
  }
});

// const containerElement = document.getElementById('app');
// if (containerElement) {
//   app.renderComponent('lib-glimmer', containerElement, null);
// }

app.boot();

initializeCustomElements(app, [
  {name: 'select-list-glimmer', trackedAttributes: ['items', 'icon']}
]);


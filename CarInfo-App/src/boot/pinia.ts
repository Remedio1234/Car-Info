import { boot } from 'quasar/wrappers';
import { createPinia } from 'pinia';

// Create a Pinia instance
const pinia = createPinia();

// Use Pinia with the Quasar app
export default boot(({ app }) => {
  app.use(pinia);
});

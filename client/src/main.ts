import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.config.errorHandler = (error, vm, info) => {
	console.log(' --- ERROR ---', error, vm, info);
};

app.mount('#app');
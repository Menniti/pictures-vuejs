import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes.js'
import VeeValidate, { Validator} from 'vee-validate';
import msg from './pt_BR';

import './assets/js/teste.js';
import 'bootstrap/dist/js/bootstrap.js';

import './directives/Transform';

// estamos carregando o boostrap como um modulo do Vue
// eh preciso ter instalado o npm css-loader@0.25.0 e style-loader@0.13.1 --save-dev

import 'bootstrap/dist/css/bootstrap.css';

import './assets/css/teste.css';


// registrando o modelo plugin no Global Model view object
Vue.use(VueResource);
// registrando o VueRouter 
Vue.use(VueRouter);

// if para saber se estamos rodando Production ou Enviroment
Vue.http.options.root = process.env.API_URL ? process.env.API_URL : 'http://localhost:3000';

/*
// interceptadores de seguranca, adicionanm o header Authorization na aplicacao
// para evitar que seja adicionado em todas as rotas de componentes
Vue.http.interceptor.push((req, next)=>{
	// é possível colocar informações no header antes do envio da requisição
    req.headers.set('Authorization', 'informação de segurança aqui');
    console.log('Lidando com o request');

    next(res => {
      console.log('Lidando com a resposta')
      // é possível acessar os dados da reposta e realizar transformações antes
      console.log(res.body);
    });
})
*/



Validator.addLocale(msg);
Vue.use(VeeValidate, {
	locale: 'pt_BR'
});

const router = new VueRouter({
	routes: routes,
	mode:'history'
})

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})

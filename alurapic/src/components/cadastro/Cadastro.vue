<template> 
	<div>
		<h1 class='centralizado'>Cadastro</h1>
		<h2 class="centralizado"> {{ foto.titulo }} </h2>
		<h2 v-if='this.id' class='centralizado'>Alterando</h2>
		<h2 v-else='' class='centralizado'>Inserindo</h2>
		<h2 v-if='this.message' class="centralizado"> {{this.message}}</h2>
		<form v-on:submit.prevent='grava()'>
			<div class="controle">
				<label for='titulo'>Titulo</label>
				<input name='titulo' v-validate data-vv-rules='required|min:3|max:30' id='titulo' type="text" autocomplete="off" v-model='foto.titulo'>
				<span class='warning' v-show="errors.has('titulo')">{{errors.first('titulo')}}</span>
			</div>

			<div class='controle'>
				<label for='url'>Url</label>
				<input v-validate data-vv-rules='required' id ='url' type="text" name="url" autocomplete="off" v-model='foto.url'>
				<span class='warning' v-show="errors.has('url')">{{ errors.first('url')}}</span>
				<imagem-responsiva/>	
			</div>

			<div class='controle'>
				<label for='descricao'>Descricao</label>
				<textarea id='descricao' type="text" name="descricao" autocomplete="off" v-model.lazy='foto.descricao'></textarea>
			</div>

			<div class='centralizado'>
				<router-link v-bind:to="{ name: 'home'}"><meu-botao tipo='button' rotulo='VOLTAR' v-bind:confirmacao='false' ></meu-botao></router-link>
				<meu-botao rotulo='GRAVAR' tipo="submit" v-bind:confirmacao='false' />
			</div>
		</form>


	</div>
</template>

<script>

import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/Botao.vue';

import Foto from '../../domain/foto/Foto';
import FotoService from '../../domain/foto/FotoService';

export default {

	components: {
		'meu-botao': Botao,
		'imagem-responsiva': ImagemResponsiva
	},

	data() {
		return {
			foto: new Foto(),
			id: this.$route.params.id,
			message:''
		}
	},

	methods: {
		grava(){
			// $validator vem do vee-validate
			this.$validator
				// verifica se todos os campos estao validados antes de cadastrar
				.validateAll()
				.then(success => {
					this.service
						.cadastra(this.foto)
						.then(() => {
							if(this.id)	this.$router.push({ name: 'home'});
							this.foto = new Foto()
						}, err => this.message = err.message);
				});			
		// cadastro nova foto http.post	
		/*	this.$http.post('v1/fotos', this.foto)
				.then(() => this.foto = new Foto(), err => console.log('erro'))*/
		}
	},

	created(){
		this.service = new FotoService(this.$resource);
		
		if(this.id){
			// busca a foto na minha API
			this.service
				.busca(this.id)
				.then(foto => this.foto = foto, err => this.message = err.message);
		}
	}

}
</script>

<style scoped>
	.centralizado {
		text-align: center;
	}
	.controle {
		font-size: 1.2em;
		margin-bottom: 20px;
	}
	.controle label{
		display: block;
		font-weight: bold;
	}
	.controle label + input, .controle textarea {
		width: 100%;
		font-size: inherit;
		border-radius: 5px;
	}
	.centralizado {
		text-align: center;
	}

	.warning{
		color:red;
	}
</style>
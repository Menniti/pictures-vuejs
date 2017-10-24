<template>
	<button v-on:click="disparaAcao()" class='botao' :class='estiloBotao' v-bind:type="tipo">{{ rotulo }}</button>
</template>

<script>
export default {
	props:{
		tipo:{
			type:String,
			required: true,
		}, 
		rotulo:{
			type:String,
			required: true,
		}, 
		confirmacao:{
			type:Boolean,
			default:'False'
		}, 
		estilo:{
			type:String,
			default:'padrao'
		}
	},

	methods:{
		disparaAcao(){
			if(this.confirmacao){
				if(confirm('Confirma a acao?')){
					this.$emit('botaoAtivado');	
				}
				return;
			}
			this.$emit('botaoAtivado');
		}
	},

	computed:{
		estiloBotao() {
			if(this.estilo == 'padrao') return 'botao-padrao';
			if(this.estilo == 'perigo') return 'botao-perigo';
		}
	}
}
</script>

<style scoped lang="scss">
	// isolando o estilo em sass
	@import 'Botao.scss'

</style>
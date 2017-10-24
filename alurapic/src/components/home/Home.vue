<template>
  <div>
    <h1 class='centralizado'>{{ titulo }}</h1> 
    <h2 class="centralizado" v-if='this.message'>{{ this.message }}</h2>
    <input type="search" name="filtro" v-on:input="filtro = $event.target.value" placeholder="Search for name here" class='filtroFotos'>

    <ul class='lista-fotos'>
      <!-- Essa propriedade :key eh uma forma para Vue acompanhar a identidade de cada 'noh' de fotos -->
      <!-- <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto._id"> -->
      <li class='lista-fotos-item' v-for="foto of fotosComFiltro">
        <meu-painel v-bind:titulo="foto.titulo">
          <imagem-responsiva v-bind:src="foto.url" v-bind:alt="foto.titulo" v-meu-transform:scale.reverse.animate='30' >
          </imagem-responsiva>
          <router-link v-bind:to="{name:'altera', params:{ id: foto._id }}">
            <meu-botao rotulo='alterar' tipo='button' :confirmacao='false' />
          </router-link>
          <meu-botao rotulo='remover' tipo='button' :confirmacao='true' estilo="perigo" v-on:botaoAtivado="remove(foto)"></meu-botao>
        </meu-painel>
      </li>  
    </ul>
  </div>
</template>


<script>
import Painel from '../shared/painel/Painel.vue'
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue';
import Transform from '../../directives/Transform';
import FotoService from '../../domain/foto/FotoService';

export default {
  
  components: {
    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao': Botao
  },

  data(){
    return{
      titulo: 'Alurapic',
      fotos:[],
      filtro:'',
      message: ''
    }
  },

  methods:{
    remove(foto){
      
      this.service
        .apaga(foto._id)
        .then(() => {
          let indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice, 1);
          this.message = 'Foto apagada com sucesso'
        }, err => this.message = err.message);

      // remove foto usando $http.delete
      //this.$http.delete(`v1/fotos/${foto._id}`);

    }
  },

  directives:{
    'meu-transform': Transform
  },
  computed: {
      fotosComFiltro() {
        if(this.filtro){
          let exp = RegExp(this.filtro.trim(), 'i')
          return this.fotos.filter(foto => exp.test(foto.titulo));
        } else {
          return this.fotos;
        }
      }
  },

  created() {
    
    this.service = new FotoService(this.$resource);

    this.service
      .lista()
      .then(fotos => this.fotos = fotos, err => this.message = err.message);
    // lista fotos da API usando http.get
    /*this.$http.get('v1/fotos')
      .then(res => res.json())
      .then(fotos => this.fotos = fotos, err => console.log(err));
    */
    }
}
</script>

<style>

.centralizado {
  text-align: center;
}

.lista-fotos-item {
  display: inline-block;
  margin: 25px;
  width: 250px;
}

.image-responsiva {
  width: 100%;
}

.filtroFotos {
  width: 100%;
  max-width: 800px;
}


</style>
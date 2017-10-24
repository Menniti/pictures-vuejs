<template>
	<nav>
			<div class='navbar navbar-inverse'>
		    <li v-for="route of routes">
		      <router-link v-bind:to="route.path ? route.path : '/'">{{route.titulo}}</router-link>
		    </li>
	    </div>
	</nav>
</template>

<script>
export default {
	props:['routes']
}
</script>

<style scoped>

li {
	font-size: 40px;
	list-style-type: none;
	width: 25%;
	height: 100px;
	display: inline-block;
	text-align: center;
	margin: auto;
	padding-top: 20px;
}

a {
	color: white;
}
	
</style>
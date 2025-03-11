<script lang="ts">
	import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';
	import '../app.css';
	let { children } = $props();
</script>
<div class="flex flex-col min-h-screen">
	<Header />
	{@render children()}
	<Footer />
</div>

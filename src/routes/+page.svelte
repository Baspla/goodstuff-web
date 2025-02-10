<script lang="ts">
	import { isLoggedIn } from "$lib/auth.svelte";
	import { goto } from "$app/navigation";

	if (isLoggedIn()) {
		goto("/recommendations");
	}
</script>

<div class="flex h-full flex-col items-center justify-center text-white">
	<div class="mb-8">
		<!-- indigo to white gradient for text color (with background stroke clipping) -->
		<h2
			class="bg-gradient-to-r from-indigo-300 to-indigo-100 bg-clip-text px-3 font-serif text-9xl text-transparent"
		>
			Goodstuff
		</h2>
	</div>
	<div class="mb-[10vh] text-3xl font-extrabold tracking-wide md:text-4xl">
		Teile deine Empfehlungen zu <span class="rounded-lg bg-black/10 p-2 pr-4"
	><span
		class=" inline-flex h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] flex-col overflow-hidden text-indigo-500 md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))]"
	>
				<ul class="animate-text-slide-6 block text-left leading-tight [&_li]:block">
					<li>Games</li>
					<li>Filmen</li>
					<li>Podcasts</li>
					<li>Büchern</li>
					<li>Webseiten</li>
					<li>Serien</li>
					<li aria-hidden="true">Games</li>
				</ul>
			</span></span
	>
	</div>
</div>

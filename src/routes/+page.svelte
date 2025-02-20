<script lang="ts">
	import { isLoggedIn } from "$lib/scripts/auth.svelte.js";
	import { goto } from "$app/navigation";

	if (isLoggedIn()) {
		goto("/finds", { replaceState: true });
	}
</script>

<div class="flex h-full flex-col items-center justify-center mt-[30vh]">
	<div class="mb-8">
		<!-- indigo to white gradient for text color (with background stroke clipping) -->
		<h2
			class="bg-gradient-to-r dark:from-indigo-300 dark:to-indigo-100 from-indigo-600 to-indigo-400 bg-clip-text px-3 font-serif text-7xl text-transparent selection:text-white sm:text-8xl md:text-9xl"
		>
			Goodstuff
		</h2>
	</div>
	<div class="mb-[10vh] text-sm font-extrabold tracking-wide text-nowrap sm:text-xl md:text-3xl">
		Teile deine Bewertungen zu <span
		class="relative inline-block rounded-lg bg-indigo-100 dark:bg-indigo-900/10 pt-2 pl-2 pr-4">
			<span
				class="selection:text-white inline-flex h-[calc(theme(fontSize.sm)*theme(lineHeight.tight))] flex-col overflow-hidden text-indigo-500 sm:h-[calc(theme(fontSize.xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))]"
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
			</span>
		</span>
	</div>
</div>

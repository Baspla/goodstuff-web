export let outgoingLinkState: { visible: boolean; url: string; visible_before: boolean } = $state({
	visible: false,
	url: "",
	visible_before: false
});

export let searchState: { visible: boolean } = $state({
	visible: false
});

export let createRecommendationState: { visible: boolean } = $state({
	visible: false
});

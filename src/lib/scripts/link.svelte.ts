class Link {
	url: string | undefined = $state();
	warningVisible = $state(false);

	openLink = (url: string) => {
		this.url = url;
		this.warningVisible = true;
	};
}

export const link = new Link();

export function getHashColor(str: string) {
	const hash = generateHash(str);
	const colors = [
		"#bf6060", // Reddish
		"#bf7860", // Warm Orange
		"#bf9060", // Earthy Yellow
		"#bfa560", // Muted Gold
		"#bfb460", // Olive Yellow
		"#a5bf60", // Muted Green-Yellow
		"#86bf60", // Olive Green
		"#60bf60", // Soft Green
		"#60bf86", // Teal Green
		"#60bfa5", // Muted Teal
		"#60bfb4", // Soft Cyan
		"#60a5bf", // Cool Cyan
		"#6086bf", // Dusty Blue
		"#606cbf", // Muted Indigo
		"#605cbf", // Deep Periwinkle
		"#7860bf", // Soft Purple
		"#905fbf", // Muted Violet
		"#a560bf", // Warm Lavender
		"#b460bf", // Dusty Pinkish Purple
		"#bf60a5", // Deep Mauve
		"#bf6086", // Muted Rose
		"#bf6078" // Dusky Pink
	];

	return "background:" + colors[hash % colors.length];
}

export function getHashGradient(str: string) {
	const hash = generateHash(str);
	const directions = [
		"to left",
		"to right",
		"to top right",
		"to bottom right",
		"to bottom left",
		"to top left"
	];
	const fromColors = [
		"#d36a6a",
		"#bda065",
		"#6db6b6",
		"#73b673",
		"#5555ef",
		"#8635ca",
		"#5a275a",
		"#bd8e96"
	];
	const toColors = [
		"#ffaaaa",
		"#ffcc99",
		"#99cccc",
		"#99ff99",
		"#9999ff",
		"#cc99ff",
		"#993399",
		"#ff99cc"
	];

	const direction = directions[hash % directions.length];
	const fromColor = fromColors[(hash >> 1) % fromColors.length];
	const toColor = toColors[(hash >> 3) % toColors.length];

	// Construct the CSS gradient with RGBA colors
	return `background:linear-gradient(${direction}, rgba(${hexToRgb(fromColor)}), rgba(${hexToRgb(toColor)}))`;
}

function hexToRgb(hex: string): string {
	const bigint = parseInt(hex.slice(1), 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;
	return `${r}, ${g}, ${b}`;
}

export function getHashGradientTW(str: string) {
	const hash = generateHash(str);
	const directions = ["to-l", "to-r", "to-tr", "to-br", "to-bl", "to-tl"];
	const colors = ["red", "orange", "teal", "green", "blue", "indigo", "purple", "pink"];
	const values = [300, 500, 700];
	const values2 = [400, 600, 800];
	let output = "bg-gradient-";
	output += directions[hash % directions.length];
	output += " from-";
	output += colors[(hash >> 1) % colors.length];
	output += "-";
	output += values[(hash >> 2) % values.length];
	output += " to-";
	output += colors[(hash >> 3) % colors.length];
	output += "-";
	output += values2[(hash >> 4) % values2.length];
	return output;
}

function generateHash(input: string) {
	const num = Number(input) + 21;
	const prime = 2654435761;
	let hash = (num * prime) ^ (num >> 16);
	return Math.abs(hash % 10000) + 1;
}
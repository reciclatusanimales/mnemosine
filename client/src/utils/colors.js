export const colorTypes = new Map([
	["r", "rgb"],
	["#", "hex"],
	["h", "hsla"],
]);

export const getColorType = (color) => colorTypes.get(color[0]);

export const getArrayValuesFromString = (color) =>
	color.replace(/\W/gi, "").split("");

export const reverseHexShort = (color) =>
	color.reduce((acc, num) => {
		acc.push(num);
		acc.push(num);
		return acc;
	}, []);

export const transformHexValues = (color) =>
	color.reduce((acc, value, index) => {
		if (!(index % 2)) return acc;

		const decimalValue = parseInt(`${color[index - 1]}${value}`, 16);

		acc.push(decimalValue);

		return acc;
	}, []);

export const convertColorHexToRGBArray = (color) => {
	let normalizedHexColor;
	const hexColorArray = getArrayValuesFromString(color);

	if (hexColorArray.length <= 4) {
		normalizedHexColor = reverseHexShort(hexColorArray);
	}

	return transformHexValues(normalizedHexColor || hexColorArray);
};

export const isOpacityTransparent = (opacity) => {
	if (!opacity) return false;
	let opacityValue = opacity;

	if (Math.floor(opacity) === 0) {
		opacityValue = opacity * 100;
	}

	return opacityValue > 30;
};

export const getContrastRatio = (rgbColorArray) =>
	Math.round(
		(parseInt(rgbColorArray[0]) * 299 +
			parseInt(rgbColorArray[1]) * 587 +
			parseInt(rgbColorArray[2]) * 114) /
			1000
	);

export const getTextColor = (color) => {
	let rgbColorArray;
	const colorType = getColorType(color);

	if (!colorType || colorType === "hsla") {
		console.warn(
			new Error(`Unssuported color:
          if you are using a hsla color, is not supported due contrast ratio.
          also be careful with gradient background not suported by svgs.
          `)
		);
		return "black";
	}

	if (colorType === "hex") {
		rgbColorArray = convertColorHexToRGBArray(color);
	}

	if (colorType === "rgb") {
		rgbColorArray = color
			.replace(/((rgb|a)|(\(|\)))/g, "")
			.split(",")
			.map((str) => +str.trim());
	}

	if (isOpacityTransparent(rgbColorArray[3])) {
		return "black";
	}
	return getContrastRatio(rgbColorArray) > 256 ? "black" : "white";
};

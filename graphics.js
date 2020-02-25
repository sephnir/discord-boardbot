import { createCanvas, loadImage } from "canvas";

/**
 *
 * @param {*} inst Instance of the 'games' object
 */
export async function draw(inst) {
	const canvas = createCanvas(inst.canvas.width, inst.canvas.height);
	const ctx = canvas.getContext("2d");

	let drawables = inst.draw();

	await drawComponents(inst.canvas, ctx, drawables);
	return canvas.toBuffer();
}

async function drawComponents(instCanvas, ctx, drawables) {
	let promises = [];
	promises.push(loadImage(instCanvas.path));
	for (let drawable of drawables) {
		promises.push(loadImage(drawable.img));
	}

	let images = await Promise.all(promises);

	for (let i = 0; i < images.length; i++) {
		if (i == 0) {
			ctx.drawImage(images[i], 0, 0);
		} else {
			let di = i - 1;
			ctx.drawImage(
				images[i],
				drawables[di].x,
				drawables[di].y,
				drawables[di].w,
				drawables[di].h
			);
		}
	}
}

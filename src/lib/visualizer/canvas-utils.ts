export interface TextDrawOptions {
    font?: string;
    fillStyle?: string;
    textAlign?: CanvasTextAlign;
    textBaseline?: CanvasTextBaseline;
}

export interface ShapeDrawOptions {
    fillStyle?: string;
    strokeStyle?: string;
    lineWidth?: number;
}

export interface NodeDrawOptions extends ShapeDrawOptions {
    radius?: number;
    nodeFillStyle?: string;
    font?: string;
    textFillStyle?: string;
    textAlign?: CanvasTextAlign;
    textBaseline?: CanvasTextBaseline;
}

export interface EdgeDrawOptions extends ShapeDrawOptions {
    lineCap?: CanvasLineCap;
}

export function clearCanvas(context: CanvasRenderingContext2D, width: number, height: number) {
    context.clearRect(0, 0, width, height);
}

export function drawCenteredText(
    context: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    options: TextDrawOptions = {}
) {
    const {
        font = '20px system-ui',
        fillStyle = 'black',
        textAlign = 'center',
        textBaseline = 'middle'
    } = options;

    context.save();
    context.font = font;
    context.fillStyle = fillStyle;
    context.textAlign = textAlign;
    context.textBaseline = textBaseline;
    context.fillText(text, x, y);
    context.restore();
}

export function drawCircle(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    options: ShapeDrawOptions = {}
) {
    const {
        fillStyle = 'white',
        strokeStyle = 'white',
        lineWidth = 2
    } = options;

    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = fillStyle;
    context.fill();
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    context.stroke();
}

export const drawNode = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    value: string,
    options: NodeDrawOptions = {}
) => {
    const {
        radius = 18,
        nodeFillStyle = 'white',
        strokeStyle = 'white',
        lineWidth = 2,
        font = '20px system-ui',
        textFillStyle = 'black',
        textAlign = 'center',
        textBaseline = 'middle'
    } = options;

    drawCircle(context, x, y, radius, { fillStyle: nodeFillStyle, strokeStyle, lineWidth });
    drawCenteredText(context, value, x, y, { font, fillStyle: textFillStyle, textAlign, textBaseline });
};

export const drawEdge = (
    context: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    options: EdgeDrawOptions = {}
) => {
    const {
        strokeStyle = 'white',
        lineWidth = 2,
        lineCap = 'round'
    } = options;

    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.lineCap = lineCap;
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    context.stroke();
};

export function drawRoundedRect(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius = 8,
    options: ShapeDrawOptions = {}
) {
    const {
        fillStyle = 'white',
        strokeStyle = 'white',
        lineWidth = 2
    } = options;

    const clampedRadius = Math.max(0, Math.min(radius, Math.min(width, height) / 2));

    context.beginPath();
    context.moveTo(x + clampedRadius, y);
    context.lineTo(x + width - clampedRadius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + clampedRadius);
    context.lineTo(x + width, y + height - clampedRadius);
    context.quadraticCurveTo(x + width, y + height, x + width - clampedRadius, y + height);
    context.lineTo(x + clampedRadius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - clampedRadius);
    context.lineTo(x, y + clampedRadius);
    context.quadraticCurveTo(x, y, x + clampedRadius, y);
    context.closePath();

    context.fillStyle = fillStyle;
    context.fill();
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    context.stroke();
}
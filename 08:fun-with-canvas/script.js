class Draw {
    constructor() {
        this.isDrawing = false;
        this.direction = true;
        this.lastX = 0;
        this.lastY = 0;
        this.hue = 0;
    }
    get lastX() {
        return this._lastX;
    }

    get lastY() {
        return this._lastY;
    }

    set lastX(x) {
        this._lastX = x;
    }

    set lastY(y) {
        this._lastY = y;
    }

    setDrawing(flag) {
        if (typeof (flag) === 'boolean') {
            this.isDrawing = true;
        }
    }

    canDrawing() {
        return this.isDrawing;
    }

    changeHue() {
        this.hue++;
        if (this.hue >= 360)
            this.hue = 0;
    }

    changeDirection() {
        this.direction = !this.direction;
    }
}
document.addEventListener('DOMContentLoaded', function () {
    function draw(event) {
        // stop running function when
        // the mousedown event isn't fired
        if (!drawObject.canDrawing()) return;

        context.strokeStyle = `hsl(${drawObject.hue}, 100%, 70%)`
        context.beginPath();
        // start from
        context.moveTo(drawObject.lastX, drawObject.lastY);
        // go to
        context.lineTo(event.offsetX, event.offsetY);
        context.stroke();
        drawObject.changeHue();
        if (context.lineWidth >= 100 || context.lineWidth <= 1) {
            drawObject.changeDirection();
        }
        if (drawObject.direction) {
            context.lineWidth++;
        } else {
            context.lineWidth--;
        }
        [drawObject.lastX, drawObject.lastY] = [event.offsetX, event.offsetY];
    }

    const canvas = document.querySelector('#draw');
    // a 2d context
    const context = canvas.getContext('2d');
    [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];

    [context.strokeStyle, context.lineJoin, context.lineCap] = ['#BADA55', 'round', 'round'];

    const drawObject = new Draw();

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', () => {
        drawObject.setDrawing(true);
        [drawObject.lastX, drawObject.lastY] = [event.offsetX, event.offsetY];
    });
    canvas.addEventListener('mouseup', () => drawObject.setDrawing(false));
    canvas.addEventListener('mouseout', () => drawObject.setDrawing(false));
});


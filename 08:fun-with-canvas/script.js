var DrawObject = function () {
    return {
        isDrawing: false,
        lastX: 0,
        lastY: 0,
        hue: 0,
        direction: true,
    }
}

document.addEventListener('DOMContentLoaded', function () {
    function draw(event) {
        // stop running function when
        // the mousedown event isn't fired
        if (!drawObject.isDrawing) return;

        context.strokeStyle = `hsl(${drawObject.hue}, 100%, 70%)`
        context.beginPath();
        // start from
        context.moveTo(drawObject.lastX, drawObject.lastY);
        // go to
        context.lineTo(event.offsetX, event.offsetY);
        context.stroke();
        drawObject.hue++;
        if (drawObject.hue >= 360) {
            drawObject.hue = 0;
        }
        if (context.lineWidth >= 100 || context.lineWidth <= 1) {
            drawObject.direction = !drawObject.direction;
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

    drawObject = new DrawObject();

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', () => {
        drawObject.isDrawing = true;
        [drawObject.lastX, drawObject.lastY] = [event.offsetX, event.offsetY];
    });
    canvas.addEventListener('mouseup', () => drawObject.isDrawing = false);
    canvas.addEventListener('mouseout', () => drawObject.isDrawing = false)
});


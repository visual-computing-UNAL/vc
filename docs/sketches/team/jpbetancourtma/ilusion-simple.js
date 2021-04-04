let angle = 0

function setup() {
    createCanvas(300, 300);
}

function draw() {
    background(255, 255, 255);

    //Primer Ciclo
    fill(41, 133, 163)

    push()
    stroke(0, 255, 0)
    strokeWeight(4)
    translate(80, 80)
    rotate(HALF_PI + angle)
    arc(0, 0, 120, 120, PI, HALF_PI)
    pop()

    push()
    stroke(0, 0, 255)
    strokeWeight(4)
    translate(220, 80)
    rotate(HALF_PI * 2 - angle)
    arc(0, 0, 120, 120, PI, HALF_PI)
    pop()

    push()
    stroke(255, 0, 0)
    strokeWeight(4)
    translate(80, 220)
    rotate(HALF_PI * 4 - angle)
    arc(0, 0, 120, 120, PI, HALF_PI)
    pop()

    push()
    stroke(255, 255, 0)
    strokeWeight(4)
    translate(220, 220)
    rotate(HALF_PI * 3 + angle)
    arc(0, 0, 120, 120, PI, HALF_PI)
    pop()

    angle += 0.005
}
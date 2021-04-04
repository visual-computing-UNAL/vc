let angle = 0

function setup() {
    createCanvas(630, 200);
}

function draw() {
    background(255, 255, 255);

     //Primer Ciclo
    fill(90, 0, 157)
    stroke(204, 51, 0)

    push()
    strokeWeight(4)
    translate(50, 50)
    rotate(HALF_PI - angle)
    arc(0, 0, 90, 90, PI, HALF_PI)
    pop()

    push()
    strokeWeight(4)
    translate(150, 50)
    rotate(HALF_PI * 2 - angle)
    arc(0, 0, 90, 90, PI, HALF_PI)
    pop()

    push()
    strokeWeight(4)
    translate(50, 150)
    rotate(HALF_PI * 4 + angle)
    arc(0, 0, 90, 90, PI, HALF_PI)
    pop()

    push()
    strokeWeight(4)
    translate(150, 150)
    rotate(HALF_PI * 3 + angle)
    arc(0, 0, 90, 90, PI, HALF_PI)
    pop()

    //Segundo Ciclo
    fill(90, 0, 157)
    stroke(0, 204, 0)
    
    push()
    strokeWeight(4)
    translate(250, 50)
    rotate(HALF_PI * 3 - angle)
    arc(0, 0, 90, 90, PI, HALF_PI)
    pop()

    push()
    strokeWeight(4)
    translate(350, 50)
    rotate(HALF_PI * 4 - angle)
    arc(0, 0, 90, 90, PI, HALF_PI)
    pop()

    push()
    strokeWeight(4)
    translate(250, 150)
    rotate(HALF_PI * 2 + angle)
    arc(0, 0, 90, 90, PI, HALF_PI)
    pop()

    push()
    strokeWeight(4)
    translate(350, 150)
    rotate(HALF_PI + angle)
    arc(0, 0, 90, 90, PI, HALF_PI)
    pop()

    //First
    fill(90, 0, 157)
    stroke(0, 153, 204)

    push()
    strokeWeight(4)
    translate(450, 50)
    rotate(HALF_PI - angle)
    arc(0, 0, 90, 90, PI, HALF_PI)
    pop()

    push()
    strokeWeight(4)
    translate(550, 50)
    rotate(HALF_PI * 2 - angle)
    arc(0, 0, 90, 90, PI, HALF_PI)
    pop()

    push()
    strokeWeight(4)
    translate(450, 150)
    rotate(HALF_PI * 4 + angle)
    arc(0, 0, 90, 90, PI, HALF_PI)
    pop()

    push()
    strokeWeight(4)
    translate(550, 150)
    rotate(HALF_PI * 3 + angle)
    arc(0, 0, 90, 90, PI, HALF_PI)
    pop()

    angle += 0.015
}
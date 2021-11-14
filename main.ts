bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.House)
    connected = 1
    while (connected == 1) {
        rec_data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
        serial.writeString(rec_data)
        serial.writeLine("")
        Control_Car()
        Control_RGB()
    }
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.Sad)
})
function Control_Car () {
    if (rec_data == "p") {
        speed_val = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
        speed = parseFloat(speed_val)
        serial.writeNumber(speed)
        serial.writeLine("")
    }
    if (rec_data == "F") {
        DeskBit.Run(DIR.runForward, speed)
    } else if (rec_data == "L") {
        DeskBit.Run(DIR.leftRotation, speed)
    } else if (rec_data == "R") {
        DeskBit.Run(DIR.rightRotation, speed)
    } else if (rec_data == "B") {
        DeskBit.Run(DIR.runBack, speed)
    } else if (rec_data == "Q") {
        DeskBit.Run2(L_R.left, F_B.forward, 50)
        DeskBit.Run2(L_R.right, F_B.forward, 100)
    } else if (rec_data == "E") {
        DeskBit.Run2(L_R.left, F_B.forward, 100)
        DeskBit.Run2(L_R.right, F_B.forward, 50)
    } else if (rec_data == "S") {
        DeskBit.Stop()
    } else if (rec_data == "o") {
        basic.showIcon(IconNames.House)
    } else if (rec_data == "u") {
        arm_flag = 1
    } else if (rec_data == "d") {
        arm_flag = 2
    } else if (rec_data == "m") {
        arm_flag = 0
    } else if (rec_data == "1") {
        DeskBit.Shovel(90)
        basic.pause(200)
        DeskBit.Shovel(30)
        basic.pause(200)
        DeskBit.Shovel(90)
        basic.pause(200)
        DeskBit.Shovel(0)
        basic.pause(200)
    } else if (rec_data == "2") {
        DeskBit.Shovel(120)
        basic.pause(200)
        basic.showIcon(IconNames.Heart)
        basic.pause(1000)
        DeskBit.Shovel(0)
        basic.pause(200)
        basic.showIcon(IconNames.House)
    } else if (rec_data == "3") {
        DeskBit.Run2(L_R.left, F_B.forward, 0)
        DeskBit.Run2(L_R.right, F_B.forward, 50)
    } else if (rec_data == "4") {
        DeskBit.Run2(L_R.left, F_B.forward, 50)
        DeskBit.Run2(L_R.right, F_B.forward, 0)
    } else if (rec_data == "5") {
        DeskBit.Run(DIR.leftRotation, 100)
        basic.pause(1000)
        random_val = randint(1, 6)
        basic.showNumber(random_val)
    } else if (rec_data == "6") {
        for (let index = 0; index <= 4; index++) {
            strip.setPixelColor(index, neopixel.colors(NeoPixelColors.Blue))
            strip.show()
            basic.pause(500)
        }
        basic.pause(200)
        strip.clear()
        strip.show()
    } else if (rec_data == "n") {
        DeskBit.Stop()
        strip.clear()
        strip.show()
    }
}
function Control_RGB () {
    if (rec_data == "c") {
        RGB_val += 1
        if (RGB_val >= 9) {
            RGB_val = 9
        }
    } else if (rec_data == "b") {
        RGB_val += -1
        if (RGB_val <= 1) {
            RGB_val = 1
        }
    } else if (rec_data == "s") {
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
        RGB_val = 0
    } else if (rec_data == "g") {
        RGB_bright = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
        RGB_brightness = parseFloat(RGB_bright)
        serial.writeNumber(RGB_brightness)
        serial.writeLine("")
        strip.setBrightness(RGB_brightness)
        strip.show()
    }
    if (RGB_val == 1) {
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        strip.setBrightness(RGB_brightness)
        strip.show()
    } else if (RGB_val == 2) {
        strip.showColor(neopixel.colors(NeoPixelColors.Orange))
        strip.setBrightness(RGB_brightness)
        strip.show()
    } else if (RGB_val == 3) {
        strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
        strip.setBrightness(RGB_brightness)
        strip.show()
    } else if (RGB_val == 4) {
        strip.showColor(neopixel.colors(NeoPixelColors.Green))
        strip.setBrightness(RGB_brightness)
        strip.show()
    } else if (RGB_val == 5) {
        strip.showColor(neopixel.colors(NeoPixelColors.Blue))
        strip.setBrightness(RGB_brightness)
        strip.show()
    } else if (RGB_val == 6) {
        strip.showColor(neopixel.colors(NeoPixelColors.Indigo))
        strip.setBrightness(RGB_brightness)
        strip.show()
    } else if (RGB_val == 7) {
        strip.showColor(neopixel.colors(NeoPixelColors.Violet))
        strip.setBrightness(RGB_brightness)
        strip.show()
    } else if (RGB_val == 8) {
        strip.showColor(neopixel.colors(NeoPixelColors.Purple))
        strip.setBrightness(RGB_brightness)
        strip.show()
    } else if (RGB_val == 9) {
        strip.showColor(neopixel.colors(NeoPixelColors.White))
        strip.setBrightness(RGB_brightness)
        strip.show()
    }
}
function Control_Arm () {
    if (arm_flag == 1) {
        arm_angle += 1
        serial.writeString("" + (arm_angle))
        serial.writeLine("")
        if (arm_angle >= 180) {
            arm_angle = 180
        }
        DeskBit.Shovel(arm_angle)
    }
    if (arm_flag == 2) {
        arm_angle += -1
        serial.writeString("" + (arm_angle))
        serial.writeLine("")
        if (arm_angle <= 0) {
            arm_angle = 0
        }
        DeskBit.Shovel(arm_angle)
    }
}
let RGB_bright = ""
let random_val = 0
let speed_val = ""
let rec_data = ""
let connected = 0
let RGB_brightness = 0
let speed = 0
let RGB_val = 0
let arm_flag = 0
let arm_angle = 0
let strip: neopixel.Strip = null
serial.redirectToUSB()
strip = neopixel.create(DigitalPin.P0, 5, NeoPixelMode.RGB)
DeskBit.Shovel(0)
basic.showIcon(IconNames.Happy)
arm_angle = 0
arm_flag = 0
RGB_val = 0
speed = 100
RGB_brightness = 150
strip.clear()
strip.show()
basic.forever(function () {
    Control_Arm()
})

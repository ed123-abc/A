def Select_Mode():
    global car_mode
    if rec_data == "Q":
        car_mode = 1
    elif rec_data == "W":
        car_mode = 2
    elif rec_data == "E":
        car_mode = 3
    elif rec_data == "A":
        car_mode = 0
        k_Bit.car_stop()

def on_bluetooth_connected():
    global connected, rec_data
    basic.show_icon(IconNames.HEART)
    connected = 1
    while connected == 1:
        rec_data = bluetooth.uart_read_until(serial.delimiters(Delimiters.HASH))
        serial.write_string(rec_data)
        serial.write_line("")
        Control_Car()
        Select_Mode()
        control_RGB()
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_bluetooth_disconnected():
    basic.show_icon(IconNames.SAD)
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

def control_RGB():
    if rec_data == "r":
        k_Bit.led(COLOR.RED)
    elif rec_data == "g":
        k_Bit.led(COLOR.GREEN)
    elif rec_data == "b":
        k_Bit.led(COLOR.BLUE)
    elif rec_data == "y":
        k_Bit.set_led(255, 255, 0)
    elif rec_data == "c":
        k_Bit.set_led(100, 200, 100)
    elif rec_data == "p":
        k_Bit.set_led(255, 100, 255)
    elif rec_data == "x":
        k_Bit.off_led()
def car_avoid():
    pass
def Control_Car():
    if rec_data == "F":
        k_Bit.run(DIR.RUN_FORWARD, 80)
    elif rec_data == "B":
        k_Bit.run(DIR.RUN_BACK, 80)
    elif rec_data == "L":
        k_Bit.run(DIR.TURN_LEFT, 80)
    elif rec_data == "R":
        k_Bit.run(DIR.TURN_RIGHT, 80)
    elif rec_data == "S":
        k_Bit.car_stop()
def control_Neopixel():
    global Neo_data
    if rec_data == "h":
        Neo_data = 1
    elif rec_data == "j":
        Neo_data = 2
    elif rec_data == "k":
        Neo_data = 3
    elif rec_data == "l":
        Neo_data = 4
    elif rec_data == "m":
        Neo_data = 5
def car_follow():
    pass
def car_Tracking():
    pass
Neo_data = 0
connected = 0
car_mode = 0
rec_data = ""
serial.redirect_to_usb()
strip = neopixel.create(DigitalPin.P0, 24, NeoPixelMode.RGB)
strip.clear()

def on_forever():
    if car_mode == 1:
        car_avoid()
    elif car_mode == 2:
        car_follow()
    elif car_mode == 3:
        car_Tracking()
    if Neo_data == 1:
        strip.show_rainbow(1, 360)
    elif Neo_data == 2:
        strip.show_color(neopixel.colors(NeoPixelColors.RED))
    elif Neo_data == 3:
        strip.show_color(neopixel.colors(NeoPixelColors.INDIGO))
    elif Neo_data == 4:
        strip.show_bar_graph(0, 255)
    elif Neo_data == 5:
        strip.clear()
basic.forever(on_forever)

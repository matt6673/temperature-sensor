input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    Target_Temperature += 1
    basic.showString("T")
    basic.showNumber(Target_Temperature)
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    basic.showNumber(input.temperature())
    basic.clearScreen()
})
input.onGesture(Gesture.Shake, function on_gesture_shake() {
    control.reset()
})
let Heating = false
let Air_Conditioning = false
let Target_Temperature = 0
Target_Temperature = 0
serial.redirect(SerialPin.USB_TX, SerialPin.USB_RX, BaudRate.BaudRate115200)
serial.redirectToUSB()
basic.forever(function on_forever() {
    
    if (input.temperature() > Target_Temperature) {
        Air_Conditioning = true
    } else if (input.temperature() < Target_Temperature) {
        Heating = true
    } else {
        basic.showLeds(`
            . . . . .
                        # # # # #
                        . . . . .
                        # # # # #
                        . . . . .
        `)
    }
    
    serial.writeNumber(input.temperature())
    serial.writeNumber(Target_Temperature)
    serial.writeString("" + ("" + Heating))
    serial.writeString("" + ("" + Air_Conditioning))
    serial.writeLine("")
    basic.pause(5000)
})

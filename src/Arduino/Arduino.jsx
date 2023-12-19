#define BLYNK_PRINT Serial
#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>
#include <Adafruit_Fingerprint.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h> 

// Inisialisasi objek LCD dengan alamat I2C
LiquidCrystal_I2C lcd(0x27, 16, 2); // Alamat I2C 0x27, 16 kolom, 2 baris


#define BLYNK_AUTH_TOKEN "Oz7BdXK-3q5BlpFZieC5DZ7BQl4u21PC"

char auth[] = BLYNK_AUTH_TOKEN;
char ssid[] = "Afinalarasati";
char pass[] = "larascantik";

#define lock D6

SoftwareSerial mySerial(13, 15); //RX = D2, TX = D3

Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

BLYNK_WRITE(V1) {
 int value = param.asInt();
  digitalWrite(lock, value);
  lcd.clear();
  if (value == HIGH) {
    lcd.setCursor(2, 0);
    lcd.print("===PINTU===");
    lcd.setCursor(2, 1);
    lcd.print("===BUKA ===");
  } else {
    lcd.setCursor(2, 0);
    lcd.print("===PINTU===");
    lcd.setCursor(2, 1); 
    lcd.print("===TUTUP===");
  }
}
#include <Arduino.h>

// ULTRASONIC SENSOR
int TRIG = 25;
int ECHO = 26;
int DURATION;
int DISTANCE;

void setup() {  
  // SERIAL
  Serial.begin(115200);
  // ULTRASONIC SENSOR
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
}
 
 
void loop() {
  digitalWrite(TRIG,HIGH);
  delay(1);
  digitalWrite(TRIG,LOW);
  DURATION = pulseIn(ECHO,HIGH);
  DISTANCE = DURATION / 58.2;
 
  if(DISTANCE > 0 && DISTANCE < 50 ){
    Serial.println(DISTANCE);
    delay(100);
  }
}
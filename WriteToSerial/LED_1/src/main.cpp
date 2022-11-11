#include <Arduino.h>
#include <FastLED.h>


#define NUM_LEDS 10
#define DATA_PIN 25

CRGB leds[NUM_LEDS];

struct Channels{
    int R;
    int G;
    int B;
};
 
void setup() { 
    Serial.begin(115200);
    FastLED.addLeds<WS2812B, DATA_PIN, GRB>(leds, NUM_LEDS);  // GRB ordering is typical
    FastLED.setBrightness(10);
}

void loop() { 
  
  if (Serial.available()){ 

    for (int i = 0; i < NUM_LEDS; i++){

      int red = Serial.parseInt();
      int green = Serial.parseInt();
      int blue = Serial.parseInt();

      Channels color = {red, green, blue};

      leds[i] = CRGB(color.R, color.G, color.B);
      FastLED.show();
      // clear this led for the next time around the loop
      // leds[i] = CRGB::Black;
      // delay(30);

      // Serial.print("r");
      // Serial.println(color.R);

      // Serial.println(",");

      // Serial.print("g");
      // Serial.print(green);

      // Serial.println(",");

      // Serial.print("b");
      // Serial.print(blue);

    }
  }

}

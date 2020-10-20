#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <ESP8266HTTPClient.h>

#include <WiFiClient.h>
#include <ArduinoJson.h>
#include "creds.h"

ESP8266WiFiMulti WiFiMulti;

#define ledPin D6
bool lightState = false;
void setup() {

  Serial.begin(115200);
  // Serial.setDebugOutput(true);

  Serial.println();
  Serial.println();
  Serial.println();

  for (uint8_t t = 4; t > 0; t--) {
    Serial.printf("[SETUP] WAIT %d...\n", t);
    Serial.flush();
    delay(1000);
  }

  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(wifiName, wifiPass);
  Serial.print(WiFi.macAddress());
  pinMode(ledPin,OUTPUT);
  digitalWrite(ledPin, HIGH);
  delay(1000);
  digitalWrite(ledPin, LOW);
}

void loop() {
  // wait for WiFi connection
  if ((WiFiMulti.run() == WL_CONNECTED)) {

    WiFiClient client;

    HTTPClient http;

    Serial.print("[HTTP] begin...\n");
    String httpString = "";
    DynamicJsonDocument doc(2048);
    doc["macAdress"] = "crossman"; 
    //swap to our web server
    if(lightState==true) {
      httpString =  "http://10.1.1.236:1234/jobs";
      doc["status"] = "true";
    } else {
      httpString = "http://10.1.1.236:1234/jobs";
      doc["status"] = "false";
    }
    if (http.begin(client, httpString)) {  // HTTP
      //json
      Serial.print("[HTTP] GRy...\n");
      String json;
      serializeJson(doc,json);
      Serial.println(json + "data being sent");
      http.addHeader("Content-Type", "application/json");
      int httpCode = http.POST(json);
      // httpCode will be negative on error
      if (httpCode > 0) {
        // HTTP header has been send and Server response header has been handled
        Serial.printf("[HTTP] GET... code: %d\n", httpCode);

        // file found at server
        if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
          String payload = http.getString();
          Serial.println(payload);
          if (payload != "" ) {
            String jsonMsg = payload;
            StaticJsonDocument<500> doc;
            deserializeJson(doc,jsonMsg);
            //Serial.print(doc.as<String>());
            if(doc["command"] == "true") {
              Serial.print("light should be on");
              digitalWrite(ledPin,HIGH);
              lightState = true;
        
            } else if(doc["command"] == "false") {
              digitalWrite(ledPin,LOW);
              lightState=false;
            }
          }
        }
      } else {
        Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
        digitalWrite(ledPin,HIGH);
      }

      http.end();
    } else {
      Serial.printf("[HTTP} Unable to connect\n");
    }
  }
  // lower the dealy
  delay(2000);
}

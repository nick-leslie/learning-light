#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <ESP8266HTTPClient.h>

#include <WiFiClient.h>
#include <ArduinoJson.h>
#include "creds.h"

ESP8266WiFiMulti WiFiMulti;

#define ledPin D7
#define warning D4

bool lightState = false;
unsigned long lightOnTime;
static unsigned long millTillOff = 500000;
//String httpString =  "http://learning-light-1173896254.us-east-2.elb.amazonaws.com/jobs";
String httpString = "http://10.1.1.240:1234/jobs";
static int REQUESTDELAY=500;

void setup() {

  Serial.begin(115200);
  //Serial.setDebugOutput(true);

  Serial.println();
  Serial.println();
  Serial.println();
  for (uint8_t t = 4; t > 0; t--) {
    Serial.printf("[SETUP] WAIT %d...\n", t);
    Serial.flush();
    delay(1000);
  }

  WiFi.mode(WIFI_STA);
  //Serial.printf("Wi-Fi mode set to WIFI_STA %s\n", WiFi.mode(WIFI_STA) ? "" : "Failed!");
  WiFiMulti.addAP(wifiName, wifiPass);
  Serial.println();
  Serial.println(WiFi.macAddress());
  Serial.println(WiFi.localIP());
  pinMode(ledPin,OUTPUT);
  pinMode(warning, OUTPUT);
  digitalWrite(ledPin, HIGH);
  delay(1000);
  digitalWrite(ledPin, LOW);
  delay(500);
  digitalWrite(warning,HIGH);
  delay(1000);
  digitalWrite(warning,LOW);
}

void loop() {
  // wait for WiFi connection
  if ((WiFiMulti.run() == WL_CONNECTED)) {

    WiFiClient client;

    HTTPClient http;

    Serial.print("[HTTP] begin...\n");
    DynamicJsonDocument doc(2048);
    doc["macAdress"] = WiFi.macAddress(); 
    //swap to our web server
    if(lightState==true) {
      doc["status"] = "true";
    } else if(lightState==false) {
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
        Serial.printf("[HTTP] %d\n",httpCode);
        Serial.printf("[HTTP] GET... code: %d\n", httpCode);
        digitalWrite(warning,LOW);
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
               lightOnTime = millis();
            } else if(doc["command"] == "false") {
              digitalWrite(ledPin,LOW);
              lightState=false;
            }
          }
        }
      } else {
        Serial.printf("[HTTP] %d\n",httpCode);
        Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
        digitalWrite(warning,HIGH);
      }

      http.end();
      if(millis() - lightOnTime > millTillOff) {
        digitalWrite(ledPin,LOW);
        lightState=false;
      }
    } else {
      Serial.printf("[HTTP} Unable to connect\n");
    }
  } else {
    Serial.printf("no wifi connection %d\n", WiFi.status());
    digitalWrite(warning,HIGH);
  }
  // lower the dealy
  delay(REQUESTDELAY);
}

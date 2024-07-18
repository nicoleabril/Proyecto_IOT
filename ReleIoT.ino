#include <PubSubClient.h>
#include <ESP8266WiFi.h>


// Mapa de pines físicos a números de GPIO
const int D0 = 16;
const int D1 = 5;
const int D2 = 4;
const int D3 = 0;
const int D4 = 2;
const int D5 = 14;
const int D6 = 12;
const int D7 = 13;
const int D8 = 15;
const int D9 = 3;
const int D10 = 1;



// Wifi config
const char* ssid = "IoT_God";
const char* password = "god12345";


const char* mqtt_server = "192.168.1.2";

WiFiClient espClient;
PubSubClient client(espClient);


const int ledPin = D4;  // LED integrado en ESP8266 (GPIO2)
const int relayPin = D1; 
const int redPin = D2;   
const int bluePin = D3;  
const int greenPin = D4; 

void controlVents(char mode) {
  if (mode == '1') {
    digitalWrite(relayPin, HIGH); 
  } else if (mode == '0') {
    digitalWrite(relayPin, LOW); 
  }
}

void controlRGB(char color, int value) {
  int pin;
  switch(color) {
    case 'R': pin = redPin; break;
    case 'G': pin = greenPin; break;
    case 'B': pin = bluePin; break;
    default: return;
  }
  analogWrite(pin, value);
}

void callback(char* topic, byte* payload, unsigned int length) {
  String msg;
  for (unsigned int i = 0; i < length; i++) {
    msg += (char)payload[i];
  }
  
  if (String(topic) == "FAN") {
    controlVents(msg.charAt(0));
  } else if (String(topic) == "LED") {
    char color = msg.charAt(0);
    int value = msg.substring(1).toInt();
    controlRGB(color, value);
  }
}

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Conectando a ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    for (int i = 0; i < 5; i++) {
      digitalWrite(ledPin, LOW);  // apagado
      delay(100);
      digitalWrite(ledPin, HIGH); // encendido
      delay(100);
    }
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi conectado");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  digitalWrite(ledPin, LOW); 
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Intentando conexion MQTT...");
    if (client.connect("ESP8266Client")) {
      Serial.println("conectado");
      client.subscribe("LED");
      client.subscribe("FAN");
    } else {
      Serial.print("fallo, rc=");
      Serial.print(client.state());
      Serial.println(" intentando de nuevo en 5 segundos");
      delay(5000);
    }
  }
}

void setup() {
  pinMode(ledPin, OUTPUT); 
  pinMode(relayPin, OUTPUT); 
  pinMode(redPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  Serial.begin(115200);      
  digitalWrite(relayPin, LOW); 
  digitalWrite(redPin, LOW);
  digitalWrite(bluePin, LOW);
  digitalWrite(greenPin, LOW);
  digitalWrite(ledPin, HIGH); // apagado

  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}

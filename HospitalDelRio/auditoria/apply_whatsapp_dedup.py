#!/usr/bin/env python3
"""Elimina el campo Whatsapp 2 (duplicado del mismo número que ya está en WhatsApp) para 11 doctores."""
import requests, json, time

TOKEN = None
for line in open("/Users/mau/Developer/work/hospital-del-rio/.claude/secrets/webflow-token.env"):
    if line.startswith("WEBFLOW_API_TOKEN="):
        TOKEN = line.strip().split("=", 1)[1]

COLLECTION = "6a3189ba0285533232040331"
HEADERS = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
BASE = f"https://api.webflow.com/v2/collections/{COLLECTION}/items"

ITEM_IDS = [
    "6a54d21313dd3bf3f89c5a05",  # Claudio Galarza
    "6a54d210dcbdc6600f2e955a",  # Christian Ochoa Ramírez
    "6a54d29d59e9aa02a0a3915c",  # Juan Carlos Verdugo Tapia
    "6a54d260b612b7f6c11df5ea",  # Fidel Nivelo G.
    "6a54d24be97151d6ff8cd437",  # Octavio Enrique Viteri León
    "6a54d1fc8a6d86fced7b6f6d",  # Anyi Machuca Castrellón
    "6a54d1f83594818e73ea18e9",  # Andres Esteban Delgado Ponce
    "6a54d255bff580afc1dd379f",  # Fabián Andrés Merchán Bustos
    "6a54d24936e990a2e22fadad",  # Manuel Eduardo Verdugo Tapia
    "6a54d26237de3718614a0fd5",  # Franklin Xavier Bravo Aguilar
    "6a54d24ab662e7aa3840e7f9",  # Leticia Elizabeth Pacheco Quito
]

results = []
for item_id in ITEM_IDS:
    r = requests.patch(f"{BASE}/{item_id}", headers=HEADERS, json={"fieldData": {"whatsapp-2": None}})
    results.append((item_id, r.status_code))
    print(item_id, "->", r.status_code)
    time.sleep(0.3)

pub = requests.post(f"https://api.webflow.com/v2/collections/{COLLECTION}/items/publish",
                     headers=HEADERS, json={"itemIds": ITEM_IDS})
print("Publish status:", pub.status_code, pub.text[:300])
json.dump(results, open("cms/whatsapp-dedup-applied.json", "w"), indent=2)

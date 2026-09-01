#!/usr/bin/env python3
"""Aplica las 3 correcciones de WhatsApp confirmadas por Mau."""
import requests, json, time

TOKEN = None
for line in open("/Users/mau/Developer/work/hospital-del-rio/.claude/secrets/webflow-token.env"):
    if line.startswith("WEBFLOW_API_TOKEN="):
        TOKEN = line.strip().split("=", 1)[1]

COLLECTION = "6a3189ba0285533232040331"
HEADERS = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
BASE = f"https://api.webflow.com/v2/collections/{COLLECTION}/items"

UPDATES = [
    ("6a567e492f69e5dfe9643e1d", "Diego Xavier Maldonado Vega",
     {"whatsapp": "https://wa.me/593983037768", "whatsapp-2": None}),
    ("6a54d30ed2181feb90de8d4f", "Hernan Patricio Martínez Calderón",
     {"whatsapp": None}),
    ("6a54d2abb1043d6b41bf9bef", "Juan Pablo Valdivieso Aguirre",
     {"whatsapp": "https://wa.me/593984235053"}),
]

results = []
item_ids = []
for item_id, nombre, patch in UPDATES:
    r = requests.patch(f"{BASE}/{item_id}", headers=HEADERS, json={"fieldData": patch})
    results.append((nombre, item_id, r.status_code))
    print(nombre, "->", r.status_code)
    item_ids.append(item_id)
    time.sleep(0.3)

pub = requests.post(f"https://api.webflow.com/v2/collections/{COLLECTION}/items/publish",
                     headers=HEADERS, json={"itemIds": item_ids})
print("Publish status:", pub.status_code, pub.text[:300])
json.dump(results, open("cms/phone-fixes-applied.json", "w"), indent=2, ensure_ascii=False)

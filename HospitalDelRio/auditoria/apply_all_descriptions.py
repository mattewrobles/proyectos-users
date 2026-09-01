#!/usr/bin/env python3
"""Publica las 177 descripciones corregidas/creadas en Webflow."""
import requests, json, time

TOKEN = None
for line in open("/Users/mau/Developer/work/hospital-del-rio/.claude/secrets/webflow-token.env"):
    if line.startswith("WEBFLOW_API_TOKEN="):
        TOKEN = line.strip().split("=", 1)[1]

COLLECTION = "6a3189ba0285533232040331"
HEADERS = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
BASE = f"https://api.webflow.com/v2/collections/{COLLECTION}/items"

docs = json.load(open("cms/all-description-updates.json", encoding="utf-8"))

results = []
success_ids = []
for d in docs:
    item_id = d["item_id"]
    r = requests.patch(f"{BASE}/{item_id}", headers=HEADERS,
                        json={"fieldData": {"long-description": d["descripcion_propuesta"]}})
    ok = r.status_code == 200
    results.append({"nombre": d["nombre"], "item_id": item_id, "status": r.status_code, "error": None if ok else r.text[:200]})
    print(d["nombre"], "->", r.status_code)
    if ok:
        success_ids.append(item_id)
    time.sleep(0.25)

json.dump(results, open("cms/description-updates-applied.json", "w"), indent=2, ensure_ascii=False)
print(f"\nOK: {len(success_ids)}/{len(docs)}")

# Publicar en lotes de 100 (límite de la API)
for i in range(0, len(success_ids), 100):
    batch = success_ids[i:i+100]
    pub = requests.post(f"https://api.webflow.com/v2/collections/{COLLECTION}/items/publish",
                         headers=HEADERS, json={"itemIds": batch})
    print(f"Publish batch {i}-{i+len(batch)}: {pub.status_code}", pub.text[:200])

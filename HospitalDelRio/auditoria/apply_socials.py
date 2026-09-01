#!/usr/bin/env python3
import os, requests, json, time

TOKEN = None
for line in open("/Users/mau/Developer/work/hospital-del-rio/.claude/secrets/webflow-token.env"):
    if line.startswith("WEBFLOW_API_TOKEN="):
        TOKEN = line.strip().split("=", 1)[1]

COLLECTION = "6a3189ba0285533232040331"
HEADERS = {"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"}
BASE = f"https://api.webflow.com/v2/collections/{COLLECTION}/items"

UPDATES = [
    # (item_id, nombre, fieldData patch, note)
    ("6a54d292b1043d6b41bf8daf", "Jose Luis Izquierdo Coronel",
     {"instagram": "https://www.instagram.com/tipsdentalec/", "facebook": "https://www.facebook.com/profile.php?id=100063482353492"}),
    ("6a54d349acbc5ce17b9ff8a3", "Maria Verónica Arévalo Moscoso",
     {"instagram": "https://www.instagram.com/tipsdentalec/", "facebook": "https://www.facebook.com/profile.php?id=100063482353492"}),
    ("6a84db3769e80750cff0dc67", "Juan Francisco Carrión",
     {"facebook": "https://www.facebook.com/drjuancarrion/"}),
    ("6a54d26237de3718614a0fd5", "Franklin Xavier Bravo Aguilar",
     {"instagram": "https://www.instagram.com/traumatologos_bravo/"}),
    ("6a54d215e22eae1436a5603d", "Christian Romeo Bravo Aguilar",
     {"instagram": "https://www.instagram.com/traumatologos_bravo/"}),
    ("6a54d221b2d9486b374d6503", "Diana Carolina Izquierdo Coronel",
     {"facebook": "https://www.facebook.com/Dra.DCIC.Diabetologa.Nutricion/?locale=es_LA"}),
    ("6a54d1d6b2d9486b374d2c5c", "Andrea Susana Astudillo Carrera",
     {"facebook": "https://www.facebook.com/DraAndreaAstudillo/", "linkedin": "https://www.linkedin.com/in/andrea-astudillo-82411b61/"}),
    ("6a7f8791b21c62bc60843272", "Juan Pablo Arias Cortez",
     {"instagram": "https://www.instagram.com/drjparias/", "sitio-web": "https://drarias.com.ec/", "tiktok": "https://www.tiktok.com/@drjparias"}),
    ("6a54d2fdf590e02a7d09fc56", "Miguel Estuardo Molina Maldonado — LIMPIEZA (redes de otro doctor)",
     {"instagram": None, "facebook": None, "linkedin": None, "tiktok": None, "whatsapp": None, "sitio-web": None}),
]

results = []
for item_id, nombre, patch in UPDATES:
    r = requests.patch(f"{BASE}/{item_id}", headers=HEADERS, json={"fieldData": patch})
    ok = r.status_code == 200
    results.append((nombre, item_id, ok, r.status_code, r.text[:200] if not ok else ""))
    print(nombre, "->", r.status_code)
    time.sleep(0.3)

# Publish all touched items
item_ids = [u[0] for u in UPDATES]
pub = requests.post(f"https://api.webflow.com/v2/collections/{COLLECTION}/items/publish",
                     headers=HEADERS, json={"itemIds": item_ids})
print("Publish status:", pub.status_code, pub.text[:300])

json.dump(results, open("cms/socials-applied.json", "w"), indent=2, ensure_ascii=False)

import csv

with open('/workspace/plan-model-time-relation.csv', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    rows = list(reader)
    print("Columns:", reader.fieldnames)
    print("Total rows:", len(rows))
    for r in rows[:5]:
        print(r['节点'], "|", r['前置节点编号'], "|", r['前置节点'])

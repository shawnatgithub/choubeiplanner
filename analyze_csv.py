import csv

with open('/workspace/plan-model-time-relation.csv', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    print("Columns:", reader.fieldnames)
    rows = list(reader)
    print("Total rows:", len(rows))
    cornerstones = [r for r in rows if r['前置节点编号'] == '无']
    print("Cornerstones (无):", len(cornerstones))
    empty_deps = [r for r in rows if not r.get('前置节点编号') or r['前置节点编号'].strip() == '']
    print("Empty dependencies:", len(empty_deps))
    
    # Let's find nodes that depend on cornerstones
    cornerstone_ids = {r['节点'] for r in cornerstones} # or wait, is '节点' the ID?
    # What are the fields?

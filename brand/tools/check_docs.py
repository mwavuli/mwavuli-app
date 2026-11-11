#!/usr/bin/env python3
"""Consistency check for the Mwavuli brand and design language (standard library only).

Run from the repository root:  python3 brand/tools/check_docs.py

Checks: the inventory against the concern headings (ID, title, strength, source); every concern and decision reference;
relative links; code fences; table alignment; line width (120); asset files against the catalogs; the token files.
Exit code 0 when clean, 1 when any check fails.
"""
import glob, json, os, re, sys

BRAND = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
WIDTH = 120
GROUPS = 'FLCTSIMAG'
errors = []


def err(msg):
    errors.append(msg)


def read(path):
    with open(path, encoding='utf-8') as f:
        return f.read()


docs = sorted(glob.glob(os.path.join(BRAND, '*.md')))
concern_files = [p for p in docs if re.match(r'\d\d-', os.path.basename(p)) and not os.path.basename(p).startswith('00-')]

# 1. concern headings: ID, title, strength and source line
HEAD = re.compile(r'^### ([A-Z]\d+) · (.+)\n\n\*Strength: (\w+) · Source: ([^*]+)\*', re.M)
concerns = {}
for p in concern_files:
    text = read(p)
    for cid, title, strength, source in HEAD.findall(text):
        if cid in concerns:
            err(f'{os.path.basename(p)}: duplicate concern ID {cid}')
        concerns[cid] = (title, strength, source.strip(), os.path.basename(p))
    n_heads = len(re.findall(r'^### [A-Z]\d+ · ', text, re.M))
    if n_heads != len(HEAD.findall(text)):
        err(f'{os.path.basename(p)}: a concern heading is not followed by its Strength line')
    for sec in ('Rules', 'Why', 'Example', 'Bend when', 'Prior art'):
        if text.count(f'**{sec}**') < n_heads:
            err(f'{os.path.basename(p)}: fewer "{sec}" parts than concerns')
    for cid in re.findall(r'^### ([A-Z]\d+) · ', text, re.M):
        if cid[0] not in GROUPS:
            err(f'{os.path.basename(p)}: unknown group letter in {cid}')

# 2. inventory against headings
inv = read(os.path.join(BRAND, '00-inventory.md'))
inv_rows = re.findall(r'^\| \[([A-Z]\d+)\]\(([^)]+)\) +\| (.+?) +\| (\w+) +\| (.+?) +\|$', inv, re.M)
seen = {}
for cid, link, title, strength, source in inv_rows:
    seen[cid] = (title.strip(), strength, source.strip(), link)
for cid, (title, strength, source, fname) in concerns.items():
    if cid not in seen:
        err(f'inventory: missing {cid}')
        continue
    t, s, so, link = seen[cid]
    if (t, s, so) != (title, strength, source):
        err(f'inventory: {cid} differs from its heading ({t!r}, {s}, {so!r} vs {title!r}, {strength}, {source!r})')
    if link != fname:
        err(f'inventory: {cid} links to {link}, heading is in {fname}')
for cid in seen:
    if cid not in concerns:
        err(f'inventory: {cid} has no heading')

# 3. references to concerns and decisions
decisions = set(re.findall(r'^- \*\*(D\d+)\*\*', inv, re.M))
for p in docs:
    text = re.sub(r'C\d+ M\d+ Y\d+ K\d+', '', re.sub(r'`[^`]*`', '', read(p)))
    for ref in set(re.findall(r'\b([' + GROUPS + r']\d{1,2})\b', text)):
        if ref not in concerns:
            err(f'{os.path.basename(p)}: reference to unknown concern {ref}')
    for ref in set(re.findall(r'\b(D\d{1,2})\b', text)):
        if ref not in decisions:
            err(f'{os.path.basename(p)}: reference to unknown decision {ref}')

# 4. links, fences, tables, width
for p in docs:
    name, text = os.path.basename(p), read(p)
    for target in re.findall(r'\]\(([^)#\s]+)(?:#[^)]*)?\)', text):
        if re.match(r'[a-z]+://', target):
            continue
        if not os.path.exists(os.path.normpath(os.path.join(os.path.dirname(p), target))):
            err(f'{name}: broken link {target}')
    if text.count('```') % 2:
        err(f'{name}: unbalanced code fence')
    if '{{' in text:
        err(f'{name}: unfilled placeholder')
    lines = text.split('\n')
    for i, ln in enumerate(lines, 1):
        if len(ln) > WIDTH:
            err(f'{name}:{i}: line is {len(ln)} columns')
    i = 0
    while i < len(lines):
        if lines[i].startswith('|'):
            j = i
            while j < len(lines) and lines[j].startswith('|'):
                j += 1
            block = lines[i:j]
            if len({len(r) for r in block}) != 1:
                err(f'{name}:{i + 1}: table rows differ in width')
            if len(block) < 2 or not re.fullmatch(r'\|(-+\|)+', block[1]):
                err(f'{name}:{i + 1}: table separator must be |---| with no spaces')
            i = j
        else:
            i += 1

# 5. assets against the catalogs
for p in concern_files:
    for rel in set(re.findall(r'`((?:icons|logo|tokens|preview)/[a-z0-9./-]+)`', read(p))):
        if rel.endswith('/'):
            continue
        if not os.path.exists(os.path.join(BRAND, rel)):
            err(f'{os.path.basename(p)}: asset not found {rel}')
catalog_text = read(os.path.join(BRAND, '06-iconography.md')) + read(os.path.join(BRAND, '02-logo.md'))
for rel in glob.glob(os.path.join(BRAND, 'icons', 'line', '*.svg')):
    name = os.path.basename(rel)[:-4]
    if not re.search(r'\| `' + re.escape(name) + r'` +\|', catalog_text):
        err(f'icons/line/{name}.svg is not in the catalog')
for rel in glob.glob(os.path.join(BRAND, 'icons', 'pictogram', '*.svg')) + glob.glob(os.path.join(BRAND, 'logo', '*.svg')):
    sub = os.path.relpath(rel, BRAND)
    if f'`{sub}`' not in catalog_text:
        err(f'{sub} is not in the catalog')

# 6. tokens
try:
    tokens = json.loads(read(os.path.join(BRAND, 'tokens', 'mwavuli.tokens.json')))
    css = read(os.path.join(BRAND, 'tokens', 'mwavuli.tokens.css'))
    for key, hexv in {k: v['$value'] for k, v in tokens['color']['core'].items()}.items():
        if f'--mw-color-core-{key}: {hexv};' not in css:
            err(f'tokens: CSS is out of date for color.core.{key}')
except (OSError, ValueError, KeyError) as e:
    err(f'tokens: {e}')

if errors:
    print('\n'.join(errors))
    print(f'\n{len(errors)} problem(s)')
    sys.exit(1)
print(f'ok: {len(concerns)} concerns, {len(decisions)} decisions, {len(docs)} documents')

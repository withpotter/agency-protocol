// Generate the TypeScript projection of Agency Protocol schemas.
//
// Walks every versions/<ver>/schemas/**/*.schema.json, compiles each one to
// its own .d.ts via json-schema-to-typescript, and writes the output under
// packages/npm/dist/<ver>/{shared,entities}/.
//
// The generator imports schemas directly from the workspace; the published
// npm package re-exports the latest version from packages/npm/index.d.ts.
//
// Usage: from the repo root, `npm run generate:projections` (delegates here).

import { readdir, mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compile } from 'json-schema-to-typescript';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..', '..');
const versionsDir = join(repoRoot, 'versions');
const npmDistDir = join(repoRoot, 'packages', 'npm', 'dist');

async function walkSchemas(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const p = join(root, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await walkSchemas(p)));
    } else if (entry.isFile() && p.endsWith('.schema.json')) {
      results.push(p);
    }
  }
  return results;
}

async function generateForVersion(version) {
  const versionDir = join(versionsDir, version);
  const schemasDir = join(versionDir, 'schemas');
  if (!existsSync(schemasDir)) {
    return { version, generated: 0 };
  }
  const schemas = (await walkSchemas(schemasDir)).sort();
  if (schemas.length === 0) {
    return { version, generated: 0 };
  }

  const outDir = join(npmDistDir, version);
  await mkdir(outDir, { recursive: true });

  const indexLines = [
    '// Auto-generated. Do not edit by hand.',
    '// Regenerate via `npm run generate:projections`.',
    '',
  ];

  for (const schemaPath of schemas) {
    const rel = relative(schemasDir, schemaPath);
    const outRelDir = dirname(rel);
    const stem = rel.replace(/\.schema\.json$/, '').split('/').pop();
    const outFileDir = join(outDir, outRelDir);
    await mkdir(outFileDir, { recursive: true });
    const outFile = join(outFileDir, `${stem}.d.ts`);

    const raw = await readFile(schemaPath, 'utf8');
    const schema = JSON.parse(raw);

    const ts = await compile(schema, schema.title ?? stem, {
      bannerComment:
        '/**\n' +
        ' * Auto-generated TypeScript projection of an Agency Protocol JSON Schema.\n' +
        ' * Do not edit by hand. Regenerate via `npm run generate:projections`.\n' +
        ' */',
      additionalProperties: false,
      strictIndexSignatures: true,
      style: { singleQuote: true, useTabs: false, tabWidth: 2 },
      declareExternallyReferenced: true,
      enableConstEnums: false,
      cwd: dirname(schemaPath),
    });

    await writeFile(outFile, ts, 'utf8');

    const exportPath = `./${join(outRelDir, stem).replaceAll('\\', '/')}`;
    indexLines.push(`export * from '${exportPath}';`);
  }

  await writeFile(join(outDir, 'index.d.ts'), indexLines.join('\n') + '\n', 'utf8');

  return { version, generated: schemas.length };
}

async function main() {
  if (!existsSync(versionsDir)) {
    console.error('No versions/ directory found.');
    process.exit(1);
  }
  const versions = (await readdir(versionsDir, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  if (versions.length === 0) {
    console.error('No versions present under versions/.');
    process.exit(1);
  }

  for (const v of versions) {
    const result = await generateForVersion(v);
    console.log(`TypeScript projection: ${result.version} → ${result.generated} schema(s)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

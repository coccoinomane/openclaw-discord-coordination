import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import plugin from '../index.js';

const root = new URL('../', import.meta.url);
const json = (name) => JSON.parse(readFileSync(new URL(name, root), 'utf8'));

test('native package declares one skill and a dependency-free entrypoint', () => {
  const pkg = json('package.json');
  const manifest = json('openclaw.plugin.json');
  assert.equal(pkg.name, manifest.id);
  assert.equal(pkg.version, manifest.version);
  assert.equal(plugin.id, manifest.id);
  assert.deepEqual(pkg.openclaw.extensions, ['./index.js']);
  assert.deepEqual(manifest.skills, ['./skills']);
  assert.equal(manifest.configSchema.additionalProperties, false);
  assert.equal(pkg.dependencies, undefined);
  assert.equal(manifest.mcpServers, undefined);
  assert.deepEqual(readdirSync(new URL('skills/', root)), ['discord-thread-coordination']);
  assert.equal(existsSync(new URL('skills/openclaw-coordinator/', root)), false);
  for (const file of pkg.files) assert.ok(existsSync(new URL(file, root)), file);
});

test('registration does not call the host or register runtime features', () => {
  const api = new Proxy({}, { get() { throw new Error('Unexpected host API access'); } });
  assert.equal(plugin.register(api), undefined);
});

test('skill is concise, references resolve, and MCP is an explicit prerequisite', () => {
  const url = new URL('skills/discord-thread-coordination/SKILL.md', root);
  const text = readFileSync(url, 'utf8');
  const description = text.match(/^description: (.+)$/m)?.[1];
  assert.ok(description);
  assert.ok(Buffer.byteLength(description, 'utf8') <= 500);
  assert.ok(text.split(/\s+/).length < 500);
  assert.match(text, /requires \[OpenClaw MCP\]/);
  assert.match(text, /open or resume a Discord thread/);
  assert.match(text, /<#THREAD_ID>/);
  const links = [...text.matchAll(/\]\((references\/[^)]+)\)/g)];
  assert.equal(links.length, 2);
  for (const [, link] of links) assert.ok(existsSync(new URL(link, url)), link);
  const readme = readFileSync(new URL('README.md', root), 'utf8');
  assert.match(readme, /This plugin needs \[OpenClaw MCP\]/);
  assert.match(readme, /openclaw plugins install git:github.com\/coccoinomane\/openclaw-discord-coordination@v0.1.0/);
  assert.equal(readme.includes('\u0000'), false);
});

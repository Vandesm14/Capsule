import { readdirSync, statSync, readFileSync } from 'fs';
import path from 'path';

// @ts-ignore
import dotenv from 'dotenv';
dotenv.config();
const obsidian = process.env.OBSIDIAN;

function recursiveReadDir(dir: string, map: Map<string, Set<string>>) {
  const files = readdirSync(dir);
  let total = 0;
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      if (!(['.git', '.trash'].includes(file) && statSync(fullPath).isDirectory())) {
        recursiveReadDir(fullPath, map);
      }
    } else if (file.endsWith('.md')) {
      total++;
      const content = readFileSync(fullPath, 'utf8');
      const tags = content.match(/#[a-zA-Z0-9]+/g) ?? [];
      const links = content.match(/(?<!\!)\[\[(.*?)\]\]/g) ?? [];

      if (tags.length > 0 || links.length > 0) {
        const hash = fullPath.split('/').join('');
        map.set(hash, new Set([...tags, ...links]));
      }

      console.log(`Found ${tags ? tags.length : 0} tags in ${fullPath}`);
    }
  }

  return map;
}

const data = recursiveReadDir(obsidian, new Map());

const count = new Map<string, number>();
for (const [key, value] of data.entries()) {
  for (const tag of value) {
    if (count.has(tag)) {
      count.set(tag, count.get(tag) + 1);
    } else {
      count.set(tag, 1);
    }
  }
}
const sorted = new Map([...count.entries()].sort((a, b) => b[1] - a[1]));

console.log(data);
console.log(sorted);
import { writeFile, readFile } from 'node:fs/promises';

function generateTraitId(traitName: string): string {
  return traitName.replaceAll(' ', '_').replaceAll('-', '_').toLowerCase();
}

const filePaths = ['src/lib/data/content/traits.json'];

for (let path of filePaths) {
  try {
    const data = await readFile(path, 'utf8');
    const traits: { name: string }[] = JSON.parse(data);
    const newTraits = traits.map((t) => {
      return {
        ...t,
        id: generateTraitId(t.name),
      };
    });

    await writeFile(path, JSON.stringify(newTraits));

    console.log(`Generated ${traits.length} ids for ${path}`);
  } catch (error) {
    console.error('Error reading file: ', error);
  }
}

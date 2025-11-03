import traits from './traits.json' with { type: 'json' };

const newTraits = traits.map((t) => {
  const newId = t.name.replaceAll(' ', '_').replaceAll('-', '_').toLowerCase();
  return {
    ...t,
    id: newId,
  };
});

console.log(JSON.stringify(newTraits));

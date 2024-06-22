const data = await Bun.file("./src/assets/data.json").json();

const allItems = data.flatMap((d) => d.items);

const uniques = [
  ...new Map(allItems.map((item) => [item["id"], item])).values(),
];

await Bun.write(
  "./src/assets/uniques.json",
  JSON.stringify(
    Array.from(uniques).sort((a, b) => a.name.localeCompare(b.name)),
  ),
);

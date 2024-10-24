import data from "./assets/data.json" assert { type: "json" };
import uniques from "./assets/uniques.json" assert { type: "json" };
import { useMemo, useState } from "react";
import { PlannerCard } from "./components/PlannerCard";
import { cn } from "./lib/utils";

function App() {
  const [selectedUniques, setSelectedUniques] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    if (selectedUniques.length === 0) return null;

    return data
      .filter((planner) =>
        planner.items.some((item) => selectedUniques.includes(item.id)),
      )
      .reduce(
        (acc, cur) => {
          return {
            ...acc,
            [cur.class]: [...(acc[cur.class] || []), cur],
          };
        },
        {} as Record<string, typeof data>,
      );
  }, [selectedUniques]);

  const handleSelection = (id: string) => {
    if (selectedUniques.includes(id)) {
      setSelectedUniques(selectedUniques.filter((item) => item !== id));
    } else {
      setSelectedUniques((prev) => [...prev, id]);
    }
  };

  console.log(filteredData);

  return (
    <div className="container">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(90px,_1fr))] gap-4">
        {uniques.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex flex-col flex-wrap justify-center rounded-md border-2 border-gray-800 p-1 text-xs text-gray-200",
              {
                "border-violet-300": item.is_mythic,
                "bg-indigo-600": selectedUniques.includes(item.id),
                "bg-slate-950": !selectedUniques.includes(item.id),
              },
            )}
          >
            <button
              onClick={() => handleSelection(item.id)}
              className="flex flex-col items-center justify-center gap-2"
            >
              <img
                alt={item.name}
                src={`/images/${item.id}.png`}
                height={40}
                width={40}
              />
              <span className="text-center text-xs">{item.name}</span>
            </button>
          </div>
        ))}
      </div>

      {filteredData &&
        Object.entries(filteredData).map(([className, plannerData]) => (
          <div key={className} className="flex flex-col gap-4 pt-20">
            <h2 className="text-2xl font-bold capitalize text-gray-200">
              {className}
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              {plannerData.map((planner) => (
                <PlannerCard
                  key={planner.id}
                  planner={planner}
                  selectedUniques={selectedUniques}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default App;

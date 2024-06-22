import data from "./assets/data.json" assert { type: "json" };
import uniques from "./assets/uniques.json" assert { type: "json" };
import { useMemo, useState } from "react";
import { PlannerCard } from "./components/PlannerCard";
import { cn } from "./lib/utils";

function App() {
  const [selectedUnique, setSelectedUnique] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    if (!selectedUnique) return data;
    return data.filter((planner) =>
      planner.items.some((item) => selectedUnique.includes(item.id)),
    );
  }, [selectedUnique]);

  const handleSelection = (id: string) => {
    if (selectedUnique.includes(id)) {
      setSelectedUnique(selectedUnique.filter((item) => item !== id));
    } else {
      setSelectedUnique((prev) => [...prev, id]);
    }
  };

  return (
    <div className="container">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(75px,_1fr))] gap-4">
        {uniques.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex max-w-20 flex-col flex-wrap justify-center rounded-md border-2 border-gray-800 p-1 text-xs text-gray-200",
              {
                "bg-indigo-600": selectedUnique.includes(item.id),
                "bg-slate-950": !selectedUnique.includes(item.id),
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

      <div className="grid grid-cols-1 gap-4 pt-20 sm:grid-cols-2 md:grid-cols-4">
        {filteredData?.map((planner) => (
          <PlannerCard key={planner.id} planner={planner} />
        ))}
      </div>
    </div>
  );
}

export default App;

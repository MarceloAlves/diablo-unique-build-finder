import data from "./assets/data.json" assert { type: "json" };
import uniques from "./assets/uniques.json" assert { type: "json" };
import { useMemo, useState } from "react";
import { PlannerCard } from "./components/PlannerCard";
import { cn } from "./lib/utils";
import useQueryParams from "react-use-query-params";
import { ClassIcon } from "./components/ClassIcon";

const DEFAULT_CLASSES = [
  "barbarian",
  "druid",
  "necromancer",
  "paladin",
  "rogue",
  "sorcerer",
  "spiritborn",
];

function App() {
  const [params, setParams] = useQueryParams<{
    search: string[];
  }>();
  const [selectedClasses, setSelectedClasses] =
    useState<string[]>(DEFAULT_CLASSES);

  const filteredData = useMemo(() => {
    if (params.search.length === 0) return null;

    return data
      .filter(
        (planner) =>
          planner.items.some((item) => params.search.includes(item.id)) &&
          selectedClasses.includes(planner.class),
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
  }, [params.search, selectedClasses]);

  const filteredUniques = useMemo(() => {
    return uniques.filter((item) =>
      selectedClasses.some((cls) => item.classes.includes(cls)),
    );
  }, [selectedClasses]);

  const handleSelection = (id: string) => {
    if (params.search.includes(id)) {
      setParams({
        search: params.search.filter((item) => item !== id),
      });
    } else {
      setParams({
        search: [...params.search, id],
      });
    }
  };

  const handleClassSelection = (cls: string) => {
    if (selectedClasses.includes(cls)) {
      setSelectedClasses(selectedClasses.filter((item) => item !== cls));
    } else {
      setSelectedClasses([...selectedClasses, cls]);
    }

    setParams({
      search: [],
    });
  };

  return (
    <div className="container">
      <div className="grid w-full grid-cols-3 gap-4 py-4 md:flex md:flex-wrap md:justify-center">
        {DEFAULT_CLASSES.map((cls) => (
          <ClassIcon
            key={cls}
            name={cls}
            selected={selectedClasses.includes(cls)}
            onClick={handleClassSelection}
          />
        ))}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(90px,1fr))] gap-4">
        {filteredUniques.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex flex-col flex-wrap justify-center rounded-md border-2 border-gray-800 p-1 text-xs text-gray-200",
              {
                "border-violet-300": item.is_mythic,
                "bg-indigo-600": params.search.includes(item.id),
                "bg-slate-950": !params.search.includes(item.id),
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
            <h2 className="text-2xl font-bold text-gray-200 capitalize">
              {className}
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              {plannerData.map((planner) => (
                <PlannerCard
                  key={planner.id}
                  planner={planner}
                  selectedUniques={params.search}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default App;

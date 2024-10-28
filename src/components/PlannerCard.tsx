type PlannerResult = {
  id: string;
  post_title: string;
  permalink: string;
  embed_id: string;
  author: string;
  class: string;
  last_modified: string;
  items: Array<{
    id: string;
    name: string;
    is_mythic: boolean;
    plannerIndex: number;
    plannerName: string;
  }>;
};

export const PlannerCard = ({
  planner,
  selectedUniques,
}: {
  planner: PlannerResult;
  selectedUniques: string[];
}) => {
  const plannerVariants = planner.items.filter(({ id }) =>
    selectedUniques.includes(id),
  );

  const hasMultipleSelections = selectedUniques.length > 1;

  return (
    <div className="rounded-xl border border-gray-600 shadow">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="font-semibold leading-none tracking-tight">
          <a
            href={planner.permalink}
            target="_blank"
            rel="noreferrer"
            className="hover:text-indigo-600 hover:underline hover:underline-offset-1"
          >
            {planner.post_title}
          </a>
        </div>
      </div>
      <div className="p-6 pt-0">
        <div>Author: {planner.author}</div>
        <div>Last Updated: {planner.last_modified}</div>
        <div>
          Class:{" "}
          <a
            href={`https://maxroll.gg/d4/build-guides?filter%5Bclasses%5D%5Btaxonomy%5D=taxonomies.classes&filter%5Bclasses%5D%5Bvalue%5D=${planner.class}`}
            target="_blank"
            className="capitalize hover:text-indigo-600 hover:underline hover:underline-offset-1"
          >
            {planner.class}
          </a>
        </div>
        <div>
          <div className="py-4 font-semibold leading-none tracking-tight">
            Variants
          </div>
          <ul>
            {plannerVariants.map((variant, index) => (
              <li
                key={`${planner.embed_id}-${index}`}
                className="hover:text-indigo-600 hover:underline hover:underline-offset-1"
              >
                <a
                  href={`https://maxroll.gg/d4/planner/${planner.embed_id}#${variant.plannerIndex}}`}
                  target="_blank"
                >
                  {variant.plannerName}{" "}
                  {hasMultipleSelections ? ` - ${variant.name}` : ""}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

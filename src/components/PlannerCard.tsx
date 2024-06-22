type PlannerResult = {
  id: string;
  post_title: string;
  permalink: string;
  embed_id: string;
  author: string;
  classes: string[];
  last_modified: string;
  items: Array<{
    id: string;
    name: string;
  }>;
};

const classFormatter = (cls: string) => {
  return cls.replace(/d4-/gi, "");
};

export const PlannerCard = ({ planner }: { planner: PlannerResult }) => {
  return (
    <div className="bg-card text-card-foreground overflow-hidden rounded-xl border shadow">
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
        <div className="capitalize">
          Class:{" "}
          <a
            href={`https://maxroll.gg/d4/build-guides?filter%5Bclasses%5D%5Btaxonomy%5D=taxonomies.classes&filter%5Bclasses%5D%5Bvalue%5D=${planner.classes[0]}`}
            target="_blank"
          >
            {classFormatter(planner.classes[0])}
          </a>
        </div>
      </div>
    </div>
  );
};

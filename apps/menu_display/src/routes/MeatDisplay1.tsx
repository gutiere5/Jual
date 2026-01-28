import { useLoaderData } from "react-router-dom";
import type { Item } from "@repo/types/item.schema";
import { MenuCard } from "@repo/ui";
import "./MeatDisplay1.css";

function MeatDisplay1() {
  const items = useLoaderData() as Item[];

  return (
    <>
      {/* Main Content  */}
      <div className="workspace-container">
        {items.map((item) => {
          return <MenuCard key={item.name} item={item} />;
        })}
      </div>
    </>
  );
}

export default MeatDisplay1;

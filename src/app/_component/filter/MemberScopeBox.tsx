import { useState } from "react";
import styels from "./selectBox.module.css";

interface IMemberScope {
  mem_scope: string;
  property: number;
}

const durations: IMemberScope[] = [
  { mem_scope: "2인", property: 0 },
  { mem_scope: "3인-5인", property: 1 },
  { mem_scope: "6인-10인", property: 2 },
  { mem_scope: "11인 이상", property: 3 },
];

export default function MemberScopeBox() {
  const [selectedScope, setSelectedScope] = useState<IMemberScope | null>(null);

  const handleSelectScope = (mem_scope: IMemberScope) => {
    if (selectedScope?.mem_scope === mem_scope.mem_scope) {
      setSelectedScope(null);
    } else {
      setSelectedScope(mem_scope);
    }
  };
  return (
    <div className={styels.MemContainer}>
      {durations.map((scope: IMemberScope, index: number) => (
        <div
          key={index}
          className={`${styels.MemFilter} ${selectedScope?.mem_scope === scope.mem_scope ? styels.Selected : styels.Default}`}
          onClick={() => {
            handleSelectScope(scope);
          }}
        >
          {scope.mem_scope}
        </div>
      ))}
    </div>
  );
}

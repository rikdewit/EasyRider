"use client";

import { useDroppable } from "@dnd-kit/core";
import { useRiderStore } from "@/store/useRiderStore";
import { DraggableItem } from "./StagePlotDraggable";

export function StageDropZone() {
  const { stagePositions } = useRiderStore();
  const { setNodeRef, isOver } = useDroppable({ id: "stage" });

  return (
    <div
      ref={setNodeRef}
      className={`relative mt-6 aspect-[4/2] w-full overflow-hidden rounded-xl border-2 border-dashed border-stage-border bg-stage print:border-black print:bg-slate-100 ${
        isOver ? "ring-2 ring-accent" : ""
      }`}
      style={{ minHeight: 280 }}
    >
      <span className="absolute bottom-2 left-2 text-xs text-slate-400 print:text-slate-600">
        Publiek →
      </span>
      {stagePositions.map((pos) => (
        <DraggableItem key={pos.id} position={pos} />
      ))}
    </div>
  );
}

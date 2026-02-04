"use client";

import { useDroppable } from "@dnd-kit/core";
import { useRiderStore } from "@/store/useRiderStore";
import { PersonDraggable, MonitorDraggable } from "./StagePlotDraggable";

interface StageDropZoneProps {
  stageRef?: React.RefObject<HTMLDivElement | null>;
}

export function StageDropZone({ stageRef }: StageDropZoneProps) {
  const { stagePositions, monitors } = useRiderStore();
  const { setNodeRef, isOver } = useDroppable({ id: "stage" });

  const setCombinedRef = (node: HTMLDivElement | null) => {
    setNodeRef(node);
    if (stageRef) {
      // eslint-disable-next-line no-param-reassign
      (stageRef as any).current = node;
    }
  };

  return (
    <div
      ref={setCombinedRef}
      className={`relative mt-6 aspect-[4/2] w-full overflow-hidden rounded-xl border-2 border-dashed border-stage-border bg-stage print:border-black print:bg-slate-100 ${
        isOver ? "ring-2 ring-accent" : ""
      }`}
      style={{ minHeight: 280 }}
    >
      <span className="absolute bottom-2 left-2 text-xs text-slate-400 print:text-slate-600">
        Publiek →
      </span>
      {stagePositions.map((pos) => (
        <PersonDraggable key={pos.id} position={pos} />
      ))}
      {monitors.map((mon) => (
        <MonitorDraggable key={mon.id} monitor={mon} />
      ))}
    </div>
  );
}

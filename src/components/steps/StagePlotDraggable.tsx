"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { StagePosition } from "@/types/rider";
import { useRiderStore } from "@/store/useRiderStore";

interface DraggableItemProps {
  position: StagePosition;
}

export function DraggableItem({ position }: DraggableItemProps) {
  const { updateStagePosition } = useRiderStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({ id: position.id });

  const style = transform
    ? {
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: CSS.Translate.toString(transform),
      }
    : {
        left: `${position.x}%`,
        top: `${position.y}%`,
      };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`absolute z-10 w-24 cursor-grab rounded-lg border-2 border-slate-400 bg-white p-2 text-center text-sm shadow-md print:border-black print:bg-white ${
        isDragging ? "cursor-grabbing opacity-90" : ""
      }`}
      {...listeners}
      {...attributes}
    >
      <div className="font-semibold text-slate-800">{position.label}</div>
      <label className="mt-1 flex items-center justify-center gap-1 text-xs text-slate-600">
        <input
          type="checkbox"
          checked={position.hasMonitor}
          onChange={(e) =>
            updateStagePosition(position.id, { hasMonitor: e.target.checked })
          }
          onClick={(e) => e.stopPropagation()}
          className="rounded"
        />
        Monitor
      </label>
    </div>
  );
}

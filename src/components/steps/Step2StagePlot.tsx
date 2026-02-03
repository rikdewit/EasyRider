"use client";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useRiderStore } from "@/store/useRiderStore";
import { Tooltip } from "@/components/Tooltip";
import { DraggableItem } from "./StagePlotDraggable";
import { StageDropZone } from "./StageDropZone";

export function Step2StagePlot() {
  const { stagePositions, setPositionCoords, bandMembers } = useRiderStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const pos = stagePositions.find((p) => p.id === active.id);
    if (!pos) return;
    const newX = Math.max(5, Math.min(90, pos.x + (delta.x / 4)));
    const newY = Math.max(10, Math.min(85, pos.y + (delta.y / 4)));
    setPositionCoords(pos.id, newX, newY);
  };

  if (bandMembers.length === 0) {
    return (
      <div className="mx-auto max-w-2xl rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-800">
        <p>
          Voeg eerst bandleden toe in stap 1, daarna kun je ze hier op het podium
          plaatsen.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-2xl font-bold text-slate-900">
        Stap 2: Stageplot
      </h2>
      <p className="mt-2 text-slate-600">
        Sleep de vakken naar de gewenste positie op het podium. Zo ziet de
        technicus waar iedereen staat.
      </p>
      <Tooltip text="Een monitor is de box voor je voeten waar je jezelf en de band hoort. Geef per muzikant aan of die een monitor wil.">
        <p className="mt-1 text-sm text-slate-500">
          Monitor = box voor je voeten (aan te vinken per persoon)
        </p>
      </Tooltip>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <StageDropZone />
      </DndContext>
    </div>
  );
}

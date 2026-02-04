"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { StagePosition, StageMonitor } from "@/types/rider";
import { INSTRUMENTS } from "@/types/rider";
import { useRiderStore } from "@/store/useRiderStore";

interface PersonDraggableProps {
  position: StagePosition;
}

export function PersonDraggable({ position }: PersonDraggableProps) {
  const { updateStagePosition, monitors, toggleMonitorForMember } =
    useRiderStore();
  const hasMonitor = monitors.some((m) => m.memberId === position.memberId);
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
      className={`absolute z-10 w-20 cursor-grab rounded-lg border-none bg-transparent text-center text-xs print:bg-transparent ${
        isDragging ? "cursor-grabbing opacity-90" : ""
      }`}
      {...listeners}
      {...attributes}
    >
      <InstrumentIcon position={position} />
      <label className="mt-1 flex items-center justify-center gap-1 text-[10px] text-slate-600">
        <input
          type="checkbox"
          checked={hasMonitor}
          onChange={(e) =>
            toggleMonitorForMember(position.memberId)
          }
          onClick={(e) => e.stopPropagation()}
          className="rounded"
        />
        Monitor
      </label>
    </div>
  );
}

interface MonitorDraggableProps {
  monitor: StageMonitor;
}

export function MonitorDraggable({ monitor }: MonitorDraggableProps) {
  const { setMonitorCoords } = useRiderStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({ id: monitor.id });

  const style = transform
    ? {
        left: `${monitor.x}%`,
        top: `${monitor.y}%`,
        transform: CSS.Translate.toString(transform),
      }
    : {
        left: `${monitor.x}%`,
        top: `${monitor.y}%`,
      };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`absolute z-20 h-6 w-10 cursor-grab -translate-x-1/2 rounded-sm border border-slate-600 bg-slate-800 text-[9px] font-semibold uppercase tracking-wide text-slate-100 shadow-md print:bg-black ${
        isDragging ? "cursor-grabbing opacity-90" : ""
      }`}
      {...listeners}
      {...attributes}
    >
      <span className="block text-center leading-6">Mon</span>
    </div>
  );
}

function InstrumentIcon({ position }: { position: StagePosition }) {
  const inst = INSTRUMENTS.find((i) => i.id === position.instrumentId);
  let icon = "🎛️";
  if (position.instrumentId === "vocal") icon = "🎤";
  else if (
    position.instrumentId === "guitar-electric" ||
    position.instrumentId === "guitar-acoustic"
  )
    icon = "🎸";
  else if (position.instrumentId === "bass") icon = "🎸";
  else if (position.instrumentId === "drums") icon = "🥁";
  else if (position.instrumentId === "keys" || position.instrumentId === "synth")
    icon = "🎹";
  else if (position.instrumentId === "violin") icon = "🎻";
  else if (position.instrumentId === "sax" || position.instrumentId === "trumpet")
    icon = "🎺";

  return (
    <div className="mx-auto flex h-10 w-10 flex-col items-center justify-center rounded-full border border-slate-500 bg-slate-200/80 shadow-sm print:bg-white">
      <span className="text-base">{icon}</span>
      <span className="mt-0.5 line-clamp-1 px-1 text-[8px] font-semibold text-slate-800">
        {inst?.label ?? position.label}
      </span>
    </div>
  );
}

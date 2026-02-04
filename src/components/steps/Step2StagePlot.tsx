"use client";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useRef } from "react";
import { useRiderStore } from "@/store/useRiderStore";
import { INSTRUMENTS } from "@/types/rider";
import { StageDropZone } from "./StageDropZone";

export function Step2StagePlot() {
  const {
    stagePositions,
    monitors,
    setPositionCoords,
    setMonitorCoords,
    bandMembers,
    setMonitorMixLevel,
  } = useRiderStore();
  const stageRef = useRef<HTMLDivElement | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const stageEl = stageRef.current;
    if (!stageEl) return;

    const rect = stageEl.getBoundingClientRect();
    const width = rect.width || 1;
    const height = rect.height || 1;

    const pos = stagePositions.find((p) => p.id === active.id);
    if (pos) {
      const oldXpx = (pos.x / 100) * width;
      const oldYpx = (pos.y / 100) * height;
      const newXpx = oldXpx + delta.x;
      const newYpx = oldYpx + delta.y;
      const newX = Math.max(0, Math.min(100, (newXpx / width) * 100));
      const newY = Math.max(0, Math.min(100, (newYpx / height) * 100));
      setPositionCoords(pos.id, newX, newY);
      return;
    }

    const mon = monitors.find((m) => m.id === active.id);
    if (mon) {
      const oldXpx = (mon.x / 100) * width;
      const oldYpx = (mon.y / 100) * height;
      const newXpx = oldXpx + delta.x;
      const newYpx = oldYpx + delta.y;
      const newX = Math.max(0, Math.min(100, (newXpx / width) * 100));
      const newY = Math.max(0, Math.min(100, (newYpx / height) * 100));
      setMonitorCoords(mon.id, newX, newY);
    }
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
        Sleep de iconen naar de juiste plek op het podium. Vink per muzikant een
        monitor aan als die een wedge voor zich wil.
      </p>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <StageDropZone stageRef={stageRef} />
      </DndContext>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900">
          Monitor-overzicht &amp; mix
        </h3>
        <p className="mt-1 text-xs text-slate-600">
          Geef per monitor aan welke inputs daarin moeten. Dit komt ook in de
          rider te staan.
        </p>

        {monitors.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">
            Zet bij een muzikant het vinkje &quot;Monitor&quot; aan om een monitor
            toe te voegen.
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-2 pr-2 text-left font-medium text-slate-700">
                    Input (CH)
                  </th>
                  {monitors.map((mon, index) => {
                    const owner = bandMembers.find(
                      (m) => m.id === mon.memberId,
                    );
                    const ownerInst =
                      owner &&
                      INSTRUMENTS.find((x) => x.id === owner.instrumentId)
                        ?.label;
                    return (
                      <th
                        key={mon.id}
                        className="px-2 py-2 text-center font-medium text-slate-700"
                      >
                        Mon {index + 1}
                        <br />
                        <span className="text-[10px] text-slate-500">
                          {owner?.name || ownerInst || "Muzikant"}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {bandMembers.flatMap((member) =>
                  member.instruments.map((instEntry, chIndex) => {
                    const channelLabel =
                      INSTRUMENTS.find((x) => x.id === instEntry.instrumentId)
                        ?.label ?? "";
                    const channelId = instEntry.id;
                    const rowIndex = 1; // numbering will be done by indexOf below
                    return { member, instEntry, channelLabel, channelId };
                  }),
                ).map((channel, index) => {
                  const { member, instEntry, channelLabel, channelId } = channel;
                  return (
                    <tr
                      key={channelId}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="py-1.5 pr-2 text-left text-slate-700">
                        <div className="font-medium">
                          CH{index + 1} –{" "}
                          {member.name || channelLabel || "Input"}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {channelLabel}
                        </div>
                      </td>
                      {monitors.map((mon) => {
                        const level = mon.mix[channelId] ?? 0;
                        return (
                          <td
                            key={mon.id}
                            className="px-2 py-2 text-center align-middle"
                          >
                            <input
                              type="range"
                              min={0}
                              max={100}
                              step={5}
                              value={level}
                              onChange={(e) =>
                                setMonitorMixLevel(
                                  mon.id,
                                  channelId,
                                  Number(e.target.value),
                                )
                              }
                              className="h-1 w-20 cursor-pointer"
                            />
                            <div className="mt-1 text-[10px] text-slate-600">
                              {level === 0 ? "Uit" : `${level}%`}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

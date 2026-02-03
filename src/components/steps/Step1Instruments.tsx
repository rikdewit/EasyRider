"use client";

import { useRiderStore } from "@/store/useRiderStore";
import { INSTRUMENTS, type BandMember, type InstrumentId } from "@/types/rider";
import { Tooltip } from "@/components/Tooltip";
import { useCallback } from "react";

function genId() {
  return Math.random().toString(36).slice(2, 11);
}

export function Step1Instruments() {
  const { bandMembers, addMember, updateMember, removeMember } = useRiderStore();

  const add = useCallback(() => {
    addMember({
      name: "",
      instrumentId: "vocal",
      notes: "",
    });
  }, [addMember]);

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="text-2xl font-bold text-slate-900">
        Stap 1: Instrumentenlijst
      </h2>
      <p className="mt-2 text-slate-600">
        Voeg je bandleden toe met hun instrument. De juiste microfoon en DI worden
        automatisch voorgesteld.
      </p>

      <div className="mt-6 space-y-4">
        {bandMembers.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            onUpdate={(data) => updateMember(member.id, data)}
            onRemove={() => removeMember(member.id)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-white py-4 text-slate-600 transition hover:border-accent hover:bg-slate-50 hover:text-accent"
      >
        <span className="text-xl">+</span> Bandlid toevoegen
      </button>

      {bandMembers.length === 0 && (
        <p className="mt-4 text-sm text-amber-700">
          Voeg minimaal één bandlid toe om door te gaan.
        </p>
      )}
    </div>
  );
}

function MemberRow({
  member,
  onUpdate,
  onRemove,
}: {
  member: BandMember;
  onUpdate: (data: Partial<BandMember>) => void;
  onRemove: () => void;
}) {
  const instrument = INSTRUMENTS.find((i) => i.id === member.instrumentId)!;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Naam
          </label>
          <input
            type="text"
            value={member.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="Bijv. Jan"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Instrument
          </label>
          <select
            value={member.instrumentId}
            onChange={(e) =>
              onUpdate({ instrumentId: e.target.value as InstrumentId })
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          >
            {INSTRUMENTS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
        <Tooltip text="De technicus weet dan welke microfoon hij klaarzet. Je mag dit later aanpassen.">
          <span className="text-slate-500">
            Mic: <strong className="text-slate-700">{instrument.micSuggestion}</strong>
          </span>
        </Tooltip>
        {instrument.needsDI && (
          <Tooltip text="Een DI-box zet je signaal om naar een microfoon-ingang. Handig voor gitaar, bas, keys.">
            <span className="text-slate-500">DI: ja</span>
          </Tooltip>
        )}
      </div>
      <div className="mt-3">
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Extra opmerkingen (optioneel)
        </label>
        <input
          type="text"
          value={member.notes ?? ""}
          onChange={(e) => onUpdate({ notes: e.target.value || undefined })}
          placeholder="Bijv. eigen DI meenemen"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="mt-3 text-sm text-red-600 hover:underline"
      >
        Verwijderen
      </button>
    </div>
  );
}

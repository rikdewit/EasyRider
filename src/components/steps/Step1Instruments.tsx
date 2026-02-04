"use client";

import { useRiderStore } from "@/store/useRiderStore";
import {
  INSTRUMENTS,
  MICS,
  type BandMember,
  type InstrumentId,
  type MicId,
} from "@/types/rider";
import { useCallback } from "react";

export function Step1Instruments() {
  const {
    bandMembers,
    addMember,
    updateMember,
    removeMember,
    addInstrumentToMember,
    updateMemberInstrument,
    removeInstrumentFromMember,
  } = useRiderStore();

  const add = useCallback(() => {
    addMember({
      name: "",
      instruments: [],
      notes: "",
    });
  }, [addMember]);

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="text-2xl font-bold text-slate-900">
        Stap 1: Instrumentenlijst
      </h2>
      <p className="mt-2 text-slate-600">
        Voeg je bandleden toe en geef per instrument aan welke microfoon je
        gebruikt.
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
      </div>
      <div className="mt-4 space-y-3">
        {member.instruments.map((inst) => (
          <MemberInstrumentRow
            key={inst.id}
            member={member}
            instrumentId={inst.instrumentId}
            micId={inst.micId}
            onChangeInstrument={(instrumentId) =>
              updateMemberInstrument(member.id, inst.id, { instrumentId })
            }
            onChangeMic={(micId) =>
              updateMemberInstrument(member.id, inst.id, { micId })
            }
            onRemove={() => removeInstrumentFromMember(member.id, inst.id)}
          />
        ))}
        <button
          type="button"
          onClick={() => addInstrumentToMember(member.id)}
          className="text-xs font-medium text-accent hover:underline"
        >
          + Instrument toevoegen
        </button>
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

function MemberInstrumentRow({
  member,
  instrumentId,
  micId,
  onChangeInstrument,
  onChangeMic,
  onRemove,
}: {
  member: BandMember;
  instrumentId: InstrumentId;
  micId: MicId;
  onChangeInstrument: (instrumentId: InstrumentId) => void;
  onChangeMic: (micId: MicId) => void;
  onRemove: () => void;
}) {
  const instOpt = INSTRUMENTS.find((i) => i.id === instrumentId);

  return (
    <div className="grid items-end gap-3 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto]">
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-700">
          Instrument
        </label>
        <select
          value={instrumentId}
          onChange={(e) => onChangeInstrument(e.target.value as InstrumentId)}
          className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        >
          {INSTRUMENTS.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-700">
          Microfoon
        </label>
        <select
          value={micId}
          onChange={(e) => onChangeMic(e.target.value as MicId)}
          className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        >
          {MICS.map((mic) => (
            <option key={mic.id} value={mic.id}>
              {mic.label}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="justify-self-start text-xs text-slate-500 hover:text-red-600"
      >
        Verwijder
      </button>
    </div>
  );
}

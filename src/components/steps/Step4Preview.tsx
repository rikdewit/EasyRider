"use client";

import { useRef } from "react";
import { useRiderStore } from "@/store/useRiderStore";
import { INSTRUMENTS } from "@/types/rider";

export function Step4Preview() {
  const previewRef = useRef<HTMLDivElement>(null);
  const { bandMembers, stagePositions, riderInfo } = useRiderStore();

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-2xl font-bold text-slate-900">
        Stap 4: Preview
      </h2>
      <p className="mt-2 text-slate-600">
        Zo ziet je technische rider eruit. Controleer of alles klopt voordat je
        exporteert.
      </p>

      <div
        ref={previewRef}
        id="rider-preview"
        className="mt-6 rounded-xl border border-slate-200 bg-white p-8 shadow-lg print:shadow-none print:border-0"
        style={{ minHeight: 297 * 2 }}
      >
        {/* Band info */}
        <div className="border-b border-slate-200 pb-4">
          {riderInfo.logoDataUrl && (
            <img
              src={riderInfo.logoDataUrl}
              alt="Logo"
              className="mb-3 h-16 object-contain print:h-14"
            />
          )}
          <h1 className="text-2xl font-bold text-slate-900 print:text-xl">
            {riderInfo.bandName || "Bandnaam"}
          </h1>
          <p className="text-slate-600 print:text-sm">
            Technische rider
          </p>
          <p className="mt-2 text-sm text-slate-700">
            Contact: {riderInfo.contactName || "—"} · {riderInfo.email || "—"}
          </p>
        </div>

        {/* Input list */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold text-slate-900 print:text-base">
            Inputlijst
          </h2>
          <table className="mt-2 w-full border-collapse text-sm print:text-xs">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-2 text-left font-medium text-slate-700">CH</th>
                <th className="py-2 text-left font-medium text-slate-700">Bron</th>
                <th className="py-2 text-left font-medium text-slate-700">Mic/DI</th>
                <th className="py-2 text-left font-medium text-slate-700">Opmerking</th>
              </tr>
            </thead>
            <tbody>
              {bandMembers.map((m, i) => {
                const inst = INSTRUMENTS.find((x) => x.id === m.instrumentId)!;
                return (
                  <tr key={m.id} className="border-b border-slate-100">
                    <td className="py-1.5 font-mono text-slate-600">{i + 1}</td>
                    <td className="py-1.5">{m.name || "—"}</td>
                    <td className="py-1.5">{inst.micSuggestion}</td>
                    <td className="py-1.5 text-slate-600">{m.notes || "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* Stage plot */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold text-slate-900 print:text-base">
            Stageplot
          </h2>
          <div
            className="relative mt-2 aspect-[4/2] w-full overflow-hidden rounded-lg border-2 border-slate-300 bg-slate-100 print:border-black print:bg-slate-100"
            style={{ minHeight: 200 }}
          >
            {stagePositions.map((pos) => (
              <div
                key={pos.id}
                className="absolute rounded border-2 border-slate-500 bg-white px-2 py-1 text-center text-xs font-medium text-slate-800 print:border-black"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  width: "22%",
                }}
              >
                {pos.label}
                {pos.hasMonitor && " (mon)"}
              </div>
            ))}
          </div>
        </section>

        {/* Notes */}
        {riderInfo.notes && (
          <section className="mt-6">
            <h2 className="text-lg font-semibold text-slate-900 print:text-base">
              Opmerkingen
            </h2>
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700 print:text-xs">
              {riderInfo.notes}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

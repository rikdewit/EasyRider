"use client";

import { useRef } from "react";
import { useRiderStore } from "@/store/useRiderStore";
import { INSTRUMENTS } from "@/types/rider";

export function Step4Preview() {
  const previewRef = useRef<HTMLDivElement>(null);
  const { bandMembers, stagePositions, monitors, riderInfo } = useRiderStore();

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
              {bandMembers.flatMap((member) =>
                member.instruments.map((instEntry) => {
                  const instOpt = INSTRUMENTS.find(
                    (x) => x.id === instEntry.instrumentId,
                  );
                  return { member, instEntry, instOpt };
                }),
              ).map((row, index) => (
                <tr key={row.instEntry.id} className="border-b border-slate-100">
                  <td className="py-1.5 font-mono text-slate-600">
                    {index + 1}
                  </td>
                  <td className="py-1.5">
                    {row.member.name || "—"}{" "}
                    {row.instOpt ? `(${row.instOpt.label})` : ""}
                  </td>
                  <td className="py-1.5">
                    {/* eenvoudige beschrijving, mic-keuze staat eerder in het formulier */}
                    {row.instOpt?.micSuggestion}
                  </td>
                  <td className="py-1.5 text-slate-600">
                    {row.member.notes || "—"}
                  </td>
                </tr>
              ))}
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
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-xs font-medium text-slate-800"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-500 bg-white print:bg-white">
                  <span className="text-[10px]">{pos.label || "Persoon"}</span>
                </div>
              </div>
            ))}
            {monitors.map((mon) => (
              <div
                key={mon.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-sm border border-slate-600 bg-slate-800 px-1 text-[9px] font-semibold uppercase tracking-wide text-slate-100 print:bg-black"
                style={{
                  left: `${mon.x}%`,
                  top: `${mon.y}%`,
                }}
              >
                Mon
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

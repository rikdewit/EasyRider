"use client";

import { useState } from "react";
import { useRiderStore } from "@/store/useRiderStore";
import { exportRiderToPdf } from "@/lib/exportPdf";

const WATERMARK_SITE = "easyrider.nl";

export function Step5Export() {
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    const el = document.getElementById("rider-preview");
    if (!el) {
      setError("Preview niet gevonden. Ga terug naar stap 4.");
      return;
    }
    setExporting(true);
    setError(null);
    try {
      await exportRiderToPdf(el, WATERMARK_SITE);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Export mislukt.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="text-2xl font-bold text-slate-900">
        Stap 5: Export
      </h2>
      <p className="mt-2 text-slate-600">
        Download je technische rider als PDF. Het document is print-vriendelijk
        en bevat een watermerk onderaan.
      </p>

      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-sm text-slate-600">
          De PDF bevat: bandinfo, inputlijst, stageplot en opmerkingen. Onderaan
          staat: &quot;Created with {WATERMARK_SITE}&quot;.
        </p>
        <button
          type="button"
          onClick={handleExport}
          disabled={exporting}
          className="mt-6 w-full rounded-lg bg-accent py-4 font-semibold text-white transition hover:bg-accent-muted disabled:opacity-50"
        >
          {exporting ? "PDF aanmaken…" : "PDF downloaden"}
        </button>
        {error && (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { useRiderStore } from "@/store/useRiderStore";

export function Step3RiderInfo() {
  const { riderInfo, setRiderInfo } = useRiderStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      setRiderInfo({ logoDataUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="text-2xl font-bold text-slate-900">
        Stap 3: Rider info
      </h2>
      <p className="mt-2 text-slate-600">
        Deze gegevens komen op je technische rider. De venue kan je zo bereiken.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Bandnaam <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={riderInfo.bandName}
            onChange={(e) => setRiderInfo({ bandName: e.target.value })}
            placeholder="Bijv. De Band"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Contactpersoon <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={riderInfo.contactName}
            onChange={(e) => setRiderInfo({ contactName: e.target.value })}
            placeholder="Naam van degene die techniek regelt"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            E-mail <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={riderInfo.email}
            onChange={(e) => setRiderInfo({ email: e.target.value })}
            placeholder="contact@band.nl"
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Logo (optioneel)
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            {riderInfo.logoDataUrl ? "Andere afbeelding kiezen" : "Afbeelding uploaden"}
          </button>
          {riderInfo.logoDataUrl && (
            <div className="mt-2">
              <img
                src={riderInfo.logoDataUrl}
                alt="Band logo"
                className="h-20 object-contain"
              />
            </div>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Algemene opmerkingen (optioneel)
          </label>
          <textarea
            value={riderInfo.notes}
            onChange={(e) => setRiderInfo({ notes: e.target.value })}
            placeholder="Bijv. we spelen zonder support, backline beschikbaar?"
            rows={4}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>
    </div>
  );
}

export type InstrumentId =
  | "vocal"
  | "guitar-electric"
  | "guitar-acoustic"
  | "bass"
  | "drums"
  | "keys"
  | "synth"
  | "violin"
  | "sax"
  | "trumpet"
  | "other";

export interface InstrumentOption {
  id: InstrumentId;
  label: string;
  micSuggestion: string;
  needsDI: boolean;
}

export const INSTRUMENTS: InstrumentOption[] = [
  { id: "vocal", label: "Zang", micSuggestion: "SM58 / Beta58", needsDI: false },
  { id: "guitar-electric", label: "Elektrische gitaar", micSuggestion: "SM57 (amp)", needsDI: true },
  { id: "guitar-acoustic", label: "Akoestische gitaar", micSuggestion: "Condenser / DI", needsDI: true },
  { id: "bass", label: "Basgitaar", micSuggestion: "DI box", needsDI: true },
  { id: "drums", label: "Drums", micSuggestion: "Drumkit (meerdere mics)", needsDI: false },
  { id: "keys", label: "Keyboard / Piano", micSuggestion: "DI box", needsDI: true },
  { id: "synth", label: "Synth", micSuggestion: "DI box", needsDI: true },
  { id: "violin", label: "Viool", micSuggestion: "Condenser / DI", needsDI: true },
  { id: "sax", label: "Saxofoon", micSuggestion: "SM58 / Beta98", needsDI: false },
  { id: "trumpet", label: "Trompet", micSuggestion: "SM58 / Beta98", needsDI: false },
  { id: "other", label: "Overig", micSuggestion: "In overleg", needsDI: false },
];

export interface BandMember {
  id: string;
  name: string;
  instrumentId: InstrumentId;
  notes?: string;
}

export interface StagePosition {
  id: string;
  memberId: string;
  x: number; // 0–100 percentage
  y: number;
  label: string;
  hasMonitor: boolean;
}

export interface RiderInfo {
  bandName: string;
  contactName: string;
  email: string;
  logoDataUrl: string | null;
  notes: string;
}

export const DEFAULT_RIDER_INFO: RiderInfo = {
  bandName: "",
  contactName: "",
  email: "",
  logoDataUrl: null,
  notes: "",
};

import { create } from "zustand";
import type { BandMember, StagePosition, RiderInfo } from "@/types/rider";
import { DEFAULT_RIDER_INFO } from "@/types/rider";

interface RiderState {
  bandMembers: BandMember[];
  stagePositions: StagePosition[];
  riderInfo: RiderInfo;

  addMember: (member: Omit<BandMember, "id">) => void;
  updateMember: (id: string, data: Partial<BandMember>) => void;
  removeMember: (id: string) => void;
  setMembers: (members: BandMember[]) => void;

  setStagePositions: (positions: StagePosition[]) => void;
  updateStagePosition: (id: string, data: Partial<StagePosition>) => void;
  setPositionCoords: (id: string, x: number, y: number) => void;

  setRiderInfo: (info: Partial<RiderInfo>) => void;
  reset: () => void;
}

const genId = () => Math.random().toString(36).slice(2, 11);

const initialState = {
  bandMembers: [] as BandMember[],
  stagePositions: [] as StagePosition[],
  riderInfo: DEFAULT_RIDER_INFO,
};

export const useRiderStore = create<RiderState>((set) => ({
  ...initialState,

  addMember: (member) =>
    set((state) => {
      const id = genId();
      const newMember: BandMember = { ...member, id };
      return {
        bandMembers: [...state.bandMembers, newMember],
        stagePositions: [
          ...state.stagePositions,
          {
            id: genId(),
            memberId: id,
            x: 20 + state.bandMembers.length * 15,
            y: 50,
            label: member.name || "?",
            hasMonitor: true,
          },
        ],
      };
    }),

  updateMember: (id, data) =>
    set((state) => ({
      bandMembers: state.bandMembers.map((m) =>
        m.id === id ? { ...m, ...data } : m
      ),
      stagePositions: state.stagePositions.map((p) =>
        p.memberId === id ? { ...p, label: data.name ?? p.label } : p
      ),
    })),

  removeMember: (id) =>
    set((state) => ({
      bandMembers: state.bandMembers.filter((m) => m.id !== id),
      stagePositions: state.stagePositions.filter((p) => p.memberId !== id),
    })),

  setMembers: (members) => set({ bandMembers: members }),

  setStagePositions: (positions) => set({ stagePositions: positions }),

  updateStagePosition: (id, data) =>
    set((state) => ({
      stagePositions: state.stagePositions.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    })),

  setPositionCoords: (id, x, y) =>
    set((state) => ({
      stagePositions: state.stagePositions.map((p) =>
        p.id === id ? { ...p, x, y } : p
      ),
    })),

  setRiderInfo: (info) =>
    set((state) => ({ riderInfo: { ...state.riderInfo, ...info } })),

  reset: () => set(initialState),
}));

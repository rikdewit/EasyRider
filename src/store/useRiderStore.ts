import { create } from "zustand";
import type {
  BandMember,
  MemberInstrument,
  StagePosition,
  StageMonitor,
  RiderInfo,
  InstrumentId,
} from "@/types/rider";
import { DEFAULT_RIDER_INFO, INSTRUMENTS, MICS } from "@/types/rider";

interface RiderState {
  bandMembers: BandMember[];
  stagePositions: StagePosition[];
  monitors: StageMonitor[];
  riderInfo: RiderInfo;

  addMember: (member: Omit<BandMember, "id">) => void;
  updateMember: (id: string, data: Partial<BandMember>) => void;
  removeMember: (id: string) => void;
  setMembers: (members: BandMember[]) => void;

  addInstrumentToMember: (memberId: string) => void;
  updateMemberInstrument: (
    memberId: string,
    instrumentId: string,
    data: Partial<MemberInstrument>,
  ) => void;
  removeInstrumentFromMember: (memberId: string, instrumentId: string) => void;

  setStagePositions: (positions: StagePosition[]) => void;
  updateStagePosition: (id: string, data: Partial<StagePosition>) => void;
  setPositionCoords: (id: string, x: number, y: number) => void;

  toggleMonitorForMember: (memberId: string) => void;
  setMonitorCoords: (id: string, x: number, y: number) => void;
  setMonitorMixLevel: (
    monitorId: string,
    sourceMemberId: string,
    level: number,
  ) => void;

  setRiderInfo: (info: Partial<RiderInfo>) => void;
  reset: () => void;
}

const genId = () => Math.random().toString(36).slice(2, 11);

const defaultMicForInstrument = (instrumentId: InstrumentId): MemberInstrument["micId"] => {
  const inst = INSTRUMENTS.find((i) => i.id === instrumentId);
  if (!inst) return "other";
  if (instrumentId === "vocal") return "vocal-standard";
  if (
    instrumentId === "guitar-electric" ||
    instrumentId === "guitar-acoustic" ||
    instrumentId === "bass" ||
    instrumentId === "keys" ||
    instrumentId === "synth"
  ) {
    return "di-box";
  }
  if (instrumentId === "drums") return "overhead-condenser";
  return "other";
};

const initialState = {
  bandMembers: [] as BandMember[],
  stagePositions: [] as StagePosition[],
  monitors: [] as StageMonitor[],
  riderInfo: DEFAULT_RIDER_INFO,
};

export const useRiderStore = create<RiderState>((set) => ({
  ...initialState,

  addMember: (member) =>
    set((state) => {
      const id = genId();
      const baseInstrument: MemberInstrument = {
        id: genId(),
        instrumentId: "vocal",
        micId: defaultMicForInstrument("vocal"),
      };
      const instruments =
        member.instruments && member.instruments.length > 0
          ? member.instruments
          : [baseInstrument];
      const newMember: BandMember = {
        id,
        name: member.name ?? "",
        instruments,
        notes: member.notes,
      };

      return {
        bandMembers: [...state.bandMembers, newMember],
        stagePositions: [
          ...state.stagePositions,
          ...instruments.map((inst, index) => ({
            id: genId(),
            memberId: id,
            memberInstrumentId: inst.id,
            instrumentId: inst.instrumentId,
            x: 20 + state.bandMembers.length * 12 + index * 8,
            y: 50,
            label:
              member.name ||
              INSTRUMENTS.find((i) => i.id === inst.instrumentId)?.label ||
              "?",
          })),
        ],
      };
    }),

  updateMember: (id, data) =>
    set((state) => {
      const updatedMembers = state.bandMembers.map((m) =>
        m.id === id ? { ...m, ...data } : m,
      );
      let updatedPositions = state.stagePositions;
      if (data.name !== undefined) {
        const member = updatedMembers.find((m) => m.id === id);
        updatedPositions = updatedPositions.map((p) =>
          p.memberId === id
            ? {
                ...p,
                label:
                  member?.name ||
                  INSTRUMENTS.find((i) => i.id === p.instrumentId)?.label ||
                  p.label,
              }
            : p,
        );
      }
      return {
        bandMembers: updatedMembers,
        stagePositions: updatedPositions,
      };
    }),

  addInstrumentToMember: (memberId) =>
    set((state) => {
      const member = state.bandMembers.find((m) => m.id === memberId);
      if (!member) return {};
      const newInstId = genId();
      const instrumentId: InstrumentId =
        (member.instruments[0]?.instrumentId as InstrumentId) || "guitar-electric";
      const newInstrument: MemberInstrument = {
        id: newInstId,
        instrumentId,
        micId: defaultMicForInstrument(instrumentId),
      };
      const updatedMember: BandMember = {
        ...member,
        instruments: [...member.instruments, newInstrument],
      };
      return {
        bandMembers: state.bandMembers.map((m) =>
          m.id === memberId ? updatedMember : m,
        ),
        stagePositions: [
          ...state.stagePositions,
          {
            id: genId(),
            memberId,
            memberInstrumentId: newInstId,
            instrumentId,
            x: 30,
            y: 50,
            label:
              member.name ||
              INSTRUMENTS.find((i) => i.id === instrumentId)?.label ||
              "?",
          },
        ],
      };
    }),

  updateMemberInstrument: (memberId, memberInstrumentId, data) =>
    set((state) => {
      const members = state.bandMembers.map((m) => {
        if (m.id !== memberId) return m;
        const instruments = m.instruments.map((inst) =>
          inst.id === memberInstrumentId ? { ...inst, ...data } : inst,
        );
        return { ...m, instruments };
      });

      let positions = state.stagePositions;
      if (data.instrumentId) {
        positions = positions.map((p) =>
          p.memberInstrumentId === memberInstrumentId
            ? {
                ...p,
                instrumentId: data.instrumentId as InstrumentId,
                label:
                  members.find((m) => m.id === memberId)?.name ||
                  INSTRUMENTS.find((i) => i.id === data.instrumentId)?.label ||
                  p.label,
              }
            : p,
        );
      }

      return {
        bandMembers: members,
        stagePositions: positions,
      };
    }),

  removeInstrumentFromMember: (memberId, memberInstrumentId) =>
    set((state) => {
      const members = state.bandMembers.map((m) => {
        if (m.id !== memberId) return m;
        return {
          ...m,
          instruments: m.instruments.filter((inst) => inst.id !== memberInstrumentId),
        };
      });
      return {
        bandMembers: members,
        stagePositions: state.stagePositions.filter(
          (p) => p.memberInstrumentId !== memberInstrumentId,
        ),
        monitors: state.monitors.map((mon) => {
          const { [memberInstrumentId]: _removed, ...restMix } = mon.mix;
          return { ...mon, mix: restMix };
        }),
      };
    }),

  removeMember: (id) =>
    set((state) => ({
      bandMembers: state.bandMembers.filter((m) => m.id !== id),
      stagePositions: state.stagePositions.filter((p) => p.memberId !== id),
      monitors: state.monitors.filter((m) => m.memberId !== id),
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

  toggleMonitorForMember: (memberId) =>
    set((state) => {
      const existing = state.monitors.find((m) => m.memberId === memberId);
      if (existing) {
        return {
          monitors: state.monitors.filter((m) => m.memberId !== memberId),
        };
      }

      const basePos = state.stagePositions.find((p) => p.memberId === memberId);
      const x = basePos ? basePos.x : 50;
      const y = basePos ? Math.min(95, basePos.y + 12) : 80;

      const member = state.bandMembers.find((m) => m.id === memberId);
      const mixEntries =
        member?.instruments?.map((inst) => [inst.id, 80] as const) ?? [];

      const monitor: StageMonitor = {
        id: genId(),
        memberId,
        x,
        y,
        mix: Object.fromEntries(mixEntries),
      };

      return {
        monitors: [...state.monitors, monitor],
      };
    }),

  setMonitorCoords: (id, x, y) =>
    set((state) => ({
      monitors: state.monitors.map((m) => (m.id === id ? { ...m, x, y } : m)),
    })),

  setMonitorMixLevel: (monitorId, sourceMemberId, level) =>
    set((state) => ({
      monitors: state.monitors.map((m) =>
        m.id === monitorId
          ? {
              ...m,
              mix: {
                ...m.mix,
                [sourceMemberId]: level,
              },
            }
          : m,
      ),
    })),

  setRiderInfo: (info) =>
    set((state) => ({ riderInfo: { ...state.riderInfo, ...info } })),

  reset: () => set(initialState),
}));

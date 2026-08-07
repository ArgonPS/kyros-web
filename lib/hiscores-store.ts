import {
  emptyDatabase,
  playerKey,
  type HiscoreDatabase,
  type HiscorePlayer,
  type SkillEntry,
} from "@/lib/hiscores-data";

/**
 * Hiscores persistence.
 *
 * Prefer HISCORES_STORE_URL (VPS JSON API). Falls back to in-process memory
 * only for local `next dev` so the UI can be exercised without the sidecar.
 */

const globalStore = globalThis as unknown as {
  __kyrosHiscores?: HiscoreDatabase;
};

function memoryDb(): HiscoreDatabase {
  if (!globalStore.__kyrosHiscores) {
    globalStore.__kyrosHiscores = emptyDatabase();
  }
  return globalStore.__kyrosHiscores;
}

function storeBase(): string | undefined {
  const raw = process.env.HISCORES_STORE_URL?.trim();
  return raw ? raw.replace(/\/$/, "") : undefined;
}

function storeHeaders(): HeadersInit {
  const pw = process.env.STORE_API_PASSWORD?.trim() || "";
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${pw}`,
  };
}

export async function loadDatabase(): Promise<HiscoreDatabase> {
  const base = storeBase();
  if (!base) return memoryDb();

  const res = await fetch(`${base}/db`, {
    headers: storeHeaders(),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Hiscores store read failed (${res.status})`);
  }
  return (await res.json()) as HiscoreDatabase;
}

export async function saveDatabase(db: HiscoreDatabase): Promise<void> {
  const base = storeBase();
  if (!base) {
    globalStore.__kyrosHiscores = db;
    return;
  }

  const res = await fetch(`${base}/db`, {
    method: "PUT",
    headers: storeHeaders(),
    body: JSON.stringify(db),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Hiscores store write failed (${res.status})`);
  }
}

export async function upsertPlayer(player: HiscorePlayer): Promise<void> {
  const base = storeBase();
  if (!base) {
    const db = memoryDb();
    const key = playerKey(
      player.usernameKey,
      player.gameMode,
      player.gameExperienceMode,
    );
    db.players[key] = player;
    return;
  }

  const res = await fetch(`${base}/player`, {
    method: "PUT",
    headers: storeHeaders(),
    body: JSON.stringify(player),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Hiscores player upsert failed (${res.status})`);
  }
}

export function normalizeUsernameKey(name: string): string {
  return name.trim().replace(/\s+/g, " ").toLowerCase();
}

export function parseSkillEntries(
  entries: Array<{ skillId?: number; level?: number; experience?: number }>,
): Record<string, SkillEntry> {
  const skills: Record<string, SkillEntry> = {};
  for (const e of entries) {
    if (typeof e.skillId !== "number") continue;
    const level = Number(e.level) || 0;
    let experience = Number(e.experience) || 0;
    // Guard against Infinity / absurd debug XP
    if (!Number.isFinite(experience) || experience < 0) experience = 0;
    if (experience > 5_000_000_000) experience = 5_000_000_000;
    skills[String(e.skillId)] = { level, experience };
  }
  return skills;
}

export function parseBossEntries(
  entries: Array<{
    bossId?: number;
    killCount?: number;
  }>,
): Record<string, number> {
  const bosses: Record<string, number> = {};
  for (const e of entries) {
    if (typeof e.bossId !== "number") continue;
    const kills = Math.max(0, Number(e.killCount) || 0);
    bosses[String(e.bossId)] = kills;
  }
  return bosses;
}

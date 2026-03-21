"use client";

import { useState } from "react";
import { SegmentControl } from "@/components/shared/SegmentControl";

type Tab = "adoption" | "updates" | "broadcasts" | "events";

// ── Demo data ──────────────────────────────────────────────────────────────

const FAMILIES = [
  {
    child: "Rayan",
    parent: "Ahmed Al-Rashid",
    class: "Kingfisher N1",
    activated: true,
    daysSince: null,
  },
  {
    child: "Aisha",
    parent: "Mdm Nur",
    class: "Kingfisher N1",
    activated: true,
    daysSince: null,
  },
  {
    child: "Mei",
    parent: "Mrs Tan",
    class: "Kingfisher N1",
    activated: false,
    daysSince: 12,
  },
  {
    child: "Omar",
    parent: "Mr Ali",
    class: "Kingfisher N1",
    activated: false,
    daysSince: 8,
  },
  {
    child: "Priya",
    parent: "Mdm Kavitha",
    class: "Kingfisher N1",
    activated: true,
    daysSince: null,
  },
  {
    child: "Kai",
    parent: "Mr Lim",
    class: "Kingfisher N1",
    activated: false,
    daysSince: 14,
  },
  {
    child: "Sara",
    parent: "Mrs Rahman",
    class: "Kingfisher N1",
    activated: true,
    daysSince: null,
  },
  {
    child: "Darius",
    parent: "Ms Lee",
    class: "Kingfisher N1",
    activated: false,
    daysSince: 5,
  },
  {
    child: "Aryan",
    parent: "Mr Singh",
    class: "Kingfisher N1",
    activated: true,
    daysSince: null,
  },
  {
    child: "Amir",
    parent: "Nur Hassan",
    class: "Sparrow K2",
    activated: true,
    daysSince: null,
  },
  {
    child: "Bao",
    parent: "Nur Hassan",
    class: "Sparrow K2",
    activated: true,
    daysSince: null,
  },
  {
    child: "Clara",
    parent: "Mrs Chong",
    class: "Sparrow K2",
    activated: true,
    daysSince: null,
  },
  {
    child: "Dev",
    parent: "Mr Patel",
    class: "Sparrow K2",
    activated: false,
    daysSince: 3,
  },
  {
    child: "Elise",
    parent: "Mrs Wong",
    class: "Sparrow K2",
    activated: true,
    daysSince: null,
  },
];

const DAILY_UPDATES = [
  {
    class: "Kingfisher N1",
    teacher: "Siti Binte Rahmat",
    sent: 19,
    total: 20,
    status: "sent" as const,
  },
  {
    class: "Sparrow K2",
    teacher: "Lim Wei Ling",
    sent: 5,
    total: 5,
    status: "sent" as const,
  },
];

const BROADCASTS = [
  {
    id: 1,
    subject: "Term 2 begins next Monday",
    date: "14 Mar 2026",
    recipients: 25,
    opened: 22,
    rate: 88,
  },
  {
    id: 2,
    subject: "Parent workshop — 27 March",
    date: "10 Mar 2026",
    recipients: 25,
    opened: 18,
    rate: 72,
  },
  {
    id: 3,
    subject: "PD Day — school closed 28 March",
    date: "7 Mar 2026",
    recipients: 25,
    opened: 25,
    rate: 100,
  },
  {
    id: 4,
    subject: "Curriculum update: Numeracy focus this term",
    date: "3 Mar 2026",
    recipients: 25,
    opened: 14,
    rate: 56,
  },
];

const EVENTS = [
  {
    id: 1,
    title: "Parent Workshop: Understanding NEL",
    date: "27 Mar 2026",
    time: "9:00am",
    rsvp: 14,
    capacity: 30,
    rsvpRate: 56,
  },
  {
    id: 2,
    title: "Open Day — K1 & K2 families",
    date: "4 Apr 2026",
    time: "10:00am",
    rsvp: 8,
    capacity: 40,
    rsvpRate: 20,
  },
  {
    id: 3,
    title: "Sports Day",
    date: "11 Apr 2026",
    time: "8:30am",
    rsvp: 21,
    capacity: 50,
    rsvpRate: 42,
  },
];

// ── Sub-views ──────────────────────────────────────────────────────────────

function AppAdoption() {
  const activated = FAMILIES.filter((f) => f.activated).length;
  const total = FAMILIES.length;
  const pct = Math.round((activated / total) * 100);
  const notActivated = FAMILIES.filter((f) => !f.activated);

  return (
    <div className="space-y-5">
      {/* Summary card */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] p-5">
        <div className="flex items-end gap-3 mb-1">
          <span
            className="text-3xl font-bold"
            style={{ color: "var(--color-text-dark)" }}
          >
            {pct}%
          </span>
          <span
            className="text-sm pb-1"
            style={{ color: "var(--color-text-mid)" }}
          >
            app adoption rate
          </span>
        </div>
        <div
          className="w-full h-2 rounded-full overflow-hidden"
          style={{ background: "var(--color-bg-cream)" }}
        >
          <div
            className="h-full rounded-full"
            style={{ width: `${pct}%`, background: "var(--color-primary)" }}
          />
        </div>
        <p className="text-xs mt-2" style={{ color: "var(--color-text-mid)" }}>
          {activated} of {total} families have activated their parent app
          account
        </p>
      </div>

      {/* Not activated */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden">
        <div className="px-5 py-3 border-b border-[var(--color-border)] flex items-center justify-between">
          <h3
            className="font-semibold text-sm"
            style={{ color: "var(--color-text-dark)" }}
          >
            Families not yet activated
          </h3>
          <button
            className="text-xs font-medium px-3 py-1.5 rounded-lg"
            style={{
              background: "var(--color-primary-wash)",
              color: "var(--color-primary)",
            }}
          >
            Resend all invitations
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b border-[var(--color-border)]"
              style={{ background: "var(--color-bg-cream)" }}
            >
              <th
                className="text-left px-5 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Child
              </th>
              <th
                className="text-left px-5 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Parent
              </th>
              <th
                className="text-left px-5 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Class
              </th>
              <th
                className="text-right px-5 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Days since invite
              </th>
              <th className="px-5 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {notActivated.map((f) => (
              <tr
                key={f.child}
                className="border-b border-[var(--color-border)] last:border-0"
              >
                <td
                  className="px-5 py-3 font-medium"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {f.child}
                </td>
                <td
                  className="px-5 py-3"
                  style={{ color: "var(--color-text-mid)" }}
                >
                  {f.parent}
                </td>
                <td
                  className="px-5 py-3 text-xs"
                  style={{ color: "var(--color-text-mid)" }}
                >
                  {f.class}
                </td>
                <td
                  className="px-5 py-3 text-right tabular-nums"
                  style={{
                    color:
                      f.daysSince && f.daysSince > 7
                        ? "#ef4444"
                        : "var(--color-text-dark)",
                  }}
                >
                  {f.daysSince}d
                </td>
                <td className="px-5 py-3 text-right">
                  <button
                    className="text-xs font-medium"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Resend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DailyUpdates() {
  return (
    <div className="space-y-4">
      {DAILY_UPDATES.map((row) => {
        const pct = Math.round((row.sent / row.total) * 100);
        return (
          <div
            key={row.class}
            className="bg-white rounded-xl border border-[var(--color-border)] p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div
                  className="font-semibold text-sm"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {row.class}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: "var(--color-text-mid)" }}
                >
                  {row.teacher}
                </div>
              </div>
              <span
                className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ background: "#dcfce7", color: "#15803d" }}
              >
                All sent
              </span>
            </div>
            <div
              className="w-full h-2 rounded-full overflow-hidden mb-1"
              style={{ background: "var(--color-bg-cream)" }}
            >
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, background: "var(--color-primary)" }}
              />
            </div>
            <p className="text-xs" style={{ color: "var(--color-text-mid)" }}>
              {row.sent} of {row.total} children received a daily update today
            </p>
          </div>
        );
      })}

      <div
        className="rounded-xl border border-[var(--color-border)] p-4"
        style={{ background: "var(--color-bg-cream)" }}
      >
        <p className="text-xs" style={{ color: "var(--color-text-mid)" }}>
          Admin can see whether updates were sent — not the content of
          individual messages, which are private to teacher and parent.
        </p>
      </div>
    </div>
  );
}

function Broadcasts() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          className="text-sm font-medium px-4 py-2 rounded-lg text-white"
          style={{ background: "var(--color-primary)" }}
        >
          + New broadcast
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr
              className="border-b border-[var(--color-border)]"
              style={{ background: "var(--color-bg-cream)" }}
            >
              <th
                className="text-left px-5 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Subject
              </th>
              <th
                className="text-left px-5 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Sent
              </th>
              <th
                className="text-right px-5 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Recipients
              </th>
              <th
                className="text-right px-5 py-2.5 font-medium text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                Opened
              </th>
              <th className="px-5 py-2.5" />
            </tr>
          </thead>
          <tbody>
            {BROADCASTS.map((b) => (
              <tr
                key={b.id}
                className="border-b border-[var(--color-border)] last:border-0"
              >
                <td
                  className="px-5 py-3 font-medium"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {b.subject}
                </td>
                <td
                  className="px-5 py-3 text-xs"
                  style={{ color: "var(--color-text-mid)" }}
                >
                  {b.date}
                </td>
                <td
                  className="px-5 py-3 text-right tabular-nums"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {b.recipients}
                </td>
                <td className="px-5 py-3 text-right">
                  <span
                    className="tabular-nums"
                    style={{
                      color: b.rate < 70 ? "#f59e0b" : "var(--color-text-dark)",
                    }}
                  >
                    {b.rate}%
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  {b.rate < 100 && (
                    <button
                      className="text-xs font-medium"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Remind
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Events() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          className="text-sm font-medium px-4 py-2 rounded-lg text-white"
          style={{ background: "var(--color-primary)" }}
        >
          + Create event
        </button>
      </div>

      {EVENTS.map((ev) => (
        <div
          key={ev.id}
          className="bg-white rounded-xl border border-[var(--color-border)] p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div
                className="font-semibold text-sm"
                style={{ color: "var(--color-text-dark)" }}
              >
                {ev.title}
              </div>
              <div
                className="text-xs mt-0.5"
                style={{ color: "var(--color-text-mid)" }}
              >
                {ev.date} · {ev.time}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div
                className="text-lg font-bold tabular-nums"
                style={{
                  color:
                    ev.rsvpRate < 30 ? "#ef4444" : "var(--color-text-dark)",
                }}
              >
                {ev.rsvp}
              </div>
              <div
                className="text-xs"
                style={{ color: "var(--color-text-mid)" }}
              >
                RSVPs of {ev.capacity}
              </div>
            </div>
          </div>
          <div
            className="mt-3 w-full h-1.5 rounded-full overflow-hidden"
            style={{ background: "var(--color-bg-cream)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${ev.rsvpRate}%`,
                background:
                  ev.rsvpRate < 30 ? "#ef4444" : "var(--color-primary)",
              }}
            />
          </div>
          <div className="mt-3 flex gap-2">
            <button
              className="text-xs font-medium px-3 py-1.5 rounded-lg"
              style={{
                background: "var(--color-primary-wash)",
                color: "var(--color-primary)",
              }}
            >
              Send reminder
            </button>
            <button
              className="text-xs font-medium px-3 py-1.5 rounded-lg border"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text-mid)",
              }}
            >
              View RSVPs
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string }[] = [
  { id: "adoption", label: "App Adoption" },
  { id: "updates", label: "Daily Updates" },
  { id: "broadcasts", label: "Broadcasts" },
  { id: "events", label: "Events" },
];

export default function EngagementPage() {
  const [tab, setTab] = useState<Tab>("adoption");

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 pb-24 md:pb-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">Parent Engagement</h1>
        <p className="text-muted-foreground mt-0.5 text-sm">
          Monitor and manage school-wide parent communication.
        </p>
      </div>

      <SegmentControl
        value={tab}
        onChange={setTab}
        options={TABS}
        scrollable
      />

      {tab === "adoption" && <AppAdoption />}
      {tab === "updates" && <DailyUpdates />}
      {tab === "broadcasts" && <Broadcasts />}
      {tab === "events" && <Events />}
    </div>
  );
}

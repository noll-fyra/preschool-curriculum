"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { getActivityConfig } from "@/lib/activity-data";
import { ActivityPlayer } from "@/components/student/ActivityPlayer";
import Link from "next/link";

export default function ActivityPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const childId = params.childId as string;
  const milestoneId = params.milestoneId as string;
  const fromPlace = searchParams.get("from");

  const store = useStore();
  const { recordSession, activityConfigOverrides } = store;

  const child = store.children.find((c) => c.id === childId);
  const config = activityConfigOverrides[milestoneId] ?? getActivityConfig(milestoneId);

  if (!child || !config) {
    return (
      <div
        style={{
          padding: "32px 20px",
          textAlign: "center",
          background: "#FFF8F0",
          minHeight: "100vh",
        }}
      >
        <p style={{ color: "#8B7355" }}>Activity not found.</p>
        <Link
          href="/student"
          style={{ display: "inline-block", marginTop: 16, fontSize: 14, color: "#7DC873" }}
        >
          ← Back
        </Link>
      </div>
    );
  }

  const handleComplete = (score: number) => {
    recordSession(childId, milestoneId, score);
    if (fromPlace) {
      router.push(`/student/${childId}/place/${fromPlace}`);
    } else {
      router.push(`/student/${childId}`);
    }
  };

  return (
    // Child-facing screen: hardcoded #FFF8F0 background overrides any dark-mode CSS var
    <div style={{ background: "#FFF8F0", minHeight: "100vh" }}>
      <ActivityPlayer
        childId={childId}
        childName={getChildDisplayName(child)}
        config={config}
        onComplete={handleComplete}
      />
    </div>
  );
}

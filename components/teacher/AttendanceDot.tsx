import type { AttendanceStatus } from "@/lib/types";

const STATUS_COLOR: Record<AttendanceStatus, string> = {
  pending: "#3B82F6",
  present: "#4A9B6F",
  late:    "#F5A623",
  absent:  "#9CA3AF",
};

const STATUS_LABEL: Record<AttendanceStatus, string> = {
  pending: "Pending",
  present: "Present",
  late:    "Late",
  absent:  "Absent",
};

interface AttendanceDotProps {
  status: AttendanceStatus;
  size?: number;
  /** Show text label inline (shown automatically for absent and late) */
  showLabel?: boolean;
}

export function AttendanceDot({ status, size = 8, showLabel }: AttendanceDotProps) {
  const showText = showLabel || status === "absent" || status === "late";

  if (showText) {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: size,
            height: size,
            borderRadius: "50%",
            backgroundColor: STATUS_COLOR[status],
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: size * 1.25,
            fontWeight: 600,
            color: STATUS_COLOR[status],
            lineHeight: 1,
          }}
        >
          {STATUS_LABEL[status]}
        </span>
      </span>
    );
  }

  return (
    <span
      title={STATUS_LABEL[status]}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: STATUS_COLOR[status],
        flexShrink: 0,
      }}
    />
  );
}

import React from "react";

type BigCardProps = {
  icon?: React.ReactNode;
  titleLines: string[];
  top?: React.ReactNode;     // bloc haut (rich)
  label?: React.ReactNode;   // label (rich)
  bottom?: React.ReactNode;  // bloc bas (rich) -> optionnel
  outro?: React.ReactNode;   // outro (rich) -> optionnel
  className?: string;
};

export function BigCard({
  icon,
  titleLines,
  top,
  label,
  bottom,
  outro,
  className = "",
}: BigCardProps) {
  return (
    <div
      className={[
        "rounded-2xl bg-[#0f1a2b] p-7 ring-1 ring-white/10",
        className,
      ].join(" ")}
    >
      {/* Icône */}
      {icon ? (
        <div className="w-fit text-3xl text-sky-400">{icon}</div>
      ) : null}

      {/* Titre multi-lignes */}
      <div className="mt-4 text-lg font-semibold leading-7">
        {Array.isArray(titleLines)
          ? titleLines.filter(Boolean).map((l, idx) => (
              <div key={`${l}-${idx}`}>{l}</div>
            ))
          : null}
      </div>

      {/* Bloc haut */}
      {top ? <div className="mt-4 text-sm leading-7 text-white/85">{top}</div> : null}

      {/* Label */}
      {label ? (
        <div className="mt-6 text-sm font-semibold text-white">{label}</div>
      ) : null}

      {/* Bloc bas */}
      {bottom ? (
        <div className="mt-3 text-sm leading-7 text-white/80">{bottom}</div>
      ) : null}

      {/* Outro */}
      {outro ? (
        <div className="mt-5 text-sm leading-7 text-white/80">{outro}</div>
      ) : null}
    </div>
  );
}
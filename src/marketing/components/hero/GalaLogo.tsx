/* ═══════════════════════════════════════════════════════════
   GalaLogo — Gold laurel-wreath + compass-star emblem
   Traced from the Awards Week Gala branding asset.
   Usage: <GalaLogo x={10} y={10} size={20} />
   ═══════════════════════════════════════════════════════════ */
import { C } from './tokens';

interface Props {
  x: number;
  y: number;
  size: number;
  fill?: string;
  opacity?: number;
}

/**
 * Renders the Gala emblem inside a `size × size` bounding box
 * at the given (x, y) origin. The paths are drawn in a 0-100
 * coordinate system and scaled via `transform`.
 */
export function GalaLogo({ x, y, size, fill = C.gold, opacity = 1 }: Props) {
  const s = size / 100;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} opacity={opacity}>
      {/* ── Central compass star ── */}
      <polygon
        points="50,18 54,40 76,40 58,52 64,74 50,60 36,74 42,52 24,40 46,40"
        fill={fill}
      />
      {/* ── Letter A / spire ── */}
      <polygon
        points="50,2 42,34 50,28 58,34"
        fill={fill}
      />
      {/* Small triangle cut-out for the A crossbar */}
      <polygon points="50,22 46,32 54,32" fill={fill} opacity={0.6} />

      {/* ── Left laurel branch ── */}
      <g fill={fill}>
        {/* Main stem curve */}
        <ellipse cx={24} cy={52} rx={3} ry={8} transform="rotate(-20,24,52)" />
        <ellipse cx={18} cy={42} rx={3} ry={7} transform="rotate(-35,18,42)" />
        <ellipse cx={15} cy={32} rx={2.5} ry={6} transform="rotate(-50,15,32)" />
        <ellipse cx={16} cy={22} rx={2} ry={5} transform="rotate(-60,16,22)" />

        {/* Leaf pairs */}
        <ellipse cx={28} cy={62} rx={4} ry={2.5} transform="rotate(-15,28,62)" />
        <ellipse cx={22} cy={58} rx={4} ry={2.5} transform="rotate(25,22,58)" />
        <ellipse cx={20} cy={48} rx={3.5} ry={2.2} transform="rotate(35,20,48)" />
        <ellipse cx={14} cy={46} rx={3.5} ry={2.2} transform="rotate(-20,14,46)" />
        <ellipse cx={12} cy={36} rx={3} ry={2} transform="rotate(40,12,36)" />
        <ellipse cx={10} cy={28} rx={2.5} ry={1.8} transform="rotate(-30,10,28)" />

        {/* Bottom curl */}
        <ellipse cx={32} cy={72} rx={5} ry={2.8} transform="rotate(-5,32,72)" />
        <ellipse cx={36} cy={78} rx={4} ry={2.2} transform="rotate(10,36,78)" />
      </g>

      {/* ── Right laurel branch (mirrored) ── */}
      <g fill={fill} transform="translate(100,0) scale(-1,1)">
        <ellipse cx={24} cy={52} rx={3} ry={8} transform="rotate(-20,24,52)" />
        <ellipse cx={18} cy={42} rx={3} ry={7} transform="rotate(-35,18,42)" />
        <ellipse cx={15} cy={32} rx={2.5} ry={6} transform="rotate(-50,15,32)" />
        <ellipse cx={16} cy={22} rx={2} ry={5} transform="rotate(-60,16,22)" />

        <ellipse cx={28} cy={62} rx={4} ry={2.5} transform="rotate(-15,28,62)" />
        <ellipse cx={22} cy={58} rx={4} ry={2.5} transform="rotate(25,22,58)" />
        <ellipse cx={20} cy={48} rx={3.5} ry={2.2} transform="rotate(35,20,48)" />
        <ellipse cx={14} cy={46} rx={3.5} ry={2.2} transform="rotate(-20,14,46)" />
        <ellipse cx={12} cy={36} rx={3} ry={2} transform="rotate(40,12,36)" />
        <ellipse cx={10} cy={28} rx={2.5} ry={1.8} transform="rotate(-30,10,28)" />

        <ellipse cx={32} cy={72} rx={5} ry={2.8} transform="rotate(-5,32,72)" />
        <ellipse cx={36} cy={78} rx={4} ry={2.2} transform="rotate(10,36,78)" />
      </g>
    </g>
  );
}

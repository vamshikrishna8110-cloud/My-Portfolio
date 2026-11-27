function moveCube(event) {
  if (event.pointerType !== 'mouse' || !matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return
  const panel = event.currentTarget
  const { left, top, width, height } = panel.getBoundingClientRect()
  panel.style.setProperty('--cube-x', ((event.clientX - left) / width - 0.5) * 10 + 'px')
  panel.style.setProperty('--cube-y', ((event.clientY - top) / height - 0.5) * 8 + 'px')
}

function resetCube(event) {
  event.currentTarget.style.removeProperty('--cube-x')
  event.currentTarget.style.removeProperty('--cube-y')
}

export default function MonogramCube() {
  return (
    <div className="hero-art" aria-hidden="true" onPointerMove={moveCube} onPointerLeave={resetCube}>
      <svg className="monogram-scene" viewBox="0 0 520 440" fill="none">
        <path className="cube-guides" d="M38 87V51h38m368 0h38v36M38 354v35h38m368 0h38v-35M260 24v392M44 225h432" />
        <path className="cube-floor" d="m260 279 177 82-177 67-177-67z" />
        <path className="cube-guides" d="m119 347 177 67m-142-84 177 70m-142-87 177 73m-142-90 177 77m0-26-177 67m142-84-177 70m142-87-177 73m142-90-177 77" />
        <g className="cube-parallax">
          <g className="cube-float">
            <path className="cube-frame" d="m260 28 158 89v178l-158 89-158-89V117zM260 28v178l158 89M102 117l158 89 158-89M102 295l158-89v178" />
            <path className="cube-top" d="m260 49 140 79-140 78-140-78z" />
            <path className="cube-left" d="M120 128l140 78v157l-140-79z" />
            <path className="cube-right" d="m400 128-140 78v157l140-79z" />
            <path className="cube-detail" d="m144 117 116 65 116-65m-164-42 140 79m-44-79-140 79M140 154v118l102 58m138-176v118l-102 58m-158-95 140 78 140-78m-140 78v50" />
            <path className="cube-edge" d="m120 128 140 78 140-78M260 206v157m-140-79 140 79 140-79" />
            <path className="cube-plate" d="M193 178h134l13 13v74l-13 13H193l-13-13v-74z" />
            <path className="cube-plate-detail" d="M199 187h122l10 10v62l-10 10H199l-10-10v-62z" />
            <path className="cube-lettering" d="m204 211 20 39 21-39m10 39 26-41 28 41m-46-12h37" />
            <path className="cube-highlights" d="m120 128 26 15m228 0 26-15M260 49l25 14m-25 300 25-14M102 117v17m316 143v18" />
            <circle className="cube-point" cx="260" cy="49" r="3" />
            <circle className="cube-point" cx="120" cy="128" r="2.5" />
            <circle className="cube-point" cx="400" cy="128" r="2.5" />
            <circle className="cube-point" cx="260" cy="363" r="3" />
          </g>
        </g>
      </svg>
    </div>
  )
}

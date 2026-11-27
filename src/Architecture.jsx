import { useId } from 'react'

export default function Architecture({ project, stages }) {
  const id = useId()
  const height = stages.length * 70 - 16

  return (
    <svg className="architecture-diagram" viewBox={'0 0 360 ' + height}
      role="img" aria-labelledby={id + '-title'} aria-describedby={id + '-description'}>
      <title id={id + '-title'}>{project} conceptual architecture</title>
      <desc id={id + '-description'}>{stages.join(' → ')}</desc>
      {stages.map((stage, index) => (
        <g key={stage} transform={'translate(0 ' + index * 70 + ')'}>
          {index > 0 && <path className="diagram-connector" d="M180 -19V-5m-4-4 4 4 4-4" />}
          <rect className="diagram-node" x="9" y="3" width="342" height="45" rx="9" />
          <circle className="diagram-marker" cx="35" cy="26" r="12" />
          <text className="diagram-number" x="35" y="26" textAnchor="middle" dominantBaseline="central">{index + 1}</text>
          <text className="diagram-label" x="56" y="26" dominantBaseline="central">{stage}</text>
        </g>
      ))}
    </svg>
  )
}

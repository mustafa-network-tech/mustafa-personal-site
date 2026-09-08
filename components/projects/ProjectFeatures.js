import { getProjectFeatureIcon } from './projectFeatureIcons'
import styles from './ProjectFeatures.module.css'

export default function ProjectFeatures({ features }) {
  return (
    <ul role="list" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
      {features.map((feature, index) => {
        const Icon = getProjectFeatureIcon(feature)
        return (
          <li key={`${index}-${feature}`} className={styles.card}>
            <div className={styles.icon} aria-hidden="true">
              <Icon strokeWidth={1.75} />
            </div>
            <span className="min-w-0 text-[13px] sm:text-[14px] font-medium leading-5 text-[#334155] [overflow-wrap:anywhere]">
              {feature}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

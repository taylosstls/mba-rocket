import styles from './Avatar.module.css'

export function Avatar({ profile = false, hasBorder = true, src }) {
  const classNames = profile ? styles.profile : hasBorder ? styles.avatarWithBorder : styles.avatar;

  return <img className={classNames} src={src} />
}
import { ComponentProps } from 'react';
import styles from './Avatar.module.css'

interface AvatarProps extends ComponentProps<'img'> {
  hasBorder?: boolean;
  profile?: boolean;
}

export function Avatar({ profile = false, hasBorder = true, ...props }: AvatarProps) {
  const classNames = profile ? styles.profile : hasBorder ? styles.avatarWithBorder : styles.avatar;

  return <img className={classNames} {...props} />
}
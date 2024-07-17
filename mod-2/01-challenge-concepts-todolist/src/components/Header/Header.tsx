import LogoToDo from '@/assets/logo.svg'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.container}>
      <img className={styles.logo} src={LogoToDo} alt="Logo ToDo List" />
    </header>
  )
}

import styles from './Empty.module.css'

import ClipboardImg from '@/assets/clipboard.png'

export function EmptyModule() {
  return (
    <div className={styles.container}>
      <img src={ClipboardImg} alt="Ícone de prancheta" />
      <p>
        <strong>Você ainda não tem tarefas cadastradas</strong>
        Crie tarefas e organize seus itens a fazer
      </p>
    </div>
  )
}

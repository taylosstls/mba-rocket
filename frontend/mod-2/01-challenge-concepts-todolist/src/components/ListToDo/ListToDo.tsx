import styles from './ListToDo.module.css'

export default function ListToDo() {
  return (
    <header className={styles.container}>
      <aside>
        <p>Tarefas criadas</p>
        <span>0</span>
      </aside>

      <aside>
        <p>Concluídas</p>
        <span>
          {/* {tasksCounter === 0
            ? tasksCounter
            : `${checkedTasksCounter} de ${tasksCounter}`} */}
          0
        </span>
      </aside>
    </header>
  )
}

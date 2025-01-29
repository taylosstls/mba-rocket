import styles from './App.module.css'

import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

import { Header } from '@/components/Header/Header'
import { Input } from '@/components/Input/Input'
import { Button } from './components/Button/Button'

import { PlusCircle } from '@phosphor-icons/react'
import ListToDo from './components/ListToDo/ListToDo'

function App() {
  const [toDos, setToDos] = useState<string[]>([])
  const [newToDoTask, setNewToDoTask] = useState('')

  function handleSubmitComment(event: FormEvent) {
    event.preventDefault()

    setToDos([...toDos, newToDoTask])
    setNewToDoTask('')
  }

  function handleTextToDoChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewToDoTask(event.target.value)
  }

  function handleNewToDoInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Campo obrigatório!')
  }

  return (
    <>
      <Header />
      <section className={styles.container}>
        <form
          onSubmit={handleSubmitComment}
          className={styles.containerFormWrapper}
        >
          <Input
            value={newToDoTask}
            onChange={handleTextToDoChange}
            onInvalid={handleNewToDoInvalid}
            placeholder="Adicione uma nova tarefa..."
            required
          />
          <Button disabled={newToDoTask.length === 0}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </form>

        <ListToDo />
      </section>
    </>
  )
}

export default App

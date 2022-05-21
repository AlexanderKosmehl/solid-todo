import { Component, createSignal, For, onMount } from 'solid-js'

import styles from './App.module.css'

const LOCALSTORAGE_TODO_KEY = 'todoapp.todos'

export const App: Component = () => {
  const [todos, setTodos] = createSignal<string[]>([])
  const [newTodo, setNewTodo] = createSignal<string>('')

  onMount(() => {
    const oldTodos = localStorage.getItem(LOCALSTORAGE_TODO_KEY)
    if (!oldTodos) return

    setTodos(JSON.parse(oldTodos))
  })

  function handleAdd() {
    // New todo logic
    setTodos([...todos(), newTodo()])
    setNewTodo('')

    // Local storage
    localStorage.setItem(LOCALSTORAGE_TODO_KEY, JSON.stringify(todos()))
  }

  return (
    <div class={styles.App}>
      <h1>Solid - Todo</h1>
      <ul>
        <For each={todos()}>
          {(todo, index) => (
            <li
              onClick={() =>
                setTodos(
                  todos().filter((_, todoIndex) => index() !== todoIndex)
                )
              }
            >
              {todo}
            </li>
          )}
        </For>
      </ul>
      <div>
        <input
          type="text"
          onInput={(e) => setNewTodo(e.currentTarget.value)}
          value={newTodo()}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  )
}

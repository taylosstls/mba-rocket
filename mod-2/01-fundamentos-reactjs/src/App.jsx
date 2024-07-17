import { Post } from "./components/Post"
import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"

import styles from './App.module.css'
import { posts } from './utils/postsPublished'

function App() {

  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        
        <main>
        {posts.map((post) => {
            return (
                <Post key={post.id} author={post.author} publishedAt={post.publishedAt} content={post.content} />
            );
        })}
        </main>

      </div>

    </>
  )
}

export default App
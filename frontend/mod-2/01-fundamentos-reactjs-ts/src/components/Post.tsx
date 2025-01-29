import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { ToastContainer, toast, ToastOptions, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

import styles from './Post.module.css';

import { Comment } from './Comment';
import { Avatar } from './Avatar';

import { PostType } from '../utils/postsPublished'

type CustomToastOptions = ToastOptions & {
  position: ToastPosition;
};

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState<string[]>([]);
  const [newCommentText, setNewCommentText] = useState('');


  const toastConfig: CustomToastOptions = {
    position: 'top-right',
    bodyStyle: {
        fontSize: '14px',
    },
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'light',
  };

  const publishedDateFormatted = format(post.publishedAt, `d 'de' LLLL 'às' HH:mm'h'`, { locale: ptBR });
  const timeAgo = formatDistanceToNow(post.publishedAt, { locale: ptBR, addSuffix: true });

  function handleSubmitComment(event: FormEvent) {
    event.preventDefault()

    setComments([...comments, newCommentText]);
    setNewCommentText('');

    toast.success('Comentário publicado com sucesso!', toastConfig);
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Campo obrigatório!')
    
    toast.warn('Campo obrigatório!', toastConfig);
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete;
    })

    setComments(commentsWithoutDeletedOne);
    toast.success('Comentário deletado com sucesso!', toastConfig);
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} hasBorder />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>Publicado {timeAgo}</time>
      </header>

      <div className={styles.content}>
        {
          post.content.map(((item) => {
            if (item.type === 'paragraph') {
              return <p key={`${item.type}_${item.content}`}>{item.content}</p>
            } else if (item.type === 'link') {
              return <p key={`${item.type}_${item.content}`}><a href={`https://${item.content}`}>{item.content}</a></p>
            }
          }))
        }
      </div>

      <form onSubmit={handleSubmitComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea name='comment' value={newCommentText} onChange={handleNewCommentChange} onInvalid={handleNewCommentInvalid} placeholder="Deixe um comentário" required />

        <footer>
          <button type="submit" disabled={newCommentText.length === 0}>Publicar</button>
        </footer>
          <ToastContainer style={{ fontSize: '.5rem !important' }} limit={3} />
      </form>

      <div className={styles.commentList}>
        {
          comments.map ((comment) => <Comment key={comment} content={comment} onDeleteComment={deleteComment} />)
        }
        
      </div>
    </article>
  )
}
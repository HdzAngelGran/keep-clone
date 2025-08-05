import { useComments } from '../hooks/useComments'
import { useTodo } from '../hooks/useTodo'
import Close from '../assets/Close'
import { type Item, type Comment } from '../types'
import './Comments.css'
import { useMutation } from '@tanstack/react-query'
import { createComment } from '../service/item'

function Comments() {
  const { open, setOpen, itemId, setItemId, fatherId, setFatherId } =
    useComments()
  const {
    list,
    addComment,
    editComment,
    deleteComment,
    addSubComment,
    editSubComment,
    deleteSubComment,
  } = useTodo()

  const isSub = fatherId !== ''

  const item = isSub
    ? list
        .find((i) => i.id === fatherId)
        ?.subItems?.find((si) => si.id == itemId)
    : list.find((i) => i.id === itemId)

  const { mutate } = useMutation({
    mutationFn: async () => {
      const newCommentId = await createComment(itemId)
      addComment(itemId, newCommentId)
    },
  })

  const newComment = (): void => {
    if (isSub) {
      addSubComment(fatherId, itemId)
      return
    }
    mutate()
  }

  const updateComment = (commentId: string, value: string): void => {
    if (isSub) {
      editSubComment(fatherId, itemId, commentId, value)
      return
    }
    editComment(itemId, commentId, value)
  }

  const deleteFromComments = (commentId: string): void => {
    if (isSub) {
      deleteSubComment(fatherId, itemId, commentId)
      return
    }
    deleteComment(itemId, commentId)
  }

  const closeModal = (): void => {
    setOpen(false)
    setItemId('')
    setFatherId('')
  }

  return (
    <div className="modal" style={{ display: open ? 'flex' : 'none' }}>
      <div className="comments-modal">
        <header>
          <div className="close-modal">
            <div title="Cerrar" className="close" onClick={closeModal}>
              <Close width={'1rem'} height={'1rem'} />
            </div>
          </div>
          <h2>Comentarios</h2>
          <span>Tarea: {item?.text}</span>
        </header>
        <section>
          {item?.comments?.map((c: Comment) => (
            <div className="comment" key={c.id}>
              <input
                className="text"
                type="text"
                value={c.text}
                onChange={(e) => updateComment(c.id, e.target.value)}
              />
              <div
                title="Eliminar"
                className="close"
                onClick={() => deleteFromComments(c.id)}
              >
                <Close width={'1.3rem'} height={'1.3rem'} />
              </div>
            </div>
          ))}
          <button type="button" onClick={newComment}>
            + Nuevo Comentario
          </button>
        </section>
      </div>
    </div>
  )
}

export default Comments

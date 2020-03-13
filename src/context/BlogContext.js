import createDataContext from './createDataContext'

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'add_blogpost':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content
        }
      ]
    case 'edit_blogpost':
    case 'delete_blogpost':
      return state.filter(blogPost => blogPost.id !== action.payload)
    default:
      return state
  }
}

// TYPE and PAYLOAD are community convention, can rename
const addBlogPost = dispatch => {
  // could make aysnc, push to api somewhere, catch in case of error
  return (title, content, callback) => {
    dispatch({ type: 'add_blogpost', payload: { title, content } })
    callback()
  }
}
const deleteBlogPost = dispatch => {
  return id => {
    dispatch({ type: 'delete_blogpost', payload: id })
  }
}

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost },
  []
)

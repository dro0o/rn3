import createDataContext from './createDataContext'

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'add_blogpost':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: `Blog Post #${state.length + 1}`
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
  return () => {
    dispatch({ type: 'add_blogpost' })
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

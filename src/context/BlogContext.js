import createDataContext from './createDataContext'
import jsonserver from '../api/jsonServer'
import jsonServer from '../api/jsonServer'

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blogpost':
      return action.payload
    case 'edit_blogpost':
      return state.map(blogPost => {
        return blogPost.id === action.payload.id ? action.payload : blogPost
      })
    case 'delete_blogpost':
      return state.filter(blogPost => blogPost.id !== action.payload)
    default:
      return state
  }
}

const getBlogPost = dispatch => {
  return async () => {
    const response = await jsonserver.get('/blogposts')
    dispatch({ type: 'get_blogpost', payload: response.data })
  }
}

// TYPE and PAYLOAD are community convention, can rename
const addBlogPost = dispatch => {
  return async (title, content, callback) => {
    await jsonserver.post('/blogposts', { title, content })
    if (callback) {
      callback()
    }
  }
}
const deleteBlogPost = dispatch => {
  return async id => {
    await jsonServer.delete(`/blogposts/${id}`)
    dispatch({ type: 'delete_blogpost', payload: id })
  }
}
const editBlogPost = dispatch => {
  return async (id, title, content, callback) => {
    await jsonserver.put(`/blogposts/${id}`, { title, content })
    dispatch({ type: 'edit_blogpost', payload: { id, title, content } })
    if (callback) {
      callback()
    }
  }
}

export const { Context, Provider } = createDataContext(
  blogReducer,
  { getBlogPost, addBlogPost, deleteBlogPost, editBlogPost },
  []
)

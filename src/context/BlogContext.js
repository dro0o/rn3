import createDataContext from './createDataContext'
import jsonserver from '../api/jsonServer'

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blogpost':
      return action.payload
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
  // could make aysnc, push to api somewhere, catch in case of error
  return (title, content, callback) => {
    dispatch({ type: 'add_blogpost', payload: { title, content } })
    if (callback) {
      callback()
    }
  }
}
const deleteBlogPost = dispatch => {
  return id => {
    dispatch({ type: 'delete_blogpost', payload: id })
  }
}
const editBlogPost = dispatch => {
  return (id, title, content, callback) => {
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

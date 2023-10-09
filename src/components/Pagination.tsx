import { useDispatch, useSelector } from '../components/hooks'
import { RootState } from '../redux/index'
import { incrementPage, decrementPage } from '../redux/gallery-redux'
import '../styles/paginator.scss'

export const Pagination = () => {
  const dispatch = useDispatch()
  const page = useSelector((state: RootState) => state.gallery.filters.page)
  return (
    <>
      <div className="paginator gap-2 justify-end mb-4 pt-4">
      <button
          onClick={() => {
            dispatch(decrementPage())
            window.scrollTo(0, 0)
          }}
          disabled={page === 1}
          className={`${page === 1 ? 'bg-red-500' : 'bg-red-900 hover:bg-orange-700'} button mr-4 py-4 px-4 border border-gray-400 rounded-full shadow text-white font-semibold`}
        >Back
        </button>
        <button
          onClick={() => {
            dispatch(incrementPage())
            window.scrollTo(0, 0)
          }}
          className="button bg-green-400 hover:bg-yellow-400 text-white font-semibold py-4 px-4 border border-gray-400 rounded-full shadow"
        >Forward
        </button>
      </div>
    </>
  )
}

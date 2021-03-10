import React from 'react'
import {Link} from 'react-router-dom'

const PaginationControlPages = ({currentPage, maxNumPages}) => {
  let start, end
  const pagesCutOff = 5
  const ceiling = Math.ceil(pagesCutOff / 2)
  const floor = Math.floor(pagesCutOff / 2)
  if (maxNumPages < pagesCutOff) {
    start = 0
    end = maxNumPages
  } else if (currentPage >= 1 && currentPage <= ceiling) {
    start = 0
    end = pagesCutOff
  } else if (currentPage + floor >= maxNumPages) {
    start = maxNumPages - pagesCutOff
    end = maxNumPages
  } else {
    start = currentPage - ceiling
    end = currentPage + floor
  }

  const pages = []
  let currentUrlParams = new URLSearchParams(window.location.search)
  for (let i = start; i < end; i++) {
    currentUrlParams.set('page', i + 1)
    pages.push(
      <li
        key={i}
        className={'page-item ' + (i + 1 === currentPage ? 'active' : '')}
      >
        <Link
          className="page-link link-primary"
          href={window.location.pathname + '?' + currentUrlParams.toString()}
        >
          {i + 1}
        </Link>
      </li>
    )
  }

  return pages
}

export default function PaginationControls(props) {
  const currentUrlParams = new URLSearchParams(window.location.search)
  const nextPage = new URLSearchParams(window.location.search)
  const lastPage = new URLSearchParams(window.location.search)
  const currentPage = parseInt(currentUrlParams.get('page'))
  nextPage.set('page', currentPage + 1)
  lastPage.set('page', currentPage - 1)

  const maxNumPages = Math.ceil(props.count / props.size)
  return (
    <nav className="justify-content-center" aria-label="Page navigation">
      <ul className="mt-3 pagination justify-content-center">
        <li className="page-item">
          <Link
            className="page-link link-primary"
            aria-label="Previous"
            to={window.location.pathname + '?' + lastPage.toString()}
          >
            <i className="bi-caret-left-fill" />
          </Link>
        </li>
        <PaginationControlPages
          currentPage={currentPage}
          maxNumPages={maxNumPages}
        />
        <li className="page-item">
          <Link
            className="page-link link-primary"
            aria-label="Next"
            to={window.location.pathname + '?' + nextPage.toString()}
          >
            <i className="bi-caret-right-fill" />
          </Link>
        </li>
      </ul>
    </nav>
  )
}

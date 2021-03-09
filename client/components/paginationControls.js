import React from 'react'

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
  for (let i = start; i < end; i++) {
    pages.push(
      <li
        key={i}
        className={'page-item ' + (i + 1 === currentPage ? 'active' : '')}
      >
        <a className="page-link link-primary" href={`/products/?page=${i + 1}`}>
          {i + 1}
        </a>
      </li>
    )
  }

  return pages
}

export default function PaginationControls(props) {
  const currentPage = parseInt(
    new URLSearchParams(props.location.search).get('page')
  )
  const maxNumPages = props.count / 10
  return (
    <nav className="justify-content-center" aria-label="Page navigation">
      <ul className="mt-3 pagination justify-content-center">
        <li className="page-item">
          <a
            className="page-link link-primary"
            href={`/products/?page=${Math.max(1, currentPage - 1)}`}
          >
            <i className="bi-caret-left-fill" />
          </a>
        </li>
        <PaginationControlPages
          currentPage={currentPage}
          maxNumPages={maxNumPages}
        />
        <li className="page-item">
          <a
            className="page-link link-primary"
            href={`/products/?page=${Math.min(currentPage + 1, maxNumPages)}`}
          >
            <i className="bi-caret-right-fill" />
          </a>
        </li>
      </ul>
    </nav>
  )
}

import React from "react";
import styles from "./Pagination.module.scss";

//scrolling functionality
const scroll = scrollTo => {
  scrollTo.current.scrollIntoView({ behavior: "smooth" });
};

//declare constants for determining the current situation for setCurrentPage function
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

//setCurrentPage based on the state of the left and right buttons of the pagination
const onSetCurrentPage = (
  setCurrentPage,
  currentPage,
  pageNumberChangingStatus,
  scrollTo
) => {
  switch (pageNumberChangingStatus) {
    case INCREMENT: {
      scroll(scrollTo);
      setCurrentPage(currentPage + 1);
      break;
    }
    case DECREMENT: {
      scroll(scrollTo);
      setCurrentPage(currentPage - 1);
      break;
    }
    default:
      break;
  }
};
//create pagination for the first and last page
const firstAndLastPagesPagination = (
  currentPage,
  totalPages,
  setCurrentPage,
  scrollTo
) => {
  return (
    <React.Fragment>
      <button
        onClick={
          //only run the click event when we're on the last page
          currentPage + 1 === totalPages
            ? () => {
                setCurrentPage(0);
                scroll(scrollTo);
              }
            : undefined
        }
        
        /* conditionally set the active class for the button */className={currentPage === 0 ? styles.isActive : undefined}
      >
        1
      </button>
      <button className={styles.elipsis}>
        <i className="fas fa-ellipsis-h"></i>
      </button>
      <button
        onClick={
          //only run the click event when we're on the first page
          currentPage + 1 === 1
            ? () => {
                setCurrentPage(totalPages - 1);
                scroll(scrollTo);
              }
            : undefined
        }
        /* conditionally set the active class for the button */
        className={currentPage + 1 === totalPages ? styles.isActive : undefined}
      >
        {totalPages}
      </button>
    </React.Fragment>
  );
};
//create pagination for 2nd and n-1st page
const paginationForSecondAndOneBeforeLastPage = (
  currentPage,
  totalPages,
  setCurrentPage,
  scrollTo
) => {
  return (
    <React.Fragment>
      <button
        onClick={() => {
          setCurrentPage(0);
          scroll(scrollTo);
        }}
      >
        1
      </button>
      {currentPage + 1 === 2 ? (
        //2nd page's buttons
        <React.Fragment>
          <button className={styles.isActive}>2</button>
          <button className={styles.elipsis}>
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </React.Fragment>
      ) : (
        //n-1st page's buttons
        <React.Fragment>
          <button className={styles.elipsis}>
            <i className="fas fa-ellipsis-h"></i>
          </button>
          <button className={styles.isActive}>{totalPages - 1}</button>
        </React.Fragment>
      )}
      <button
        onClick={() => {
          setCurrentPage(totalPages - 1);
          scroll(scrollTo);
        }}
      >
        {totalPages}
      </button>
    </React.Fragment>
  );
};
//create pagination buttons based on the page's state
const paginationMiddleSectionCreator = (
  currentPage,
  totalPages,
  setCurrentPage,
  scrollTo
) => {
  //if there is only one page available
  if (totalPages === 1) {
    return <button className={styles.isActive}>1</button>;
  }
  switch (currentPage + 1) {
    //create pagination buttons for 1st and last page
    case 1:
    case totalPages: {
      return firstAndLastPagesPagination(
        currentPage,
        totalPages,
        setCurrentPage,
        scrollTo
      );
    }
    // create pagination buttons for 2nd and n-1st page
    case 2:
    case totalPages - 1: {
      return paginationForSecondAndOneBeforeLastPage(
        currentPage,
        totalPages,
        setCurrentPage,
        scrollTo
      );
    }
    //create pagination buttons for the middle ones
    default: {
      return (
        <React.Fragment>
          <button
            onClick={() => {
              setCurrentPage(0);
              scroll(scrollTo);
            }}
          >
            1
          </button>
          <button className={styles.elipsis}>
            <i className="fas fa-ellipsis-h"></i>
          </button>
          <button className={styles.isActive}>{currentPage + 1}</button>
          <button className={styles.elipsis}>
            <i className="fas fa-ellipsis-h"></i>
          </button>
          <button
            onClick={() => {
              setCurrentPage(totalPages - 1);
              scroll(scrollTo);
            }}
          >
            {totalPages}
          </button>
        </React.Fragment>
      );
    }
  }
};

//component declaration
const Pagination = ({
  darkMode,
  currentPage,
  setCurrentPage,
  totalPages,
  scrollTo
}) => {
  return (
    <div className={`${styles.pagination} ${darkMode ? `dark ` : `light `}`}>
      {/* disable next and previous page buttons whenever there is only 1 page available */}
      <button
        onClick={() => {
          onSetCurrentPage(setCurrentPage, currentPage, DECREMENT, scrollTo);
        }}
        disabled={currentPage === 0}
      >
        <i className="fas fa-arrow-left"></i>
      </button>
      {/* create the middle buttons for pagination component, based on the currentPage */}
      {paginationMiddleSectionCreator(
        currentPage,
        totalPages,
        setCurrentPage,
        scrollTo
      )}
      <button
        className={styles.nextPage}
        onClick={() => {
          onSetCurrentPage(setCurrentPage, currentPage, INCREMENT, scrollTo);
        }}
        disabled={currentPage + 1 === totalPages}
      >
        <i className="fas fa-arrow-left"></i>
      </button>
    </div>
  );
};

export default Pagination;

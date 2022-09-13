const ulTag = document.querySelector('.pagination__list');
const form = document.querySelector('#search-form');
const input = document.querySelector('input');
const filmList = document.querySelector('.film-list');

let totalPages = 20;
let page = 1;
const API_KEY = '18cc3ec683925dedb66d3e6092890eaa';

const fetchResponseTrend = async pagenr => {
  const responseTrend = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${pagenr}`
  );
  //   if (!responseTrend.ok) throw new Error();
  const moviesTrend = await responseTrend.json();
  return moviesTrend;
};

const fetchResponseSearch = async (search, pagenr) => {
  const responseSearch = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pl-PL&query=${search}&page=${pagenr}&include_adult=false`
  );
  //   if (!responseSearch.ok) throw new Error();
  const moviesSearch = await responseSearch.json();
  return moviesSearch;
};

// console.log(fetchResponseTrend(1));

function changePage(totalPages, page) {
  let liTag = '';
  let activeLi;
  let beforePages = page - 1;
  let afterPages = page + 1;

  ulTag.innerHTML = '';

  if (page > 1) {
    liTag += `<li class="btn prev" data-page="${
      page - 1
    }" onclick="changePage(totalPages, ${page - 1})"><span>&#8592</span></li>`;
  }

  if (page > 2) {
    liTag += `<li class="num" data-page="1" onclick="changePage(totalPages, 1)"><span>1</span></li>`;
    if (page > 3) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  if (page === totalPages) {
    beforePages = beforePages - 2;
  } else if (page === totalPages - 1) {
    beforePages = beforePages - 1;
  }

  if (page === 1) {
    afterPages = afterPages + 2;
  } else if (page === 2) {
    afterPages = afterPages + 1;
  }

  for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
    if (pageLength > totalPages) {
      continue;
    }
    if (pageLength === 0) {
      pageLength++;
    }
    if (page === pageLength) {
      activeLi = 'active';
    } else {
      activeLi = '';
    }
    liTag += `<li class="num ${activeLi}" data-page="${pageLength}" onclick="changePage(totalPages, ${pageLength})"><span>${pageLength}</span></li>`;
  }

  if (page < totalPages - 1) {
    if (page < totalPages - 3) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="num" data-page="${totalPages}" onclick="changePage(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) {
    liTag += `<li class="btn next" data-page="${
      page + 1
    }" onclick="changePage(totalPages, ${page + 1})"><span>&#8594</span></li>`;
  }

  if (totalPages === 1) {
    liTag = `<li class="btn prev"><span>&#8592</span></li>
          <li class="num active"><span>1</span></li>
          <li class="btn next"><span>&#8594</span></li>`;
  }

  ulTag.innerHTML = liTag;
}

// changePage(totalPages, page);

const addFilms = films => {
  const movies = films.results;
  const markup = movies
    .map(
      film =>
        `<div class="single-film">
            <img class="film-image" src="https://image.tmdb.org/t/p/w400/${film.poster_path}"
                alt="${film.title}">
            <div class="film-info">
                <p class="film-title">${film.title}</p>
                <div class="film-subinfo">
                    <p>Gatunek z API</p>
                    <p>${film.release_date}</p>
                </div>
            </div>
        </div>`
    )
    .join('');
  filmList.innerHTML = markup;
};

fetchResponseTrend(page).then( async popularMovies => {
  addFilms(popularMovies);
  changePage(popularMovies.total_pages, page);

 ulTag.addEventListener('click', async (event) => {

        page = Number(event.target.dataset.page);


        console.log(event.target.dataset.page);
        const popularMoviesNext = await fetchResponseTrend(page);

        addFilms(popularMoviesNext);
        changePage(popularMoviesNext.total_pages, page);
    });
});

ulTag.removeEventListener('submit', {});

form.addEventListener('submit', async e => {
  let tipedInput = input.value.trim();
  e.preventDefault();
  filmList.innerHTML = '';
  ulTag.innerHTML = '';

  page = 1;
  try {
    // console.log(fetchResponseSearch(tipedInput, page));
    if (tipedInput === '') {
      filmList.innerHTML = '';
      ulTag.innerHTML = '';
    }
    return fetchResponseSearch(tipedInput, page).then(movies => {
      if (movies.total_results === 0) {
        alert(
          `there are no movies with this title, here are the popular movies of the moment`
        );
        // return fetchResponseTrend(page).then(films => {
        //   addFilms(films);
        //   changePage(films.total_pages, page);

        //   ulTag.addEventListener('click', event => {
        //     page = Number(event.target.textContent);

        //     fetchResponseTrend(page).then(films => {
        //       addFilms(films);
        //       changePage(films.total_pages, page);
        //     });
        //   });
        //   ulTag.removeEventListener('submit', {});
        // });
      }

        if (movies.total_results > 0) {
        addFilms(movies);
        changePage(movies.total_pages, page);

        ulTag.addEventListener('click', event => {
          page = Number(event.target.textContent);

          fetchResponseSearch(tipedInput, page).then(moviesNextPage => {
            addFilms(moviesNextPage);
            changePage(moviesNextPage.total_pages, page);
          });
        });
        ulTag.removeEventListener('submit', {});
      }
    });
  } catch (error) {
    console.log(error.message);
  }
});

// ulTag.addEventListener("click", (event) => {
//     page = event.target.dataset.number
//     changePage(films.total_pages, page)
// })
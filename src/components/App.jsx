import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Header } from './header/Header';
import { PacmanLoader, BarLoader } from 'react-spinners';

//when using lazy and suspense, you import the components below
const HomePage = lazy(() => import('./homepage/Home'));
const MoviePage = lazy(() => import('./movie-search/Movies'));
const MovieDetails = lazy(() =>
  import('../components/movie-details/MovieDetails')
);
const Cast = lazy(() => import('../components/cast/Cast'));
const Reviews = lazy(() => import('../components/reviews/Reviews'));

export const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        {/* the home page with a list of popular movies. */}
        <Route
          path="/"
          element={
            <Suspense fallback={<BarLoader color="#36d7b7" />}>
              <HomePage />
            </Suspense>
          }
        />
        {/* a page of movie search by keyword. */}
        <Route
          path="/movies"
          element={
            <Suspense fallback={<BarLoader color="#36d7b7" />}>
              <MoviePage />{' '}
            </Suspense>
          }
        />
        {/* a page of movie search by keyword. */}
        {/* <Route path="/movies" element={<Movies />} /> */}
        {/* a parameter is signified when you add a colon before the name. Think of param as variables */}
        {/* URL Param to get details about a movie */}
        <Route
          path="/movies/:movieId"
          element={
            <Suspense fallback={<PacmanLoader color="pink" />}>
              <MovieDetails />
            </Suspense>
          }
        >
          {/* a page to show cast members */}
          <Route
            path="cast"
            element={
              <Suspense fallback={<BarLoader color="#36d7b7" />}>
                <Cast />
              </Suspense>
            }
          />
          {/* a page to show movie reviews */}
          <Route
            path="reviews"
            element={
              <Suspense fallback={<BarLoader color="#36d7b7" />}>
                <Reviews />
              </Suspense>
            }
          />
        </Route>
        {/* paths withs * are paths that are not declared or everything else */}
        <Route path="*" element={<HomePage/>} />
      </Routes>
      {/* //hooks outside of routes are going to persist in the app when window routes change// */}
    </div>
  );
};

export default App;

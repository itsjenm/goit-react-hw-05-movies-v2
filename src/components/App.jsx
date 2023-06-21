import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Header } from './header/Header';
import { BarLoader } from 'react-spinners';
import Notfound from 'pages/NotFound';

//when using lazy and suspense, you import the components below
const HomePage = lazy(() => import('./homepage/Home'));
const MoviePage = lazy(() => import('./movie-search/Movies'));
const MovieDetails = lazy(() =>
  import('../components/movie-details/MovieDetails')
);
// const Cast = lazy(() => import('../components/cast/Cast'));
// const Reviews = lazy(() => import('../components/reviews/Reviews'));

export const App = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={<BarLoader color="#36d7b7" />}>
        <Routes>
          {/* the home page with a list of popular movies. */}
          <Route path="/" element={<HomePage />} />
             {/* a page of movie search by keyword. */}
          <Route path="/movies" element={<MoviePage />} />
            {/* a page of movie search by keyword. */}
            {/* <Route path="/movies" element={<Movies />} /> */}
            {/* a parameter is signified when you add a colon before the name. Think of param as variables */}
            {/* URL Param to get details about a movie */}
            <Route path="/movies/:movieId/*" element={<MovieDetails />} />
            {/* a page to show cast members */}
            {/* <Route path="cast" element={<Cast />} /> */}
            {/* a page to show movie reviews */}
            {/* <Route path="reviews" element={<Reviews />} /> */}
            {/* paths withs * are paths that are not declared or everything else */}
            <Route path="*" element={<Notfound />} />
        </Routes>
      </Suspense>
      {/* //hooks outside of routes are going to persist in the app when window routes change// */}
    </div>
  );
};

export default App;

import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Error from '../pages/Error';
import Landing from '../pages/Landing';
import DrinkSubmissionForm from '../components/Forms/DrinkSubmission/drinkSubmission';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/drinkSubmission',
        element: <DrinkSubmissionForm />,
      }
    ],
  },
]);

export default router;

// import { BrowserRouter, useRoutes } from "react-router-dom"
// import routes from "./routes"

// function AppRouter(){
//   return useRoutes(routes)
// }

// function App() {
//   const element=useRoutes(routes)
//   console.log(element)
//   return (
//     <>
//     <BrowserRouter>
//    <AppRouter/>
//     </BrowserRouter>
    
//     </>
//   )
// }

// export default App

App.jsx
import { useRoutes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Food from './pages/Food';


export default function App() {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/food', element: <Food/> },
    { path: '/about', element: <About /> },

  ]);
  return routes; // `useRoutes` returns the matching route component
}
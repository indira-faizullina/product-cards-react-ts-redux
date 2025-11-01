import { BrowserRouter } from "react-router"
import { Provider } from "react-redux"
import AppRoutes from "./routes/AppRoutes.jsx"
import { store } from "./redux/store.js"

export default function App() {

  return(
      <BrowserRouter>
        <Provider store={store}>
          <AppRoutes/>
        </Provider>
      </BrowserRouter>
  )  
}
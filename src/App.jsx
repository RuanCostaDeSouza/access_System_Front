import AllRoutes from './routes';
import {AuthProvider} from './hooks/Auth';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./public/css/Global.css"
function App() {


  return (
    <>
    <AuthProvider>

      <AllRoutes/>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        />
    </AuthProvider>
    </>
  )
}


export default App
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import Landing from './pages/Landing'
import Article from './pages/Article'
import Nav from './components/Nav'
import './App.css'

const queryClient = new QueryClient();

function App() {
    return (
        <div className="app">
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <Nav />
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Landing />} />
                            <Route path='/articles' element={<Article />} />
                        </Routes>
                    </BrowserRouter>
                </QueryClientProvider>
            </RecoilRoot>
        </div>
    )
}

export default App

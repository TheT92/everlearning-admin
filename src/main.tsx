import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './routers/router'

import './styles/app.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)

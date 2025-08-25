import { hydrateRoot } from 'react-dom/client'
import { HydratedRouter } from 'react-router/dom';

const root = hydrateRoot(document, <HydratedRouter />)

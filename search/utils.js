import { useInstantSearch, useSearchBox } from 'react-instantsearch';
import './spinner.css';
import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

export function Error() {
    const { error } = useInstantSearch({ catchError: true });

    if (error) {
        return <>Search error: {error.message}</>;
    }
}

export function Spinner() {
    return <>
        <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
        </div>
    </>
}

export function AAPBResults() {
    const [results, setResults] = useState(null);
    const { query } = useSearchBox();

    const fetchResults = useCallback(debounce((currentQuery) => {
        fetch(`https://americanarchive.org/api.json?q=${encodeURIComponent(currentQuery)}&rows=0`)
            .then(response => response.json())
            .then(data => setResults(data.response.numFound))
            .catch(error => console.error(error));
    }, 500), []);

    useEffect(() => {
        if (query) {
            setResults(null); // Set results to null when the query changes to show the spinner
            fetchResults(query);
        }
    }, [fetchResults, query]);

    return (
        <>
            <a href="#">
                Search AmericanArchive.org
                &#x21E8;
                <span className="ais-RefinementList-count">
                    {/* If there's a query, show the spinner or results */}
                    {query ? results !== null ? results : <Spinner /> : null}
                </span>
            </a>
        </>
    )
}

export function NoResultsBoundary({ children, fallback }) {
    const { results } = useInstantSearch();

    // The `__isArtificial` flag makes sure not to display the No Results message
    // when no hits have been returned.
    if (!results.__isArtificial && results.nbHits === 0) {
        return (
            <>
                {fallback}
                <div hidden>{children}</div>
            </>
        );
    }

    return children;
}

export function NoResults() {
    const { indexUiState } = useInstantSearch();

    return (
        <>
            <p>
                No results for <strong><q>{indexUiState.query}</q></strong>.
            </p>
        </>
    );
}
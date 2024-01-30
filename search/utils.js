import { useInstantSearch } from 'react-instantsearch';
import './spinner.css';

export function Error() {
    const { error } = useInstantSearch({ catchError: true });

    if (error) {
        return <>Search error: {error.message}</>;
    }
}

export function Spinner() {
    return <>
        <div class="spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
        </div>
    </>
}

export function AAPBResults() {
    return (
        <>
            <a href="#">
                Search AmericanArchive.org
                &#x21E8;
                <span className="ais-RefinementList-count">
                    <Spinner />
                </span>
            </a>
        </>
    )
}
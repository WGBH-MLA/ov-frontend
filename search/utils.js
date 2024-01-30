import { useInstantSearch } from 'react-instantsearch';

export function Error() {
    const { error } = useInstantSearch({ catchError: true });

    if (error) {
        return <>Search error: {error.message}</>;
    }
}

export function AAPBResults() {
    return (
        <>
            <a href="#">
                AmericanArchive.org
                <span class="ais-RefinementList-count">5</span>
            </a>
        </>
    )
}
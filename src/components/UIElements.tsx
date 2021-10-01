import { FC, HTMLAttributes } from "react";
import Card from "@mui/material/Card";
import styled from "styled-components";

/**
 * General, reusable "atoms". Some are only used once, but that is largely a function
 * of the size of the app. It is reasonable to assume we would render "title value pairs"
 * or have more pages with "main content" in a larger app.
 *
 * The main thing here is that there are no dependencies on any other domain-specific code.
 * Other files/components depend on the components here, but this serves as our "pure" baseline.
 *
 * Normally these components would be among the first displayed in Storybook or another component
 * demo library.
 */

export const StyledMainContent = styled.main`
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: 1fr;

    @media (min-width: 72rem) {
        grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 125rem) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media (min-width: 155rem) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;

const Title = styled.p`
    font-weight: bold;
    font-size: 1.5rem;
    margin: 0.25rem;
`;
const Value = styled.p`
    font-size: 1.25rem;
    padding-top: 0.5rem;
    margin: 0.25rem;
    text-align: end;
`;
const TitleValueRow = styled.div.attrs(() => ({ tabIndex: 0 }))`
    display: flex;
    justify-content: space-between;
`;

export const TextSecondary: FC<{ title: string; value: string }> = ({
    title,
    value
}) => (
    <TitleValueRow>
        <Title>{title}:</Title> <Value>{value}</Value>
    </TitleValueRow>
);

export const StyledCard = styled(Card)`
    margin: 1rem 0;
    padding: 1rem;
`;

export const StyledAppContainer = styled.section`
    margin: 2rem;
    @media (min-width: 80rem) {
        margin: 3rem;
        padding: 3rem;
    }
`;

/**
 * I did not feel the need to actually style this (default style seems nice as is), but it is
 * sometimes a nice pattern to wrap _all_ html tags in React components. It provides a consistent
 * interface, as well as type safety for attributes.
 */
export const P: FC<HTMLAttributes<HTMLParagraphElement>> = ({ children }) => (
    <p>{children}</p>
);

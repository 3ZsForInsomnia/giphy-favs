import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import styled from "styled-components";

export interface NavItem {
    text: string;
    url: string;
}

const StyledListItem = styled.div`
    width: 15rem;
    margin: 1.5rem 0;
`;

const NavItemButton = ({ text, url }: NavItem) => (
    <StyledListItem>
        <ListItem button>
            <Link to={url}>
                <ListItemText primary={text} />
            </Link>
        </ListItem>
    </StyledListItem>
);

const StyledBox = styled(Box)`
    margin-top: 10rem;
`;

const NavItemsList = ({
    navItems,
    toggleDrawer
}: {
    navItems: NavItem[];
    toggleDrawer: (isOpen: boolean) => void;
}) => (
    <StyledBox
        role="presentation"
        onClick={() => toggleDrawer(false)}
        onKeyDown={() => toggleDrawer(false)}
    >
        <List>
            {navItems.map(navItem => (
                <NavItemButton key={navItem.url} {...navItem} />
            ))}
        </List>
    </StyledBox>
);

const StyledButton = styled(Button)`
    && {
        margin: 0.5rem 1rem 0.5rem 0;
    }
`;

export const Navbar = ({ navItems }: { navItems: NavItem[] }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (event: any) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setIsOpen(open);
    };

    return (
        <>
            <StyledButton onClick={toggleDrawer(true)}>View Nav</StyledButton>
            <SwipeableDrawer
                open={isOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <NavItemsList navItems={navItems} toggleDrawer={toggleDrawer} />
            </SwipeableDrawer>
        </>
    );
};

export default Navbar;

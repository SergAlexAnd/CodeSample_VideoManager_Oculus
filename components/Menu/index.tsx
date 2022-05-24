import * as React from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MenuItemProps } from '@material-ui/core';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/MoreVert';

type MenuProps = {
  items: MenuItemProps[];
  iconSize?: number;
};

export const BasicMenu: React.FC<MenuProps> = ({ items, iconSize = 14 }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="small"
      >
        <MenuIcon style={{ width: iconSize, height: iconSize }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {items.map((i) => (
          <MenuItem
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...i}
            key={i.id}
            style={{ fontSize: '10px' }}
            onClick={(e) => {
              e.stopPropagation();
              i.onClick(e);
              handleClose(e);
            }}
          />
        ))}
      </Menu>
    </div>
  );
};

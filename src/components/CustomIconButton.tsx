import { ElementType, forwardRef, Ref } from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, ButtonBase, ButtonBaseProps } from '@mui/material';

// ----------------------------------------------------------------------;

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  borderRadius: '8px',
  width: '30px',
  height: '30px',
  transition: 'all .2s ease-in-out',
  background: theme.palette.dark.main,
  color: theme.palette.grey[400],
  '&:hover': {
    background: theme.palette.grey[300],
    color: theme.palette.primary.dark,
  },
}));

// ----------------------------------------------------------------------

const CustomIconButton = forwardRef(
  <C extends ElementType>(props: ButtonBaseProps<C, { component?: C }>, ref: Ref<HTMLButtonElement>) => {
    const { children, ...other } = props;
    return (
      <ButtonBase {...other} ref={ref} sx={{ borderRadius: '12px' }}>
        <StyledAvatar>{props.children}</StyledAvatar>
      </ButtonBase>
    );
  },
);

CustomIconButton.displayName = 'CustomIconButton';

export default CustomIconButton;
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  function DashboardItem({title, key, children, onClick }) {
    return (
        <Grid item key={key} onClick={onClick}>
            <Item sx={{ width: 200, height: 200, borderRadius: 10 }}>
                <Typography variant="h6" noWrap component="div">
                    {title}
                </Typography>
                {children}
            </Item>
        </Grid>
    );
}

export default DashboardItem;
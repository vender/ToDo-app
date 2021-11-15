import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const Task = ({task, taskClickStatus}) => {
    const [status, setStatus] = React.useState(task.status);
    const taskStatusTog = () => {
        setStatus(true);
        taskClickStatus({
            id: task.id,
            status: true
        });
    }
    return (
        <ListItem sx={{border: 1, borderColor: task.color, mb: 1}} disablePadding>
            {status ? 
            (
            <ListItemButton role={undefined} dense>
                <ListItemIcon>
                    <CheckBoxIcon />
                </ListItemIcon>
                <ListItemText style={{textDecoration: 'line-through'}} primary={task.name} secondary={task.description} />
            </ListItemButton>
            ) :
            (
            <ListItemButton role={undefined} dense>
                <ListItemIcon onClick={() => taskStatusTog(task)}>
                    <Checkbox edge="start" tabIndex={-1} disableRipple />
                </ListItemIcon>
                <ListItemText primary={task.name} secondary={task.description} />
            </ListItemButton>
            )
            }
        </ListItem>
    );
}
 
export default Task;
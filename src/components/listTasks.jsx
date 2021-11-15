import React from 'react';
import { supabase } from "../util/api";
import { useParams, useLocation  } from "react-router-dom";
import List from '@mui/material/List';
import Task from "./task";
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tasksmodal from "./tasksmodal";

const ListTasks = (props) => {
    let params = useParams();
    let location = useLocation();
    const [open, setOpen] = React.useState(false);
    const [tasks, setTasks] = React.useState([]);
    const [formData, setFormValue] = React.useState({color: "#000000", list_id: params.listId});
    const [loading, setLoading] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchTasks = async () => {
        let { data, error } = await supabase
            .from("tasks")
            .select('*')
            .eq('list_id', params.listId)
            .order("priority", { ascending: true });
        if (error) console.log("error", error);
        if(data.length > 0) setTasks(data);
        else setTasks({empty: 'В этом списке нет задач.'});
    };

    const handleTaskSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase
        .from('tasks')
        .insert([formData])
        if (error) console.log("error", error);
        else setLoading(false); handleClose();
        fetchTasks().catch(console.error);
    };

    const taskClickStatus = async task => {
        console.log(task);
        const { error } = await supabase
        .from('tasks')
        .update({status: task.status})
        .eq('id', task.id)
        if (error) console.log("error", error);
    }

    React.useEffect(() => {
        fetchTasks().catch(console.error);
    }, [location]);

    return (
        <Box>
            <List>
                {!tasks.empty ? tasks.map(task => <Task key={task.id} task={task} taskClickStatus={taskClickStatus} />) : 
                (
                    <Box><h3>{tasks.empty}</h3></Box>
                )}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'center' }} noWrap>
                <Tooltip title="Добавить задачу">
                    <Fab onClick={handleOpen} size="medium" color="secondary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </Box>
            <Tasksmodal open={open} handleClose={handleClose} handleSubmit={handleTaskSubmit} formData={formData} setFormValue={setFormValue} loading={loading} />
        </Box>
    );
}
 
export default ListTasks;
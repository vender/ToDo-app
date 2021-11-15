import React from 'react';
import { supabase } from "../util/api";
import { useNavigate } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import CircleIcon from '@mui/icons-material/Circle';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Listsmodal from "./listsmodal";

const Lists = (props) => {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormValue] = React.useState({color: "#000000"});
    const [lists, setLists] = React.useState();
    const [activeList, setActiveList] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    React.useEffect(() => {
        fetchLists().catch(console.error);
    }, []);

    const fetchLists = async () => {
        let { data: lists, error } = await supabase
            .from("lists")
            .select("*")
            .order("id", { ascending: true });
        if (error) console.log("error", error);
        else setLists(lists);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase
        .from('lists')
        .insert([formData])
        if (error) console.log("error", error);
        else setLoading(false); handleClose();
        fetchLists().catch(console.error);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onListClick = (list) => {
        setActiveList(list.id);
        navigate(`${list.id}`, { replace: true });
    };
    
    return (
        <Card variant="outlined">
            <CardContent>
                <nav aria-label="main mailbox folders">
                    <List>
                        {lists ? (
                            lists.map(list => {
                            return (
                                <ListItem key={list.id} disablePadding>
                                    <ListItemButton selected={activeList === list.id} component="a" onClick={() => onListClick(list)}>
                                        <ListItemIcon>
                                            <CircleIcon style={{fill: list.color}} />
                                        </ListItemIcon>
                                        <ListItemText primary={list.name} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })) : <ListItem sx={{justifyContent: 'center'}}><CircularProgress /></ListItem> }
                    </List>
                </nav>
                
                <Box sx={{ display: 'flex', justifyContent: 'center' }} noWrap>
                    <Tooltip title="Добавить список">
                        <Fab onClick={handleOpen} size="medium" color="secondary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </Box>
            </CardContent>
            <Listsmodal open={open} handleClose={handleClose} handleSubmit={handleSubmit} formData={formData} setFormValue={setFormValue} loading={loading}/>
        </Card>
    )
}
 
export default Lists;
import React from 'react';
import Modal from '@mui/material/Modal';
import LoadingButton from '@mui/lab/LoadingButton';
import { PopoverPicker } from "./PopoverPicker";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Tasksmodal = ({open, handleClose, handleSubmit, formData, setFormValue, loading}) => {
    return ( 
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <TextField id="name" label="Название" onChange={e => setFormValue({...formData,name: e.target.value})} variant="outlined" margin="dense" fullWidth={true} required />
                    <TextField id="description" label="Описание" onChange={e => setFormValue({...formData,description: e.target.value})} variant="outlined" margin="dense" fullWidth={true} multiline rows={2} required />
                    <TextField id="priority" label="Приоритет" onChange={e => setFormValue({...formData, priority: e.target.value})} variant="outlined" margin="dense" fullWidth={true} required />
                    <PopoverPicker color={formData.color} onChange={c => setFormValue({...formData, color: c})} />
                    <LoadingButton type="submite" loading={loading} variant="outlined">
                        Добавить
                    </LoadingButton>
                </form>
            </Box>
        </Modal>
    );
}
 
export default Tasksmodal;
import { React, useContext, useState } from 'react'
import { Modal, Box, Button, Grid, TextField, Typography, Link } from '@material-ui/core';
import { JsonContext } from '../context/jsonContext';
import 'react-notifications/lib/notifications.css';
import LoadingOverlay from 'react-loading-overlay';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    height: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid azure',
    borderRadius: '10px',
    backgroundColor: 'azure',
    boxShadow: 24,
    p: 3,
};

const HelpModal = () => {
    const { contextState, contextStateActions } = useContext(JsonContext)
    const [isLoading, setIsLoading] = useState(false)

    return (
        <Modal
            open={contextState.isHelpModalOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={() => contextStateActions.isHelpModalOpenChanged(false)}
        >
            <Box sx={style}>
                <LoadingOverlay
                    active={isLoading}
                    spinner
                    text='Please wait...'
                    styles={{
                        overlay: (base) => ({
                            ...base,
                            opacity: 0.5,
                            borderRadius: '10px',
                            height: '100%',
                            position: 'absolute',
                            bottom: '10%',
                        }),
                        pinner: (base) => ({
                            ...base,
                            width: '100px',
                            '& svg circle': {
                                stroke: '#002984',
                            }
                        })
                    }}
                >
                    <Grid container >
                        Help will be here soon
                    </Grid>
                </LoadingOverlay>
            </Box>
        </Modal >
    )
}

export default HelpModal

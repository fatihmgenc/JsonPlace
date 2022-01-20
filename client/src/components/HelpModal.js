import { React, useContext, useState } from 'react'
import { Modal, Box, Button, Grid, TextField, Typography, Link } from '@material-ui/core';
import { JsonContext } from '../context/jsonContext';
import 'react-notifications/lib/notifications.css';
import LoadingOverlay from 'react-loading-overlay';
import TokenService from '../protoServices/TokenService';

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
    const [message, setMessage] = useState("")
    const [topic, setTopic] = useState("")

    const handleSubmit = () => {
        setIsLoading(true)
        let ticketDto = {
            Title: topic,
            Message: message
        }
        TokenService.Ticket(ticketDto, [() => setIsLoading(false),
        () => setMessage(""),
        () => setTopic(""),
        () => { contextStateActions.isHelpModalOpenChanged(false) }])
    }

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
                        <Grid item xs={12}>

                            <Typography variant="body2" gutterBottom>
                                Json Place is an open source project created by Fatih Genç.
                                If you desire to see source-code visit the &nbsp;
                                <Link href="https://github.com/fatihmgenc/JsonPlace">
                                    repository.
                                </Link>
                                &nbsp;You can also contact me via email at my github profile or
                                just leave a note by this model.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={(e) => setTopic(e.target.value)}
                                placeholder='Topic*'
                                value={topic}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField disabled={false}
                                multiline
                                rows={3}
                                maxRows={5}
                                placeholder="Message*"
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                disabled={!topic.length > 0 || !message.length > 0}
                                style={{ float: "right", marginLeft: 'auto' }}
                                variant="contained"
                                color="primary"
                                onClick={() => handleSubmit()}
                            > Send
                            </Button>
                        </Grid>
                    </Grid>
                </LoadingOverlay>
            </Box>
        </Modal >
    )
}

export default HelpModal

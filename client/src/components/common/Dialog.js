import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const SimpleDialog = withStyles(styles)((props) => {
    let { title, onClose, open, content, classes, width, fullScreen } = props;
    width = width || 'lg';

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} fullWidth maxWidth={width} fullScreen={fullScreen} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title" onClose={handleClose}>
                {title}
                {props.icons && props.icons.map((icon, idx) => {
                    return React.cloneElement(
                        icon,
                        {
                            key: idx,
                            className: classes.closeButton,
                            style: {
                                right: ((8 + ((idx + 1) * 48)) + 'px')
                            }
                        }
                    );
                })}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    className={classes.closeButton}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            {content}
        </Dialog>
    );
});

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

export default SimpleDialog;

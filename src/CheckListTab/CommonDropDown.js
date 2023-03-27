import React, {Component} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import styled from '@emotion/styled';
import styles from './stylesheet_UHS'






class CommonDropDown extends Component{
    constructor(props) {
        super(props);
        this.state={value : '', errorText:this.props.helperMsg, isValid : false}

    }
    setValue=(event)=>{
        let txtVal = event.target.value;
        txtVal = txtVal.trimLeft();
        this.setState({errorText:'', value : txtVal, isValid : false});
        this.props.setChild(txtVal, true, this.props.parentDetails);
    }


    render() {
        return (
            <TextField
                select
                required={this.props.reqFlag}
                label={this.props.label}
                name={this.props.name}
                value={this.props.value}
                onChange={this.setValue}
                style={styles.dropDown}
                helperText= {(this.props.value === '' || this.state.isValid) ? this.state.errorText:''}
                error={this.state.isValid}
                variant="filled"
                disabled={this.props.disable}>
                {this.props.data.map((option, index) => (
                    <MenuItem key={index} value={option.value} selected>
                        {option.key}
                    </MenuItem>
                ))}
            </TextField>

        );
    }
}

export default CommonDropDown;



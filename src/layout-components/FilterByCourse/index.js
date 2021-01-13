import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



export class FilterByCourse extends Component {
  state={
    course:''
  }
   onChange=(e) => this.setState({course:e.target.value});
   onSubmit=(e) =>{  
     e.preventDefault();
     this.props.byCourse(this.state.course);
     this.setState({course:''});
  };
    render(){
  return (
    <form  style={{display:'flex'}}  onSubmit={this.onSubmit} >
            <TextField id="outlined-basic" name="course" label="Filter By Course" variant="outlined" value={this.state.course} onChange={this.onChange} />
           <Button variant="outlined" type="submit">Filter</Button>
    </form>
    );
    }
};

export default FilterByCourse

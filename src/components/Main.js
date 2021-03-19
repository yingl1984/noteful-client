import React, { Component } from 'react';
import Folders from './Folders';
import Notes from './Notes';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

class Main extends Component {
    render() {
        try {
            const {folders, notes} = this.props.mainProp;
            if(!this.props.mainProp)
            {
                throw new Error("Crashed!")
            }
            let selectedNotes = (id) => {
                let n =  notes.filter(item=> item.folder_id === id);
                return n;
            }
            //Root path "/"
            if(this.props.otherProps.match === undefined)
            {
              return(
                    <div className="main">
                        <Folders foldersProp = {folders}></Folders>
                        <Notes notesProp={notes}></Notes>
                    </div>
                 );
            }
            const {id} =this.props.otherProps.match.params;
            let notesSelected= selectedNotes(id);
            if(notesSelected.length > 0)
                {
                    return (
                        <div className="main">
                            <Folders foldersProp = {folders}></Folders>
                            <Notes notesProp={notesSelected}></Notes>
                        </div>
                    );
                }
                else{
                    return (
                        <div className="main">
                        <Folders foldersProp = {folders}></Folders>
                        <div>
                            <h3>No notes found!</h3>
                            <div className="roundButton"><NavLink to="/addNote" >Add Note</NavLink></div>
                        </div>
                        </div>
                    );
                
                }
          } 
          catch (error) 
          {
            console.log(error)
           return <div>
               <h2>I crashed</h2>
               <br></br>
                {error.message}
               </div>
          }
        }
}
 
Main.defaultProps = {
    folders: [],
    notes: []
};

Main.propTypes = {
    folders: PropTypes.array.isRequired,
    notes: PropTypes.array.isRequired
};


export default Main;
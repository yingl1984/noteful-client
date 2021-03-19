import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import {FolderContext} from "../context/FoldersContext";
import PropTypes from 'prop-types';

class NoteView extends Component {

  render() {
    return ( 
        
      <FolderContext.Consumer>
          { (ctx) => 
          {
             const {selectedNote} = ctx;
             const note = selectedNote(this.props.match.params.id);
             if(note[0])
             {
                return(
                    <div className="noteView">
                    <Header></Header>
                    <button onClick={()=>this.props.history.goBack()}>Back</button> 
                    <h3>{note[0].name}</h3>  
                    <p>{note[0].content}</p>  
                    <p>{note[0].modified}</p>                   
                    <Footer></Footer>
                </div>
                )
               
             }
           else{
            return (
                <div className="noteView">
                  <Header></Header>
                  <button onClick={()=>this.props.history.goBack()}>Back</button> 
                  <p>No content</p>
                  <Footer></Footer>
              </div>
                )
           }
          }
        }
      </FolderContext.Consumer>
     );
  }
}

NoteView.propTypes = {
  history: PropTypes.object
}
export default NoteView;
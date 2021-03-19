import React, { Component } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FolderContext } from '../context/FoldersContext';
import ErrorBoundary from '../components/ErrorBoundary';
import PropTypes from 'prop-types';

class Addfolder extends Component {
    render() { 
        return ( 
            <ErrorBoundary>
            <FolderContext.Consumer>
                {
                    (ctx)=>{
                        const {addFolder, handleInput} = ctx;
                        return(
                            <div>
                                <Header></Header>
                                <button onClick={()=>this.props.history.goBack()}>Back</button> 
                                <div>
                                <h2>Create a folder</h2>
                                <form onSubmit={(e) => addFolder(e)}>
                                    <label htmlFor="name">Name </label>
                                    <br/>
                                    <input type="text" id="name" name="name" required onChange={handleInput}></input>
                                    <br/>
                                    <button type="submit">Add folder</button>
                                </form>
                                </div>
                                <Footer></Footer>
                            </div>    
                        )
                    }                   
                }
            </FolderContext.Consumer>
            </ErrorBoundary>   
         );
    }
}

Addfolder.propTypes = {
    history: PropTypes.object
  }
export default Addfolder;
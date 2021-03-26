import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from "./components/Footer"
import {FolderContext} from "./context/FoldersContext";
import "./App.css";
import ErrorBoundary from './components/ErrorBoundary'

class App extends Component {

  render() {
    
      return ( 
        <FolderContext.Consumer>
            { (ctx) => 
            {
                const {notes, folders} = ctx;
                const propObj = {
                  notes: notes,
                  folders: folders
                };
                return (
                   
                    <div className="app">
                    <Header></Header>
                    <ErrorBoundary>
                      <Main mainProp={propObj} otherProps={this.props}></Main>
                    </ErrorBoundary>
                    <Footer></Footer>
                    </div>
                   
              )
            }
          }
        </FolderContext.Consumer>
       );
 
    
     }
}
 
export default App;



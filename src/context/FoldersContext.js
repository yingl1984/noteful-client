import React, { Component, createContext } from 'react';
import conf from "../config";
import ErrorBoundary from '../components/ErrorBoundary';

export const FolderContext = createContext();

class FolderContextProvider extends Component {
    state = { 
        folders:[],
        notes:[],
        notename: "",
        content: "",
        folderSelected: "",
        name: ""
     }

     fetchCall = (api, method, body) => {
         try
         {
             if(!method && !body)
             {
                 //return GET request
                return fetch(api);
             }

            else if (method && !body)
            {
                //DELETE request
                return fetch(api, {
                    method: method
                });
            }
           else
           {
            //POST
            return fetch(api, {
                method: method,
                body: body,
                headers: {'Content-Type': 'application/json'}
            });
           }
         }
         catch(err)
        {
          return err.message;
        }
    }

    async getData(){
        try{
            let notes = await (await this.fetchCall(conf.noteapi)).json();
            let folders = await (await this.fetchCall(conf.folderapi)).json();
            if(!notes)
            {
                throw new Error("Crashed!");
            }
            this.setState({
              notes:notes,
              folders: folders
            });
    }
    catch(err)
    {
      return err.message;
    }

    }

    //Get data during page load
     async componentDidMount() {
      this.getData();
    } 

    getId = () => {
        let res = this.state.folders.find(it=> it.name === this.state.folderSelected);
        if(!res)
        {
            alert("Please select a folder to add note to");
            return false;
        }
        return res.id;
     }
    handleInput = (e) => {
        const{name, value} = e.target;
        this.setState({
            [name]: value
        });
    }
   
    addNote = async (e) => {
        e.preventDefault();
        if(!this.getId())
        {
            return false;
        }
        const note = JSON.stringify({
            "name":this.state.notename,
            "modified": new Date(),
            "folder_id": this.getId(),
            "content": this.state.content
    }) 

        let notes = await (await this.fetchCall(conf.noteapi, 'POST', note )).json();
        if(notes)
        {
            alert("Note added!");
        }
        this.getData();
        window.location.replace("/");
    };
           
    addFolder = async (e) => {
        e.preventDefault();
        const folder= JSON.stringify({
            "name": this.state.name
        });
        let folders = await (await this.fetchCall(conf.folderapi, 'POST', folder )).json();

        if(folders)
        {
            alert("Folder Added!");
        }
        this.getData();
        window.location.replace("/");
    }

    removeNote = async (id) =>
    {
       let deleted = await this.fetchCall(`${conf.noteapi}/${id}`, 'DELETE');
       if(deleted)
       {  
           alert('Note with id '+ id + " was deleted")
           window.location.replace("/");
       }
    }
  
    selectedNote = (id) => this.state.notes.filter(n => n.id === id);

    render() { 
        return (
            <ErrorBoundary>
            <FolderContext.Provider value={{...this.state, handleInput: this.handleInput, 
            addNote: this.addNote, addFolder: this.addFolder, removeNote: this.removeNote,
            selectedNote: this.selectedNote
            }}>
                {this.props.children}
            </FolderContext.Provider>
            </ErrorBoundary>
          );
    }
}
 
export default FolderContextProvider;
import './App.css';
import React from 'react';
//import ArtistCard from './ShowCase/card';
import {  Route, Routes, BrowserRouter} from "react-router-dom";
//import AllFinalists from './ShowCase/finalist';
//import AdminPortal from './Admin/portal';
//import Inputs from './Admin/inputs';
//import ArtistDetails from './Admin/artist';
import PersonalPage from './ShowCase/personal';
//import { ThemeProvider, createTheme } from '@mui/material/styles';
//import { CssBaseline } from '@mui/material/';
//import {orange, yellow} from "./Assets/colors";
//import FinalistList from './Admin/finalistList';
//import AudioPlayer from './Components/Player';
//import MyPdfViewer from './Components/PdfRender';
import ArtistList from './ShowCase/list';
//import AddArtistForm from './Admin/AddArtistForm';
import FileList from './ShowCase/artList';
//import MyList from './Components/MotionTest';
import SecuredRoute from './Components/ProtectedRoute';
import TypeList from './ShowCase/typeList';


/*
const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#fdd835',
      light: '#fddf5d', 
      dark: '#b19725',
    },
    secondary: {
      main: '#ff5722',
      light: '#ff784e', 
      dark: 'b23c17',
    },
    background: {
      default: '#000000',
      paper: '#00000',
    },
    text: {
      primary: '#fafafa',
    },
  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    allVariants: {
      fontFamily: 'serif',
    },
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: '#000',
        color: '#fff',
      },
    },
    
  },
  props: {
    MuiAppBar: {
      color: 'inherit',
    },
  },
  components: {
    MuiIconButton: {
      defaultProps: {
        color: 'primary'
      }
    },
    MuiTab:{
      styleOverrides:{
        root:{
          color: '#fdd835'
        }
      }
    },
    MuiPaper:{
      styleOverrides:{
        root:{
          backgroundColor: "#000000"
        }
      }
    },    
    MuiDialogContentText:{
      styleOverrides:{
        root:{
          color: '#fafafa'
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        color: "secondary",
      },
      styleOverrides: {
        root: {
          '& label':{
            color: yellow
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: orange,
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: orange,
            },
          },
          '&:hover': {
            '& div:not(.Mui-error) > fieldset': {
              borderColor: orange
            },
          }
        },
      }
    },
  }
});
*/
/*
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.StrictMode>
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<SignIn/>}/>
            <Route path="/display" element={<AdminPortal/>}/>
            <Route path='/art/:id' element={<PersonalPage />}></Route>
            <Route path='finalists' element={<AllFinalists />}></Route>
            <Route path='fi' element={<FinalistList />}></Route>
            <Route exact path="/" element={<Inputs/>}></Route>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </BrowserRouter>
      </React.StrictMode>
    </ThemeProvider>
  );
}
*/
/*
function App() {
  return (
      <React.Fragment>
        <BrowserRouter>
        <div id="app">
          <Routes>
              <Route path="/login" element={<SignIn/>}/>
              <Route path="/display" element={<AdminPortal/>}/>
              <Route path='/art/:id' element={<PersonalPage />}></Route>
              <Route path="/admin/:id" element={<FileList />}></Route>
              <Route path='finalists' element={<AllFinalists />}></Route>
              <Route path='fi' element={<FinalistList />}></Route>
              <Route path="/music" element={<AudioPlayer src="/Assets/files/infinite_sadness_tour/smashing_pumpkins.mp3" width={'500px'}/>}/>
              <Route path="/pdf" element={<MyPdfViewer src='/Assets/files/infinite_sadness_tour/sad.pdf' width={'800px'} />}/>
              <Route exact path="/" element={<Inputs/>}></Route>
              <Route path="/artist-list" element={<ArtistList />} />
              <Route path="/artist-form" element={<AddArtistForm />}/>
              <Route path="/motion" element={<MyList items={[]}/>} />
          </Routes>
         </div>
        </BrowserRouter>
      </React.Fragment>
  );
}
*/


function App() {

  return (
      <React.Fragment>
        <BrowserRouter>
        <div id="app">
          <Routes>
              <Route path='/art/:id' element={<PersonalPage />}></Route>
              <Route path="/admin/:id" element={<SecuredRoute><FileList/></SecuredRoute>}></Route>
              <Route path="/artist-list" element={<SecuredRoute><ArtistList /></SecuredRoute>} />
              <Route path="/types-list" element={<TypeList />} />

              <Route path="*" element={<SecuredRoute><ArtistList /></SecuredRoute>} />
          </Routes>
         </div>
        </BrowserRouter>
      </React.Fragment>
  );
}

export default App;

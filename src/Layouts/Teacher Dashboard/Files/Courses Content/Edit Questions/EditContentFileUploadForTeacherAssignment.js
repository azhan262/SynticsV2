import React, { useState, useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Formik, FormikConsumer, useFormik } from 'formik'
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { useRouteMatch, useHistory, useLocation,  useParams } from "react-router-dom";
import { updateCoursePlannings, updateAssignmentPlannings } from '../../Apis/apiForCoursePlanning';
import { createAudioFile } from '../../Apis/apiForAudio';
//import "../../../../../../../../Sass.scss"
import axios from 'axios';

function EditContentFileUploadForTeacherAssignment() {
    let {id} = useParams()
  const location = useLocation();
  const editorRef = useRef(null);
  const history = useHistory()
  const [files, setFiles] = useState([])
  const [file, setFile] = useState()
  const [filesNewName, setFilesNewName] = useState(id)
  const [newName, setNewName] = useState([])


  const timerId = setTimeout(() => {
    chartsData()
  }, 1500);
  
  const chartsData = () => {
    fileForCv()
  
  }
  const fileForCv = () => {
    axios({
        method: "POST",
        url: `https://syntics.co/api/file/display/${location.state.referenceName}`,
        responseType: "blob"
      })
        .then(res => rezzingFileForCv(res.data),)
        
  }
  const rezzingFileForCv = (response) => {
    var urlCreator = window.URL || window.webkitURL;
    var cvUrl = urlCreator.createObjectURL(response);
    document.querySelector("#audioReference").src = cvUrl;
  }

  const fileChanged = (e) => {
    var testingFileChange  = e.target.files[0]
    //testingFileChange.name = "hi"
    var file = testingFileChange;
    var blob = file.slice(0, file.size, file.type);
    var findString = location.state.referenceName.indexOf(".")
    var newReferenceName = location.state.referenceName.slice(0,findString)
    var settingName = newReferenceName + "update" + file.name 
    var newFile = new File([blob], settingName, {type: file.type});
    setNewName(settingName)
    console.log(newFile)
    const f = newFile
    setFile(f)
  }

  const uploadFile = () => {
    let data = new FormData();
    data.append('file', file);
    console.log(file)
    console.log(data)
    createAudioFile(data)
    /*
    fetch('/api/files', {
      method: 'POST',
      body: data
    }).then(res => res.json())
      .then(data => {
        if (data.success) {
          this.loadFiles();
        } else {
          alert('Upload failed');
        }
      });
      */
  }



  const log = (data) => {
      if (editorRef.current) {
        console.log(data)
        var contentFromTextArea = editorRef.current.getContent();
        location.state.questioncontent = contentFromTextArea
        location.state.questiontitle = data.questiontitle
        location.state.totalmarks = data.totalmarks
        location.state.teacherId = id
        if (newName != ""){
            location.state.referenceName = newName
        }
        if((data.startDate != "") && (data.endDate != "")){
          location.state.startDate = data.startDate
          location.state.endDate = data.endDate
          console.log(location.state)
          updateAssignmentPlannings(location.state, location.state._id)
          history.push(`/teacher/list-of-classes-assignments/${id}`)
        }
        else{
          console.log(location.state)
          updateAssignmentPlannings(location.state, location.state._id)
          history.push(`/teacher/list-of-classes-assignments/${id}`)
        }
      }
  };
  const onSubmit = async (data) => {
      await uploadFile()
      await log(data)
      //history.push("/placement-question-details")
    }
    const formik = useFormik({
      initialValues: {
         totalmarks:location.state.totalmarks,
         questiontitle: location.state.questiontitle,
         referenceName: '',
         startDate: '',
         endDate:'',
      },

      //4 Make onSubmit propert to handle what happens to data on form submisison

      onSubmit: values => {

        
        //createTodo(formik.values)
        //redirecting 
        //history.push("/")

        onSubmit(formik.values)

      },

      //5 Make validation property
      
      validate: values => {
          
          let errors = {}

          const letters = /^[A-Za-z ]+$/;

          const cnic = /^[0-9--]+$/;

          const phone = /^[0-9]+$/;

          const symbols = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
          if(!values.totalmarks){
              errors.totalmarks = "Please enter Total Marks"
          }else if (!phone.test(values.totalmarks)) {
              errors.totalmarks = "Please enter digits only"
          }else if (symbols.test(values.totalmarks)) {
              errors.totalmarks = "Please enter digits only"
          }else if (values.totalmarks > 100) {
            errors.totalmarks = "Marks for the question cannot exceed 100"
        }
          return errors


      }


  })
  return (
      <>
<div>
<div className = "mt-5 pt-4">
{/* Content Wrapper */}
<div id="content-wrapper" className="d-flex flex-column">
{/* Main Content */}
<div id="content">
  {/* Begin Page Content */}
  <div className="containerBlackDashboard-fluid">
    {/* Page Heading */}
    <h1 className="h3BlackDashboard mb-2 text-gray-800">Course Planning</h1>
    {/* DataTales Example */}
    <div className="card shadow mb-4 text-center">
      <div className="card-header py-3" style = {{color : "white", backgroundColor : "#a98799"}}>
        <h6 className="m-0 font-weight-bold text-white"> Course Content Creation Panel</h6>
      </div>
      <div className="card-body">
      <div>
        <div className="card-header py-3 mb-2" style = {{color : "white", backgroundColor : "#a98799"}}>
            <h6 className="m-0 text-white"> Original Attachment: </h6>
        </div>
        <a id = "audioReference" className = "text-dark" style={{textDecoration : "none", fontWeight: "bold"}} >
        {location.state.referenceName}
        </a>
      
        </div>
        <div className="card-header py-3 mt-3" style = {{color : "white", backgroundColor : "#a98799"}}>
            <h6 className="m-0 text-white"> New Attachment: </h6>
        </div>
      <input  className = "mt-3" type="file" onChange={(e) => fileChanged(e)}/>
      </div>
      <div className="card-body">
      <form onSubmit={formik.handleSubmit}>
      <div>
        <div className="card-header py-3 mb-2" style = {{color : "white", backgroundColor : "#a98799"}}>
            <h6 className="m-0 text-white"> Original Start Date & Due Date: </h6>
        </div>
          <p>Start Date: {location.state.startDate}</p>
          <p>Due Date: {location.state.endDate}</p>
        
        <div className="card-header py-3" style = {{color : "white", backgroundColor : "#a98799"}}>
            <h6 className="m-0 text-white"> New Start Date & Due Date: </h6>
        </div>
        <div>
                          <div className="form-group">
                          <label htmlFor="sel1">Start Date</label>
                          <input type="date"  name="startDate" value={formik.values.startDate} className="form-control" required />
                          {formik.touched.startDate ? (<div className='error' style={{color:'red', fontWeight: 'bold'}}>{formik.errors.startDate}</div>) : null}
                        </div>
                      </div>
                      <div>
                          <div className="form-group">
                          <label htmlFor="sel1">End Date</label>
                          <input type="date"  name="endDate" value={formik.values.endDate} className="form-control" required />
                          {formik.touched.endDate ? (<div className='error' style={{color:'red', fontWeight: 'bold'}}>{formik.errors.endDate}</div>) : null}
                        </div>
                      </div>
        </div>
                  <div className = "mt-4"> 
                      <div class="p-3 mb-2" style = {{color : "white", backgroundColor : "#a98799"}}>
                          <label><h6 className = "text-white">Question's Title</h6></label>
                      </div>
                      <div class="p-3 mb-2 bg-light text-dark">
                      <input type="text" placeholder="Title for Question" name="questiontitle" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.questiontitle} className="form-control" required  />
                      {formik.errors.questiontitle && formik.touched.questiontitle ? (<div className='error' style={{color:'red', fontWeight: 'bold'}}>{formik.errors.questiontitle}</div>) : null}
                      </div>
                      <hr />
                  </div>
                  <div className = "mt-4"> 
                      <div class="p-3 mb-2 " style = {{color : "white", backgroundColor : "#a98799"}}>
                          <label><h6 className = "text-white">Please describe your question below</h6></label>
                      </div>
                      <div class="p-3 mb-2 bg-light text-dark">
                        <Editor
                          apiKey='zbxzyzqkm6uw6oz4uywxx4kbvw59xasjkldmya07y0hfjupf'
                          onInit={(evt, editor) => editorRef.current = editor}
                          initialValue={location.state.questioncontent}
                          init={{
                          height: 500,
                          browser_spellcheck : true,
                          menubar: false,
                          plugins: [
                              'advlist autolink lists link image charmap print preview anchor',
                              'searchreplace visualblocks code fullscreen',
                              'insertdatetime media table paste code help wordcount'
                          ],
                          toolbar: 'undo redo | formatselect | ' +
                          'bold italic backcolor | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | ' +
                          'removeformat | help',
                          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                          }}
                        />  
                      </div>
                      <hr />
                  </div>
                  <div className = "mt-4"> 
                        <div class="p-3 mb-2 " style = {{color : "white", backgroundColor : "#a98799"}}>
                            <label><h6 className = "text-white">Total Marks</h6></label>
                        </div>
                        <div class="p-3 mb-2 bg-light text-dark">
                              {/*2 put onChange = {formkit.handleChange} value={formik.values.name} in all the form fields with their corroposind name  in values */}
                              <input type="text" placeholder="Total Marks for the Question" name="totalmarks" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.totalmarks} className="form-control" required  />
                              {formik.errors.totalmarks && formik.touched.totalmarks ? (<div className='error' style={{color:'red', fontWeight: 'bold'}}>{formik.errors.totalmarks}</div>) : null}
                        </div>
                        <hr />
                    </div>
                    <div className="buttonNewTheme mt-3 mb-3 text-center">
                        <button type="submit" className="btn btn-outline-primary">
                          Create Question
                        </button>
                    </div>
                  </form>
      </div>
    </div>
  </div>
  {/* /.containerBlackDashboard-fluid */}
</div>
{/* End of Main Content */}
{/* Footer */}
<footer className="sticky-footer bg-white">
  <div className="containerBlackDashboard my-auto">
    <div className="copyright text-center my-auto">
      <span></span>
    </div>
  </div>
</footer>
{/* End of Footer */}
</div>
{/* End of Content Wrapper */}
{/* End of Page Wrapper */}
      </div>
      </div>
      </>
  )
}

export default EditContentFileUploadForTeacherAssignment

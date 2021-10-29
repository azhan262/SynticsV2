

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { Formik, FormikConsumer, useFormik } from 'formik'
import { Link, useHistory, useRouteMatch, useParams } from "react-router-dom";
import { createTestPlannings } from '../../Apis/apiForTestContentPlanning';
import { getCourseForTeacher } from '../../Apis/apiForTeachers';


function CourseContentForTestForTeacher() {
  let {id} = useParams()
  const [items, setItems] = useState()
  /*
  useEffect(() => {
    const fetchItems = async function() {
      const contents = await getCourseForTeacher(id)
      console.log(contents)
      setItems(contents)
      console.log(items)
    }
    fetchItems()
    
  }, []);
  */
         /*const { register, handleSubmit } = useForm({
    defaultValues: { text: todo ? todo.text : "" },
  });*/

  /*const submitHandler = handleSubmit((data) => {
    onSubmit(data)
  });*/
  const history = useHistory()

  //const [referenceName, setReferenceName] = useState()
  //console.log(referenceName)
  
  const randomValue = Math.floor((Math.random() * 100000) + 1)
  const randomName = id + randomValue
  
  console.log(randomName)
  const onSubmitHandler = async (data) => {
    //data.coursetype = items.subjectChoosenForApplication
    if ((data.questiontype === "Text") && (data.answertype === "Simple Text")){
      history.push({
        pathname:`/teacher/course-content-text-qa-test/${id}`,
        state: data
      })
    }
    else if ((data.questiontype === "Text") && (data.answertype === "Multiple Choice")){
      history.push({
        pathname:`/teacher/course-content-text-mcq-test/${id}`,
        state: data
      })
    }
    else if ((data.questiontype === "Text") && (data.answertype === "Audio")){
      history.push({
        pathname:`/teacher/course-content-text-audio-test/${id}`,
        state: data
      })
    }
    else if ((data.questiontype === "Text") && (data.answertype === "Video")){
      history.push({
        pathname:`/teacher/course-content-text-video-test/${id}`,
        state: data
      })
    }
    else if ((data.questiontype === "Text") && (data.answertype === "Audio")){
      history.push({
        pathname:`/teacher/course-content-text-audio-test/${id}`,
        state: data
      })
    }
    else if ((data.questiontype === "Text") && (data.answertype === "Fill in the Blanks")){
      history.push({
        pathname:`/teacher/course-content-text-blanks-test/${id}`,
        state: data
      })
    }
    else if ((data.questiontype === "Text") && (data.answertype === "Handwriting")){
      history.push({
        pathname:`/teacher/course-content-text-handwriting-test/${id}`,
        state: data
      })
    }
    else if ((data.questiontype === "Text") && (data.answertype === "Digital Urdu")){
      history.push({
        pathname:`/teacher/course-content-text-digitalUrdu-test/${id}`,
        state: data
      })
    }
    else if ((data.questiontype === "Text") && (data.answertype === "Drawing")){
      history.push({
        pathname:`/teacher/course-content-text-drawing-test/${id}`,
        state: data
      })
    }
    else if ((data.answertype === "Upload a File")){
      history.push({
        pathname:`/teacher/course-content-file-upload-test/${id}`,
        state: data
      })
    }
    
    //history.push('/placement-question-details')
  }
  
  /*const onSubmit = async (data) => {
    //console.log(data)
    await createCoursePlannings(data)
    //await createQuestions(data)
    //await createPlacementTestQuestions(data)
    //redirecting 
    //history.push("/")
  };
  */
    //1 Start of by making initial values 
    const formik = useFormik({
        initialValues: {
           coursetype:'',
           activitytype:'',
           questiontype:'',
           answertype:'',
           questioncontent:'',
           totalmarks:'',
           grade:'',
           teacherId: {id},
           referenceName: randomName
        },

        //4 Make onSubmit propert to handle what happens to data on form submisison

        onSubmit: values => {

          
          //createTodo(formik.values)
          //redirecting 
          //history.push("/")

          //onSubmit(formik.values)
          onSubmitHandler(formik.values)

        },

        //5 Make validation property


    })

    console.log("Form errors", formik.errors)
    return (
        <>
      <div className = "mt-5 pt-4">
               {/* Content Wrapper */}
<div id="content-wrapper" className="d-flex flex-column">
{/* Main Content */}
<div id="content">
  {/* Begin Page Content */}
  <div className="containerBlackDashboard-fluid">
    {/* Page Heading */}
    <h1 className="h3BlackDashboard mb-2 text-gray-800">Test Course Planning</h1>
    {/* DataTales Example */}
    <div className="card shadow mb-4 text-center">
      <div className="card-header py-3" style = {{color : "white", backgroundColor : "#a98799"}}>
        <h6 className="m-0 font-weight-bold text-white">Content</h6>
      </div>
      <div className="card-body">
        <div>
        <form onSubmit={formik.handleSubmit}>
                  
                  <div>
                  <div className="form-group">
                      <label htmlFor="sel1">Course Content</label>
                      <select name="coursetype" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.coursetype} className="form-control" >
                        <option>Select Course Content</option>                  
                        <option >HTML</option>
                        <option >CSS</option>
                        <option >BOOTSTRAP</option>
                        <option >JAVASCRIPT</option>
                        <option >PHP</option>
                        <option >LARAVEL</option>
                        <option >REACT JS</option>
                        <option >EXPRESS</option>
                        <option >NODE JS</option>
                        <option >MONGO DB</option>
                      </select>
                      {formik.touched.coursetype ? (<div className='error' style={{color:'red', fontWeight: 'bold'}}>{formik.errors.coursetype}</div>) : null}

                    </div>
                      <div className="form-group">
                      <label htmlFor="sel1">Question Type</label>
                      <select name="questiontype" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.questiontype} className="form-control" >
                      <option>Select Question Type</option>                  
                        <option>Text</option>
             
                      </select>
                      {formik.touched.questiontype ? (<div className='error' style={{color:'red', fontWeight: 'bold'}}>{formik.errors.questiontype}</div>) : null}
                    </div>
                  </div>
                  <div>
                      <div className="form-group">
                      <label htmlFor="sel1">Answer Type</label>
                      <select name="answertype" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.answertype} className="form-control" >
                      <option>Select Answer Type</option>                  
                        <option>Multiple Choice</option>
                        <option>Fill in the Blanks</option>
                        <option>Video</option>
                        <option>Audio</option>
                        <option>Simple Text</option>
                        <option>Upload a File</option>
                      </select>
                      {formik.touched.answertype ? (<div className='error' style={{color:'red', fontWeight: 'bold'}}>{formik.errors.answertype}</div>) : null}
                    </div>
                  </div>
                  <center>
                  <div>    
                  <div>
                    <button type="submit" className="btn btn-outline-primary" style = {{fontWeight : 'bold',}}>
                      Submit
                    </button>
                  </div>
                </div>
                </center>
                </form>
        </div>
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
    </>
    )
}



export default CourseContentForTestForTeacher

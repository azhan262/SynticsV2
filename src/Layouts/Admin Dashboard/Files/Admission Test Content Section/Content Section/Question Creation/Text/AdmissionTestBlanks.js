import React, { useState, useRef,} from "react";
import { Editor } from '@tinymce/tinymce-react';
import { Formik, FormikConsumer, useFormik } from 'formik'
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { useRouteMatch, useHistory, useLocation,  useParams } from "react-router-dom";
import { createAdmissionTestQuestions } from "../../../../Apis/apiForAdmissionTestQuestions";


function AdmissionTestBlanksForAdmin() {
  const location = useLocation();
    const editorRef = useRef(null);
    const history = useHistory()
    const log = (data) => {
        if (editorRef.current) {
          console.log(data)
          var contentFromTextArea = editorRef.current.getContent();
          location.state.questioncontent = contentFromTextArea
          location.state.totalmarks = data.totalmarks
          location.state.optionsQuestionFillInTheBlank = data.optionsQuestionFillInTheBlank
          location.state.questiontitle = data.questiontitle
          console.log(location.state)
          createAdmissionTestQuestions(location.state)
          history.push("/admission-test-list")
        }
    };
    const onSubmit = async (data) => {
        
        await log(data)
        //history.push("/admission-question-details")
      }
      const formik = useFormik({
        initialValues: {
           totalmarks:'',
           questiontitle:'',
           optionsQuestionFillInTheBlank:'',
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
          }else if(!values.questiontitle){
            errors.questiontitle = "Please eneter a Title for the Question"
          }
            return errors


        }


    })
    const [inputList, setInputList] = useState([{ options: "",}]);
 
    // handle input change
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
    };
   
    // handle click event of the Remove button
    const handleRemoveClick = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };
   
    // handle click event of the Add button
    const handleAddClick = () => {
      if (inputList.length > 3 ){
        return "cannot exceed more than 4 options"
      }
      
      setInputList([...inputList, { options: "",}]);
    };
    const handleTextBox = (data) => {
      formik.values.optionsQuestionFillInTheBlank = data
      console.log(formik.values)
    }
   
    return (
      <div className="App">
          <div>
          <div className="container-fluid">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>Admission Test MCQ Content Creation Panel</CardHeader>
              <CardBody>
                  
                  <form onSubmit={formik.handleSubmit}>
                  <div className = "mt-4"> 
                        <div class="p-3 mb-2 bg-dark text-white">
                            <label ><h6 className="m-0 font-weight-bold text-white">Instructions: Please follow the example below to create a <b><i>Fill In The Blank</i></b> Questions</h6></label>
                        </div>
                        <div class="p-3 mb-2 bg-success text-light">
                          <div className="text-left border border-light">
                            <div className="m-3">
                              <h5>Q. The quick ______ fox jumps over the lazy dog</h5>
                              <h6>a) Yellow</h6>
                              <h6>b) Brown</h6>
                              <h6>c) Purple</h6>
                              <h6>d) Green</h6>
                            </div>
                          </div>
                        </div>
                        <hr />
                    </div>
                    <div className = "mt-4"> 
                        <div class="p-3 mb-2 bg-dark text-white">
                            <label ><h6 className="m-0 font-weight-bold text-white">Question's Title</h6></label>
                        </div>
                        <div class="p-3 mb-2 bg-light text-dark">
                        <input type="text" placeholder="Title for Question" name="questiontitle" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.questiontitle} className="form-control" required  />
                        {formik.errors.questiontitle && formik.touched.questiontitle ? (<div className='error' style={{color:'red', fontWeight: 'bold'}}>{formik.errors.questiontitle}</div>) : null}
                        </div>
                        <hr />
                    </div>
                    <div className = "mt-4"> 
                        <div class="p-3 mb-2 bg-dark text-white">
                            <label ><h6 className="m-0 font-weight-bold text-white">Please create your desired <b><i>Fill In The Blank</i></b> Question below</h6></label>
                        </div>
                        <div class="p-3 mb-2 bg-light text-dark">
                          <Editor
                            apiKey='zbxzyzqkm6uw6oz4uywxx4kbvw59xasjkldmya07y0hfjupf'
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue=""
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
                    </form>
                        <div className = "mt-4"> 
                        <div class="p-3 mb-2 bg-dark text-white">
                            <label ><h6 className="m-0 font-weight-bold text-white">Options</h6></label>
                            <p>Please click <i>Add Option</i> to add more options and <i>Remove option</i> to remove the desired option.</p>
                            <p><b>Disclaimer:</b> Total number of Options cannot exceed more than four. Only four Options are allowed to be created.</p>
                        </div>
                        <div class="p-3 mb-2 bg-light text-dark">
                          {inputList.map((x, i) => {
                          return (
                              <div className="box">
                              <input
                                      name="options"
                                      placeholder="Enter Option"
                                      value={x.options}
                                      onChange={e => handleInputChange(e, i)}
                              />
                              <div className="btn-box">
                                  {inputList.length !== 1 && <button
                                  className="mr10 btn btn-dark m-3"
                                  onClick={() => handleRemoveClick(i)}>Remove Option</button>}
                                  
                                  {inputList.length - 1 === i && <button className = "btn btn-dark m-3" onClick={handleAddClick}>Add Option</button>}
                              </div>
                              </div>
                          );
                          })}
                        </div>
                        <hr />
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                    <div>
                      <div className = "mt-4"> 
                          <div class="p-3 mb-2 bg-dark text-white">
                              <label ><h6 className="m-0 font-weight-bold text-white">Total Marks</h6></label>
                          </div>
                          <div class="p-3 mb-2 bg-light text-dark">
                                {/*2 put onChange = {formkit.handleChange} value={formik.values.name} in all the form fields with their corroposind name  in values */}
                                <input type="text" placeholder="Total Marks for the Question" name="totalmarks" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.totalmarks} className="form-control" required  />
                                {formik.errors.totalmarks && formik.touched.totalmarks ? (<div className='error' style={{color:'red', fontWeight: 'bold'}}>{formik.errors.totalmarks}</div>) : null}
                          </div>
                          <hr />
                      </div>
                    </div>
                        <center>
                          <button type="submit" className="btn btn-dark mt-3">
                            Create Question
                          </button>
                        </center>
                    </form>
                    </CardBody>
                    </Card>
                    </Col>
                    </Row>
                    </div>
                    {handleTextBox(inputList)}
          </div>
      </div>
    );
}

export default AdmissionTestBlanksForAdmin

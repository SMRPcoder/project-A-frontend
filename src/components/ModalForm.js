import Tagify from '@yaireo/tagify';
import { Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import TagsInput from './TagsInput';

const ModalForm=(props)=> {

    useEffect(()=>{
        if(props.tagify){
            var tag_input=document.querySelector(`input[name=${props.tagify.name}]`);
            new Tagify(tag_input);
        }
    },[])
  return (
    <div>
        <Formik initialValues={props.initialValues}
            validationSchema={props.validationSchema}
            onSubmit={props.onSubmit}
         >
            <Form>
                {props.inputs?.map((newinput,index)=>(
                    <>
                    {newinput.tag?<TagsInput name={newinput.name} tagsData={newinput.value}  />:
                    <Field key={index} name={newinput.name} value={newinput.value} autoFocus/>}
                    </>
                ))}
                <button type="submit">{props.btn_name}</button>
            </Form>
        </Formik>
       
    </div>
  )
}

export default ModalForm; 


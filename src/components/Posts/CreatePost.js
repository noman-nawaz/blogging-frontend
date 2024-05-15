import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { createpostAction } from "../../redux/slices/posts/postSlices";
import CategoryDropDown from "../Categories/CategoryDropDown";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

// Form schema
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.object().required("Category is required"),
  isFeatured: Yup.boolean().required("Featured is required"), 
  transectionHash: Yup.string()
  .matches(/^0x[a-fA-F0-9]{64}$/, "Transaction Hash must be exactly 66 characters long and start with '0x'")
});

// CSS for dropzone
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  border-color: 'red';
  transition: border 0.24s ease-in-out;
`;

export default function CreatePost() {
  const dispatch = useDispatch();

  // Select store data
  const post = useSelector(state => state?.post);
  const { isCreated, loading, appErr, serverErr } = post;

  // State for isFeatured
  const [isFeatured, setIsFeatured] = useState(false);

  // Formik
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      image: "",
      isFeatured: false,
      transectionHash: "",
    },
    onSubmit: values => {
      // Dispatch the action
      const data = {
        category: values?.category?.label,
        title: values?.title,
        description: values?.description,
        image: values?.image,
        isFeatured: values?.isFeatured,
        transectionHash: values?.transectionHash,
      };
      dispatch(createpostAction(data));
    },
    validationSchema: formSchema,
  });

  // Redirect if post is created
  if (isCreated) return <Redirect to="/posts" />;

  return (
    <>
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
            Create Blog
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            Share your ideas to the word. Your blog must be free from profanity
          </p>

          {appErr || serverErr ? (
            <p className="mt-2 text-center text-lg text-red-600">
              {appErr}
            </p>
          ) : null}
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="mt-1">
                  <input
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    onBlur={formik.handleBlur("title")}
                    id="title"
                    name="title"
                    type="title"
                    autoComplete="title"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="text-red-500">
                  {formik?.touched?.title && formik?.errors?.title}
                </div>
              </div>
              {/* Category input goes here */}
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Select Category
              </label>
              <CategoryDropDown
                value={formik.values.category?.label}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                error={formik.errors.category}
                touched={formik.touched.category}
              />
              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <ReactQuill
                  value={formik.values.description}
                  onChange={(value) => formik.setFieldValue('description', value)}
                  modules={{
                    toolbar: [
                      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                      [{ size: [] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                      ['link', 'image'],
                      ['clean']
                    ],
                  }}
                  formats={[
                    'header', 'font', 'size',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'indent',
                    'link', 'image',
                    'color', 'background', 'script', 'code-block'
                  ]}
                  placeholder="Write something amazing..."
                />
                <div className="text-red-500">
                  {formik?.touched?.description && formik.errors?.description}
                </div>
              </div>
              {/* Image component */}
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium mt-3 mb-2 text-gray-700"
                >
                  Select image to upload
                </label>
                <Container className="container bg-gray-700">
                  <Dropzone
                    onBlur={formik.handleBlur("image")}
                    accept="image/jpeg, image/png"
                    onDrop={acceptedFiles => {
                      formik.setFieldValue("image", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className="container">
                        <div
                          {...getRootProps({
                            className: "dropzone",
                            onDrop: event => event.stopPropagation(),
                          })}
                        >
                          <input {...getInputProps()} />
                          <p className="text-gray-300 text-lg cursor-pointer hover:text-gray-500">
                            Click here to select image
                          </p>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </Container>
              </div>
              {/* Featured radio buttons */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Do you want Featured Blog?</label>
                <div className="mt-2">
                  <div className="flex items-center">
                    <input
                      id="featuredYes"
                      name="isFeatured"
                      type="radio"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      checked={formik.values.isFeatured}
                      onChange={() => {
                        console.log("isFeatured value when Yes clicked:", true);
                        formik.setFieldValue("isFeatured", true);
                      }}
                    />
                    <label htmlFor="featuredYes" className="ml-3 block text-sm font-medium text-gray-700">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center mt-2">
                    <input
                      id="featuredNo"
                      name="isFeatured"
                      type="radio"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      checked={!formik.values.isFeatured}
                      onChange={() => {
                        console.log("isFeatured value when No clicked:", false);
                        formik.setFieldValue("isFeatured", false);
                      }}
                    />
                    <label htmlFor="featuredNo" className="ml-3 block text-sm font-medium text-gray-700">
                      No
                    </label>
                  </div>
                </div>
                <div className="text-red-500">
                  {formik?.touched?.isFeatured && formik?.errors?.isFeatured}
                </div>
              </div>
              {/* Conditionally render transactionHash input field */}
              {formik.values.isFeatured && (
                <div>
                  <div className="font-bold text-lg text-gray-800">
                    Public Address (Fee: 0.01 ETH) <span className="text-blue-500">0x635e577109b5AC6D616f017C4f84F98e5210a704</span>
                  </div>
                  <label
                    htmlFor="transectionHash"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Paste Transaction Hash here
                  </label>
                  <div className="mt-1">
                    <input
                      value={formik.values.transectionHash}
                      onChange={formik.handleChange("transectionHash")}
                      onBlur={formik.handleBlur("transectionHash")}
                      id="transectionHash"
                      name="transectionHash"
                      type="text"
                      autoComplete="transectionHash"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="text-red-500">
                    {formik?.touched?.transectionHash && formik?.errors?.transectionHash}
                  </div>
                </div>
              )}
              {/* Submit button */}
              <div>
                {loading ? (
                  <button
                    disabled
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Loading please wait...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create Blog
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

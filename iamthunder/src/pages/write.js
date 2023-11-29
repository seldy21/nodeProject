import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { NavMenu } from "../navMenu";
import axios from "axios";
import { APIURL } from "../publicURL";

function Write() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const selectChange = () => {};

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`${APIURL}/write`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <Controller
            name="category"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Select
                aria-label="Default select"
                onChange={selectChange}
                {...field}
              >
                <option>카테고리 선택</option>
                {NavMenu.map((largeItem) =>
                  largeItem.list.map((item) => {
                    if (largeItem.id !== 1)
                      return (
                        <option
                          key={`option_${largeItem.id}_${item.id}`}
                          value={item.path.split("/")[1]}
                        >
                          {item.name}
                        </option>
                      );
                  })
                )}
              </Form.Select>
            )}
          />
        </div>
        <input type="text" className="myInput" {...register("title")} />
        <div className="mb-3 quillWrapper">
          <Controller
            name="content"
            control={control}
            rules={{ required: true }}
            className="fs-4"
            render={({ field }) => <ReactQuill theme="snow" {...field} />}
          />
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="myBtn">
            올리기
          </button>
        </div>
      </form>
    </>
  );
}

export default Write;

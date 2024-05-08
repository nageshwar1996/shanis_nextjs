import React, { useEffect, useState } from "react";
import hide from "@/assets/images/hide.png";
import view from "@/assets/images/view.png";

const Input = (info) => {
  const {
    type = "text",
    placeholder = "",
    value = "",
    onChangeInput = () => {},
    name,
    InputRef,
    isTextArea = false,
    showLeftIcon = false,
    ...rest
  } = info;
  const [activeType, setActiveType] = useState(type)

  

  useEffect(() => {
    setActiveType(type)
  }, [type])


  const switchPasswordView  = () => {
    if(activeType == 'password'){
      setActiveType("text")
    }else{
      setActiveType('password')
    }
  }

  return (
    <div className="input-box">
      {isTextArea ? (
        <textarea
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChangeInput(e.target.name, e.target.value, e);
          }}
          className="input-field text-area"
          name={name}
          ref={InputRef}
          rows="5"
         {...rest}
        />
      ) : (
        <>
        <input
          type={activeType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChangeInput(e.target.name, e.target.value, e);
          }}
          className="input-field"
          name={name}
          ref={InputRef}
          {...rest}
        />
        {type == 'password' && <> 
        {activeType == "password" ? <img src={hide.src} className="password-icon" onClick={switchPasswordView}/> : 
        <img src={view.src} className="password-icon" 
          onClick={switchPasswordView}
        />}</>}
        </>
      )}
    </div>
  );
};

export default Input;

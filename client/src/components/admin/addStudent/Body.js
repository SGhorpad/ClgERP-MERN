import React, { useEffect, useState, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { addStudent } from "../../../redux/actions/adminActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../../utils/Spinner";
import { ADD_STUDENT, SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const departments = useSelector((state) => state.admin.allDepartment);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const errorRef = useRef();

  const [value, setValue] = useState({
    name: "",
    dob: "",
    email: "",
    password: "", // can be kept but not used since password auto-generated
    department: "",
    contactNumber: "",
    avatar: "",
    batch: "",
    gender: "",
    year: "",
    fatherName: "",
    motherName: "",
    section: "",
    fatherContactNumber: "",
    motherContactNumber: "",
  });

  // Show errors if any
  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      errorRef.current?.scrollIntoView({ behavior: "smooth" });
      setValue((prev) => ({ ...prev, email: "" }));
    }
  }, [store.errors]);

  // Show success alert when student added successfully
  useEffect(() => {
    if (store.admin.studentAdded) {
      const addedStudent = store.admin.studentAdded;

      // Backend username
      const username = addedStudent?.username || "N/A";

      // Default password from DOB (yyyy-mm-dd to dd-mm-yyyy)
      let defaultPassword = "N/A";
      if (addedStudent?.dob) {
        const dobParts = addedStudent.dob.split("-");
        if (dobParts.length === 3) {
          defaultPassword = `${dobParts[2]}-${dobParts[1]}-${dobParts[0]}`;
        }
      }

      // Merge frontend form data and backend data to show everything
      const fullInfo = { ...value, ...addedStudent };

      let alertText = `✅ Student added successfully!\n\n`;
      alertText += `👤 Username: ${username}\n🔐 Password: ${defaultPassword}\n\n`;

      // Add all other fields dynamically except username (already shown)
      for (const [key, val] of Object.entries(fullInfo)) {
        if (key !== "username") {
          alertText += `${key}: ${val}\n`;
        }
      }

      alert(alertText);

      // Clear form after success
      setValue({
        name: "",
        dob: "",
        email: "",
        password: "",
        department: "",
        contactNumber: "",
        avatar: "",
        batch: "",
        gender: "",
        year: "",
        fatherName: "",
        motherName: "",
        section: "",
        fatherContactNumber: "",
        motherContactNumber: "",
      });

      setError({});
      dispatch({ type: SET_ERRORS, payload: {} });
      dispatch({ type: ADD_STUDENT, payload: false });
      setLoading(false);
    }
  }, [store.admin.studentAdded, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});
    dispatch(addStudent(value));
  };

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <AddIcon />
          <h1>Add Student</h1>
        </div>
        <div className="mr-10 bg-white flex flex-col rounded-xl">
          <form
            className={`${classes.adminForm0} scrollbar-thin scrollbar-track-white scrollbar-thumb-black overflow-y-scroll h-[30rem]`}
            onSubmit={handleSubmit}
          >
            <div className={classes.adminForm1}>
              <div className={classes.adminForm2l}>
                {/* Left side inputs */}
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Name :</h1>
                  <input
                    placeholder="Full Name"
                    required
                    className={classes.adminInput}
                    type="text"
                    value={value.name}
                    onChange={(e) => setValue({ ...value, name: e.target.value })}
                  />
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>DOB :</h1>
                  <input
                    required
                    className={classes.adminInput}
                    type="date"
                    value={value.dob}
                    onChange={(e) => setValue({ ...value, dob: e.target.value })}
                  />
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Email :</h1>
                  <input
                    required
                    className={classes.adminInput}
                    type="email"
                    value={value.email}
                    onChange={(e) => setValue({ ...value, email: e.target.value })}
                  />
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Batch :</h1>
                  <input
                    required
                    placeholder="yyyy-yyyy"
                    className={classes.adminInput}
                    type="text"
                    value={value.batch}
                    onChange={(e) => setValue({ ...value, batch: e.target.value })}
                  />
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Father's Name :</h1>
                  <input
                    required
                    className={classes.adminInput}
                    type="text"
                    value={value.fatherName}
                    onChange={(e) => setValue({ ...value, fatherName: e.target.value })}
                  />
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Mother's Name :</h1>
                  <input
                    required
                    className={classes.adminInput}
                    type="text"
                    value={value.motherName}
                    onChange={(e) => setValue({ ...value, motherName: e.target.value })}
                  />
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Year :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    value={value.year}
                    onChange={(e) => setValue({ ...value, year: e.target.value })}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                  </Select>
                </div>
              </div>

              <div className={classes.adminForm2r}>
                {/* Right side inputs */}
                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Department :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    value={value.department}
                    onChange={(e) => setValue({ ...value, department: e.target.value })}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">None</MenuItem>
                    {departments?.map((dp, idx) => (
                      <MenuItem key={idx} value={dp.department}>
                        {dp.department}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Gender :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    value={value.gender}
                    onChange={(e) => setValue({ ...value, gender: e.target.value })}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Contact Number :</h1>
                  <input
                    required
                    className={classes.adminInput}
                    type="number"
                    value={value.contactNumber}
                    onChange={(e) => setValue({ ...value, contactNumber: e.target.value })}
                  />
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Father's Contact Number :</h1>
                  <input
                    required
                    className={classes.adminInput}
                    type="number"
                    value={value.fatherContactNumber}
                    onChange={(e) => setValue({ ...value, fatherContactNumber: e.target.value })}
                  />
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Mother's Contact Number :</h1>
                  <input
                    required
                    className={classes.adminInput}
                    type="number"
                    value={value.motherContactNumber}
                    onChange={(e) => setValue({ ...value, motherContactNumber: e.target.value })}
                  />
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Section :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    value={value.section}
                    onChange={(e) => setValue({ ...value, section: e.target.value })}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                  </Select>
                </div>

                <div className={classes.adminForm3}>
                  <h1 className={classes.adminLabel}>Avatar :</h1>
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setValue({ ...value, avatar: base64 })}
                  />
                </div>
              </div>
            </div>

            <div className={classes.adminFormButton}>
              <button
                className={classes.adminFormSubmitButton}
                type="submit"
                disabled={loading}
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setValue({
                    name: "",
                    dob: "",
                    email: "",
                    password: "",
                    department: "",
                    contactNumber: "",
                    avatar: "",
                    batch: "",
                    gender: "",
                    year: "",
                    fatherName: "",
                    motherName: "",
                    section: "",
                    fatherContactNumber: "",
                    motherContactNumber: "",
                  });
                  setError({});
                }}
                className={classes.adminFormClearButton}
                type="button"
                disabled={loading}
              >
                Clear
              </button>
            </div>

            <div ref={errorRef} className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Adding Student"
                  height={30}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.emailError || error.backendError) && (
                <p className="text-red-500">
                  {error.emailError || error.backendError}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;

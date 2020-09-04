import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Formik, Field, Form, useField } from "formik";
import {
  TextField,
  FormHelperText,
  Button,
  FormLabel,
  FormControl,
  FormControlLabel,
  MenuItem,
  Grid,
  Radio,
  Select,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors";
import * as Yup from "yup";

const ColorButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: "#3eb489",
    "&:hover": {
      backgroundColor: "rgba(62,180,137, .85)",
    },
  },
}))(Button);

const MyRadio = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    // <FormControlLabel value={field.value} onChange={field.onChange} control = {<Radio />} label={label} />
    <FormControlLabel {...field} control={<Radio />} label={label} />
  );
};
const input = {
  border: "0",
  padding: "12px 15px",
  backgroundColor: "silver",
  fontSize: "1em",
  // color: 'white',
  // fontWeight: 'bold'
  margin: "10px",
  borderRadius: "9px",
  textAlign: "left",
};
const inputButton = {
  border: "0",
  padding: "12px 15px",
  backgroundColor: "silver",
  fontSize: "1em",
  // color: 'white',
  // fontWeight: 'bold'
  margin: "10px",
  borderRadius: "9px",
  textAlign: "center",
};
const inputLabel = {
  width: "300px",
  marginLeft: "40px",
  display: "inline-block",
};

const CompUi = () => {
  const [chartData, setChartData] = useState({});
  // const [empolyeeSalary, setEmployeeSalary] = useState([])
  // const [empolyeeAge, setEmployeeAge] = useState([])
  const [list, setList] = useState([]);
  const [values, setToCalculate] = useState({
    int: 0,
    principal: 0,
    annualPayment: 0,
    years: 0,
    update: true,
  });
  let forCalYears = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [labelYears, setLabelYears] = useState([
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
  ]);

  let totalIntByYears = [
    0,
    40,
    85.59999999999991,
    136.4000000000001,
    193.44000000000005,
    256.72,
    326.24,
    403.03999999999996,
    487.1199999999999,
    578.48,
    677.1199999999999,
  ];
  const [totalInt, setTotalInt] = useState([
    0,
    40,
    85.59999999999991,
    136.4000000000001,
    193.44000000000005,
    256.72,
    326.24,
    403.03999999999996,
    487.1199999999999,
    578.48,
    677.1199999999999,
  ]);

  let totalDepositByYears = [
    1000,
    1100,
    1200,
    1300,
    1400,
    1500,
    1600,
    1700,
    1800,
    1900,
    2000,
  ];
  const [totalDeposit, setTotalDeposit] = useState([
    1000,
    1100,
    1200,
    1300,
    1400,
    1500,
    1600,
    1700,
    1800,
    1900,
    2000,
  ]);

  let totalEarnedByYears = [
    1000,
    1140,
    1285.6,
    1436.4,
    1593.44,
    1756.72,
    1926.24,
    2103.04,
    2287.12,
    2478.48,
    2677.12,
  ];

  const [totalEarned, setTotalEarned] = useState([
    1000,
    1140,
    1285.6,
    1436.4,
    1593.44,
    1756.72,
    1926.24,
    2103.04,
    2287.12,
    2478.48,
    2677.12,
  ]);

  const onClick = (values) => {
    console.log(values);
    values.calculated = false;
    getYears(values);
    console.log("year is finished");
    getPowers(values);
    getTotalEarned(values);
    console.log("total is finished");
    getTotalDeposit(values);
    getTotalint(values);

    console.log(labelYears);
    setChartData({
      labels: forCalYears,
      datasets: [
        {
          label: "Deposit",
          data: totalDepositByYears,
          backgroundColor: ["#3eaeb4"],
          borderWidth: 4,
          options: {
            scales: {
              yAxes: [
                {
                  stacked: true,
                },
              ],
            },
          },
        },
        {
          label: "Interest",
          data: totalIntByYears,
          backgroundColor: ["#3eb489"],
          borderWidth: 4,
        },
      ],
    });
    setToCalculate({
      ...values,
      update: !values.update,
    });
    values.calculated = true;
  };

  const getYears = (values) => {
    let newYears = [];
    forCalYears = [];
    for (var i = 0; i <= values.years; i++) {
      forCalYears.push(i);
      newYears.push(i);
    }
    setLabelYears(newYears);
    console.log(labelYears);
  };
  const getPowers = (values) => {
    for (var i = values.years; -1 < i; i--) {
      let int = Math.pow(1 + values.int / 100, i);
      totalIntByYears.push(int);
    }
  };

  const getTotalEarned = (values) => {
    totalEarnedByYears = [];

    //endYear
    if (values.endOfYear == "end") {
      totalEarnedByYears.push(parseInt(values.principal));
      for (var i = 1; i <= values.years; i++) {
        let lastYearBalance = parseInt(totalEarnedByYears[i - 1]);
        let oneYearInt = lastYearBalance * (parseInt(values.int) / 100);
        let thisYearBalance =
          lastYearBalance + oneYearInt + parseInt(values.annualPayment);
        totalEarnedByYears.push(thisYearBalance);
      }
    } else {
      let beginningMoney =
        parseInt(values.principal) + parseInt(values.annualPayment);
      totalEarnedByYears.push(beginningMoney);
      for (var i = 1; i < values.years; i++) {
        let lastYearBalance = parseInt(totalEarnedByYears[i - 1]);
        let oneYearInt = lastYearBalance * (parseInt(values.int) / 100);
        let thisYearBalance =
          lastYearBalance + oneYearInt + parseInt(values.annualPayment);
        totalEarnedByYears.push(thisYearBalance);
      }
      let lastYear = totalEarnedByYears[totalEarnedByYears.length - 1];
      let final = lastYear * (1 + values.int / 100);
      totalEarnedByYears.push(final);
    }
    console.log(totalEarnedByYears);
    setTotalEarned(totalEarnedByYears);
  };

  const getTotalDeposit = (values) => {
    totalDepositByYears = [];

    //begYear
    if (values.endOfYear == "end") {
      totalDepositByYears.push(parseInt(values.principal));
      for (var i = 1; i <= values.years; i++) {
        let lastYearBalance = parseInt(totalDepositByYears[i - 1]);
        let thisYearBalance = lastYearBalance + parseInt(values.annualPayment);
        totalDepositByYears.push(thisYearBalance);
      }
      console.log(totalDepositByYears);
    }
    //end Year
    else {
      let beginningMoney =
        parseInt(values.principal) + parseInt(values.annualPayment);
      totalDepositByYears.push(beginningMoney);
      for (var i = 1; i < values.years; i++) {
        let lastYearBalance = parseInt(totalDepositByYears[i - 1]);
        let thisYearBalance = lastYearBalance + parseInt(values.annualPayment);
        totalDepositByYears.push(thisYearBalance);
      }
      let lastYear = totalDepositByYears[totalDepositByYears.length - 1];

      totalDepositByYears.push(lastYear);
    }

    setTotalDeposit(totalDepositByYears);
  };

  const getTotalint = (values) => {
    totalIntByYears = [];

    //begYear
    for (var i = 0; i <= values.years; i++) {
      let thisYearInt = totalEarnedByYears[i] - totalDepositByYears[i];
      totalIntByYears.push(thisYearInt);
    }
    console.log(totalIntByYears);
    setTotalInt(totalIntByYears);
  };

  useEffect(() => {
    setChartData({
      labels: labelYears,
      datasets: [
        // {
        //   label: "Total",
        //   data: totalEarnedByYears,
        //   backgroundColor: ["transparent"],
        //   borderWidth: 4,

        // },
        {
          label: "Deposit",
          data: totalDepositByYears,
          backgroundColor: ["#3eaeb4"],
          borderWidth: 4,
          options: {
            scales: {
              yAxes: [
                {
                  stacked: true,
                },
              ],
            },
          },
        },
        {
          label: "Interest",
          data: totalIntByYears,
          backgroundColor: ["#3eb489"],
          borderWidth: 4,
        },
      ],
    });
  }, []);
  useEffect(() => {
    console.log(chartData);
    console.log("finished");
  }, [values.update]);

  const validationSchema = Yup.object({
    int: Yup.number().moreThan(-1).required(),
    principal: Yup.number().moreThan(-1).required(),
    years: Yup.number().positive().required(),
    annualPayment: Yup.number().moreThan(-1).required(),
    //   endOfYear: Yup.string()
    //   .required()
  });

  return (
    <div
      className="App "
      style={{ margin: "auto", textAlign: "center", width: "30%" }}
    >
      <h1>Compound interest Calculator</h1>
      <div style={{ width: 600, height: 550 }}>
        <Grid container>
          <Grid item xs={6} sm={6} lg={6}>
            <Formik
              initialValues={{
                int: 4,
                principal: 1000,
                annualPayment: 100,
                years: 10,
                endOfYear: "end",
                calculated: false,
              }}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                console.log("submit:", data);
                setSubmitting(false);
                onClick(data);
              }}
              validationSchema={validationSchema}
            >
              {({ values, errors, isSubmitting, touched }) => (
                <Form>
                  <div>
                    <p>Expected interest Rate (in %)</p>
                    <FormControl error={errors.int != null ? true : false}>
                      <FormLabel>
                        <Field
                          type="number"
                          name="int"
                          as={TextField}
                          validate={validationSchema}
                          error={errors.int != null ? true : false}
                        ></Field>
                      </FormLabel>
                      {errors.int != null ? (
                        <FormHelperText>
                          Please enter positive number
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </div>
                  <div>
                    <p>Expected years</p>
                    <FormControl error={errors.years != null ? true : false}>
                      <FormLabel>
                        <Field
                          type="number"
                          name="years"
                          placeholder="10"
                          as={TextField}
                          validate={validationSchema}
                          error={errors.years != null ? true : false}
                        ></Field>
                      </FormLabel>
                      {errors.years != null ? (
                        <FormHelperText>
                          Please enter more than 1 years
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </div>
                  <div>
                    <p>Initial investment</p>
                    <FormControl
                      error={errors.principal != null ? true : false}
                    >
                      <FormLabel>
                        <Field
                          type="number"
                          name="principal"
                          placeholder="1000"
                          as={TextField}
                          validate={validationSchema}
                          error={errors.principal != null ? true : false}
                        ></Field>
                      </FormLabel>
                      {errors.principal != null ? (
                        <FormHelperText>
                          Please enter positive number
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </div>

                    <div>
                      <p>Annual deposit</p>
                      <FormControl
                        error={errors.annualPayment != null ? true : false}
                      >
                        <FormLabel>
                          <Field
                            type="number"
                            name="annualPayment"
                            placeholder="100"
                            as={TextField}
                            validate={validationSchema}
                            error={errors.annualPayment != null ? true : false}
                          ></Field>
                        </FormLabel>
                        {errors.annualPayment != null ? (
                          <FormHelperText>
                            Please enter positive number
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </div>
                  <p>Deposit</p>
                  <div style={{  marginBottom: 10 }}>
                    {/* <p>
                      <span style={{ marginRight: 5, marginLeft: 30 }}>
                        Start of Year
                      </span>
                      <MyRadio name="endOfYear" type="radio" value="start" />
                    </p>

                    <p>
                      <span style={{ marginRight: 5, marginLeft: 30 }}>
                        End of Year
                      </span>
                      <MyRadio name="endOfYear" type="radio" value="end" />
                    </p> */}
                    <Field name="endOfYear" type="select" as={Select}>
                      <MenuItem value="end">End of the year</MenuItem>
                      <MenuItem value="start">Beginning of the year</MenuItem>
                    </Field>

{/* 
                    <FormControlLabel  name="endOfYear" type="radio" value="end" control={<Radio />} />
                    <FormControlLabel  name="endOfYear" type="radio" value="start" control={<Radio />} /> */}
                  </div>
                  <div>
                    <ColorButton
                      disabled={isSubmitting}
                      disabled={
                        errors.int == null &&
                        errors.principal == null &&
                        errors.annualPayment == null &&
                        errors.years == null
                          ? false
                          : true
                      }
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Calculate
                    </ColorButton>
                  </div>
                </Form>
              )}
            </Formik>
          </Grid>
          <Grid item xs={6} sm={6} lg={6}>
            <h4>Calculation</h4>
            {
              (values.calculated = true ? (
                <div>
                  <p>Total years: 
                    </p>
                    <p>
                    {labelYears[labelYears.length - 1]}
                    </p>
                  <p>Total earned is:</p>
                  <p>{parseInt(totalEarned[totalEarned.length - 1])}</p>
                  <p>Total earned from interest:</p>
                  <p>{parseInt(totalInt[totalInt.length - 1])}</p>
                  <p>Total earned from deposit:</p>
                  <p>{totalDeposit[totalDeposit.length - 1]}</p>
                </div>
              ) : null)
            }
          </Grid>
        </Grid>
        <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Please Work", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: true,
                  },
                },
              ],
            },
            scales: {
              yAxes: [
                {
                  stacked: true,
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default CompUi;

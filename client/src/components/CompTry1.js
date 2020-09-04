import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Axios from 'axios';


const input = {
    border: '0',
    padding: '12px 15px',
    backgroundColor: 'silver',
    fontSize: '1em',
    // color: 'white',
    // fontWeight: 'bold'
    margin: '10px',
    borderRadius: '9px',
    textAlign: 'left',

};
const inputButton = {
    border: '0',
    padding: '12px 15px',
    backgroundColor: 'silver',
    fontSize: '1em',
    // color: 'white',
    // fontWeight: 'bold'
    margin: '10px',
    borderRadius: '9px',
    textAlign: 'center',

};
const inputLabel = {
    width: '300px',
    marginLeft: '40px',
    display: 'inline-block'

};


const CompTry1 = () => {
    const [chartData, setChartData] = useState({})
    // const [empolyeeSalary, setEmployeeSalary] = useState([])
    // const [empolyeeAge, setEmployeeAge] = useState([])
    const [list, setList] = useState([])
    const [toCalulate, setToCalculate] = useState({
        int: 0,
        principal: 0,
        annualPayment: 0,
        years: 0,
        update: true
    })
    let labelYears = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let totalIntByYears = [0, 40, 85.59999999999991, 136.4000000000001, 193.44000000000005, 256.72, 326.24, 403.03999999999996, 487.1199999999999, 578.48, 677.1199999999999];
    let totalDepositByYears = [1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000];
    let totalEarnedByYears = [1000, 1140, 1285.6, 1436.4, 1593.44, 1756.72, 1926.24, 2103.04, 2287.12, 2478.48, 2677.12];


    const chart = () => {

        // setChartData({
        //     // labels: empSal,
        //     labels: labelYears,
        //     datasets: [
        //         {
        //             label: 'Total Earned',
        //             // data: empAge,
        //             data: totalEarnedByYears,
        //             backgroundColor: ['rgba(75,192,192,.6)'],
        //             borderWidth: 4,
        //         }
        //     ]
        // })

    }

    const onChange = e => {
        setToCalculate({
            ...toCalulate,
            [e.target.name]: e.target.value
        });
    };
    const onClick = e => {
        setToCalculate({
            ...toCalulate,
            [e.target.name]: e.target.value
        });
        console.log(toCalulate)
        getYears();
        console.log("year is finished")
        getPowers();
        // getPricipals()
        getTotalEarned();
        console.log("total is finished")
        getTotalDeposit();
        getTotalint();

        setChartData({
            // labels: empSal,
            labels: labelYears,
            datasets: [
                // {
                //     label: 'Earned',
                //     // data: empAge,
                //     data: totalEarnedByYears,
                //     backgroundColor: ['rgba(75,192,192,.6)'],
                //     borderWidth: 4,
                // },
                {
                    label: 'Deposit',
                    // data: empAge,
                    data: totalDepositByYears,
                    backgroundColor: ['rgba(0,192,192,.6)'],
                    borderWidth: 4,
                    options: {
                        scales: {
                            yAxes: [{
                                stacked: true
                            }]
                        }
                    }
                },
                {
                    label: 'Interest',
                    // data: empAge,
                    data: totalIntByYears,
                    backgroundColor: ['rgba(75,0,0,.6)'],
                    borderWidth: 4,
                },
            ]
        })
        setToCalculate({
            ...toCalulate,
            update: !toCalulate.update
        });
        console.log(toCalulate)



        // chart.update();
    };
    const onReset = e => {

        // chart.update();
    };

    const getYears = () => {
        labelYears = [];
        // console.log(toCalulate.years)
        for (var i = 0; i <= toCalulate.years; i++) {
            labelYears.push(i);
        }
        console.log(labelYears)
    }
    const getPowers = () => {
        for (var i = toCalulate.years; -1 < i; i--) {
            let int = Math.pow((1 + toCalulate.int / 100), i)
            totalIntByYears.push(int)
        }
    }
    // const getPricipals = () => {
    //     principalByYears.push(toCalulate.principal)
    //     for (var i = 1; i <= toCalulate.years; i++) {
    //         principalByYears.push(toCalulate.annualPayment);
    //     }
    //     console.log(principalByYears)

    // }

    const getTotalEarned = () => {
        totalEarnedByYears = [];

        //begYear
        totalEarnedByYears.push(parseInt(toCalulate.principal))
        for (var i = 1; i <= toCalulate.years; i++) {
            let lastYearBalance = parseInt(totalEarnedByYears[i - 1]);
            let oneYearInt = lastYearBalance * (parseInt(toCalulate.int) / 100);
            let thisYearBalance = lastYearBalance + oneYearInt + parseInt(toCalulate.annualPayment);
            totalEarnedByYears.push(thisYearBalance)
        }
        //endYear
        // totalEarnedByYears.push(parseInt(toCalulate.principal))
        // for(var i=1; i<=toCalulate.years; i++) {
        //     let lastYearBalance = parseInt(totalEarnedByYears[i-1]);
        //     let oneYearInt = lastYearBalance*(parseInt(toCalulate.int)/100);
        //     let thisYearBalance = lastYearBalance+oneYearInt+parseInt(toCalulate.annualPayment);
        //     totalEarnedByYears.push(thisYearBalance)
        // }
        console.log(totalEarnedByYears)
    }

    const getTotalDeposit = () => {
        totalDepositByYears = [];

        //begYear
        totalDepositByYears.push(parseInt(toCalulate.principal))
        for (var i = 1; i <= toCalulate.years; i++) {
            let lastYearBalance = parseInt(totalDepositByYears[i - 1]);
            let thisYearBalance = lastYearBalance + parseInt(toCalulate.annualPayment);
            totalDepositByYears.push(thisYearBalance)
        }
        console.log(totalDepositByYears)
    }

    const getTotalint = () => {
        totalIntByYears = [];

        //begYear
        for (var i = 0; i <= toCalulate.years; i++) {
            let thisYearInt = totalEarnedByYears[i] - totalDepositByYears[i]
            totalIntByYears.push(thisYearInt)
        }
        console.log(totalIntByYears)
    }


    useEffect(() => {
        setChartData({
            // labels: empSal,
            labels: labelYears,
            datasets: [
                // {
                //     label: 'Earned',
                //     // data: empAge,
                //     data: totalEarnedByYears,
                //     backgroundColor: ['rgba(75,192,192,.6)'],
                //     borderWidth: 4,
                // },
                {
                    label: 'Deposit',
                    // data: empAge,
                    data: totalDepositByYears,
                    backgroundColor: ['rgba(0,192,192,.6)'],
                    borderWidth: 4,
                    options: {
                        scales: {
                            yAxes: [{
                                stacked: true
                            }]
                        }
                    }
                },
                {
                    label: 'Interest',
                    // data: empAge,
                    data: totalIntByYears,
                    backgroundColor: ['rgba(75,0,0,.6)'],
                    borderWidth: 4,
                },
            ]
        })
    }, [])
    useEffect(() => {
        chart()
        console.log(chartData)
        console.log("finished")

    }, [toCalulate.update])
    return (
        <div className="App " style={{ margin: 'auto', textAlign: "center", width: "30%", }}>
            {JSON.stringify(toCalulate)}
            <h1>Compound interest Calculator</h1>
            <div style={{ width: 600, height: 550 }} >
                <div style={input}>
                    <div style={inputLabel}>Expected interest Rate( in %)</div>
                    <input type="number" name="int" onChange={onChange} placeholder="4" />
                </div>

                <div style={input}>
                    <div style={inputLabel}>Initial investment</div>
                    <input type="number" name="principal" onChange={onChange} placeholder="1000" />
                </div>
                <div style={input}>
                    <div style={inputLabel}>Annual deposit</div>
                    <input type="number" name="annualPayment" onChange={onChange} placeholder="100" />
                </div>
                <div style={input}>
                    <div style={inputLabel}>Expected years</div>
                    <input type="number" name="years" onChange={onChange} placeholder="10" />
                </div>
                <div style={inputButton}>
                    <button onClick={onClick} type="submit" >Calculate</button>
                </div>
                <Line data={chartData} options={{
                    responsive: true,
                    title: { text: 'Please Work', display: true },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 10,
                                    beginAtZero: true,
                                },
                                gridLines: {
                                    display: true
                                }
                            }
                        ]
                    },
                    scales: {
                        yAxes: [{
                            stacked: true
                        }]
                    }

                }}
                />
            </div>
        </div>
    )
}

export default CompTry1;
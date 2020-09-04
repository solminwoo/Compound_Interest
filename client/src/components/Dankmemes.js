import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Axios from 'axios';


const Dankmemes = () => {
    const [chartData, setChartData] = useState({})
    const [ empolyeeSalary, setEmployeeSalary]= useState([])
    const [ empolyeeAge, setEmployeeAge]= useState([])


    const chart = () => {

        let empSal =[];
        let empAge = [];
        Axios.get("http://dummy.restapiexample.com/api/v1/employees")
        .then(res => {
            // console.log(res.data.data);
            for (const dataObj of res.data.data) {
                // setEmployeeSalary([...empolyeeSalary, dataObj.employee_salary])
                empSal.push(parseInt(dataObj.employee_salary))
                // setEmployeeAge([...empolyeeAge, dataObj.employee_age])
                empAge.push(parseInt(dataObj.employee_age))
            };
            setChartData({
                labels: empSal,
                // labels: ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun'],
                datasets: [
                    {
                        label: 'level of thickness',
                        data: empAge,
                        // data: [32, 45, 12, 76, 69],
                        backgroundColor: ['rgba(75,192,192,.6)'],
                        borderWidth: 4,
                    }
                ]
            })
            
        })
        .catch(err => {console.log(err);});

        console.log(empSal,empAge)

    }

    // useEffect(() => {
    //     fetch('http://dummy.restapiexample.com/api/v1/employees')
    //         .then(response => response.json())
            
    // }, []);

    useEffect(() => {
        chart()
    }, [])
    return (
        <div className="App">
            <h1>Dankmemes</h1>
            <div style={{ position: "relative", width: 600, height: 550 }} >    
                <Line data={chartData} options={{  
                    responsive:true,
                    title: { text: 'Thickness Scales', display:true},
                    scales: {
                        yAxes:[
                            {
                                ticks:{
                                    autoSkip:true,
                                    maxTicksLimit:10,
                                    beginAtZero:true,
                                },
                                gridLines: {
                                    display:true
                                }
                            }
                        ]
                    }
                }}
                />
            </div>
        </div>
    )
}

export default Dankmemes;
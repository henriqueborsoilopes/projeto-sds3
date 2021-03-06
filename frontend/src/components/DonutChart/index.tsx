import axios from 'axios';
import { useState, useEffect} from 'react';
import Chart from 'react-apexcharts'
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'utils/request';

type ChartData = {
    series: number[]
    labels: string[]
}

export default function DonutChart() {

    const [chartData, setChartData] = useState<ChartData>({series: [], labels: []})

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/amount-by-seller`)
            .then(response => {
                const data = response.data as SaleSum[]
                const mySeries = data.map(x => x.sum)
                const myLabels = data.map(x => x.sellerName)

                setChartData({series: mySeries, labels: myLabels})
            })
    }, [])

    


 //   const mockData = {
 //       series: [477138, 499928, 444867, 220426, 473088],
 //       labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
 //   }
    
    const options = {
        legend: {
            show: true
        }
    }

    return (
        <Chart 
        options={{ ...options, labels: chartData.labels}}
        series={chartData.series}
        type="donut"
        height="240"
        />
    );
  }
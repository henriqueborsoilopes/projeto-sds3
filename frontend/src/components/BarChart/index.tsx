import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSuccess } from 'types/sale';
import { round } from 'utils/format';
import { BASE_URL } from 'utils/request';

type SeriesData = {
    name: string
    data: number[]
}

type ChartData = {
    labels: {
        categories: string[]
    }
    series: SeriesData[];
}

export default function BarChart() {

    const [chartData, setChartData] = useState<ChartData>({
        labels: {
        categories: []
        },
        series: [
            {
                name: "",
                data: []                   
            }
        ]
    })

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/success-by-seller`)
            .then(response => {
                const data = response.data as SaleSuccess[]
                const mySeries = data.map(x => round(100.0 * x.deals / x.visited, 1))
                const myLabels = data.map(x => x.sellerName)

                setChartData({
                    labels: {
                        categories: myLabels
                        },
                        series: [
                            {
                                name: "% Success",
                                data: mySeries                   
                            }
                        ]
                })
            })
    }, [])

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };

    return (
        <Chart 
            options={{ ...options, xaxis: chartData.labels}}
            series={chartData.series}
            type="bar"
            height="240"
        />
    );
  }
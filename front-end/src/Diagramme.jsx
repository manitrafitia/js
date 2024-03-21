import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const Diagramme = () => {
    const [data, setData] = useState([]);
    const [reloadDiagram, setReloadDiagram] = useState(false); 
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3003/diagramme');
                setData(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, [reloadDiagram]); 

    useEffect(() => {
        if (data.length > 0) {
            if (chartRef.current !== null) {
                chartRef.current.destroy(); 
            }
            generateChart();
        }
    }, [data]);

    const generateChart = () => {
        const labels = ['Bon', 'Mauvais', 'Abîmé'];
        const backgroundColors = ['#20B104', '#FF6702', '#AF2212'];

        const arrangedData = [0, 0, 0];
        data.forEach(item => {
            arrangedData[item._id - 1] = item.totalQuantite;
        });

        const chartOptions = {
            animation: {
                duration: 1200,
                easing: 'easeOutCirc',
                delay: 50,
            },
            plugins: {
                tooltip: {
                    enabled: true
                },
                legend: {
                    labels: {
                        usePointStyle: true,
                    }
                }
            },
            layout: {
                padding: 0 
            },
            responsive: true
        };

        const chartConfig = {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: arrangedData,
                    backgroundColor: backgroundColors,
                    hoverOffset: 15
                }]
            },
            options: chartOptions
        };

        const chartContainer = document.getElementById('camembert');
        chartRef.current = new Chart(chartContainer, chartConfig);
    };

 
    const forceReloadDiagram = () => {
        setReloadDiagram(prevState => !prevState);
    };

    return (
        <>
        
             <div className="chart-container mx-auto my-5" style={{ width: '400px', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <canvas id="camembert" className="pie"></canvas>
            
        </div>
        <div className="justify-content-center m-5">
        <button onClick={forceReloadDiagram} className="reload-diagram-button bouton-diagramme">Recharger</button>
        </div>
        
        </>
       
    );
};

export default Diagramme;

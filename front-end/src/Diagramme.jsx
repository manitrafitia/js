import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const Diagramme = () => {
    const [data, setData] = useState([]);

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
    }, []);

    useEffect(() => {
        if (data.length > 0) {
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

        new Chart(document.getElementById('camembert'), {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: arrangedData,
                    backgroundColor: backgroundColors,
                    hoverOffset: 15
                }]
            },
            options: {
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
                radius: '30%',
                responsive: true
            }
        });
    };

    return (
        <div className="chart-container">
            <canvas id="camembert" className="pie"></canvas>
        </div>
    );
};

export default Diagramme;

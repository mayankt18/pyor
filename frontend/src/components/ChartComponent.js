import { createChart } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const ChartComponent = props => {
	const {
		data,
		colors: {
			backgroundColor = 'white',
			lineColor = '#2962FF',
			textColor = 'black',
			areaTopColor = '#2962FF',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
		} = {},
	} = props;

	const chartContainerRef = useRef();

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			const chart = createChart(document.body, {
                width: chartContainerRef.current.clientWidth,
                height: 600,
                layout: {
                    textColor: '#d1d4dc',
                    background: {
                        type: 'solid',
                        color: '#000000',
                    },
                },
                rightPriceScale: {
                    scaleMargins: {
                        top: 0.3,
                        bottom: 0.25,
                    },
                },
                crosshair: {
                    vertLine: {
                        width: 5,
                        color: 'rgba(224, 227, 235, 0.1)',
                        style: 0,
                    },
                    horzLine: {
                        visible: false,
                        labelVisible: false,
                    },
                },
                grid: {
                    vertLines: {
                        color: 'rgba(42, 46, 57, 0)',
                    },
                    horzLines: {
                        color: 'rgba(42, 46, 57, 0)',
                    },
                },
            });
			chart.timeScale().fitContent();

			const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
			newSeries.setData(data);

            var areaSeries = chart.addAreaSeries({
                topColor: 'rgba(38, 198, 218, 0.56)',
                bottomColor: 'rgba(38, 198, 218, 0.04)',
                lineColor: 'rgba(38, 198, 218, 1)',
                lineWidth: 2,
                crossHairMarkerVisible: false,
              });

            areaSeries.setData(data);
            
            var legend = document.createElement('div');
            legend.classList.add('legend');
            document.body.appendChild(legend);
            
            var firstRow = document.createElement('div');
            firstRow.innerText = 'ETC USD 7D VWAP';
            firstRow.style.color = 'white';
            legend.appendChild(firstRow);


            var secondRow = document.createElement('div');
            secondRow.innerText = 'Date - No. of transactions';
            secondRow.style.color = 'white';
            legend.appendChild(secondRow);

            chart.subscribeCrosshairMove((param) => {
                if (param.time) {
                    const data = param.seriesData.get(areaSeries);
                    const numberOfTransactions = data.value !== undefined ? data.value : data.close;
                    const date = data.time !== undefined ? data.time : data.close;
                    secondRow.innerText = date + '  ' + numberOfTransactions.toFixed(2);
                }
              else {
                  secondRow.innerText = 'Date - No. of transactions';
              }
            });

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	return (
		<div
			ref={chartContainerRef}
		/>
	);
};

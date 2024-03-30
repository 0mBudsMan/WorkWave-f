// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.


import React, { useState, useEffect } from 'react';
import 'powerbi-report-authoring';
///import { EmbedProps } from 'powerbi-client-react';
import dynamic from 'next/dynamic'
const PowerBIEmbed = dynamic(() => import('nextjs-powerbi').then(m => m.PowerBIEmbed), { ssr: false });
import styled from 'styled-components';

// const {models} = dynamic(
// 	()=> import("powerbi-client"),{
// 		ssr: false
// 	}
// )

// import './styling.css';

// Root Component to demonstrate usage of embedded component

const DemoApp = () => {

	// alert(typeof window)

	// PowerBI Report object (to be received via callback)
	const [report, setReport] = useState();

	// Track Report embedding status
	const [isEmbedded, setIsEmbedded] = useState(false);

    // Overall status message of embedding
	const [displayMessage, setMessage] = useState(`The report is bootstrapped. Click the Embed Report button to set the access token`);

	// CSS Class to be passed to the embedded component
	const reportClass = 'report-container';

	// Pass the basic embed configurations to the embedded component to bootstrap the report on first load
    // Values for properties like embedUrl, accessToken and settings will be set on click of button
	const [sampleReportConfig, setReportConfig] = useState({
		type: 'report',
		embedUrl: undefined,
		tokenType: 1,
		accessToken: undefined,
		settings: undefined,
	});

	/**
	 * Map of event handlers to be applied to the embedded report
	 * Update event handlers for the report by redefining the map using the setEventHandlersMap function
	 * Set event handler to null if event needs to be removed
	 * More events can be provided from here
	 * https://docs.microsoft.com/en-us/javascript/api/overview/powerbi/handle-events#report-events
	 */
	const [eventHandlersMap, setEventHandlersMap] = useState(new Map([
		['loaded', () => console.log('Report has loaded')],
		['rendered', () => console.log('Report has rendered')],
		[
		  'error',
		  (event) => {
			if (event) {
			  console.error(event.detail);
			}
		  },
		],
		['visualClicked', () => console.log('visual clicked')],
		['pageChanged', (event) => console.log(event)],
	  ]));

	useEffect(() => {
		if (report) {
			report.setComponentTitle('Embedded Report');
		}
	}, [report]);

    /**
     * Embeds report
     *
     * @returns Promise<void>
     */
	const embedReport = async () => {
		console.log('Embed Report clicked');

		// Get the embed config from the service
		const reportConfigResponse = await fetch("https://aka.ms/CaptureViewsReportEmbedConfig");

		if (reportConfigResponse === null) {
			return;
		}

		if (!reportConfigResponse?.ok) {
			console.error(`Failed to fetch config for report. Status: ${ reportConfigResponse.status } ${ reportConfigResponse.statusText }`);
			return;
		}

		const reportConfig = await reportConfigResponse.json();

		// Update the reportConfig to embed the PowerBI report
		setReportConfig({
			...sampleReportConfig,
			embedUrl: reportConfig.EmbedUrl,
			accessToken: reportConfig.EmbedToken.Token
		});
		setIsEmbedded(true);

		// Update the display message
		setMessage('Use the buttons above to interact with the report using Power BI Client APIs.');
	};

    /**
     * Hide Filter Pane
     *
     * @returns Promise<IHttpPostMessageResponse<void> | undefined>
     */
	const hideFilterPane = async ()  => {
		// Check if report is available or not
		if (!report) {
			setDisplayMessageAndConsole('Report not available');
			return;
		}

		// New settings to hide filter pane
		const settings = {
			panes: {
				filters: {
					expanded: false,
					visible: false,
				},
			},
		};

		try {
			const response = await report.updateSettings(settings);

			// Update display message
			setDisplayMessageAndConsole('Filter pane is hidden.');
			return response;
		} catch (error) {
			console.error(error);
			return;
		}
	};

    /**
     * Set data selected event
     *
     * @returns void
     */
	const setDataSelectedEvent = () => {
		setEventHandlersMap(
		  new Map([
			...eventHandlersMap,
			[
			  'dataSelected',
			  (event) => console.log(event),
			],
		  ])
		);

		setMessage('Data Selected event set successfully. Select data to see event in console.');
	}

    /**
     * Change visual type
     *
     * @returns Promise<void>
     */
	const changeVisualType = async () => {
		// Check if report is available or not
		if (!report) {
			setDisplayMessageAndConsole('Report not available');
			return;
		}

		// Get active page of the report
		const activePage = await report.getActivePage();

		if (!activePage) {
			setMessage('No Active page found');
			return;
		}

		try {
			// Change the visual type using powerbi-report-authoring
			// For more information: https://docs.microsoft.com/en-us/javascript/api/overview/powerbi/report-authoring-overview
			const visual = await activePage.getVisualByName('VisualContainer6');

			const response = await visual.changeType('lineChart');

			setDisplayMessageAndConsole(`The ${visual.type} was updated to lineChart.`);

			return response;
		}
		catch (error) {
			if (error === 'PowerBIEntityNotFound') {
				console.log('No Visual found with that name');
			} else {
				console.log(error);
			}
		}
	};

	/**
     * Set display message and log it in the console
     *
     * @returns void
     */
	const setDisplayMessageAndConsole = (message) => {
		setMessage(message);
		console.log(message);
	}

	const controlButtons =
		isEmbedded ?
		<>
			<button onClick = { changeVisualType }>
				Change visual type</button>

			<button onClick = { hideFilterPane }>
				Hide filter pane</button>

			<button onClick = { setDataSelectedEvent }>
				Set event</button>

			<label className = "display-message" style={{alignItems:"center", display:"flex", justifyContent: "center", height: "30px", marginTop: "8px", textAlign: "center"}}>
				{ displayMessage }
			</label>
		</>
		:
		<>
			<label className = "display-message position" style={{alignItems:"center", display:"flex", justifyContent: "center", height: "30px", marginTop: "40vh", textAlign: "center"}}>
				{ displayMessage }
			</label>

			<button onClick = { embedReport } className = "embed-report" style={{marginTop: "18px", textAlign: "center", marginRight:"0px"}}>
				Embed Report</button>
		</>;

	const header =
		<div className = "header" style={{padding: "13px 13px 13px 13px", textAlign: "left" }}>Power BI	</div>;

	const reportComponent =
	
		<PowerBIEmbed
			embedConfig = { sampleReportConfig }
			eventHandlers = { eventHandlersMap }
			cssClassName = { reportClass }
			getEmbeddedComponent = { (embedObject) => {
				console.log(`Embedded object of type "${ embedObject.embedtype }" received`);
				setReport(embedObject);
			} }
			
		/>;

	
	return (
		<div className = "container" style={{display: "flex", flexDirection: "column",marginLeft: "50px"}}>
			{ header }

			<div className = "controls" style={{marginTop: "20px", textAlign: "center", flex: "1", height: "100vh"}}>
				{ controlButtons }

				{ isEmbedded ? reportComponent : null }
			</div>

		
		</div>
	);
}

export default DemoApp;
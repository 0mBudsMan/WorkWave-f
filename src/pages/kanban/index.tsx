import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cWWNCe0x3Qnxbf1x0ZFFMYl5bR3NPIiBoS35RckVnWHhfdnFVRmJYWEdw');

import { KanbanComponent, ColumnsDirective, ColumnDirective, DialogFieldsModel, CardRenderedEventArgs } from "@syncfusion/ej2-react-kanban";
import { extend, addClass } from '@syncfusion/ej2-base';
import * as dataSource from './datasource.json';
import { Layout as DashboardLayout } from "/src/layouts/dashboard/layout";

import { Button } from "@mui/material";
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { kanbanInit } from '@/utils/helper';
import  CircularLoader  from '@/components/CircularLoader';
// import './App.css';
const Overview = () => {
    const [data, setData] = useState([]);
    const [pageLoaded, setPageLoaded] = useState(false)
    const tempID = "6624056d3d435961dc7f6615";
    async function getTasks() {
        await axios.get("https://se-backend-xkt0.onrender.com/api/v1/member/getmember/"+tempID)
        .then((res)=>{
            console.log(kanbanInit(res.data.data.TodoTasks, "OM"))
            setData(kanbanInit(res.data.data.TodoTasks, "OM"));
            setPageLoaded(true);
        })
        .catch((err)=>{
            console.log(err)
            alert(err?.response?.data?.message?err.response.data.message:"Error")
          })
    }

    useEffect(()=>{
        if(pageLoaded===false) getTasks();
      }, [pageLoaded])
    // let data: Object[] = extend(
    //     [],
    //     (dataSource as { [key: string]: Object }).cardData,
    //     null,
    //     true
    // ) as Object[];
    const fields: DialogFieldsModel[] = [
        { text: "ID", key: "Title", type: "TextBox" },
        { key: "Status", type: "DropDown" },
        { key: "Assignee", type: "DropDown" },
        { key: "RankId", type: "TextBox" },
        { key: "Summary", type: "TextArea" },
    ];
    const handleActionComplete = (args) => {
        if (args.requestType === 'cardCreated' || args.requestType === 'cardEdited' || args.requestType === 'cardDeleted') {
            // Update data with the latest changes
            setData([...args.data]);
        }
    };
    const cardRendered = (args: CardRenderedEventArgs): void => {
        let val: string = (args.data as { [key: string]: Object })
            .Priority as string;
        addClass([args.element], val);
    };
    const columnTemplate = (props: { [key: string]: string }) => {
        return (
            <div className="header-template-wrap">
                <div className={"header-icon e-icons " + props.keyField}></div>
                <div className="header-text">{props.headerText}</div>
            </div>
        );
    };
    const cardTemplate = (props: { [key: string]: string }) => {
        return (
            <div className={"card-template"}>
                <div className="e-card-header">
                    <div className="e-card-header-caption">
                        <div className="e-card-header-title e-tooltip-text">
                            {props.Title}
                        </div>
                    </div>
                </div>
                <div className="e-card-content e-tooltip-text">
                    <div className="e-text">{props.Summary}</div>
                </div>
                <div className="e-card-custom-footer">
                    {props.Tags.split(",").map((tag: string) => (
                        <div className="e-card-tag-field e-tooltip-text" key={tag}>{tag}</div>
                    ))}
                    <div className="e-card-avatar">{getString(props.Assignee)}</div>
                </div>
            </div>
        );
    };
    const getString = (assignee: string): string => {
        return (assignee.match(/\b(\w)/g) as string[]).join("").toUpperCase();
    };
    if(!pageLoaded){
    return <CircularLoader />;
    }
    else{
    return (
        <div className="schedule-control-section">
            <div className="col-lg-12 control-section">
                <div className="control-wrapper">
                    <KanbanComponent
                        id="kanban"
                        cssClass="kanban-overview"
                        keyField="Status"
                        dataSource={data}
                        enableTooltip={true}
                        swimlaneSettings={{ keyField: "Assignee" }}
                        cardSettings={{
                            headerField: "Title",
                            template: cardTemplate.bind(this),
                            selectionType: "Multiple",
                        }}
                        dialogSettings={{ fields: fields }}
                        cardRendered={cardRendered.bind(this)}
                        actionComplete={handleActionComplete}
                    >
                        <ColumnsDirective>
                            <ColumnDirective
                                headerText="To Do"
                                keyField="Open"
                                allowToggle={true}
                                template={columnTemplate.bind(this)}
                            />
                            <ColumnDirective
                                headerText="In Progress"
                                keyField="InProgress"
                                allowToggle={true}
                                template={columnTemplate.bind(this)}
                            />
                            <ColumnDirective
                                headerText="In Review"
                                keyField="Review"
                                allowToggle={true}
                                template={columnTemplate.bind(this)}
                            />
                            <ColumnDirective
                                headerText="Done"
                                keyField="Close"
                                allowToggle={true}
                                template={columnTemplate.bind(this)}
                            />
                        </ColumnsDirective>
                    </KanbanComponent>
                </div>
            </div>
            <Button onClick={()=>{
                console.log(data)
            }}>hey</Button>
        </div>
    );}
}
Overview.getLayout = (page) => <DashboardLayout isMinimised={true}>{page}</DashboardLayout>;
export default Overview;
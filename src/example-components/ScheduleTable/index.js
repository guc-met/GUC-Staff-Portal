import React, { Fragment } from 'react';
import {
    TableBody,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button
  } from '@material-ui/core';
import ScheduleDay from '../ScheduleDay'

const sched = 
{ 
    'Saturday': { '1st': [ { Location:'C3.102', Staff: 'N/A' }, { Location:'C5.208', Staff:'Eithar Elhinamy' }, { Location:'C3.305', Staff: 'Belal Medhat' } ], '2nd': [ { Location:'H11', Staff: 'Mervat Aboelkheir' }, { Location:'H16', Staff: 'Amr Elmougy' } ], '3rd': [ ], '4th': [ ], '5th': [ { Location:'H14', Staff: 'N/A' }, { Location:'D4.302', Staff: 'Mahmoud Gamal' }, { Location:'H13', Staff: 'Kalabala Person' }, { Location:'D4.305', Staff: 'Mahmoud Ahmed' } ] }, 
      'Sunday': { '1st': [  { Location:'C5.208', Staff:'Eithar yom el7d' }, { Location:'C3.305', Staff: 'Belal Medhat' } ], '2nd': [ { Location:'H11', Staff: 'Mervat Aboelkheir' }, { Location:'H16', Staff: 'Amr Elmougy' } ], '3rd': [ ], '4th': [ ], '5th': [ { Location:'H14', Staff: 'N/A' }, { Location:'D4.302', Staff: 'Mahmoud Gamal' }, { Location:'H13', Staff: 'Kalabala Person' }, { Location:'D4.305', Staff: 'Mahmoud Ahmed' } ] }, 
      'Monday': { '1st': [ { Location:'C3.102', Staff: 'N/A' },  ], '2nd': [ ], '3rd': [ { Location:'H elgmdan', Staff: 'Mervat Aboelkheir' }, { Location:'H16', Staff: 'Amr Elmougy' }], '4th': [ ], '5th': [ { Location:'H14', Staff: 'N/A' }, { Location:'D4.302', Staff: 'Mahmoud Gamal' }, { Location:'H13', Staff: 'Kalabala Person' }, { Location:'D4.305', Staff: 'Mahmoud Ahmed' } ] }, 
     'Tuesday': { '1st': [ { Location:'C3.102', Staff: 'N/A' }, { Location:'C5.208', Staff:'Eslam isa' }, { Location:'C3.305', Staff: 'Belal Medhat' } ], '2nd': [ { Location:'H11', Staff: 'Mervat Aboelkheir' }, { Location:'H16', Staff: 'Amr Elmougy' } ], '3rd': [ ], '4th': [ ], '5th': [ { Location:'H14', Staff: 'N/A' }, { Location:'D4.302', Staff: 'Mahmoud Gamal' }, { Location:'H13', Staff: 'Kalabala Person' }, { Location:'D4.305', Staff: 'Mahmoud Ahmed' } ] }, 
   'Wednesday': { '1st': [ { Location:'C3.102', Staff: 'N/A' }, { Location:'C5.208', Staff:'Balabizo gamed' }, { Location:'C3.305', Staff: 'Belal Medhat' } ], '2nd': [ { Location:'H11', Staff: 'Mervat Aboelkheir' }, { Location:'H16', Staff: 'Amr Elmougy' } ], '3rd': [ ], '4th': [ ], '5th': [ { Location:'H14', Staff: 'N/A' }, { Location:'D4.302', Staff: 'Mahmoud Gamal' }, { Location:'H13', Staff: 'Kalabala Person' }, { Location:'D4.305', Staff: 'Mahmoud Ahmed' } ] }, 
    'Thursday': { '1st':[], '2nd':[], '3rd':[], '4th':[], '5th':[] }, 
      'Friday': { '1st':[], '2nd':[], '3rd':[], '4th':[], '5th':[] }      
}

const noRad = {borderRadius:"0"};

//Top Left Cell Split
const CrnrDivStyle = {display: "grid", justifyContent: "space-between", gridTemplateColumns: "repeat(2, 1fr)", gridAutoRows: "1fr",  backgroundSize: "100% 100%", 
background: 'url("data:image/svg+xml;utf8,<svg xmlns='+"'http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><line x1='0' y1='0' x2='100' y2='100' stroke='black' vector-effect='non-scaling-stroke'/></svg>"+'")'
};
const topStyle = { gridColumnStart: "2",textAlign: "right"};
const botStyle = {gridColumnStart: "1", textAlign: "left"};
// const lineStyle = {width: "112px", height: "47px", borderBottom: "1px solid red", transform: "translateY(-20px) translateX(5px) rotate(27deg)", position: "absolute", zIndex: "-1"};

export default function LivePreviewExample() {
    return (
    <Fragment>
        <table className="table table-striped table-hover table-bordered mb-4">
            <colgroup>
                <col style={{width:'16.6%'}}/>
                <col style={{width:'16.6%'}}/>
                <col style={{width:'16.6%'}}/>
                <col style={{width:'16.6%'}}/>
                <col style={{width:'16.6%'}}/>
                <col style={{width:'16.6%'}}/>
            </colgroup>
                <thead className="thead-light">
                    <tr>
                        <th scope="col"> 
                            <div style={CrnrDivStyle}>
                                <span style={topStyle}> Slot </span>
                                <br></br>
                                <span style={botStyle}> Day </span>
                                {/* <div style={lineStyle}></div> */}
                            </div>
                        </th>
                        <th scope="col">1<sup>st</sup></th> 
                        <th scope="col">2<sup>nd</sup></th>
                        <th scope="col">3<sup>rd</sup></th>
                        <th scope="col">4<sup>th</sup></th>
                        <th scope="col">5<sup>th</sup></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row" style={{textAlign:"Center"}}> Saturday</th>
                        <ScheduleDay day={sched['Saturday']} />
                    </tr>
                    <tr>
                        <th scope="row" style={{textAlign:"Center"}}> Sunday</th>
                        <ScheduleDay day={sched['Sunday']} />
                    </tr>
                    <tr>
                        <th scope="row" style={{textAlign:"Center"}}> Monday</th>
                        <ScheduleDay day={sched['Monday']} />
                    </tr>
                    <tr>
                        <th scope="row" style={{textAlign:"Center"}}> Tuesday</th>
                        <ScheduleDay day={sched['Tuesday']} />
                    </tr>
                    <tr>
                        <th scope="row" style={{textAlign:"Center"}}> Wednesday</th>
                        <ScheduleDay day={sched['Wednesday']} />
                    </tr>
                    <tr>
                        <th scope="row" style={{textAlign:"Center"}}> Thursday</th>
                        <ScheduleDay day={sched['Thursday']} />
                    </tr>
                </tbody>
            </table>
        </Fragment>
    );
}
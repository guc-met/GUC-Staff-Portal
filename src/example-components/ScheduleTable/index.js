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
import ScheduleSlot from '../ScheduleSlot'
import ScheduleDay from '../ScheduleDay'

const sched = { 'Saturday': { '1st': [ { Location:'C3.102', Staff: 'N/A' }, { Location:'C5.208', Staff:'Eithar Elhinamy' }, { Location:'C3.305', Staff: 'Belal Medhat' } ], '2nd': [ { Location:'H11', Staff: 'Mervat Aboelkheir' }, { Location:'H16', Staff: 'Amr Elmougy' } ], '3rd': [ ], '4th': [ ], '5th': [ { Location:'H14', Staff: 'N/A' }, { Location:'D4.302', Staff: 'Mahmoud Gamal' }, { Location:'H13', Staff: 'Kalabala Person' }, { Location:'D4.305', Staff: 'Mahmoud Ahmed' } ] }, 'Sunday': { '1st': [ { Location:'C3.102', Staff: 'N/A' }, { Location:'C5.208', Staff:'Eithar Elhinamy' }, { Location:'C3.305', Staff: 'Belal Medhat' } ], '2nd': [ { Location:'H11', Staff: 'Mervat Aboelkheir' }, { Location:'H16', Staff: 'Amr Elmougy' } ], '3rd': [ ], '4th': [ ], '5th': [ { Location:'H14', Staff: 'N/A' }, { Location:'D4.302', Staff: 'Mahmoud Gamal' }, { Location:'H13', Staff: 'Kalabala Person' }, { Location:'D4.305', Staff: 'Mahmoud Ahmed' } ] }, 'Monday': { '1st': [ { Location:'C3.102', Staff: 'N/A' }, { Location:'C5.208', Staff:'Eithar Elhinamy' }, { Location:'C3.305', Staff: 'Belal Medhat' } ], '2nd': [ { Location:'H11', Staff: 'Mervat Aboelkheir' }, { Location:'H16', Staff: 'Amr Elmougy' } ], '3rd': [ ], '4th': [ ], '5th': [ { Location:'H14', Staff: 'N/A' }, { Location:'D4.302', Staff: 'Mahmoud Gamal' }, { Location:'H13', Staff: 'Kalabala Person' }, { Location:'D4.305', Staff: 'Mahmoud Ahmed' } ] }, 'Tuesday': { '1st': [ { Location:'C3.102', Staff: 'N/A' }, { Location:'C5.208', Staff:'Eithar Elhinamy' }, { Location:'C3.305', Staff: 'Belal Medhat' } ], '2nd': [ { Location:'H11', Staff: 'Mervat Aboelkheir' }, { Location:'H16', Staff: 'Amr Elmougy' } ], '3rd': [ ], '4th': [ ], '5th': [ { Location:'H14', Staff: 'N/A' }, { Location:'D4.302', Staff: 'Mahmoud Gamal' }, { Location:'H13', Staff: 'Kalabala Person' }, { Location:'D4.305', Staff: 'Mahmoud Ahmed' } ] }, 'Wednesday': { '1st': [ { Location:'C3.102', Staff: 'N/A' }, { Location:'C5.208', Staff:'Eithar Elhinamy' }, { Location:'C3.305', Staff: 'Belal Medhat' } ], '2nd': [ { Location:'H11', Staff: 'Mervat Aboelkheir' }, { Location:'H16', Staff: 'Amr Elmougy' } ], '3rd': [ ], '4th': [ ], '5th': [ { Location:'H14', Staff: 'N/A' }, { Location:'D4.302', Staff: 'Mahmoud Gamal' }, { Location:'H13', Staff: 'Kalabala Person' }, { Location:'D4.305', Staff: 'Mahmoud Ahmed' } ] }, 'Thursday': { '1st':[], '2nd':[], '3rd':[], '4th':[], '5th':[] }, 'Friday': { '1st':[], '2nd':[], '3rd':[], '4th':[], '5th':[] } };

const noRad = {borderRadius:"0"};

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
                        <th scope="col">#</th>
                        <th scope="col">1<sup>st</sup></th>
                        <th scope="col">2<sup>nd</sup></th>
                        <th scope="col">3<sup>rd</sup></th>
                        <th scope="col">4<sup>th</sup></th>
                        <th scope="col">5<sup>th</sup></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row"> Saturday</th>
                        <ScheduleDay day={sched['Saturday']} />
                    </tr>
                    <tr>
                        <th scope="row"> Sunday</th>
                        <ScheduleDay day={sched['Sunday']} />
                    </tr>
                    <tr>
                        <th scope="row"> Monday</th>
                        <ScheduleDay day={sched['Monday']} />
                    </tr>
                    <tr>
                        <th scope="row"> Tuesday</th>
                        <ScheduleDay day={sched['Tuesday']} />
                    </tr>
                    <tr>
                        <th scope="row"> Wednesday</th>
                        <ScheduleDay day={sched['Wednesday']} />
                    </tr>
                    <tr>
                        <th scope="row"> Thursday</th>
                        <ScheduleDay day={sched['Thursday']} />
                    </tr>
                </tbody>
            </table>
        </Fragment>
    );
}
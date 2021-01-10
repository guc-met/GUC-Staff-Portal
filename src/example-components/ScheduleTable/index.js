import React, { Fragment } from 'react';
import {
    TableBody,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
  } from '@material-ui/core';



export default function LivePreviewExample() {
    return (
    <Fragment>
        <table className="table table-striped table-hover table-bordered mb-4">
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
                        <th scope="row">Saturday</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>Mark</td>
                        <td>Otto</td>
                    </tr>
                    <tr>
                        <th scope="row">Sunday</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                    </tr>
                    <tr>
                        <th scope="row">Monday</th>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                        <td colSpan="2">Larry the Bird</td>
                    </tr>
                    <tr>
                        <th scope="row">Tuesday</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>Mark</td>
                        <td>Otto</td>
                    </tr>
                    <tr>
                        <th scope="row">Wednesday</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                    </tr>
                    <tr>
                        <th scope="row">Thursday</th>
                        <td colSpan="2">Larry the Bird</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                    <tr> 
                        <th scope="row"> Friday</th>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
    );
}
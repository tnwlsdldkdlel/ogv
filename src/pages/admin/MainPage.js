import * as React from 'react';
import AdminLayout from '../../layouts/AdminLayout.js';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import MovieRank from '../../components/main/MovieRank.js';


function MainPage() {
    return (
        <AdminLayout>
            <div className="main">
                <div className="top1">
                    <div className="rank-target">
                        <MovieRank />
                    </div>
                    <div className="rank-target">
                        <MovieRank />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default MainPage
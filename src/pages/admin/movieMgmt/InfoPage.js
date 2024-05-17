import React from 'react'
import AdminLayout from '../../../layouts/AdminLayout';
import InfoComponent from '../../../components/movieMgmt/InfoComponent';

function InfoPage() {
    return (
        <AdminLayout>
            <div className="user-mgmt">
                <div className="title">
                    영화정보
                </div>
                <InfoComponent></InfoComponent>
            </div>
        </AdminLayout>
    )
}

export default InfoPage
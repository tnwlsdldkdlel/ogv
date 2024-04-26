import React from 'react'
import AdminLayout from '../../../layouts/AdminLayout';
import InfoComponent from '../../../components/userMgmt/InfoComponent';

function InfoPage() {
    return (
        <AdminLayout>
            <div className="user-mgmt">
                <div className="title">
                    유저정보
                </div>
                <InfoComponent></InfoComponent>
            </div>
        </AdminLayout>
    )
}

export default InfoPage
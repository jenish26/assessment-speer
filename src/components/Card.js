import React from 'react';
import './Card.css';

import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import VoicemailIcon from '@mui/icons-material/Voicemail';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import OutboundTwoToneIcon from '@mui/icons-material/OutboundTwoTone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import ArchiveIcon from '@mui/icons-material/Archive';

import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
// import SetActiveFeedsToArchive from '../Redux/API_Data';
import { SetArchivedFeedsToActive, SetActiveFeedsToArchive } from '../Redux/API_Data.js';


export default function Card({ d }) {

    const [isArchiveShow, setIsArchiveShow] = React.useState(false);

    // selecting values from redux store
    const Title = useSelector(state => state.changeSlice.title);

    // dispatch variable
    let dispatch = useDispatch();

    const CallType = ({ call_type }) => {
        if (call_type === "missed") {
            return (
                <PhoneMissedIcon className="img" />
            )
        } else if (call_type === "voicemail") {
            return (
                <VoicemailIcon className="img" style={{ color: 'rgba(100 , 100, 200, 1)' }} />
            )
        } else {
            return (
                <PhoneCallbackIcon className="img" style={{ color: 'rgba(100 , 200, 100, 1)' }} />
            )
        }
    }

    const CalledTo = ({ call_type, to }) => {
        if (call_type === 'voicemail') {
            return (
                <div>
                    <h3 className="to">
                        sent a voicemail.
                    </h3>
                </div>
            )
        } else if (call_type === 'missed') {
            return (
                <div>
                    <h3 className="to">
                        tried to call on {to}
                    </h3>
                </div>
            )

        } else {
            return (
                <div>
                    <h3 className="to">
                        called {to}
                    </h3>
                </div>
            )
        }
    }

    function tConvert(time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }



    const Time = ({ created_at }) => {
        let reg = /T/;
        let time = created_at;
        time.toString();
        let result = reg.exec(time);
        let stringIs = time.slice(result.index + 1, result.index + 6);
        let convertTo12H = tConvert(stringIs);
        return (
            <h3 className="actual_time">
                {convertTo12H}
            </h3>
        )
    }

    const Date = ({ created_at }) => {
        let reg = /T/;
        let time = created_at;
        time.toString();
        let result = reg.exec(time);
        let stringIs = time.slice(0, result.index);
        let convertTo12H = tConvert(stringIs);
        return (
            <h3 className="date_text">
                {convertTo12H}
            </h3>
        )
    }

    const mouseEnters = (id) => {
        setIsArchiveShow(!isArchiveShow)
    }

    const archiveElement = async (id) => {
        await axios.post(`https://aircall-job.herokuapp.com/activities/${id}`, {
            is_archived: true
        })
            .then(function (response) {
                console.log(response);
                dispatch(SetActiveFeedsToArchive({ id: id }))
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const unArchiveElement = (id) => {
        axios.post(`https://aircall-job.herokuapp.com/activities/${id}`, {
            is_archived: false
        }).then(function (response) {
            console.log(response);
            dispatch(SetArchivedFeedsToActive({ id: id }))
        })
            .catch(function (error) {
                console.log(error);
            });

    }

    console.log('test no.23 : /\n  ', d);

    if (Title === "Activity" && d.is_archived !== true) {
        return (

            <div>
                <div className="date">
                    <Date created_at={d.created_at} />
                </div>
                <div className='dottedLine'>
                </div>

                <div className='card_container'>
                    <div
                        onClick={() => { mouseEnters() }}
                        className="Card"
                        style={isArchiveShow === false ? {} : { borderBottomWidth: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                    >
                        <div className="phone-icon">
                            {/* <PhoneMissedIcon className="img" /> */}
                            <CallType call_type={d.call_type} />
                        </div>
                        <div className={"call_info_container"}>
                            <div className="user-name">
                                <h1 style={{ fontSize: 14, fontWeight: '700', fontFamily: 'Ubuntu', color: '#555' }}>
                                    {d.from}
                                </h1>
                            </div>
                            <CalledTo call_type={d.call_type} to={d.to} />
                        </div>
                        <MoreVertIcon style={{ color: 'grey', fontSize: 14, marginTop: 8 }} />
                        <div className="time_container">
                            <Time created_at={d.created_at} />
                        </div>
                    </div>

                    {/* eslint-disable-next-line */}
                    <div className="archive_element" style={{ backgroundColor: 'white', color: 'red' }, (isArchiveShow === false) ? { visibility: 'hidden', height: 0 } : { visibility: 'visible', height: 50, border: ' 2px solid rgba(200, 200, 200, 0.51)', borderTopWidth: 0, marginBottom: 26 }}>
                        <div className='call_details'>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', width: '100%', alignItems: 'center' }}>
                                {d.direction === 'outbound' ? <OutboundTwoToneIcon /> : <OutboundTwoToneIcon style={{ transform: "rotate(0.5turn)" }} />}
                                <MoreVertIcon style={{ color: 'black', fontSize: 12 }} />
                                <LocationOnIcon />
                                <b>{d.via}</b>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', width: '100%', alignItems: 'center' }}>
                                <AccessTimeRoundedIcon /> <h5 style={{paddingLeft:'5px'}}> Duration : </h5> <h5> {d.duration} min</h5>
                            </div>

                        </div>
                        <ArchiveIcon onClick={() => { archiveElement(d.id) }} style={isArchiveShow === false ? { color: 'transparent', borderColor: 'transparent', } : { fontSize: 35, paddingTop: 15, paddingBottom: 15, paddingLeft: 15, paddingRight: 15, color: 'black', cursor: 'pointer', backgroundColor: 'transparent', borderRadius: 5, marginTop: -8 }} />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className="date">
                    <Date created_at={d.created_at} />
                </div>
                <div className='dottedLine'>
                </div>

                <div className='card_container'>
                    <div
                        onClick={() => { mouseEnters() }}
                        // onMouseEnter={() => { setExpandMe(d.id); console.log('d.id', d.id); }}
                        className="Card"
                        style={isArchiveShow === false ? {} : { borderBottomWidth: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
                    >
                        <div className="phone-icon">
                            {/* <PhoneMissedIcon className="img" /> */}
                            <CallType call_type={d.call_type} />
                        </div>
                        <div className={"call_info_container"}>
                            <div className="user-name">
                                <h1 style={{ fontSize: 14, fontWeight: '700', fontFamily: 'Ubuntu', color: '#555' }}>
                                    {d.from}
                                </h1>
                            </div>
                            <CalledTo call_type={d.call_type} to={d.to} />
                        </div>
                        <MoreVertIcon style={{ color: 'grey', fontSize: 14, marginTop: 8 }} />
                        <div className="time_container">
                            <Time created_at={d.created_at} />
                        </div>
                    </div>

                    {/* eslint-disable-next-line */}
                    <div className="archive_element" style={{ backgroundColor: 'white', color: 'red' }, isArchiveShow === false ? { visibility: 'hidden', height: 0 } : { visibility: 'visible', height: 50, border: ' 2px solid rgba(200, 200, 200, 0.51)', borderTopWidth: 0, marginBottom: 26 }}>
                        <div className='call_details'>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', width: '100%', alignItems: 'center' }}>
                                {d.direction === 'outbound' ? <OutboundTwoToneIcon /> : <OutboundTwoToneIcon style={{ transform: "rotate(0.5turn)" }} />}
                                <MoreVertIcon style={{ color: 'black', fontSize: 12 }} />
                                <LocationOnIcon />
                                <b>{d.via}</b>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', width: '100%', alignItems: 'center' }}>
                                <AccessTimeRoundedIcon /> <h5 style={{paddingLeft:'5px'}}> Duration : </h5> <h5> {d.duration} min</h5>
                            </div>

                        </div>
                        <UnarchiveIcon onClick={() => { unArchiveElement(d.id) }} style={isArchiveShow === false ? { color: 'transparent', borderColor: 'transparent', } : { fontSize: 35, paddingTop: 15, paddingBottom: 15, paddingLeft: 15, paddingRight: 15, color: 'black', cursor: 'pointer', backgroundColor: 'transparent', borderRadius: 5, marginTop: -8 }} />
                    </div>
                </div>
            </div>
        )
    }
}

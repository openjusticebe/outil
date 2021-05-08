// JS
import React, { useEffect, useState } from "react";
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import { getAuthHeader } from "../../services/auth"
import LoadGif from '../../images/hourglass.gif';

const options = {year:'2-digit', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', second:undefined}
const disp_date = (date) => {
    if (date === undefined)
        return '';
    const r = new Date(date);
    return r.toLocaleString('fr', options);

};

const collections = {
    'review' : { 'key': 'review', 'trans': 'review' },
    'published' : { 'key': 'public', 'trans': 'published' },
    'flagged' : { 'key': 'flagged', 'trans': 'flagged' },
    'deleted' : { 'key': 'deleted', 'trans': 'deleted' },
    'waiting' : { 'key': 'hidden', 'trans': 'waiting' },
};

const List = ({list}) => (
    <table className="table table-bordered table-hover table-sm">
        <thead className="thead-dark">
        <tr>
            <th className="col" style={{width:'10%'}}>Id</th>
            <th className="col" style={{width:'50%'}}>Ecli</th>
            <th className="col" style={{width:'20%'}}>Création</th>
            <th className="col" style={{width:'20%'}}>Modification</th>
        </tr>
        </thead>
        <tbody>
        { list && list.map((item) => (
            <tr key={ item.id }>
                <td>
                    <Link to={"/admin/edit/" + item.id}>
                        <i className="icon-pencil pr-2" />
                        { item.id }
                    </Link>
                </td>
                <td>{ item.ecli }</td>
                <td className="text-muted">{ disp_date(item.date_created) }</td>
                <td className="text-muted">{ disp_date(item.date_updated) }</td>
            </tr>
        ))}
        { list === false &&
        <tr>
            <td colSpan="4" className="bg-secondary">
                <center><img className="loadgif" src={LoadGif} alt="loading" /></center>
            </td>
        </tr>
        }
        </tbody>
    </table>
)

const DocList = ({collection}) => {
    // Client-side Runtime Data Fetching
    const {t} = useTranslation();
    const {navigate} = useI18next();

    const [theList, setTheList] = useState(false);
    const col = collections[collection];

    useEffect(() => {
        setTheList(false);
        fetch(`${process.env.GATSBY_DATA_API}/c/${col.key}`, {
            headers : {"Authorization" : getAuthHeader()}
        })
        .then(resp => { 
            if (resp.status === 200) {
                return resp.json();
            } else {
                throw new Error('Bad Return Status')
            }
        })
        .then(resultData => {
            setTheList(resultData);
        })
        .catch(error => {
            navigate(`/?auth=reset`);
        });
    }, [collection]);

    return (
        <div className="container m-3">
            <h2 className="display-5 text-secondary">{ t(`txt_listt_${col.trans}`)}</h2>
            <p className="text-muted">{ t(`txt_listd_${col.trans}`)}</p>
            <List list={ theList } />
        </div>
    );
}

export default DocList;

import React from "react";
import {Link, Trans, useTranslation} from 'gatsby-plugin-react-i18next';

export default ({ degraded, meta, state }) => {

    return (
        <>
            { degraded &&
            <div className="col-12">
                <p className="bg-warning text-dark">PDF Image détecté : le traitement prendra plus de temps,
                le résultat peut en être dégradé</p>
            </div>
            }

            <div className="col-12">
            { meta &&
                <ul className="details">
                    <li><Trans>Caractères</Trans>: <b>{ meta.charstotal || '0' }</b></li>
                    <li><Trans>Pages</Trans>: <b>{ meta.pages || '0' }</b></li>
                    <li><Trans>Langue</Trans>: <b>{ meta.language || '0' }</b></li>
                </ul>
            }
            </div>

            {state && (
            <div className="col-12 text-muted text-log">
                <ol className="eventlog">
                {state.map( st  => (
                    <li>{ st }</li>
                ))}
                </ol>
            </div>
            )}
        </>
        )
}

import React from "react";
import Dropzone from 'react-dropzone'
import LoadGif from '../images/hourglass.gif';
import {Link, Trans, useTranslation} from 'gatsby-plugin-react-i18next';

export default ({ parentCallback, waiting }) => {

    const handleFiles = (files) => {
        var payload = new FormData();
        waiting = true;
        payload.append('rawFile', files[0]);

        fetch(`${process.env.GATSBY_UPLOAD_API}/extract/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: payload
        }).then(
            response => response.json()
        ).then( data => {
            parentCallback(data['ref'])
        }).catch(
            error => {
                parentCallback(false, error.toString());
                }
        );
    }

    return (
        <div className="uploader btn btn-ojact px-5">
            <Dropzone onDrop={acceptedFiles => handleFiles(acceptedFiles)}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                      { waiting && <img className="loadgif" src={LoadGif} alt="loading" />}
                    <Trans>Choisir un fichier</Trans>
                  </div>
                </section>
              )}
            </Dropzone>
        </div>
    )
}

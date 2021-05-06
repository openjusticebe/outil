import React  from "react";
import {Link, Trans, useTranslation} from 'gatsby-plugin-react-i18next';
import {
  useQueryParams,
  StringParam,
} from 'use-query-params';

const PreviewUi = ()  => {
    const [query, setQuery] = useQueryParams({
      hash: StringParam,
    });
    const { hash: hash} = query;

    return (
        <div className="col-12 mb-5 shadow rounded border py-3 my-3">
            <p><Trans>Lien personnel</Trans><br />
                <a href={ `${process.env.GATSBY_DATA_API}/hash/${hash}` } rel="no-follow">
                    { `${process.env.GATSBY_DATA_API}/hash/${hash}` }
                </a>
            </p>

            <p><Trans>Fichier PDF</Trans><br />
                <a href={ `${process.env.GATSBY_DATA_API}/d/pdf/${hash}` } rel="no-follow">
                    { `${process.env.GATSBY_DATA_API}/d/pdf/${hash}` }
                </a>
            </p>
        </div>
    )
}

export default PreviewUi

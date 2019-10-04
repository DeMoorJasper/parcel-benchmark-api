import React from "react";
import { NextPage } from "next";
import { withRouter } from "next/router";
import fetch from "cross-fetch";
import urlJoin from "url-join";

import SEO from "../components/seo";
import { API_URL } from "../constants";

type Props = {
  error?: Error;
  comparisons?: Array<any>;
};

const Page: NextPage<Props> = (props: Props) => {
  let { error, comparisons } = props;

  // Error boundary should catch this?
  if (error) {
    throw error;
  }

  let comparisonsList = null;
  if (comparisons) {
    comparisonsList = comparisons.map((comparison, i) => {
      return <div key={i}>Comparison</div>;
    });
  }

  return (
    <>
      <SEO title="Last commits" />
      {comparisonsList}
    </>
  );
};

Page.getInitialProps = async ({ query }: any) => {
  try {
    let res: any = await fetch(urlJoin(API_URL, "metrics"));
    res = await res.json();

    return {
      comparisons: res.data
    };
  } catch (e) {
    return {};
  }
};

// @ts-ignore
export default withRouter(Page);
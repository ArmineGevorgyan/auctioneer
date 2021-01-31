import React from "react";
import { Dimmer, Loader as SemanticUiLoader } from "semantic-ui-react";

const Loader = ({ loading }) => (
  <Dimmer inverted active={loading} page>
    <SemanticUiLoader />
  </Dimmer>
);

export default Loader;
